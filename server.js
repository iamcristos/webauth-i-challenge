const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const userRouter = require('./route/users');

const server = express();
server.use(helmet());
server.use(logger('dev'));
server.use(express.json());
server.use('/api/users', userRouter)

module.exports = server;