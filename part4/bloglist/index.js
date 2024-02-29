const { PORT, MONGODB_URI } = require("./utils/config")
const express = require('express')
const app = express()
const cors = require('cors')
//const blogRoutes = require("./controllers/blogs")
const Blog = require("./models/blog")

//const midleware
const logger = require("./utils/logger")
const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

logger.info("connecting to", MONGODB_URI);
mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.info("error connecting to MongoDB:", error.message);
    });

app.use(cors())
app.use(express.static("dist"));
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})