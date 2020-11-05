import React from 'react';

function Receipt() {
  return (
    <div className='card bg-transparent border-0'>
      <h4 className='text-uppercase text-center mb-3'>Receipt</h4>
      <Item name='Grilled Pork' quantity='1Kg' price='Ksh 1000' />
      <hr />
      <div className='form-group row'>
        <div className='col text-left'>PAYMENT METHOD</div>
        <div className='col text-center'>Cash</div>
      </div>
      <div className='form-group row'>
        <div className='col text-left'>SUB TOTAL</div>
        <div className='col text-center'>Ksh 200</div>
      </div>
      <div className='form-group row'>
        <div className='col text-left'>ADDITIONAL CHARGES</div>
        <div className='col text-center'>Ksh 0</div>
      </div>
      <div className='form-group row'>
        <div className='col text-left'>TOTAL</div>
        <div className='col text-center'>Ksh 400</div>
      </div>
      <div className='mt-4 row justify-content-center'>
        <button className='btn btn-success text-uppercase p-2 col-6'>
          Confirm & Print
        </button>
      </div>
    </div>
  );
}

function Item(props) {
  const {name, price, quantity} = props;
  return (
    <div className='item p-2  mb-2'>
      <div className='row'>
        <div className='col text-left'>{name}</div>
        <div className='col text-center'>{quantity}</div>
        <div className='col text-center'>{price}</div>
        <div className='col text-right link'>
          <i className='fa fa-times'></i>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
