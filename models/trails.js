const mongoose = require('mongoose')

const trailSchema = new mongoose.Schema({
  name: {type: String, required: true},
  difficulty: {type: String , required: true},
  open: Boolean,
  groomed: Boolean
})

const Trail = mongoose.model('Trail', trailSchema)

module.exports = Trail