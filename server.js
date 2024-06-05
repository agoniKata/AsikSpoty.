import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";
import randomstring from "randomstring";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const api_client_id = "985489a52c104aa8976e5f01ddacf411";
const api_client_secret = "4ed2d06d76a34966990ff2898f89c8c3";

let accessToken = "";
const errorMessage = "Failed to fetch new releases";
const getAccessToken = async () => {
  const authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${api_client_id}&client_secret=${api_client_secret}`,
  };

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authParameters
    );
    const data = await response.json();
    accessToken = data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

getAccessToken();

setInterval(getAccessToken, 59 * 60 * 1000);

const fetchData = async (apiUrl) => {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

app.get("/new-releases", async (req, res) => {
  try {
    await getAccessToken();
    const data = await fetchData(
      "https://api.spotify.com/v1/browse/new-releases"
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: errorMessage });
  }
});

app.get("/random", async (req, res) => {
  try {
    const query = randomstring.generate(3);
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=album&limit=9`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      res.status(response.status).json({ error: "Error fetching albums" });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching albums:", error);
    res.status(500).json({ error: "Failed to fetch albums" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
