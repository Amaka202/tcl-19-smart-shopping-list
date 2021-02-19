import React, { useState } from 'react';
import '../styles/Modal.css';

const Modal = (props) => {
  const [hidden, setHidden] = useState(props.active);

  const removeModal = () => {
    console.log('running');
    setHidden(false);
  };

  return (
    <div className={!hidden ? 'hidden' : null}>
      <div className="style-modal bg-green-500">
        <p>{props.message}</p>
        <button onClick={removeModal}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
