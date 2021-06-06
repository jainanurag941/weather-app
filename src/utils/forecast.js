const request = require('request');

const forecast = (address, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=888f06fc79008f3f6615040b82b865ab&query=' + encodeURIComponent(address);

    request({ url: url, json:true }, (error, response) => {
        if(error){
            callback('Unable to connect to location Services!', undefined);
        } else if(response.body.error){
            callback('Unable to find location. Try Another Search.', undefined);
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degree Celsius. There is a ' + response.body.current.precip + '% chance of rain. The humidity is ' + response.body.current.humidity + '%.');
        }
    });
}





module.exports = forecast;