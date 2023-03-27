const { body, validationResult } = require("express-validator");
exports.validate = (method) => {
  switch (method) {
    case "signin": {
      return [
        body("email", "There should be a proper valid email")
          .exists()
          .isEmail()
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
        (req, res, next) => {
          let errors = validationResult(req);

          if (!errors.isEmpty()) {
            errors = errors.array().map((error) => {
              return error.msg;
            });
            return res.status(400).json({ message: false, errors });
          }
          next();
        },
      ];
    }
  }
};
