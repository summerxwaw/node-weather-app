const path = require('path');
const express = require('express');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');
const hbs = require('hbs');

const app = express();

// Define paths fro Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const hbsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars engine and views location
app.set('views', hbsDirectoryPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsDirectoryPath);

//Seyup static dir to save
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dmytro',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dmytro'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'Example of help message',
        name: 'Dmytro',
    });
});

app.get('/weather', (req, res) => {
    let address = req.query.address;

    if (!address) {
        return res.send({
            error: 'address is required'
        });
    }


    geocode(address, (error, { latitude, longitude } = {}) => {

        if (error) {
            res.send({
                error: error
            });
        } else {

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({
                        error: error
                    });
                } else {
                    console.log('Map res: ', latitude, longitude);
                    console.log('Weather es: ', forecastData);
                    res.send({
                        weather_descriptions: forecastData.weather_descriptions,
                        tempature: forecastData.temperature,
                        address: forecastData.country + ' ' + forecastData.region,
                    });
                }
            })
        }
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search value',
        })
    }
    console.log(req.query.search);
    req.query
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorTitle: 'Help article not Found',
        errorCode: '404',
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        errorTitle: 'Page not Found',
        errorCode: '404',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port: 3000');
});