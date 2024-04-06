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
        <div className="container">
            <div className="content">
                <div className="popup">
                    <div className="popup_inner">
                        <h2 style={{ textAlign: 'center' }}>Cadastro de Alunos</h2>
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
                <div className="popup">
                    <h2 style={{ textAlign: 'center' }}>Usuarios cadastrados</h2>
                </div>
            </div>
        </div>
    );
}

export default Enroll;