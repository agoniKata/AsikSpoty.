import { Container, FormControl, InputGroup, Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { response } from "express";

const api_client_id = "985489a52c104aa8976e5f01ddacf411";
const api_client_secret = "4ed2d06d76a34966990ff2898f89c8c3";
export function Search() {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${api_client_id}&client_secret=${api_client_secret}`,
    };

    try {
      fetch("https://accounts.spotify.com/api/token", authParameters)
        .then((result) => result.json())
        .then((data) => setAccessToken(data.access_token));
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  }, []);

  async function searchFor() {
    console.log("Search for " + search);

    var searchParameters = {
      method: "GET",
      headers: {
        "Contebt-Type": "aplication/json",
        Authorization: "Bearer" + accessToken,
      },
    };

    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + search + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    var albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "albums" +
        "?include_groups=album&limit=12",
      searchParameters
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <>
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={searchFor}
          >
            Search
          </Button>
        </InputGroup>
      </Container>
    </>
  );
}
