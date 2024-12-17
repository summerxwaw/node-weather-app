
const request = require('postman-request');

// Variant number 1

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?access_token=pk.eyJ1Ijoic3VtbWVyeHdhdyIsImEiOiJjbTRhajJqaHAwN3RmMmtxcmtrcnU3ajJnIn0.j9afVCc4dk8FYGN5RSwufw&q=${encodeURIComponent(address)}&limit=1`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to service!', undefined)
        } else {
            try {
                // const properties = response.body.features[0].properties;
                // callback(undefined, {
                //     latitude: properties.coordinates.latitude,
                //     longitude: properties.coordinates.longitude,
                //     location: properties.full_address,
                // });

                const { coordinates, full_address: location } = response.body.features[0].properties;

                callback(undefined, coordinates);
            } catch (e) {

                callback('Unable to find location', e, undefined)
            }
        }
    },
    );
}

// Variant number 2
//
// const geocode = (address, callback) => {
//     const url = `https://api.mapbox.com/search/geocode/v6/forward?access_token=pk.eyJ1Ijoic3VtbWVyeHdhdyIsImEiOiJjbTRhajJqaHAwN3RmMmtxcmtrcnU3ajJnIn0.j9afVCc4dk8FYGN5RSwufw&q=${encodeURIComponent(address)}&limit=1`;

//     request({ url: url, json: true }, callback);
// }

// geocode('Odesa', (error, response) => {
//     if (error) {
//         console.log(error)
//         console.log('Unable to connect to service!')
//     } else {
//         try {
//             const properties = response.body.features[0].properties;

//             console.log(`location: ${properties.full_address} cordinates: long - ${properties.coordinates.longitude} lat - ${properties.coordinates.latitude}`);
//         } catch (e) {
//             console.log('Unable to find location');
//         }
//     }
// });

module.exports = geocode;