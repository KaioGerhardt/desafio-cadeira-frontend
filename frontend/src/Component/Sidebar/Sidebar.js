import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Importe o PropTypes
import './Sidebar.css';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';


const SideBar = () => {
    const [entity, setEntity] = useState('');
    const history = useHistory();

    useEffect(() => {
        setEntity(localStorage.getItem('entityUser'))
    }, []);

    const setComponent = (component) => {
        localStorage.setItem('component', component);
    };

    const logout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('entityUser');
        localStorage.removeItem('idUser');
        localStorage.removeItem('component');

        setTimeout(() => { window.location.reload() }, 100);

        history.push('/login');
    }

    return (
        <div className="sidebar">
            <div>Olá, {localStorage.getItem("userName")}!</div>
            {
                entity === "ADMIN" && (
                    <ul>
                        <li onClick={() => setComponent('class')}>Turmas</li>
                        <li onClick={() => setComponent('teacher')}>Professores</li>
                        <li onClick={() => setComponent('student')}>Alunos</li>
                    </ul>
                )
            }
            {
                entity === "TEACHER" && (
                    <ul>
                        <li onClick={() => setComponent('class')}>Turmas</li>
                        <li onClick={() => setComponent('student')}>Alunos</li>
                    </ul>
                )
            }
            {
                entity === "STUDENT" && (
                    <ul>
                        <li onClick={() => setComponent('enroll')}>Matrícula</li>
                    </ul>
                )
            }
            <button onClick={logout}>
                <RiLogoutBoxLine />
                Sair
            </button>
        </div>
    );
};

SideBar.propTypes = {
    onItemClick: PropTypes.func.isRequired
};

export default SideBar;