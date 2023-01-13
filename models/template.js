const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const TemplateSchema = new mongoose.Schema({
  title:{
    type: String,
    match: [
      /^[A-Za-z0-9 ]{0,50}$/,
      'Special characters not allowed',
    ]}, 
  description:{
    type: String,
    match: [
      /^[A-Za-z0-9 ]{0,50}$/,
      'Special characters not allowed',
    ]
  }, 
  images: {
    type: Array,
    match: [
      /^[A-Za-z0-9 ]{0,50}$/,
      'Special characters not allowed',
    ]
  },
  contact:{
    type: Object,
    match: [
      /^[A-Za-z0-9 ]$/,
      'Special characters not allowed',
    ]
  },
  social:{
    type: Array
  },
  team:{
    type: Array
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
}, {timestamps: true})

const TemplateModel = mongoose.model('templates', TemplateSchema, 'Template')

module.exports = TemplateModel