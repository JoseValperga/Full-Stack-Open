const express = require("express");
const app = express();
require("dotenv").config();

const Person = require("./models/person");

app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    console.log("Error", error.errors)
    return response.status(400).json({ error: error.name });
  }
  next(error);
};

const cors = require("cors");
app.use(cors());
app.use(requestLogger);
app.use(express.json());

const morgan = require("morgan");
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      const quantity = persons.length;
      const horaActual = new Date().toUTCString();
      const responseHTML = `
    <p>Phonebook has info for ${quantity} people<p>
    <p>${horaActual}<p>`;
      response.send(responseHTML);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;
 
  if (!name || !number) {
    return response.status(400).send({ error: "Missing name or number" });
  }
  
  const person = new Person({ name, number });

  person
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons", (request, response, next) => {
  const newPerson = request.body;
  const { name, number, id } = newPerson;

  if (!name || !number) {
    return response.status(400).send({ error: "Missing name or number" });
  }

  const person = { name, number };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);