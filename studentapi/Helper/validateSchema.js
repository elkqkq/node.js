const Joi = require("joi");

const authSchema = Joi.object({
    regName: Joi.string().required(),
    regEmail: Joi.string().email().lowercase().required(),
    regPassword: Joi.string().min(6).required(),
});

module.exports = {authSchema};
// const Joi = require('joi');

// const authSchema = Joi .object({
//     email: Joi.string().email().lowercase().required(),
//     password: Joi.string().min(6).required(),
// })

// const vendorValidate = Joi.object ({
//     first_name: Joi.string().required(),
//     last_name: Joi.string().required(),
//     phonenumber: Joi.number().required(),
//     email: Joi.string().email().required(),
//     address: Joi.string(),
// })


// module.exports = {authSchema, vendorValidate}