const db = require('../db/sqliteConnect')

class ClassModel {

    async create(body) {
        try{

            

            return {code: 201, created: true};
        }catch(error){
            return {code: 500, message: "error", errorMessage: error, created: false};
        }
    }
}

module.exports = ClassModel;