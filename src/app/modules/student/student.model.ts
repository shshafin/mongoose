import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import {
  // StudentMethods,
  StudentModel,
  // StudentModels,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentName,
} from "./student.interface";
import config from "../../config";

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: "String",
    trim: true,
    required: [true, "First name is required"],
    maxlength: [20, "First name can not be more than 20 characters"],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

    //     return firstNameStr === value;
    //   },
    //   message: "{VALUE} should start with capital letter",
    // },
  },
  middleName: { type: "String", trim: true },
  lastName: {
    type: "String",
    trim: true,
    required: [true, "Last name is required"],
  },
});

const guardianNameSchema = new Schema<TGuardian>({
  fatherName: {
    type: "String",
    trim: true,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: "String",
    trim: true,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: "String",
    trim: true,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: "String",
    trim: true,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: "String",
    trim: true,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: "String",
    trim: true,
    required: [true, "Mother's contact number is required"],
  },
});

const localGuardianNameSchema = new Schema<TLocalGuardian>({
  name: {
    type: "String",
    trim: true,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: "String",
    trim: true,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: "String",
    trim: true,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: "String",
    trim: true,
    required: [true, "Local guardian's address is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: "String",
      trim: true,
      required: [true, "Student ID is required"],
      unique: true,
    },
    password: {
      type: "String",
      trim: true,
      required: [true, "Password is required"],
      maxlength: [20, "Password cannot be more than 20 characters"],
    },
    name: {
      type: studentNameSchema,
      required: [true, "Student name is required"],
    },
    gender: {
      type: "String",
      trim: true,
      enum: {
        values: ["female", "male", "other"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: "String", trim: true },
    email: {
      type: "String",
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    contactNo: {
      type: "String",
      trim: true,
      unique: true,
      required: [true, "Contact number is required"],
    },
    emergencyContactNo: {
      type: "String",
      trim: true,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: "String",
      trim: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
      type: "String",
      trim: true,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: "String",
      trim: true,
      required: [true, "Permanent address is required"],
    },
    guardian: guardianNameSchema,
    localGuardian: localGuardianNameSchema,
    profileImg: { type: "String", trim: true },
    isActive: {
      type: "String",
      trim: true,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual
studentSchema.virtual("FullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// middleware : Pre
studentSchema.pre("save", async function (next) {
  // hash password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// middleware : Post
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// studentSchema.methods.isUserExists = async function (id) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// query middleware
studentSchema.pre("find", async function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});
studentSchema.pre("findOne", async function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// model
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
