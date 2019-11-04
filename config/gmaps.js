const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_KEY,
    Promise: Promise
});

module.exports.googleMapsClient = googleMapsClient;