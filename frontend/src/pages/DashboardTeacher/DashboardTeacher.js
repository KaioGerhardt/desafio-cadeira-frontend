import React, { useState } from 'react';
import CreateClass from '../../popup/Class/CreateClass';
import CreateUser from '../../popup/User/CreateUser';

const DasboardTeacher = () => {

  const [popupClassVisible, setPopupClassVisible] = useState(false);
  const [popupUserVisible, setPopupUserVisible] = useState(false);

  const openPopupClass = () => {
    setPopupClassVisible(true);
  };

  const closePopupClass = () => {
    setPopupClassVisible(false);
  };

  const openPopupUser = () => {
    setPopupUserVisible(true);
  };

  const closePopupUser = () => {
    setPopupUserVisible(false);
  };

  return (
    <div>
      <h1>Terceira Tela</h1>
      <button onClick={openPopupClass}>Abrir Cadastro Turma</button>
      {popupClassVisible && <CreateClass onClose={closePopupClass} />}

      <button onClick={openPopupUser}>Abrir Cadastro Usuario</button>
      {popupUserVisible && <CreateUser onClose={closePopupUser} />}
    </div>
  );
};

export default DasboardTeacher;