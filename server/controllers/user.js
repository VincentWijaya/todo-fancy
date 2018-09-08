const User = require('../models/User')
const jwt = require('jsonwebtoken')
const axios = require('axios')

class Controller {
  
  static login(req, res) {
    axios({
      method: 'get',
      url: `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.token_fb}`
    })
      .then(response => {
        
        User.find({email: response.data.email})
          .then(user => {
            if (user.length > 0) {
              let token = jwt.sign({id : user[0]._id, role : user[0].role}, process.env.JWT_SECRET)
                            
              res.status(200).json({
                message: 'Log in success!',
                token
              })
            } else {
              let obj = {
                fbId: response.data.id,
                name: response.data.name,
                email: response.data.email          
              }
              
              User.create(obj)
                .then(newUser => {
                  let token = jwt.sign({id : newUser._id, role : newUser.role}, process.env.JWT_SECRET)
                    
                  res.status(201).json({
                    message: 'Log in success!',
                    token
                  })
                })
                .catch(err => {
                  res.status(500).json(err)
                })
            }
          })
          
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  
}

module.exports = Controller