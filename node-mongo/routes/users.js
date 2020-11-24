const express = require("express");
const router = express.Router();

const { User, validate } = require("../models/userModule");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).send("user email already exits");

  console.log(req.body.firstName);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user = await user.save();
  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    },
    { new: true }
  );
  if (!user)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(user);
});

module.exports = router;
