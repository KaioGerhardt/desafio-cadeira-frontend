const db = require('../db/sqliteConnect')

class ClassModel {

    async create(body) {
        try{
            const classes = await db.run(
                `INSERT INTO class (name, dayOffered, hourOffered, limitStudent)    
                VALUES (?, ?, ?, ?)`, [body.name, body.dayOffered, body.hoursOffered, body.limitStudents]
            );

            const classTeacher = await db.run(
                `INSERT INTO classTeacher (FK_idClass, FK_idUser)
                VALUES (?, ?)`, [classes.lastID, body.regentTeacher]
            );

            return {code: 201, created: true};
        }catch(error){
            return {code: 500, message: "error", errorMessage: error, created: false};
        }
    }

    async get(body) {
        try{
            const classes = await db.all(
                `SELECT 
                    class.name as className,
                    class.dayOffered,
                    class.hourOffered,
                    class.limitStudent,
                    user.name as teacherName
                FROM class 
                INNER JOIN classTeacher
                    ON classTeacher.FK_idClass = class.idClass
                INNER JOIN user
                    ON user.idUser = classTeacher.FK_idUser
                    AND user.type = 'TEACHER'`, []
            );

            if(classes != undefined) {
                return {message: 'success',  data: classes, code: 200};
            }else{
                return {message: 'Nenhuma turma encontrada!', code: 200};
            }

        }catch(error){
            return {code: 500, message: "error", errorMessage: error};
        }
    }
    
}

module.exports = ClassModel;