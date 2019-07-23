const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const userRouter = require('./route/users');
const session = require('express-session');
const cors = require('cors');
const KnexSessionStore = require('connect-session-knex')(session);

const server = express();

const store = new KnexSessionStore({
    knex: require('./data/dbConfig'),
    tablename: 'session',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1 * 24 * 60 * 60 * 1000
});

const sessionConfig = {
    name: 'user session',
    secret: 'dont tell',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store
}
server.use(helmet());
server.use(logger('dev'));
server.use(cors());
server.use(session(sessionConfig));
server.use(express.json());
server.use('/api/users', userRouter)

module.exports = server;