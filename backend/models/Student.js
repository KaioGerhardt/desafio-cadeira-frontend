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
            const students = await db.all(
                `SELECT
                    login.email,
                    user.name,
                    GROUP_CONCAT(IFNULL(class.name, 'Não vinculado')) as classesName
                FROM user
                INNER JOIN login
                    ON login.idUser = user.idUser
                LEFT JOIN enrollment 
                    ON enrollment.FK_idUser = user.idUser
                LEFT JOIN class
                    ON class.idClass = enrollment.FK_idClass
                WHERE
                    user.type = 'STUDENT'
                GROUP BY user.idUser`, []
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