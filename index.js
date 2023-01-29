
const express = require("express");
const app = express();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const mongoose = require("mongoose")
const users = require("./routes/users");


mongoose.connect("mongodb://localhost:27017/vidly").then(()=>{
  console.log("Connected to database");
}).catch(err => console.log(err));


// Middleware
app.use(express.json());
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/api/rentals", rentals);
app.use("/api/users", users);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

