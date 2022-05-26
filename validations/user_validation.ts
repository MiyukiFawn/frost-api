import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required(),
  firstName: Joi.string().alphanum().min(3).max(56).required(),
  lastName: Joi.string().alphanum().min(3).max(56).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  password_confirm: Joi.string().valid(Joi.ref("password")).required(),
}).options({ abortEarly: false });

function validate(data: object): true | string {
    const { error } = schema.validate(data);
    if ( error ) return error.message;
    return true;
}

export = validate;