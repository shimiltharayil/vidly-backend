const { response } = require("express");
const express = require("express");
const auth = require("../middleware/auth");
const { Customer, validate } = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});
router.post("/",auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(404).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id",auth, async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res.status(404).send("The customer with Id was not found");
    res.send(customer)
});
router.delete("/:id", auth,async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with Id was not found");
    res.send(customer);

});

module.exports = router
