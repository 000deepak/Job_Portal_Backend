import Joi from 'joi';

export const signupValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(2).max(20).required(),

    lastName: Joi.string().alphanum().min(2).max(20).required(),

    email: Joi.string().email().required(),

    password: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const signinValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

//reset password
export const passwordValidator = (req, res, next) => {
  const schema = Joi.object({
    confirmPassword: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
  });
  const { error, value } = schema.validate({
    confirmPassword: req.body.confirmPassword
  });
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

//forgot password
export const emailValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

//candidate details
export const canValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    lastName: Joi.string()
      .min(2)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    email: Joi.string().email().required(),

    gender: Joi.string().required(),

    education: Joi.string().required(),

    experience: Joi.number().required(),

    expectedCTC: Joi.number().required(),

    skills: Joi.string().allow(null, '')
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

//job details
export const jobValidator = (req, res, next) => {
  const schema = Joi.object({
    companyName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    postName: Joi.string()
      .min(2)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    location: Joi.string().required(),

    type: Joi.string().required(),

    hremail: Joi.string().email().allow(null, ''),

    gender: Joi.string().required(),

    education: Joi.string().required(),

    experience: Joi.number().required(),

    salary: Joi.number().required(),

    skills: Joi.string().allow(null, '')
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
