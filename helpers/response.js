module.exports = {
    errorHandler: function(res, status, message) {
        return res.status(status)
                    .json({
                        status,
                        message
                    })
    },

    successHandler: function(res, status, data) {
        return res.status(status)
                   .json({
                       status,
                       data
                   })
    }
};