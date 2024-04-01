import React, { useState, useEffect }  from 'react';
import './CreateUser.css';
import PropTypes from 'prop-types';


const CreateUser = ({ onClose }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [perfil, setPerfil] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados do cadastro para onde quiser
        console.log('Nome:', nome);
        console.log('Email:', email);
        onClose(); // Fecha o pop-up após o envio do formulário
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
        <div className="popup-container">
            <div className="popup">
                <div className="popup_inner">
                    <h2>Cadastro de Usuario</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nome:
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
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
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

CreateUser.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default CreateUser;