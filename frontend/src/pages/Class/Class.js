import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Class.css';
import HoursInputMask from '../../mask/HoursInputMask';
import axios from 'axios';
import config from '../../config';
import SideBar from '../../Component/Sidebar/Sidebar';

const Class = ({ onClose }) => {
    const [name, setName] = useState('');
    const [hoursOffered, setHoursOffered] = useState('');
    const [dayOffered, setDayOffered] = useState('');
    const [limitStudents, setLimitStudents] = useState('');
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${config.backendUrl}/new-class`, { name, hoursOffered, dayOffered, limitStudents });
        console.log(response);

        // onClose(); // Fecha o pop-up após o envio do formulário
    };

    const handleHorasChange = (novaHoras) => {
        setHoursOffered(novaHoras);
    };


    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {


        const redirected = localStorage.getItem('redirected');
        if (redirected != "class") {
            localStorage.setItem('redirected', 'class');
            window.location.reload();
        }

        console.log('entrou na tela');
        document.addEventListener('keydown', handleEsc, false);

        return () => {
            document.removeEventListener('keydown', handleEsc, false);
        };

        // const loadTeachers = async () => {
        //     try {
        //         // Faça a requisição HTTP para obter os dados
        //         const teachers = await axios.get('URL_DA_API_AQUI');
        //         // Atualize o estado com os dados recebidos
        //         setDados(resposta.data);
        //     } catch (error) {
        //         console.error('Erro ao carregar dados:', error);
        //     }
        // };

        // loadTeachers();
    }, []);

    return (
        <div className="container">
            <SideBar />

            <div className='content'>
                <div className="popup">
                    <div className="popup_inner">
                        <h2>Cadastro de Turmas</h2>
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
        </div>
    );
};

Class.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Class;