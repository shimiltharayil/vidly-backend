
const config = require("config");
const express = require("express");
const logger = require("./middleware/logger");
const app = express();
const genres = require("./routes/genres");
const courses = require("./routes/courses");
const home = require("./routes/home");
const helmet = require("helmet");
const morgan = require("morgan");

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app:${app.get("env")}`);

// CONFIGURATION
console.log("Applcation Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));

app.set("view engine", "hbs");
app.set("views", "./views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/api/genres", genres);
app.use("/", home);
// app.use(logger);
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled...");
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

