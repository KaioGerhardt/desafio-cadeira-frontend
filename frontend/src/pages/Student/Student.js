// src/pages/Dashboard/Dashboard.js
import React, { useState } from 'react';
import './Student.css';

function Enroll() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [perfil, setPerfil] = useState('');
    const [initialPassword, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const response = await axios.post(`${config.backendUrl}/register`, { name, email, perfil, initialPassword });
        // console.log(response);

        // onClose();
    };

    return (
        <div className="popup">
                <div className="popup_inner">
                    <h3 style={{ textAlign: 'center' }}>Cadastro de Usuários</h3>
                    <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Senha Inicial" value={initialPassword} onChange={(e) => setPassword(e.target.value)} />
                            <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
                                <option value="" disabled selected hidden>Perfil de Usuário</option>
                                <option value="teacher">Professor</option>
                                <option value="student">Estudante</option>
                            </select>
                            <div className="buttonDiv">
                                <button className="submitButton" type="submit">Cadastrar</button>
                            </div>
                    </form>
                </div>
        </div>
    );
}

export default Enroll;