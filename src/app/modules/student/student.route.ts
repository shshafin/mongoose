import express from "express";
import { studentController } from "./student.controller";

const router = express.Router();

// will call controller function
router.post("/create-student", studentController.createStudent);
router.get("/", studentController.getStudent);
router.get("/:studentId", studentController.getSingleStudent);
router.delete("/:studentId", studentController.deleteStudent);

export const studentRoute = router;
