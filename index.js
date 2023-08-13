import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


const yourUsername = "kunjmaheshwari_";
const yourPassword = "webdevelopment123";
const yourAPIKey = "73a8abd6-3722-43f3-8711-32a093e91066";
const yourBearerToken = "97492e27-d811-4034-8e1a-3b164a3159d9";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch(error){
    res.status(404).send("Error:", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "all>pages=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }, 
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch (error){
    res.status(404).send("Error:", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      }
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch(error){
    res.status(404).send("Error: ", error.message);
  }
});

const config = {
  header: {Authorization: `Bearer ${yourBearerToken}`}, 
};

app.get("/bearerToken", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch(error){
    res.status(404).send("Error: ", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
