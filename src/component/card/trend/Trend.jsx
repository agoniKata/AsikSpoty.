import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./trend.module.css";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { NewReleases } from "../newReleases/NewReleases";

export function Trend() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await fetch("http://localhost:3000/random");
        const data = await response.json();
        setAlbums(data.albums.items);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      }
    };

    fetchNewReleases();
  }, []);

  let posts;

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Container>
        <h3 style={{ marginLeft: "1.5em" }}>Listen Today</h3>
        <Row>
          {albums.map((card, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card
                styles={{ width: "18rem" }}
                border="success"
                bg={"Light".toLowerCase()}
                key={"Light"}
                text={"Light".toLowerCase() === "light" ? "dark" : "white"}
                style={{ width: "18rem" }}
                className="mb-2"
              >
                <Card.Img
                  variant="top"
                  src={card.images[1].url}
                  width={48}
                  height={256}
                ></Card.Img>
                <Card.Body>
                  <Card.Title>
                    <a className={styles.cardLink} href={card.external_urls}>
                      {card.name}
                    </a>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <a
                      className={styles.cardLink}
                      href={card.artists[0].external_urls.spotify}
                    >
                      {card.artists[0].name}
                    </a>
                  </Card.Subtitle>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <NewReleases />
    </div>
  );
}
