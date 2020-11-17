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
    <div className='container'>
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
        <table className='table'>
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

            <tr>
              <td></td>
              <td></td>
              <td className='centered'>Total Amount</td>
              <td className='centered'>{payment.total}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className='centered'>{payment.payment_method}</td>
              <td className='centered'>{'Ksh ' + payment.customer_pay}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className='centered'>Customer Change</td>
              <td className='centered'>{'Ksh ' + payment.customer_change}</td>
            </tr>
          </tbody>
        </table>
        <h6 className='text-center font-weight-bolder text-uppercase'>
          SERVED BY {payment.sold_by_text}
        </h6>
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
