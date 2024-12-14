exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      GEONAMES_API_KEY: process.env.GEONAMES_API_KEY,
      UNSPLASH_API_KEY: process.env.UNSPLASH_API_KEY,
    }),
  };
};
