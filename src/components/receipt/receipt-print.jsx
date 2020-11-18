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
    <>
      <div className='ticket'>
        <p className='centered'>
          SCRATCH KITCHEN LTD
          <br />
          CUSTOMER BILL
          <br />
          <small>
            P.O.BOX 102358-00101 NRB TELEPHONE: 0791 482 995/0756936852
          </small>
          <br />
          <b>Till No. 4028177</b>
        </p>
        <table>
          <thead>
            <tr>
              <th className='description'>Description</th>
              <th className='quantity'>Q.</th>
              <th className='price'>@</th>
              <th className='price'>S.T</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className='description'>{item.name}</td>
                <td className='quantity'>{item.quantity}</td>
                <td className='price'>{item.price.amount}</td>
                <td className='price'>{item.price.amount * item.quantity}</td>
              </tr>
            ))}
            <tr>
              <td className='description centered' colSpan='2'>
                Total
              </td>
              <td className='price' colSpan='2'>
                {payment.total}
              </td>
            </tr>
          </tbody>
        </table>
        <p className='centered'>
          Served by
          {' ' + payment.sold_by_text + ' at ' + formatDate(payment.created_at)}
          <br />
          askscratchkitchen@gmail.com /ig@scratchkitchen
        </p>
      </div>
      <button className='btn btn-secondary ml-2' onClick={() => onAfterPrint()}>
        Back
      </button>
      <button
        id='btnPrint'
        className='hidden-print btn btn-dark ml-5'
        onClick={handlePrint}
      >
        Print
      </button>
    </>
  );
}
