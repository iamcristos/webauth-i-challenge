const response = require('../helpers/response');
const db = require('../model/users');
const bcrypt = require('bcrypt');

module.exports = {
    validateBody(req, res, next) {
        const {body} = req;
        if (!Object.keys(body).length) {
            return response.errorHandler(res, 400, "Invalid body")
        }
        if(!body.username || !body.password) {
            return response.errorHandler(res, 400, "username and password are required")
        }
        next()
    },

    async validateUsername(req, res, next) {
        const {username} = req.body;
        try {
            const user = await db.loginUser(username)
            if(user) {
                return response.errorHandler(res, 400, "User already exists")
            }
        } catch (error) {
            return response.errorHandler(res, 500, "Error")
        }
    },

    async validatePassword(req, res, next) {
        const {body} = req;
        try {
            const user = await db.loginUser(body.username)
            if(!user) {
                return response.errorHandler(res, 404, "Invalid username")
            }
            const result = await bcrypt.compareSync(body.password, user.password)
            if(!result) {
                return response.errorHandler(res, 401, 'Invalid credentials')
            }
            req.user = user.username
        } catch (error) {
            return response.errorHandler(res, 500, "Error login")
        }
    },

    async getUsers(req, res, next) {
        const {username, password} = req.headers;
        if(!username || !password) {
            return response.errorHandler(res, 400, "Invalid token")
        }
        const user = await db.loginUser(username);
        if(user && bcrypt.compareSync(password, user.password)) {
            next()
        }else {
            return response.errorHandler(res, 401, "Unathorized")
        }
    }
}