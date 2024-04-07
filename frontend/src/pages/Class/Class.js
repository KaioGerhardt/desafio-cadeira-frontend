import React, { useState, useEffect } from 'react';
import './Class.css';
import HoursInputMask from '../../mask/HoursInputMask';
import axios from 'axios';
import config from '../../config';

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
        <div className="popup-container">
            <div className="popup">
                <h3 style={{ textAlign: 'center' }}>Cadastro de Turmas</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nome da Turma" value={name} onChange={(e) => setName(e.target.value)} />
                    <select value={dayOffered} onChange={(e) => setDayOffered(e.target.value)}>
                        {diasDaSemana.map((dia, index) => (
                            <option key={index} value={dia}>{dia}</option>
                        ))}
                    </select>
                    <HoursInputMask placeholder="Hora Ofertada" id="horas" value={hoursOffered} onChange={handleHorasChange} />
                    <input placeholder="Limite de Estudantes" type="number" value={limitStudents} onChange={(e) => setLimitStudents(e.target.value)} />
                    <select value={regentTeacher} onChange={(e) => setRegentTeacher(e.target.value)}>
                        {mountOptionsTeacher()}
                    </select>
                    <div className="buttonDiv">
                        <button className="submitButton" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
            <div className="popup-list">
                <div className="popup_inner">
                    <h3 style={{ textAlign: 'center' }}>Turmas Cadastradas</h3>
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
    );
};

export default Class;