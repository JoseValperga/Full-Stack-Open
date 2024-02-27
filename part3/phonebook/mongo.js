const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

if (process.argv.length === 4) {
  console.log("give password AND number");
  process.exit(1);
}

if (process.argv.length > 5) {
  console.log("too many arguments");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://josevalperga:${password}@cluster0.uv5lgde.mongodb.net/phonebook?retryWrites=true&w=majority`;
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
const Person = mongoose.model("Person", personSchema);

mongoose.set("strictQuery", false);
mongoose.connect(url);

if (process.argv.length === 3) {
  console.log("phonebook :");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({ name, number });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
