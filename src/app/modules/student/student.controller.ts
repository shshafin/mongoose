import { Request, Response } from "express";
import { studentService } from "./student.service";
import studentValidationSchema from "./student.validation";
// import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);
    //   will call service function to response data
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went wrong",
    //     error: error.details,
    //   });
    // }

    // data validation using zod
    const zodValidationParsed = studentValidationSchema.parse(studentData);

    const result = await studentService.createStudentIntoDb(
      zodValidationParsed
    );

    // send request
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// GET student
const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentData();
    // send request
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// GET single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await studentService.getSingleStudentData(studentId);
    // send request
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

// delete student data
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await studentService.deleteStudentData(studentId);
    // send request
    res.status(200).json({
      success: true,
      message: "Student is deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const studentController = {
  createStudent,
  getStudent,
  getSingleStudent,
  deleteStudent,
};
