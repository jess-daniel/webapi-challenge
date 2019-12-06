const express = require('express');
const helmet = require('helmet');
const server = express();

// middlewares
server.use(helmet());
server.use(express.json());

// Routers

module.exports = server;