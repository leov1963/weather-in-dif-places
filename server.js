require('dotenv').config();

const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const db = require("./models")


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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});