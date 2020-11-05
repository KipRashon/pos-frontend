import React from 'react';
import './category.scss';

function Category() {
  return (
    <div className='category shadow shadow-secondary p-2'>
      <h5 className='text-center text-uppercase mb-1'>Scratch Pork</h5>
      <Item name='Grilled Pork' />
      <Item name='Honey Glazed' />
    </div>
  );
}

function Item(props) {
  const {name} = props;
  return (
    <div className='item p-2 link mb-2' title='Click to add'>
      {name}
      <div className='float-right'>
        <i className='fa fa-plus'></i>
      </div>
    </div>
  );
}

export default Category;
