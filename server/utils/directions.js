const https = require('https');
const directionsUrl = 'https://maps.googleapis.com/maps/api/directions/json?'
const api_key_directions = 'AIzaSyCB-Q9H4SJQAqJOKgRD1b2t6sPSxofXIGs' //schimbam locul mai tarziu

function findDirections(origin, destination) {
    return new Promise((resolve, reject) => {

        https.get(directionsUrl + 'origin=' + origin + '&destination=' + destination + '&key=' + api_key_directions, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(JSON.parse(data).routes[0].legs[0].steps[0].html_instructions);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });
}

module.exports = { findDirections };