const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Genre } = require("../models/genre");
const { Movie } = require("../models/movie");

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort("name");
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send(error.details[0].message);
  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = movie.save();
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.genreId,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The  genre with the given ID was not found");
  res.send(genre);
});
router.delete("/:id", async (req, res) => {
  const genre = Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The  genre with the given ID was not found");
});
module.exports = router