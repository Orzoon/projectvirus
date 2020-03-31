const request = require("request");

// First letter of country CAPITAL
function processDataFunction(URI, country, cb){
    let response_data = {};
    //checking for country
    if(country && country.length > 0){
        URI = URI + "/"+ country
    } 

    var options = {
        method: 'GET',
        url: URI,
        headers: {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "826f44d3aamsh6b141b759c43a42p11572ejsn7bb34603e80e"
        }
    }

    request(options, function(error,response, body){
        if (error) {
            response_data.error =  res.error;
        }
        else {
            response_data.data = body;
        }
        //return response_data;
        cb(response_data)
    })
}

module.exports = {
    processDataFunction
}
