const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");

const app = express();

//define Paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlers engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Daksh Jain",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Daksh Jain",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "How can I help you",
    name: "Daksh Jain",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  // console.log(req.query.address);
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Daksh Jain",
    errorMessage: "Help Page Not Found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Daksh Jain",
    errorMessage: "Page Not Found",
  });
});
app.listen(3000, () => {
  console.log("Server is UP on port 3000.");
});
