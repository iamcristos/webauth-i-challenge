const db = require('../data/dbConfig');

module.exports = {
    getUser(id) {
        if (id) {
            return db('users')
                    .where({id})
                    .first()
        }
        return db('users')
                .select('username')
    },

    registerUser(user) {
        return db('users')
                .insert(user)
                .then(([ids])=> ids ? this.getUser(ids): null)
    },

    loginUser(username) {
        return db('users')
                .where({username})
                .first()
                .then(user=> user ? user : null)
    },
}