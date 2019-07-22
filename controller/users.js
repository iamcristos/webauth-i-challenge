const db = require('../model/users');
const bcrypt = require('bcrypt');
const response = require('../helpers/response');

module.exports = {
    async registerUser(req,res) {
        const {body} = req;
        bcrypt.hash(body.password, 12, async function(err, hash) {
            if(err){
                return response.errorHandler(res, 400, err.message)
            }
            body.password = hash
            try {
                const user = await db.registerUser(body)
                return response.successHandler(res, 201, user)
            } catch (error) {
                return response.errorHandler(res, 500, "Error cannot register")
            }
            });
    },

    loginUser(req,res) {
        return response.successHandler(res, 200, `welcome ${req.user}`)
    },

    async getUser(req, res) {
        try {
            const user = await db.getUser()
            return response.successHandler(res, 200, user)
        } catch (error) {
            return response.errorHandler(res, 500, "Error cannot get users")
        }
    }
}