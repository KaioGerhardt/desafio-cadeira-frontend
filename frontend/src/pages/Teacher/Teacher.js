import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

function Teacher() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [initialPassword, setPassword] = useState('');
    const [classesDataBase, setClassesDataBase] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${config.backendUrl}/register`, { name, email, perfil : "TEACHER", initialPassword });
        console.log(response);

        // onClose();
    };

    useEffect(() => {

        const loadTeachers = async () => {
            try {
                const classes = await axios.get(`${config.backendUrl}/teachers`);
                setClassesDataBase(classes.data.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadTeachers();
    }, []);

    const mountTable = () => {
        return classesDataBase.map((element, index) => {
            let dataTable = Object.fromEntries(Object.entries(element));

            return (
                <tr key={index}>
                    <td>{dataTable.name}</td>
                    <td>{dataTable.email}</td>
                    <td>{dataTable.classesName}</td>
                </tr>
            )
        });
    }

    return (
        <div className="popup-container">
            <div className="popup">
                <h3 style={{ textAlign: 'center' }}>Cadastro de Professores</h3>
                <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Senha Inicial" value={initialPassword} onChange={(e) => setPassword(e.target.value)} />
                        <div className="buttonDiv">
                            <button className="submitButton" type="submit">Cadastrar</button>
                        </div>
                </form>
            </div>
            <div className="popup-list">
                <h3 style={{ textAlign: 'center' }}>Professores Cadastrados</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Turmas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mountTable()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Teacher;