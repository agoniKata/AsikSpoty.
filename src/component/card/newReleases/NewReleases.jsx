import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import styles from "./newRelease.module.css";

export function NewReleases() {
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/new-releases?limit=1"
        );
        const data = await response.json();
        setNewReleases(data.albums.items);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      }
    };

    fetchNewReleases();
  }, []);
  console.log(newReleases);

  return (
    <Container>
      <h2>New Releases</h2>
      <Row>
        {newReleases.map((card, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card styles={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={card.images[2].url}
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
  );
}
