const express = require('express')
var axios = require("axios").default;
const cors = require('cors')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
require('dotenv').config()

const app = express()

const port = process.env.PORT
const apiKey = process.env.API_KEY
const mongoPassword = process.env.MONGO_PASSWORD

app.use(bodyParser.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

//gets locations list with given search parameter
app.get('/searchLocations', (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://foreca-weather.p.rapidapi.com/location/search/' + req.query.searchValue,
      headers: {
        'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    };
    
    axios.request(options).then((response) => {
        res.send(response.data)
    }).catch((err) => {
        console.log(err);
    });
})

//gets location information with given id
app.get('/getLocationInfo', (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://foreca-weather.p.rapidapi.com/location/' + req.query.id,
      headers: {
        'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    };
    
    axios.request(options).then((response) => {
        res.send(response.data)
    }).catch((err) => {
        if(err.response) {
            res.send("not found")
        } else {
            console.log(err)
        }
    });
})

//gets location current forecast with given id
app.get('/getCurrent', (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://foreca-weather.p.rapidapi.com/current/' + req.query.id,
        headers: {
          'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
          'x-rapidapi-key': apiKey
        }
    };
    
    axios.request(options).then((response) => {
        res.send(response.data)
    }).catch((err) => {
        console.log(err);
    });
})

//gets location daily forecast with current id
app.get('/getDaily', (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://foreca-weather.p.rapidapi.com/forecast/daily/' + req.query.id,
        params: {periods: "8"},
        headers: {
          'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
          'x-rapidapi-key': apiKey
        }
    };
    
    axios.request(options).then((response) => {
        res.send(response.data)
    }).catch((err) => {
        console.log(err);
    });
})

//posts userAction to mongodb
app.post('/postUserAction', (req, res) => {
    const mongoose = require('mongoose');
    mongoose.connect(`mongodb+srv://forecaweather:${mongoPassword}@forecacluster.lykt2.mongodb.net/forecaDB`, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
            mongoose.connection.collection('foreca').insertOne(req.body).then(() =>{
                mongoose.connection.close();
        });
    });
    
    
})

app.listen(port, () => {
    console.log(`server started at ${port}`)
})