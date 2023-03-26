const { body, validationResult } = require("express-validator");
exports.validate = (method) => {
  switch (method) {
    case "signin": {
      return [
        body("email", "there should be a proper valid email")
          .exists()
          .isEmail()
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
        body(
          "password",
          "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case. And one digit"
        )
          .exists()
          .isLength({ min: 8 })
          .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
        (req, res, next) => {
          let errors = validationResult(req);

          if (!errors.isEmpty()) {
            errors = errors.array().map((error) => {
              return error.msg;
            });
            return res.status(202).json({ message: false, errors });
          }
          next();
        },
      ];
    }
  }
};
