require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();
const morgan = require("morgan");
const Person = require("./models/person");
const person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("req-body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  } else {
    return "";
  }
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - :req-body"
  )
);
/*
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
*/

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});
/*
app.get("/info", (request, response) => {
  
  Person.find({}).then((persons)=>{
  const quantity = persons.length;
  const horaActual = new Date().toUTCString();
  const responseHTML = `
  <p>Phonebook has info for ${quantity} people<p>
  <p>${horaActual}<p>`;
  response.send(responseHTML)});
});
*/

/*
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
*/

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});
/*
app.post("/api/persons", (request, response) => {
  const person = request.body;
  const { name, number } = person;

  if (!name || !number) {
    return response.status(400).json({ error: "Missing name or number" });
  }

  const newPerson = { name, number };
  newPerson.id = Math.trunc(Math.random() * 10000);
  persons = persons.concat(newPerson);
  response.status(201).json(newPerson);
});
*/

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: "Missing name or number" });
  }

  const person = new Person({
    name,
    number,
  });

  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });
});

app.put("/api/persons", (request, response) => {
  const newPerson = request.body;
  const { name, number } = newPerson;

  if (!name || !number) {
    return response.status(400).json({ error: "Missing name or number" });
  }

  persons = persons.map((item) => {
    if (item.id === newPerson.id) {
      return newPerson;
    } else {
      return item;
    }
  });
  response.status(201).json(newPerson);
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
