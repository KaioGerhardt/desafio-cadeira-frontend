const db = require('../db/sqliteConnect')

class StudentModel {

    async get(body) {
        try{
            const students = await db.get(
                `SELECT *
                FROM student`, []
            );
            
            if(students != null || students != undefined) {
                return {code: 201, data: students};
            }else{
                return {code: 201, data: null, message: "Nenhum aluno encontrado."};
            }

        }catch(error){
            return {code: 500, message: "error", errorMessage: error};
        }
    }

    async getWithClass(body) {
        try{
            const students = await db.get(
                `SELECT *
                FROM student
                LEFT JOIN enrollment 
                    ON enrollment.FK_idStudent = student.idStudent
                LEFT JOIN class
                    ON class.idClass = enrollment.FK_idClass`, []
            );
            
            if(students != null || students != undefined) {
                return {code: 201, data: students};
            }else{
                return {code: 201, data: null, message: "Nenhum aluno encontrado."};
            }

        }catch(error){
            return {code: 500, message: "error", errorMessage: error};
        }
    }

}

module.exports = StudentModel;