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
                        <li onClick={() => setComponent('user')}>Usuarios</li>
                        <li onClick={() => setComponent('enroll')}>Matrículas</li>
                    </ul>
                )
            }
            {
                entity === "TEACHER" && (
                    <ul>
                        <li onClick={() => onItemClick('class')}>Turmas</li>
                        <li onClick={() => onItemClick('enroll')}>Matrículas</li>
                    </ul>
                )
            }
            {
                entity === "STUDENT" && (
                    <ul>
                        <li onClick={() => onItemClick('class')}>Turmas</li>
                        <li onClick={() => onItemClick('student')}>Alunos</li>
                        <li onClick={() => onItemClick('enroll')}>Matrículas</li>
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