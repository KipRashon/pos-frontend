import React from 'react';
import {formatDate} from '../../services/utility';
import './receipt-print.scss';

export default function ReceiptPrint(props) {
  const {payment, cartItems, onAfterPrint} = props;

  const handlePrint = () => {
    window.print();
    onAfterPrint();
  };
  return (
    <div className='container-fluid row justify-content-center'>
      <div class='ticket'>
        <p class='centered'>
          SCRATCH KITCHEN LTD
          <br />
          CUSTOMER BILL
          <br />
          {formatDate(payment.created_at)}
          <br />
          <small>
            <b>P.O.BOX 102358-00101 NRB TELEPHONE: 0791 482 995/0756936852</b>
          </small>
          <br />
          Till No. - {'4028177'}
        </p>
        <table>
          <thead>
            <tr>
              <th class='description'>Good</th>
              <th class='quantity'>Q.</th>
              <th class='price1 centered'>@</th>
              <th class='price2'>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr>
                <td className='description'>{item.name}</td>
                <td className='quantity'>{item.quantity}</td>
                <td className='price1 centered'>{item.price.amount}</td>
                <td className='price2 centered'>
                  {item.price.amount * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className='mt-1 border-top border-dark'
          style={{fontSize: '12px', padding: '12px'}}
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
          <h6 className='text-center font-weight-bolder text-uppercase'>
            SERVED BY {payment.sold_by_text}
          </h6>
        </div>

        <p class='centered border-top border-dark' style={{fontSize: '12px'}}>
          Thanks for your purchase!
          <br />
          askscratchkitchen@gmail.com /ig@scratchkitchen
        </p>
      </div>
      <div className='w-100 row justify-content-end hidden-print fixed-bottom'>
        <button className='btn btn-primary' onClick={handlePrint}>
          <i className='fa fa-print'></i>
          Confirm Print
        </button>
      </div>
    </div>
  );
}
