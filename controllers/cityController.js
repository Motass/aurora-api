const cityService = require('../services/cityService');

exports.getCityInfo = async (req, res, next) => {
    try {
        const query = req.query.query;
        let results = await cityService.findPlacesByQuery(query);
        res.json(results);
    } catch (e) {
        next(e);
    }
};