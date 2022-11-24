const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

//init express
const app = express();

// enable cors
app.use(cors());

//routes
app.get('/api/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const result = await axios(`https://api.mapbox.com/search/v1/forward/starbucks?language=en&country=US&access_token=pk.eyJ1Ijoia2ludnNyaW5nMTIzIiwiYSI6ImNsYXU1OHJ3bDAwamQzcG1raXE4cHF5Z3AifQ.PsjS66KSkl4MOBVV7-_igQ`
        );
        console.log(result.data);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    } 
    
});

app.listen(PORT, () => console.log(`app has started on port: ${PORT}`));