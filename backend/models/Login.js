const db = require('../db/sqliteConnect')
const bcrypt = require('bcrypt');

class LoginModel {

    async login(body) {
        try {
            const user = await db.get(
                "SELECT * FROM login WHERE email = ? AND password = ?", [body.email, body.password]
            );

            if(user != undefined) {
                return {message: 'success', authentication: true, user: user, code: 200};
            }else{
                return {message: 'access denied', authentication: false, code: 401};
            }
        } catch (error) {
            return {message: 'error', authentication: false, code: 500}
        }
    }

    async create(){
        try{

        }catch(error){
            return {message: 'error', create: false, code: 500}
        }
    }

    async encryptPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(password, salt);

            return hashedPassword;
        } catch (error) {
            throw new Error('Erro ao encriptar a senha');
        }
    }

    async comparePasswords(plainPassword, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

            return isMatch;
        } catch (error) {
            throw new Error('Erro ao comparar as senhas');
        }
    }

}

module.exports = LoginModel;