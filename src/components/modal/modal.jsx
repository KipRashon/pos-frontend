import React from 'react';
import './modal.scss';

function Modal(props) {
  const {children} = props;
  return (
    <div className='mymodal animate__animated animate__bounceInUp'>
      {children}
    </div>
  );
}

export default Modal;
