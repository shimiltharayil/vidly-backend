const express = require("express");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("name");
  res.send(rentals);
});
router.post("/", async (req, res) => {
  const { error } = await validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");
  if (movie.numberInStock === 0) return res.status(400).send("Invalid Movie");
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = {
  router,
};
