const db  = require("../model/dbConnect")
// const studentModel = require("../model/studentModel")
const students =db.students
module.exports={

    //add a student
    addStudent:async(req,res,next)=>{
        try {
            let info =  {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
            }
        
            const addStudent = await students.create(info)
            res.status(200).send(addStudent)
        } catch (error) {
            console.error(error)
            next(error) 
        }
    },
    //get  all students
    getAllStudents: async(req,res,next)=> {
        try {
            let Student = await  students.findAll( {} )
            res.status(200).send(Student)
        }catch (error){
            next(error)
        }
    },

    //get student with id
getOneStudent: async (req, res, next) => {
    try {
        let id = req.params.id; // Correct parameter access
        let Student = await students.findOne({ where: { student_id: id } });
        
        if (!students) {
            throw createError(404, "The student does not exist"); // Fix error creation syntax
        }
        res.status(200).json(Student);
    } catch (error) {
        next(error);
    }
},


    //update  a student information
    updateStudent: async(req,res,next)=>{
        try {
            let id = req.params.id
            let updateStudent = await students.update(req.body,{where:{student_id:id}});

            if(!students) {
                throw(createError(404, "The student does not exist"))
            }
            res.status(200).send(updateStudent)
        } catch (error){
            next(error)
        }
    },
  
        
}
 