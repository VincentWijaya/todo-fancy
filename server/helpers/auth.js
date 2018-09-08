const jwt = require('jsonwebtoken')

const auth = () => {
    return function (req, res, next) {
        let token = req.headers.token
        
        if (token) {
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              res.status(500).json(err)
            } else {
              if (decoded.role === 'client') {
                next()
              } else {
                res.status(401).json({error: 'Please provide a valid token'})
              }
            }
          })
        } else {
          res.status(401).json({error: 'Please provide a valid token'})
        }
    }
}

module.exports =  auth