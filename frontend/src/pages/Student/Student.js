// src/pages/Dashboard/Dashboard.js
import React, { useState } from 'react';

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
        <div className="custom-container">
            <div className="custom-content">
                <div className="custom-popup">
                    <div className="custom-popup-inner">
                        <h2 className="custom-h2">Cadastro de Alunos</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="custom-label">
                                Nome
                                <input type="text" className="custom-input" value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label className="custom-label">
                                Email
                                <input type="email" className="custom-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>
                            <label className="custom-label">
                                Perfil
                                <select className="custom-select" value={perfil} onChange={(e) => setPerfil(e.target.value)}>
                                    <option value="0">Selecione</option>
                                    <option value="teacher">Professor</option>
                                    <option value="student">Estudante</option>
                                </select>
                            </label>
                            <label className="custom-label">
                                Senha Inicial
                                <input type="password" className="custom-input" value={initialPassword} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <button type="submit" className="custom-button">Cadastrar</button>
                        </form>
                    </div>
                </div>
                <div className="custom-popup">
                    <h2 className="custom-h2">Usuários cadastrados</h2>
                </div>
            </div>
        </div>    
    );
}

export default Enroll;