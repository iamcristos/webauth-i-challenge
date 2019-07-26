const express = require('express');
const route = express.Router();
const userCntr = require('../controller/users');
const validation = require('../middleware/users');

route.post('/register',validation.validateBody, validation.validateUsername,userCntr.registerUser)
route.post('/login', validation.validatePassword, userCntr.loginUser);
route.get('/', validation.getUserSession, userCntr.getUser)

module.exports = route;

