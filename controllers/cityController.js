const cityService = require('../services/cityService');
const constants = require('../config/constants');

exports.getCityInfo = async (req, res, next) => {
    try {
        const query = req.query.query;
        if (!query || query === '') {
            return next({status: 401, message: constants.errors.INVALID_QUERY});
        }
        let results = await cityService.findPlacesByQuery(query);
        res.json(results);
    } catch (e) {
        next(e);
    }
};