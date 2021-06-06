const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anurag Jain'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anurag Jain'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For More help refer below!',
        title: 'Help',
        name: 'Anurag Jain'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            });
        }
    
        forecast(data.location, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            
            res.send({
                forecast: forecastData,
                location: data.location,
            });
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anurag Jain',
        errorMessage: 'Help Article Not Found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anurag Jain',
        errorMessage: 'Page Not Found.'
    });
});

app.listen(port, ()=>{
    console.log('Server is up running on port ' + port);
});