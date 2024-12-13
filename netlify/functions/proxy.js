exports.handler = async (event) => {
    const fetch = (await import('node-fetch')).default;
    console.log('Event:', event);
    const baseUrl = 'http://api.geonames.org/neighboursJSON';
    const queryParams = '?formatted=true&geonameId=2658434&username=mmontaldo';
    const response = await fetch(baseUrl + queryParams);
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    console.log('Data fetched from GeoNames:', data);

    if (!data || !data.geonames) {
        console.error('Invalid data structure:', data);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Invalid data structure from GeoNames' }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
