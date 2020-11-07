import React from 'react';
import './category.scss';

function Category(props) {
  const {category, onItemClick} = props;

  return (
    <div className='category shadow shadow-secondary p-2 mb-2'>
      <h5 className='text-center text-uppercase mb-1'>{category.name}</h5>
      {category.goods.map((good) => (
        <Item item={good} onItemClick={onItemClick} />
      ))}
    </div>
  );
}

function Item(props) {
  const {item, onItemClick} = props;
  return (
    <div
      className='item p-2 link mb-2'
      title='Click to add'
      onClick={() => onItemClick(item)}
    >
      {item.name}
      <div className='float-right'>
        <i className='fa fa-plus'></i>
      </div>
    </div>
  );
}

export default Category;
