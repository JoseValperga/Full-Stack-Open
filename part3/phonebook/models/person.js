/* eslint-disable no-undef */
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
console.log("connecting to", url);

mongoose
  .connect(url)
  // eslint-disable-next-line no-unused-vars
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 5, required: true },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{2,3}-[0-9]{8,}$/.test(v);
      },
    },
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
// eslint-disable-next-line no-unused-vars
const Person = mongoose.model("Person", personSchema);

module.exports = mongoose.model("Person", personSchema);
