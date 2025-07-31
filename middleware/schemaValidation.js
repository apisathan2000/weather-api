const validateSchema = function ({ schema }) {
  return function (req, res, next) {
    // First check whether the body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        source: "Payload Validation",
        message: "Request body cannot be empty.",
      });
    }

     // Validate with Joi options for better error catching
    const { error } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      return res
        .status(400)
        .json({
          source: `Payload validation`,
          msg: `Validation Error - Joi`,
          error: error.details[0].message,
        });
    }

 
      next();
  
  };
};

export default validateSchema;
