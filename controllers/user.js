const passport = require('passport')
const jwt = require('jsonwebtoken');
const TemplateModel = require('../models/template.js');
require('../middleware/auth.js')

const login = async (req, res, next) => {
  
  passport.authenticate('login', { session: false }, async (err, user, messages) => {
    try {
      if (err || !user) {
        const error = new Error(messages.message)
        let errors = []
        errors.push(error.message)
        return res.status(202).json({ success: false, errors })
      }
      const body = { _id: user._id, email: user.email }
      const token = jwt.sign({ user: body }, process.env.SECTER_KEY)
      return res.status(202).json({ success: true, token, user, role: 'user'})

    } catch (error) {
      return next(error)
    }
  })(req, res, next);
}

const CMS = async (req, res, next) => {
  try{
    let template = await TemplateModel.find({user: req.body.user})
    if(template.length===0){
      template = await TemplateModel.create(req.body)
    }else{
      template = await TemplateModel.findByIdAndUpdate({_id: req.params.tid},req.body,{new: true})
    }
    return res.status(202).json({ success: true, template});

  } catch (error) {
  return res.status(202).json({ success: false, error: error.message });
  }
}

const fetchTemplate = async (req, res, next) => {
  try{
    let template = await TemplateModel.find({user: req.verified.user._id})
    if(template.length!==0){
    return res.status(202).json({ success: true, template});
    }else{
    return res.status(202).json({ success: false });
    }

  } catch (error) {
  return res.status(202).json({ success: false, error: error.message });
  }

}

module.exports = {login, CMS, fetchTemplate}
