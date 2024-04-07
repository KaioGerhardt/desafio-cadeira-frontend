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
    const [regentTeacher, setRegentTeacher] = useState(0);
    const [classesDataBase, setClassesDataBase] = useState([]);
    const [teacherssDataBase, setTeachersDataBase] = useState([]);
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${config.backendUrl}/new-class`, { name, hoursOffered, dayOffered, limitStudents, regentTeacher: parseInt(regentTeacher) });
        console.log(response);

    };

    const handleHorasChange = (novaHoras) => {
        setHoursOffered(novaHoras);
    };

    useEffect(() => {

        const loadClasses = async () => {
            try {
                const classes = await axios.get(`${config.backendUrl}/classes`);
                setClassesDataBase(classes.data.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadClasses();

        const loadTeachers = async () => {
            try {
                const teachers = await axios.get(`${config.backendUrl}/teachers`);
                setTeachersDataBase(teachers.data.data);
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
                    <td>{dataTable.className}</td>
                    <td>{dataTable.dayOffered}</td>
                    <td>{dataTable.teacherName}</td>
                    <td>{dataTable.limitStudent}</td>
                </tr>
            )
        });
    }

    const mountOptionsTeacher = () => {
        return teacherssDataBase.map((element, index) => {
            let teacher = Object.fromEntries(Object.entries(element));

            return (
                <option key={index} value={teacher.idUser}>{teacher.name}</option>
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
                                        <option key={index} value={dia}>{dia}</option>
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
                                <select value={regentTeacher} onChange={(e) => setRegentTeacher(e.target.value)}>
                                    {mountOptionsTeacher()}
                                </select>
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