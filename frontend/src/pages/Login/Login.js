import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import config from '../../config';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [entity, setEntity] = useState('');
  const [idUser, setIdUser] = useState(0);

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
      console.log(response);
      
      if (response.data.code == 200) {
        setEntity(response.data.user.type);
        setIdUser(response.data.user.idUser);

        if (response.data.authentication) {
          localStorage.setItem("userName", response.data.user.name)
          setLoggedIn(true);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuário ou senha inválidos!'
      });
      console.error('Erro ao fazer login:', error);
    }
  };  

  useEffect(() => {
    localStorage.removeItem("entityUser");
    localStorage.removeItem("idUser");
    localStorage.removeItem("component");
  }, []);

  if (loggedIn) {
    localStorage.setItem("entityUser", entity);
    localStorage.setItem("idUser", idUser);

    if(entity === "ADMIN" || entity === "TEACHER") {  
      localStorage.setItem("component", "class");
    }else if(entity === "STUDENT"){
      localStorage.setItem("component", "enroll");
    }

    setTimeout(() => { window.location.reload() }, 100); 

    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="appContainer">
      <div className="boxContainer">
        <div className="backDrop">
        </div>
        <div className="topContainer">
            <div className="headerText">Bem-vindo!</div>
            <div className="smallText">Acesse sua conta</div>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <input
                type="password"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            <button className="submitButton" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;