import React, { useState, useEffect }  from 'react';
import './User.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';
import SideBar from '../../Component/Sidebar/Sidebar';


const User = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [perfil, setPerfil] = useState('');
    const [initialPassword, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${config.backendUrl}/register`, { name, email, perfil, initialPassword });
        console.log(response);

        onClose();
    };

    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }       
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEsc, false);

        return () => {
            document.removeEventListener('keydown', handleEsc, false);
        };
    }, []);

    return (
        <div className="container">
            <SideBar />

        <div className="content">
            <div className="popup">
                <div className="popup_inner">
                    <h2>Cadastro de Usuario</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            name:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            Email:
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            Perfil:
                            <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
                                <option value="0">Selecione</option>
                                <option value="teacher">Professor</option>
                                <option value="student">Estudante</option>
                            </select>
                        </label>
                        <label>
                            Senha Inicial:
                            <input type="password" value={initialPassword} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

User.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default User;