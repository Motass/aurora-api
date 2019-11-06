const gmaps = require('../config/gmaps');

const findPlaceById = async (id) => {
    try {
        const response = await gmaps.googleMapsClient.place({placeid: id})
            .asPromise();

        return response.json.result;
    } catch (e) {
        throw e;
    }
};

const findPlacesByQuery = async (query) => {
    try {
        const response = await gmaps.googleMapsClient.findPlace({input: query, inputtype: 'textquery'})
            .asPromise();
        const getPlacesFunctions = [];
        for (const place of response.json.candidates) {
            getPlacesFunctions.push(findPlaceById(place.place_id));
        }
        return await Promise.all(getPlacesFunctions);
    } catch (e) {
        throw e;
    }
};
module.exports.findPlacesByQuery = findPlacesByQuery;
