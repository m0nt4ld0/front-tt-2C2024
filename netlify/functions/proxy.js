const fetch = require('node-fetch');

exports.handler = async (event) => {
    const response = await fetch('http://api.geonames.org/neighboursJSON?formatted=true&geonameId=2658434&username=mmontaldo' + event.path);
    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
