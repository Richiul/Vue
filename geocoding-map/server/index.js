const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//init express
const app = express();

// enable cors
app.use(cors());

//routes
app.get("/api/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const result = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.VUE_APP_API_KEY}`
    );
    const data = result.data;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`app has started on port: ${PORT}`));
