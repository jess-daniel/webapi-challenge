const express = require('express');
const helmet = require('helmet');

const server = express();

const projectRouter = require('../routers/projectRouters');
const actionRouter = require("../routers/actionRouter");

// middlewares
server.use(helmet());
server.use(express.json());

// Routers
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;