import React from 'react';
import './process-transaction.scss';

export default function ProcessTransaction() {
  return (
    <div className='process-section'>
      <h1 className='text-center text-dark text-uppercase mb-4'>
        Grilled Pork
      </h1>

      <h3 className='text-center text-dark text-uppercase mt-4'>Ksh 200</h3>

      <div className='add-subtract row justify-content-center'>
        <button className='btn btn-light col-3'>
          <i className='fa fa-minus'></i>
        </button>
        <div className='h4 text-center p-2 ml-1 mr-1'>1/4 Kg</div>
        <button className='btn btn-light col-3'>
          <i className='fa fa-plus'></i>
        </button>
      </div>

      <div className='mt-4 row justify-content-center'>
        <button className='btn btn-primary text-uppercase p-2 col-6'>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
