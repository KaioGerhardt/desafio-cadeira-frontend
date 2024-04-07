// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

function Enroll() {

    const [idStudent, setIdStudent] = useState(0);
    const [classesEnrolled, setClassesEnrolled] = useState([]);
    const [classesAvaliable, setClassesAvaliable] = useState([]);
    const [idClass, setIdClass] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const response = await axios.post(`${config.backendUrl}/register`, { name, email, perfil, initialPassword });
        // console.log(response);

        // onClose();
    };


    useEffect(() => {

        setIdStudent(parseInt(localStorage.getItem('idUser')));

        const loadClassesEnrolled = async () => {
            try {
                // console.log("enrolledIdStudent ", idStudent);  
                const classes = await axios.post(`${config.backendUrl}/classes-enrolled`, { idStudent });
                setClassesEnrolled(classes.data.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadClassesEnrolled();

        const loadClassesAvaliable = async () => {
            try {
                console.log("avaliableIdStudent ", idStudent);    
                const classes = await axios.post(`${config.backendUrl}/classes-avaliable`, { idStudent });
                setClassesAvaliable(classes.data.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadClassesAvaliable();


    }, [])

    const mountTableClassesEnrolled = () => {
        return classesEnrolled.map((element, index) => {
            let dataTable = Object.fromEntries(Object.entries(element));

            return (
                <tr key={index}>
                    <td>{dataTable.className}</td>
                    <td>{dataTable.dayOffered}</td>
                    <td>{dataTable.hourOffered}</td>
                    <td>{dataTable.teacherName}</td>
                </tr>
            )
        });
    }

    const mountTableClassesAvailable = () => {
        return classesAvaliable.map((element, index) => {
            let dataTable = Object.fromEntries(Object.entries(element));

            return (
                <tr key={index}>
                    <td>{dataTable.className}</td>
                    <td>{dataTable.dayOffered}</td>
                    <td>{dataTable.hourOffered}</td>
                    <td>{dataTable.teacherName}</td>
                </tr>
            )
        });
    }

    const mountOptionsClass= () => {
        return classesAvaliable.map((element, index) => {
            let classesAvaliable = Object.fromEntries(Object.entries(element));

            return (
                <option key={index} value={classesAvaliable.idClass}>{classesAvaliable.className}</option>
            )
        });
    }

    return (
        <div className="popup-container">
            <div className="popup">
                <h3 style={{ textAlign: 'center' }}>Matricule-se</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        <select value={idClass} onChange={(e) => setIdClass(e.target.value)}>
                            {mountOptionsClass()}
                        </select>
                    </label>
                    <div className="buttonDiv">
                        <button className="submitButton" type="submit">Matricular</button>
                    </div>
                </form>
            </div>
            <div className="popup-list">
                <h3 style={{ textAlign: 'center' }}>Turmas Disponíveis</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Turma</th>
                            <th>Dia da Semana</th>
                            <th>Horário</th>
                            <th>Professor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mountTableClassesAvailable()}
                    </tbody>
                </table>
            </div>
            <div className="popup-list">
                <h3 style={{ textAlign: 'center' }}>Matriculado</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Turma</th>
                            <th>Dia da Semana</th>
                            <th>Horario</th>
                            <th>Professor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mountTableClassesEnrolled()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Enroll;