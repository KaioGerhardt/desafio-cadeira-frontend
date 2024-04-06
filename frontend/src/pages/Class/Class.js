import React, { useState, useEffect } from 'react';
import './Class.css';
import HoursInputMask from '../../mask/HoursInputMask';
import axios from 'axios';
import config from '../../config';
import SideBar from '../../Component/Sidebar/Sidebar';

const Class = () => {
    const [name, setName] = useState('');
    const [hoursOffered, setHoursOffered] = useState('');
    const [dayOffered, setDayOffered] = useState('');
    const [limitStudents, setLimitStudents] = useState('');
    const [classesDataBase, setClassesDataBase] = useState([]);
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${config.backendUrl}/new-class`, { name, hoursOffered, dayOffered, limitStudents });
        console.log(response);

    };

    const handleHorasChange = (novaHoras) => {
        setHoursOffered(novaHoras);
    };

    useEffect(() => {


        const redirected = localStorage.getItem('redirected');
        if (redirected != "class") {
            localStorage.setItem('redirected', 'class');
            window.location.reload();
        }

        const loadClasses = async () => {
            try {
                console.log("chegou no loadClasses called");
                const classes = await axios.get(`${config.backendUrl}/classes`);
                setClassesDataBase(classes.data.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadClasses();
    }, []);

    const mountTable = () => {
        return classesDataBase.map((element, index) => {
            let dataTable = Object.fromEntries(Object.entries(element));

            return (
                <tr key={index}>
                    <td>{dataTable.className}</td>
                    <td>{dataTable.dayOffered}</td>
                    <td>{dataTable.teacherName}</td>
                    <td>{dataTable.limitStudent}</td>
                </tr>
            )
        });
    }

    return (
        <div className="container">
            <SideBar />

            <div className='content'>
                <div className="popup">
                    <div className="popup_inner">
                        <h2 style={{ textAlign: 'center' }}>Cadastro de Turmas</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nome:
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                Dia Ofertado:
                                <select value={dayOffered} onChange={(e) => setDayOffered(e.target.value)}>
                                    {diasDaSemana.map((dia, index) => (
                                        <option key={index} value={index + 1}>{dia}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Hora ofertada:
                                <HoursInputMask id="horas" value={hoursOffered} onChange={handleHorasChange} />
                            </label>
                            <label>
                                Limite de Estudantes:
                                <input type="number" value={limitStudents} onChange={(e) => setLimitStudents(e.target.value)} />
                            </label>
                            <label>
                                Professor Regente:
                                <input type="number" value={limitStudents} onChange={(e) => setLimitStudents(e.target.value)} />
                            </label>
                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='content'>
                <div className="popup">
                    <div className="popup_inner">
                        <h2 style={{ textAlign: 'center' }}>Turmas Cadastradas</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Dia da Semana</th>
                                    <th>Nome do Professor</th>
                                    <th>Limite de Estudantes</th>
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
};

export default Class;