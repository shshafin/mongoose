import Joi from "Joi";

// Joi Validation schema for StudentName
const studentNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z]/)
    .messages({
      "string.pattern.base": "First name should start with a capital letter",
      "string.max": "First name can not be more than 20 characters",
      "any.required": "First name is required",
    }),
  middleName: Joi.string().trim().allow(""),
  lastName: Joi.string().trim().required().messages({
    "any.required": "Last name is required",
  }),
});

// Validation schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    "any.required": "Father's name is required",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    "any.required": "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    "any.required": "Father's contact number is required",
  }),
  motherName: Joi.string().trim().required().messages({
    "any.required": "Mother's name is required",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    "any.required": "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().trim().required().messages({
    "any.required": "Mother's contact number is required",
  }),
});

// Validation schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Local guardian's name is required",
  }),
  occupation: Joi.string().trim().required().messages({
    "any.required": "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().trim().required().messages({
    "any.required": "Local guardian's contact number is required",
  }),
  address: Joi.string().trim().required().messages({
    "any.required": "Local guardian's address is required",
  }),
});

// Validation schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    "any.required": "Student ID is required",
  }),
  name: studentNameValidationSchema.required().messages({
    "any.required": "Student name is required",
  }),
  gender: Joi.string()
    .trim()
    .valid("female", "male", "other")
    .required()
    .messages({
      "any.only": "{#label} is not a valid gender",
      "any.required": "Gender is required",
    }),
  dateOfBirth: Joi.string().trim(),
  email: Joi.string().trim().email().required().messages({
    "any.required": "Email is required",
  }),
  contactNo: Joi.string().trim().required().messages({
    "any.required": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    "any.required": "Emergency contact number is required",
  }),
  bloodGroup: Joi.string()
    .trim()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
  presentAddress: Joi.string().trim().required().messages({
    "any.required": "Present address is required",
  }),
  permanentAddress: Joi.string().trim().required().messages({
    "any.required": "Permanent address is required",
  }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: Joi.string().trim().allow(""),
  isActive: Joi.string().trim().valid("active", "blocked").default("active"),
});

// Joi Validation

export default studentValidationSchema;
