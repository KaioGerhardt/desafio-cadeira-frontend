// src/pages/Dashboard/Dashboard.js
import React, { useState } from 'react';
import SideBar from '../../Component/Sidebar/Sidebar';
import Class from '../Class/Class';
import User from '../User/User';

function Dashboard() {
  const [component, setComponent] = useState('');

  const handleItemClick = (opcao) => {
    setComponent(opcao);
  };

  return (
    <div className="Dashboard">
      <SideBar onItemClick={handleItemClick}/>
      <h1>Variável atual: {component}</h1>

      {component == "class" && <Class />}
      {component == "user" && <User />}
    </div>
  );
}

export default Dashboard;