import React from 'react';
import './header.scss';

function Header(props) {
  const {title} = props;

  return (
    <div className='header w-100'>
      <div className='h3 text-center'>{title}</div>
    </div>
  );
}

export default Header;
