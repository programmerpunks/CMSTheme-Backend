const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const TemplateSchema = new mongoose.Schema({
  title:{
    type: String
  }, 
  description:{
    type: String
  }, 
  images: {
    type: Array
  },
  contact:{
    type: Object
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