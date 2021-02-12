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

app.get("/new", (req,res) => {
    res.render("new.ejs")
})

app.post('/new', (req, res) => {
    console.log(req.body);
    db.place.create(req.body)
    .then((createdPlace)=> {
        console.log('Created Place = ', createdPlace);
        res.redirect('/');
    });
})

app.get("/:zipcode", (req, res) => {
    weather.find({search:req.params.zipcode, degreeType: "f"}, function(err, result) {
        if(err) console.log(err)
        // const myWeather 
        console.log(result)
        const temperature = result[0].current.temperature
        const skytext = result[0].current.skytext
        const zipcode = result[0].location.zipcode
        res.render("show", { temperature, skytext, zipcode })
    })
})

app.post('/:zipcode', (req, res) => {
    console.log(req.body.name, "************************")
    console.log(req.params)
    try{
        db.place.destroy({
          where: {
            zipcode: req.params.zipcode
          }
        })
        console.log('Deleted Place = ',);
        res.redirect('/');
    } catch(error) {
        console.log(error)
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});