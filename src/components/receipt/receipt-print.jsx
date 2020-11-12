import React from 'react';
import {formatDate} from '../../services/utility';

export default function ReceiptPrint(props) {
  const {payment, cartItems, onAfterPrint} = props;

  const handlePrint = () => {
    window.print();
    onAfterPrint();
  };
  return (
    <div
      className='container-fluid '
      style={{
        fontWeight: 'bolder',
      }}
    >
      <div className='card'>
        <div className='card-header row justify-content-end hidden-print'>
          <button className='btn btn-primary' onClick={handlePrint}>
            Confirm Print
          </button>
        </div>
        <div className='mb-1'>
          <hr />
          <p className='text-center'>
            <b className='text-center text-dark'>CUSTOMER BILL</b>
          </p>
          <p className='text-center '>
            <strong className='text-center text-dark text-uppercase'>
              SCRATCH KITCHEN LTD
            </strong>
          </p>
          <p className='text-dark text-center'>
            {formatDate(payment.created_at)}
          </p>
          <p className='text-center '>
            <small className='text-dark'>
              P.O.BOX 102358-00101 NRB TELEPHONE: 0791 482 995/0756936852
            </small>
          </p>
          <div className='border-bottom border-top border-secondary  row'>
            <div className='col'>
              <p className='text-dark'>
                <span className='text-secondary'>Bill No</span>: {payment.id}
              </p>
            </div>
            <div className='col'>
              <p className='text-dark'>
                <span className='text-dark'>Buy Goods till</span>: {'4028177'}
              </p>
            </div>
            {payment.transaction_code ? (
              <div className='col'>
                <p className='text-dark'>
                  <span className='text-dark'>Reference Number</span>:
                  {payment.transaction_code}
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <div className='card-body p-0'>
          <div className='table-responsive'>
            <table
              className='table table-striped '
              style={{border: '1px solid #000'}}
            >
              <thead className='thead-dark'>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.amount}</td>
                    <td>{item.price.amount * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className='mt-1 pl-4 pr-4  border-dark mb-1 '
            style={{borderStyle: 'dotted'}}
          >
            <div className=' row justify-content-between text-dark'>
              <span className='text-uppercase'>Total Amount</span>
              <span>{payment.total}</span>
            </div>
            <div className=' row justify-content-between text-dark'>
              <span className='text-uppercase text-dark'>
                {payment.payment_method}
              </span>
              <span>{'Ksh ' + payment.customer_pay}</span>
            </div>
            <div className=' row justify-content-between text-dark'>
              <span className='text-uppercase text-dark'>Change</span>
              <span>{'Ksh ' + payment.customer_change}</span>
            </div>
          </div>
          <div className='mt-2'>
            <h6 className='text-center'>SERVED BY {payment.sold_by_text}</h6>
          </div>
        </div>
        <div className='card-footer p-0'>
          <p className='text-center text-uppercase text-dark'>
            <small>
              FOLLOW US ON ig@scratchkitchen for COMPLAINTS AND FEEDBACK
            </small>
          </p>
          <p className='text-center text-uppercase text-dark'>
            <small> askscratchkitchen@gmail.com</small>
          </p>
        </div>
      </div>
    </div>
  );
}
