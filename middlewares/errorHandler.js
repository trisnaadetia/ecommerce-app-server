function errorHandler(err, req, res, next) {
    if(err.name === 'invalid token') {
        res.status(401).json({ message: 'invalid token' })
    } else if(err.name === 'required access_token') {
        res.status(401).json({ message: 'required access_token' })
    } else if(err.name === 'error not found') {
        res.status(404).json({ message: 'error not found' })
    } else if(err.name === 'unauthorized') {
        res.status(401).json({ message: 'unauthorized' })
    } else if(err.name === 'invalid password or email') {
        res.status(400).json({ message: 'invalid password or email' })
    } else if(err.name === 'invalid password') {
        res.status(400).json({ message: 'invalid password' })
    } else if(err.name === 'email and password must be required') {
        res.status(400).json({ message: 'email and password must be required' })
    } else if(err.name === 'out off stock') {
        res.status(400).json({ message: 'out off stock' })
    } else if(err.name === 'SequelizeValidationError') {
        let listError = []
        err.errors.forEach(element => {
            listError.push(element.message)
        })
        res.status(400).json({ message: listError })

    } else {
        res.status(500).json({ message: err.message || 'internal server error' })
    }
}

module.exports = errorHandler