const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

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

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const quantity = persons.length;
  const horaActual = new Date().toUTCString();
  const responseHTML = `
  <p>Phonebook has info for ${quantity} people<p>
  <p>${horaActual}<p>`;
  response.send(responseHTML);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const { name, number } = person;

  if (!name || !number) {
    return response.status(400).json({ error: "Missing name or number" });
  }

  if (persons.some((existingPerson) => existingPerson.name === name)) {
    return response.status(409).json({ error: "Name must be unique" });
  }

  person.id = Math.trunc(Math.random() * 10000);
  persons.push(person);

  response.status(201).json(person);
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
