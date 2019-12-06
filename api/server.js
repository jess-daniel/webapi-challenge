const express = require('express');
const helmet = require('helmet');

const server = express();

const projectRouter = require('../routers/projectRouters');

// middlewares
server.use(helmet());
server.use(express.json());

// Routers
server.use("/api/projects", projectRouter);

module.exports = server;