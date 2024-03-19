const express  = require('express');

const studentController = require('../controller/studentController')
const router = express.Router();


router.post('/addStudent', studentController.addStudent);
router.get("/getAllstudent", studentController.getAllStudents);
router.get("/getOneStudent/:id", studentController.getOneStudent);
router.patch("/updateStudent/:id", studentController.updateStudent);




module.exports = router
