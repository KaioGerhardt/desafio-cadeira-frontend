const db = require('../db/sqliteConnect')

class TeacherModel {

    async get(body) {
        try{
            let data = null;

            const teachers = await db.get(
                `SELECT *
                FROM teacher
                LEFT JOIN classTeacher
                    ON classTeacher.FK_idTeacher = teacher.idTeacher
                LEFT JOIN class
                    ON class.idClass = classTeacher.FK_idClass`, []
            );

            if(teachers != null || teachers != undefined){
                return {code: 201, data: teachers};
            }else{
                return {code: 201, data: null, message: "Nenhum aluno encontrado."};
            }
            

            return {code: 201, data: data};
        }catch(error){
            return {code: 500, message: "error", errorMessage: error};
        }
    }
}

module.exports = TeacherModel;