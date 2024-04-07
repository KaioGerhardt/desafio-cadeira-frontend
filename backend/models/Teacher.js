const db = require('../db/sqliteConnect')

class TeacherModel {

    async get(body) {
        try{
            let data = null;

            const teachers = await db.all(
                `SELECT
                    user.name,
                    login.email,
                    GROUP_CONCAT(IFNULL(class.name, 'Não vinculado')) as classesName
                FROM user
                INNER JOIN login
                    ON login.idUser = user.idUser
                LEFT JOIN classTeacher
                    ON classTeacher.FK_idUser = user.idUser
                LEFT JOIN class
                    ON class.idClass = classTeacher.FK_idClass
                WHERE
                    user.type = 'TEACHER'
                GROUP BY user.idUser`, []
            );

            if(teachers != null || teachers != undefined){
                return {code: 201, data: teachers};
            }else{
                return {code: 201, data: null, message: "Nenhum aluno encontrado."};
            }
        }catch(error){
            return {code: 500, message: "error", errorMessage: error};
        }
    }
}

module.exports = TeacherModel;