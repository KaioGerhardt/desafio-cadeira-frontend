// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import Swal from 'sweetalert2';

function Enroll() {

    const [classesEnrolled, setClassesEnrolled] = useState([]);
    const [classesAvaliable, setClassesAvaliable] = useState([]);
    const [idClass, setIdClass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(idClass);

        const response = await axios.post(`${config.backendUrl}/enroll`, { idClass, idStudent: localStorage.getItem('idUser') });
        console.log("response", response);

        if(response.status == 200){
            Swal.fire({
                icon: 'success',
                title: 'Matricula Realizada!',
                showConfirmButton: false,
                timer: 1500
              });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocorreu um erro!'
              });
        }

        // onClose();
    };


    useEffect(() => {

        const loadClassesEnrolled = async () => {
            try {
                const classes = await axios.post(`${config.backendUrl}/classes-enrolled`, { idStudent: localStorage.getItem('idUser') });
                setClassesEnrolled(classes.data.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadClassesEnrolled();

        const loadClassesAvaliable = async () => {
            try {
                const classes = await axios.post(`${config.backendUrl}/classes-avaliable`, { idStudent: localStorage.getItem('idUser') });
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