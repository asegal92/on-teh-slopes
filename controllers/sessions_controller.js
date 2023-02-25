const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})

sessions.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if(err){
      console.log(err)
      res.send('Oops, no luck, try again.')
    } else if (!foundUser){
      res.send('Oops, no luck, try again.')
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser
        res.redirect('/trails')
      } else {
        res.send('Oops, no luck, try again.')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => res.redirect('/trails'))
})

module.exports = sessions