const request = require('request')

getData = (symbol, callback) => {
    const apiKey = 'cKNtmmiWMlYZlVXjbS92O4deN4tp11hvlETiiGCCkGAjWt7UCO7GsUOms3UO'
    const url = `https://www.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${apiKey}`
    request.get({
            url: url,
            json: true
        },
        (err, response) => {
            if (err) {
                callback({
                    message: `Something wrong is not right ${err}`,
                    code: 500
                }, undefined)
            }

            if (response.body === undefined || response.body.data === undefined) {

                callback({
                    message: `Asset does not exist!`,
                    code: 404
                }, undefined)
                return
            }

            const parsedJSON = response.body.data[0]
            const {
                price_open,
                symbol,
                name,
                price,
                day_high,
                day_low
            } = parsedJSON
            callback(undefined, {
                price_open,
                symbol,
                name,
                price,
                day_high,
                day_low
            })
        })
}

module.exports = getData