function errorHandler (err, req, res, next) {
    console.log(err.stack)

    res.status(err.status || 500).send({
        success: false,
        message: err.message || 'Internal Server Error'
    })
}

module.exports = errorHandler