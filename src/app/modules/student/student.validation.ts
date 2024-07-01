import { z } from "zod";

const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(20, { message: "First name can not be more than 20 characters" }),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(1, { message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, { message: "Father's contact number is required" }),
  motherName: z
    .string()
    .trim()
    .min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .trim()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .trim()
    .min(1, { message: "Mother's contact number is required" }),
});

// LocalGuardian Schema
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's name is required" }),
  occupation: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's contact number is required" }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's address is required" }),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, { message: "Student ID is required" })
    .refine((val) => val !== "", { message: "Student ID must be unique" }),
  password: z.string().max(20),
  name: studentNameValidationSchema,
  gender: z.enum(["female", "male", "other"], {
    message: "{VALUE} is not a valid gender",
  }), // Enum validation

  dateOfBirth: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: "Contact number is required" })
    .refine((val) => val !== "", {
      message: "Contact number must be unique",
    }),
  emergencyContactNo: z
    .string()
    .trim()
    .min(1, { message: "Emergency contact number is required" }),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z
    .string()
    .trim()
    .min(1, { message: "Present address is required" }),
  permanentAddress: z
    .string()
    .trim()
    .min(1, { message: "Permanent address is required" }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().trim().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDelete: z.boolean().default(false),
});

export default studentValidationSchema;
