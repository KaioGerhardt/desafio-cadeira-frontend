// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css';
import config from '../../config';

function Student() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [initialPassword, setPassword] = useState('');
    const [classesDataBase, setClassesDataBase] = useState([]);
    const [entityUser, setEntityUser] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${config.backendUrl}/register`, { name, email, perfil: "STUDENT", initialPassword });
        console.log(response);

        // onClose();
    };

    useEffect(() => {

        const loadStudents = async () => {
            try {
                const students = await axios.get(`${config.backendUrl}/students`);
                setClassesDataBase(students.data.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadStudents();

        setEntityUser(localStorage.getItem('entityUser'));
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
        <div>
            {
                entityUser === "ADMIN" &&            
                <div className="popup">
                    <div className="popup_inner">
                        <h3 style={{ textAlign: 'center' }}>Cadastro de Usuários</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Senha Inicial" value={initialPassword} onChange={(e) => setPassword(e.target.value)} />
                            <div className="buttonDiv">
                                <button className="submitButton" type="submit">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
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
    );
}

export default Student;