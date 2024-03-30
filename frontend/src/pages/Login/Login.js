import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css'; 
import axios from 'axios';
import config from '../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [entity, setEntity] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${config.backendUrl}/login`, { email, password });

        if(response.data.code == 200) {
            setEntity(response.data.user.entity);

            if(response.data.authentication){
                setLoggedIn(true);
            }
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
  };

  if (loggedIn && entity === "STUDENT") {
    return <Redirect to="/mainStudent" />;
  } else if (loggedIn && entity === "TEACHER") {
    return <Redirect to="/mainTeacher" />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;