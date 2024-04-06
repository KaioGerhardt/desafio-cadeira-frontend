import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Importe o PropTypes
import './Sidebar.css';

const SideBar = ({ onItemClick }) => {
    const [entity, setEntity] = useState('');

    useEffect(() => {
        setEntity(localStorage.getItem('entityUser'))
    }, []);

    return (
        <div className="sidebar">
            {
                entity === "ADMIN" && (
                    <ul>
                        <li onClick={() => onItemClick('class')}>Turmas</li>
                        <li onClick={() => onItemClick('user')}>Usuarios</li>
                        <li onClick={() => onItemClick('enroll')}>Matrículas</li>
                    </ul>
                )
            }
            {
                entity === "TEACHER" && (
                    <ul>
                        <li onClick={() => onItemClick('class')}>Turmas</li>
                        <li onClick={() => onItemClick('class')}>Matrículas</li>
                    </ul>
                )
            }
            {
                entity === "STUDENT" && (
                    <ul>
                        <li onClick={() => onItemClick('class')}>Turmas</li>
                        <li onClick={() => onItemClick('class')}>Alunos</li>
                        <li onClick={() => onItemClick('class')}>Matrículas</li>
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