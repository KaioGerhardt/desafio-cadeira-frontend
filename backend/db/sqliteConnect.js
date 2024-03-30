const sqlite3 = require('sqlite3').verbose();

class sqliteConnect {
    constructor(database) {
        this.db = new sqlite3.Database(database, err => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err.message);
            } else {
                console.log('Conexão bem-sucedida ao banco de dados');
            }
        });
    }

    close() {
        this.db.close(err => {
            if (err) {
                console.error('Erro ao fechar o banco de dados:', err.message);
            } else {
                console.log('Conexão com o banco de dados encerrada');
            }
        });
    }

    run(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    console.error('Erro ao executar a consulta:', err.message);
                    reject(err);
                } else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
        });
    }

    get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, row) => {
                if (err) {
                    console.error('Erro ao executar a consulta:', err.message);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    console.error('Erro ao executar a consulta:', err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

const db = new sqliteConnect('database.sqlite');
module.exports = db;