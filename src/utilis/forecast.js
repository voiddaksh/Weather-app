const request = require("request");
const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c29fe8f4365043e817822d9238ea1fc5&query=${longtitude},${latitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;

// const url =
//   "http://api.weatherstack.com/current?access_key=c29fe8f4365043e817822d9238ea1fc5&query=37.8267,-122.4233&units=f";

// request({ url: url, json: true }, (error, response) => {
//   // console.log(response.body.current);
//   if (error) {
//     console.log("Unable to connect to weather service!");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     console.log(
//       `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`
//     );
//   }

// console.log(
//   `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`
// );
// });
