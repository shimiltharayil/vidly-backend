
const config = require('config');
const Joi = require("joi");
const express = require("express");
const logger = require("./logger");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app:${app.get("env")}`);

// CONFIGURATION
console.log('Applcation Name:'+ config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));

app.set('view engine', 'hbs')
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
// app.use(logger);
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
 console.log("Morgan Enabled...");
}

const courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
];

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
app.get("/", (req, res) => {
  res.send("Hi There!");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Wrong course");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return;
  res.status(404).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Wrong course");

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
  // .put
});

const validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
};
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).send("Invalid course id");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
