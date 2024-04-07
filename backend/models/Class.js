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

    async classesEnrolled(body) {
        try{
            const classes = await db.all(
                `SELECT 
                    class.name as className,
                    class.dayOffered,
                    class.hourOffered,
                    user.name as teacherName
                FROM class 
                INNER JOIN enrollment
                    ON enrollment.FK_idClass = class.idClass
                INNER JOIN classTeacher
                    ON classTeacher.FK_idClass = class.idClass
                INNER JOIN user
                    ON user.idUser = classTeacher.FK_idUser
                    AND user.type = 'TEACHER'
                WHERE
                    enrollment.FK_idUser = ?`, [ body.idStudent]
            );

            console.log('classes enrolled ', body.idStudent);

            if(classes != undefined) {
                return {message: 'success',  data: classes, code: 200};
            }else{
                return {message: 'Nenhuma turma encontrada!', code: 200};
            }

        }catch(error){
            return {code: 500, message: "error", errorMessage: error};
        }
    }

    async classesAvaliable(body) {
        try{
            console.log(body);
            const classes = await db.all(
                `SELECT 
                    class.name as className,
                    class.idClass,
                    class.dayOffered,
                    class.hourOffered,
                    user.name as teacherName
                FROM class
                
                INNER JOIN classTeacher
                    ON classTeacher.FK_idClass = class.idClass
                INNER JOIN user
                    ON user.idUser = classTeacher.FK_idUser
                    AND user.type = 'TEACHER'
                WHERE
                    class.idClass is not exists (
                        SELECT class.idClass from class inner join enrollment on enrollment.FK_idClass = class.idClass where enrollment.FK_idUser = ?
                    )`, [body.idStudent]
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

    async enroll(body) {
        try{
            const classes = await db.run(
                `INSERT INTO enrollment (FK_idUser, FK_idClass)
                VALUEs (?, ?)`, [body.idUser, body.idClass]
            );

            return {message: 'success',  data: classes, code: 200};

        }catch(error){
            return {code: 500, message: "error", errorMessage: error};
        }
    }
    
}

module.exports = ClassModel;