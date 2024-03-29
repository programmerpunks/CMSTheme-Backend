const passport = require("passport");
const jwt = require("jsonwebtoken");
const TemplateModel = require("../models/template.js");
require("../middleware/auth.js");

const login = async (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, messages) => {
      try {
        if (err || !user) {
          const error = new Error(messages.message);
          let errors = [];
          errors.push(error.message);
          console.log("ff: ", errors);
          return res.status(400).json({ errors });
        }

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
        return res.status(202).json({ token });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
};

const CMS = async (req, res) => {
  let { data } = req.body;
  try {
    let template = await TemplateModel.find({ user: req.verified.user._id });
    if (template.length === 0) {
      req.body.data.user = req.verified.user._id;
      template = await TemplateModel.create(req.body.data);
    } else {
      let { images, storedImages } = req.body.data;
      let merged = [];
      if (storedImages !== undefined) {
        if (storedImages.length !== 0) {
          images.concat(storedImages);
          merged = [...images, ...storedImages];
          data.images = merged;
        }
      }

      template = await TemplateModel.findOneAndUpdate(
        { user: req.verified.user._id },
        data,
        { new: true }
      );
    }
    return res.status(202).json({ template });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const fetchTemplate = async (req, res) => {
  try {
    let template = await TemplateModel.find({ user: req.verified.user._id });

    if (template.length !== 0) {
      return res.status(202).json({ template });
    } else {
      return res.status(202).json({ error: "Template not found" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    let template = await TemplateModel.find({ user: req.verified.user._id });
    if (template.length !== 0) {
      let { images } = template[0];
      images = images.filter((item, index) => index !== req.body.image);
      template = await TemplateModel.findByIdAndUpdate(
        { _id: template[0]._id },
        { images },
        { new: true }
      );

      return res.status(202).json({ template });
    } else {
      return res.status(400).json({ error: "Template not found" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { login, CMS, fetchTemplate, deleteImage };
