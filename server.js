require('dotenv').config();

const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const db = require("./models")
const weather = require("weather-js")

const app = express();
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async(req, res) => {
    try{
        const foundPlaces = await db.place.findAll()
        res.render('index.ejs', {
        places: foundPlaces,
        })
        } catch(e) {
        console.log(e)
    };

})

let myWeather = []
app.get("/:zipcode", (req, res) => {
    weather.find({search:req.params.zipcode, degreeType: "f"}, function(err, result) {
        if(err) console.log(err)
        myWeather = result, null, 2
        res.send(`The current temperature in your area is: ${myWeather[0].current.temperature} degrees fahrenheit. The sky is ${myWeather[0].current.skytext}.`)
    })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});