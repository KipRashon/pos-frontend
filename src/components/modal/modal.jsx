import React, {useEffect} from 'react';
import './modal.scss';
import $ from 'jquery';

function Modal(props) {
  const {children} = props;
  useEffect(() => {
    $('body').addClass('modal-open');
    return () => {
      $('body').removeClass('modal-open');
    };
  });
  return (
    <div
      class='modal animate__animated animate__bounceInUp show'
      id='basicModal'
      style={{display: 'block', paddingRight: '19px'}}
    >
      <div class='modal-dialog' role='document'>
        <div class='modal-content'>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
