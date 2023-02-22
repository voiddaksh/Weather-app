const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoidm9pZC1kYWtzaCIsImEiOiJjbGU4YmJuODMwN3h0M3ZxczJxZmF0Nmd4In0.3yCwXm54YotgHXnRQ3ATaQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location. Try another Search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

// const url2 =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoidm9pZC1kYWtzaCIsImEiOiJjbGU4YmJuODMwN3h0M3ZxczJxZmF0Nmd4In0.3yCwXm54YotgHXnRQ3ATaQ&limit=1";

// request({ url: url2, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service!");
//   } else if (response.body.features.length === 0) {
//     console.log("Unable to find location");
//   } else {
//     console.log(
//       `The location's latitude:${response.body.features[0].center[1]} and longitude:${response.body.features[0].center[0]}`
//     );
//   }
// });
