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
        <div className="container">
            <div className="content">
                <div className="popup">
                    <div className="popup_inner">
                        <h2 style={{ textAlign: 'center' }}>Cadastro de Professores</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                name:
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                Email:
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>
                            <label>
                                Senha Inicial:
                                <input type="password" value={initialPassword} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
                <div className='content'>
                <div className="popup">
                    <div className="popup_inner">
                        <h2 style={{ textAlign: 'center' }}>Professores Cadastradas</h2>

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
            </div>
            </div>
        </div>
    );
}

export default Teacher;