import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CreateClass.css';

const CreateClass = ({ onClose }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados do cadastro para onde quiser
        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('Telefone:', telefone);
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
                    <h2>Cadastro de Turmas</h2>
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
                            Telefone:
                            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        </label>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

CreateClass.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default CreateClass;