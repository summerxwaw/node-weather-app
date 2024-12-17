
const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=b0dd8fa9c82b1451cedd72fb3bd7b4c3&query=${latitude},${longitude}&units=m`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to service!', undefined)
        } else {
            try {
                // const current = response.body.current;
                // const location = response.body.location;

                // callback(undefined, {
                //     country: location.country,
                //     region: location.region,
                //     weather_descriptions: current.weather_descriptions,
                //     temperature: current.temperature,
                //     observation_time: current.observation_time,
                // },)
                const { current, location } = response.body;

                const { country, region } = location;
                const { weather_descriptions, temperature, observation_time } = current;


                callback(undefined, {
                    country,
                    region,
                    weather_descriptions,
                    temperature,
                    observation_time,
                },)
            } catch (e) {
                callback(response.body.error.info, undefined)
            }
        }
    },
    );
}


module.exports = forecast