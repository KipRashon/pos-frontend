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
      <div id='invoice-POS' className='col-12'>
        <center id='top'>
          <div class='info'>
            <h2>Scratch Kitchen</h2>
          </div>
        </center>

        <div id='mid' className='text-center'>
          <div class='info'>
            <h2>Scratch Kitchen</h2>
            <p className='font-weight-bold'>
              Address : P.O.BOX 102358-00101
              <br />
              Email : askscratchkitchen@gmail.com /ig@scratchkitchen <br />
              Phone : 0791 482 995/0756936852
              <br />
              Till: 4028177
            </p>
          </div>
        </div>

        <div id='bot'>
          <div id='table'>
            <table>
              <thead>
                <tr class='tabletitle'>
                  <th class='item'>
                    <h2>Item</h2>
                  </th>
                  <th class='Hours'>
                    <h2>Qty</h2>
                  </th>
                  <th class='Rate'>
                    <h2>Sub Total</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr class='service' key={item.id}>
                    <td class='tableitem'>
                      <p class='itemtext'>{item.name}</p>
                    </td>
                    <td class='tableitem'>
                      <p class='itemtext'>{item.quantity}</p>
                    </td>
                    <td class='tableitem'>
                      <p class='itemtext'>
                        {item.price.amount * item.quantity}
                      </p>
                    </td>
                  </tr>
                ))}
                <tr class='tabletitle'>
                  <td></td>
                  <td class='Rate'>
                    <h2>Customer Pay</h2>
                  </td>
                  <td class='payment'>
                    <h2>{'Ksh ' + payment.customer_pay}</h2>
                  </td>
                </tr>
                <tr class='tabletitle'>
                  <td></td>
                  <td class='Rate'>
                    <h2>Customer Change</h2>
                  </td>
                  <td class='payment'>
                    <h2>{'Ksh ' + payment.customer_change}</h2>
                  </td>
                </tr>
                <tr class='tabletitle'>
                  <td></td>
                  <td class='Rate'>
                    <h2>Total</h2>
                  </td>
                  <td class='payment'>
                    <h2>{payment.total}</h2>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            id='legalcopy '
            className='border-bottom border-dark text-center'
          >
            <p class='legal'>
              <strong>Served by</strong> <strong>{payment.sold_by_text}</strong>
            </p>
            <p class='legal'>
              <strong>Thank you for your business!</strong> 
              <strong>Follow use on ig@scratchkitchen</strong>
              <br />
              {formatDate(payment.created_at)}
            </p>
          </div>
        </div>
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
