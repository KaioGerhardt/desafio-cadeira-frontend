import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Importe o PropTypes
import './Sidebar.css';

const SideBar = () => {
    const [entity, setEntity] = useState('');

    useEffect(() => {
        setEntity(localStorage.getItem('entityUser'))
    }, []);

    const setComponent = (component) => {
        localStorage.setItem('component', component);
    };

    return (
        <div className="sidebar">
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
        </div>
    );
};

SideBar.propTypes = {
    onItemClick: PropTypes.func.isRequired // Adicione a validação de tipo para a propriedade onItemClick
};

// SideBar.defaultProps = {
//     onItemClick: () => { } // Isso evita que onItemClick seja `undefined`
// };

export default SideBar;