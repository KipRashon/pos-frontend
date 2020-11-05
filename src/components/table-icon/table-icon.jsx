import React from 'react';
import './table-icon.scss';

function TableIcon(props) {
  const {children, onClick} = props;
  return (
    <div
      className='icon-container p-2 link rounded-circle shadow shadow-secondary text-center'
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default TableIcon;
