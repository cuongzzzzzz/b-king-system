const joi = require("joi");

const schemaObject = {
  username: joi.string().required().messages({
    "string.empty": "Tên không được để trống",
    "any.required": 'Trường "Tên" là bắt buộc',
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": 'Trường "Email" là bắt buộc',
    "string.email": "Email không đúng định dạng",
  }),
  password: joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Mật khẩu không khớp",
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường repasswordlà bắt buộc",
  }),
  phoneNumber: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Giá trị phải là số điện thoại hợp lệ",
      "string.empty": "Trường không được để trống",
      "any.required": "Trường là bắt buộc",
    }),
};

const { username, phoneNumber, confirmPassword, password, email } =
  schemaObject;

const registerSchema = {
  username,
  phoneNumber,
  password,
  email,
  confirmPassword,
};
const loginSchema = {
  email,
  password,
};

const validateInput = (schemaObject, validateObject) => {
  return joi
    .object(schemaObject)
    .validate(validateObject, { abortEarly: false });
};

module.exports = { registerSchema, loginSchema, validateInput };
