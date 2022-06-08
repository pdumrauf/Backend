const middlewareProductValidator = (req, res, next) => {

    if(!req.body.name || !req.body.price) {
        console.log('Invalid request')
        return res.status(400).json({
            error: 'Incomplete body'
        })
    }

    return next()
}

const middlewareCheckAdmin = (req, res, next) => {
    const isAdmin = false
    if(!isAdmin) {
        return res.status(400).json({
            error: -1,
            description: `Rout products${req.path} method ${req.method} not authorized`
        })
    }

    return next()
}

module.exports = { middlewareProductValidator, middlewareCheckAdmin }