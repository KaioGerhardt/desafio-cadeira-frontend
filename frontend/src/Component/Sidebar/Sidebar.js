import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const SideBar = () => {
    const [entity, setEntity] = useState('');

    useEffect(() => {
        setEntity(localStorage.getItem('entityUser'))
    }, []);

    return (
        <div className="sidebar">
            {
                entity === "TEACHER" && (
                    <ul>
                        <li><Link to="/class">Turmas</Link></li>
                        <li><Link to="/user">Alunos</Link></li>
                        <li><Link to="/tela3">Matrículas</Link></li>
                    </ul>
                )
            }
            <div className="logout">
                <Link to="/logout">

                </Link>
            </div>
        </div>
    );
};

export default SideBar;