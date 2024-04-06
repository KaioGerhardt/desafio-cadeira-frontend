// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import SideBar from '../../Component/Sidebar/Sidebar';
import Class from '../Class/Class';
import Enroll from '../Enroll/Enroll';
import Teacher from '../Teacher/Teacher';
import Student from '../Student/Student';
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
 
      {component == "class" && <Class onClose={handleClose} />}
      {component == "enroll" && <Enroll />}
      {component == "teacher" && <Teacher />}
      {component == "student" && <Student />}
    </div>
  );
}

SideBar.propTypes = {
  onItemClick: PropTypes.func.isRequired // Adicione a validação de tipo para a propriedade onItemClick
};

export default Dashboard;