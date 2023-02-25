const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const trailsController = require('./controllers/trails.js')
const usersController = require('./controllers/users.js')
const sessionsController = require('./controllers/sessions_controller.js')

require('dotenv').config()

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use('/trails', trailsController)
app.use('/users', usersController)
app.use('/sessions', sessionsController)

// const hashedString = bcrypt.hashSync('yourStringHere', bcrypt.genSaltSync(10))
// console.log(hashedString)
// console.log(bcrypt.compareSync('yourStringHere', hashedString))

app.get('/', (req, res) => {
  res.send('This app is working')
})

app.get('/trail/new', (req, res) => {
  res.send('working!')
})

mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
  );
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

app.listen(PORT, () => {
  console.log('listening')
})