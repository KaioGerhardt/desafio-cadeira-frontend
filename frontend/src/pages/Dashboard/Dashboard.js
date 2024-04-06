// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import SideBar from '../../Component/Sidebar/Sidebar';
import Class from '../Class/Class';
import User from '../User/User';
import PropTypes from 'prop-types';

function Dashboard() {
  const [component, setComponent] = useState(localStorage.getItem('suaVariavel'));

  const handleClose = () => { };

  useEffect(() => {
    setInterval(() => {
      let data = localStorage.getItem('component');
      if(data != component) {
        setComponent(data);
      }
    }, 10)
  }, []);

  return (
    <div className="Dashboard">
      <SideBar />
      <h1>Variável atual: {component}</h1>
 
      {component == "class" && <Class onClose={handleClose} />}
      {component == "user" && <User />}
    </div>
  );
}

SideBar.propTypes = {
  onItemClick: PropTypes.func.isRequired // Adicione a validação de tipo para a propriedade onItemClick
};

export default Dashboard;