const mongoose = require("mongoose");
const express = require("express");
const app = express();

const eventRouter = require("./routes/events");
const userRouter = require("./routes/users");
const customerRouter = require("./routes/customers");
const categoryRouter = require("./routes/eventCategories");
const registrationRouter = require("./routes/eventRegistration");

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/customers", customerRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/eventRegistration", registrationRouter);

mongoose
  .connect("mongodb://localhost/ngoEventsdemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected successfully"))
  .catch((err) => console.log(err));

const port = 9000;

app.listen(port, console.log("listening to port 9000"));
