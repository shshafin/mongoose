import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDb = async (studentData: TStudent) => {
  // static custom instance method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error(
      `ID:${studentData.id} & Name: ${studentData.name.firstName} is already exists. please rename it`
    );
  }

  const result = await Student.create(studentData); //built in static method

  // const student = new Student(studentData); // built in instance method

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error(
  //     `ID:${studentData.id} & Name: ${studentData.name.firstName} is already exists`
  //   );
  // }

  // const result = await student.save();

  return result;
};
const getAllStudentData = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentData = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentData = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDelete: true });
  return result;
};

export const studentService = {
  createStudentIntoDb,
  getAllStudentData,
  getSingleStudentData,
  deleteStudentData,
};
