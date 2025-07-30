const validateSchema = function ({ schema }) {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(401)
        .json({ msg: `Validation Error - Joi`, error: error });
    }
    next();
  };
};

export default validateSchema;
