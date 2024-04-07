// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

function Enroll() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [perfil, setPerfil] = useState('');
    const [initialPassword, setPassword] = useState('');
    const [classesDataBase, setClassesDataBase] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const response = await axios.post(`${config.backendUrl}/register`, { name, email, perfil, initialPassword });
        // console.log(response);

        // onClose();
    };

    useEffect(() => {

        const loadStudents = async () => {
            try {
                const students = await axios.get(`${config.backendUrl}/students`);
                console.log("data request ", students.data.data);
                setClassesDataBase(students.data.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadStudents();
    }, []);

    const mountTable = () => {
        return classesDataBase.map((element, index) => {
            let dataTable = Object.fromEntries(Object.entries(element));
            console.log('data table ', dataTable);

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
                        <h2 style={{ textAlign: 'center' }}>Cadastro de Alunos</h2>
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
                                Perfil:
                                <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
                                    <option value="0">Selecione</option>
                                    <option value="teacher">Professor</option>
                                    <option value="student">Estudante</option>
                                </select>
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
                            <h2 style={{ textAlign: 'center' }}>Alunos Cadastradas</h2>

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

export default Enroll;