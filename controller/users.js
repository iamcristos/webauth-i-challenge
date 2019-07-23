const db = require('../model/users');
const bcrypt = require('bcrypt');
const response = require('../helpers/response');

const hash = require('../helpers/hash');

module.exports = {
    async registerUser(req,res) {
        const {body} = req;
            try {
                // body.password = await hash.hash(body.password)
                body.password = await bcrypt.hashSync(body.password, 12)
                const user = await db.registerUser(body)
                return response.successHandler(res, 201, user)
            } catch (error) {
                return response.errorHandler(res, 500, "Error cannot register")
            }
    },

    loginUser(req,res) {
        req.session.user = req.user
        return response.successHandler(res, 200, `welcome ${req.user}`)
    },

    async getUser(req, res) {
        try {
            const user = await db.getUser()
            return response.successHandler(res, 200, user)
        } catch (error) {
            return response.errorHandler(res, 500, "Error cannot get users")
        }
    },

    async logoutUser(req, res) {
        if(req.session) {
            req.session.destroy(err =>{
                if(err) {
                    return response.errorHandler(res, 400, "You cant logout at the momment")
                }
                return response.successHandler(res, 200, "Logout sucessful")
            })
        } else{
            return response.errorHandler(res, 400, "You were never logged in")
        }
    }
}