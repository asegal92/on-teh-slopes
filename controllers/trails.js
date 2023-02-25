const express = require('express')
const trails = express.Router()
const Trail = require('../models/trails.js')
const trailsSeed = require('../seedData/data.js')
const isAuthenticated = require('../utils/middleware.js')

trails.use(isAuthenticated)

trails.get('/', (req, res) => {
  // res.render('index.ejs')
  Trail.find((err, trails) => {
    if(err){
      console.log(err, ': ERROR IN INDEX ROUTE QUERY')
    } else {
      console.log(trails)
      res.render('index.ejs', {
        trails: trails,
        currentUser: req.session.currentUser
      })
    }
  })
})

trails.get('/new', isAuthenticated, (req, res) => {
  res.render('new.ejs', {
    currentUser: req.session.currentUser
  })
})

trails.get('/seed', (req, res) => {
  Trail.create(trailsSeed, (err, data) => {
    if(err){
      console.log(err, ': ERROR AT SEED ROUTE')
    } else {
      console.log('DATABASE SEEDED SUCCESSFULLY')
      res.redirect('/trails')
    }
  })
})

trails.get('/:id', (req, res) => {
  // res.render('show.ejs')
  Trail.findById(req.params.id, (err, foundTrail) => {
    if(err){
      console.log(err, ': ERROR AT TRAILS SHOW ROUTE')
    } else {
      console.log(foundTrail, ': SUCCESS, FOUND TRAILS FOR SHOW ROUTE')
      res.render('show.ejs', {
        trail: foundTrail,
        currentUser: req.session.currentUser
      })
    }
  })
})

trails.get('/:id/edit', (req, res) => {
  Trail.findById(req.params.id, (err, foundTrail) => {
    if(err){
      console.log(err, ' - ERROR WITH EDIT GET ROUTE')
    } else {
      res.render(
        'edit.ejs',
        {
          trail: foundTrail,
          currentUser: req.session.currentUser
        }
      )
    }
  })
})

trails.post('/', (req, res) => {
  console.log(req.body)
  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }

  Trail.create(req.body, (err, createdTrail) => {
    if(err){
      console.log(err)
      res.send(err)
    } else {
      // res.send(createdTrail)
      res.redirect('/trails')
    }
  })
})

trails.delete('/:id', (req, res) => {
  Trail.findByIdAndDelete(req.params.id, (err, data) => {
    if(err){
      console.log(err, ' - ERROR AT DELETE ROUTE')
    } else {
      res.redirect('/trails')
    }
  })
})

trails.put('/:id', (req, res) => {
  if(req.body.open === 'on'){
    req.body.open = true
  } else {
    req.body.open = false
  }
  Trail.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedTrail) => {
    if(err){
      console.log(err, ' - ERROR AT PUT ROUTE')
    } else {
      res.redirect('/trails')
    }
  })
})

module.exports = trails