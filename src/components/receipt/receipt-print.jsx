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

        <div id='mid'>
          <div class='info'>
            <h2>Contact Info</h2>
            <p>
              Address : P.O.BOX 102358-00101
              <br />
              Email : askscratchkitchen@gmail.com /ig@scratchkitchen <br />
              Phone : 0791 482 995/0756936852
              <br />
            </p>
          </div>
        </div>

        <div id='bot'>
          <div id='table'>
            <table>
              <tr class='tabletitle'>
                <td class='item'>
                  <h2>Item</h2>
                </td>
                <td class='Hours'>
                  <h2>Qty</h2>
                </td>
                <td class='Rate'>
                  <h2>Sub Total</h2>
                </td>
              </tr>

              <tr class='service'>
                <td class='tableitem'>
                  <p class='itemtext'>Communication</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>5</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>$375.00</p>
                </td>
              </tr>

              <tr class='service'>
                <td class='tableitem'>
                  <p class='itemtext'>Asset Gathering</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>3</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>$225.00</p>
                </td>
              </tr>

              <tr class='service'>
                <td class='tableitem'>
                  <p class='itemtext'>Design Development</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>5</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>$375.00</p>
                </td>
              </tr>

              <tr class='service'>
                <td class='tableitem'>
                  <p class='itemtext'>Animation</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>20</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>$1500.00</p>
                </td>
              </tr>

              <tr class='service'>
                <td class='tableitem'>
                  <p class='itemtext'>Animation Revisions</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>10</p>
                </td>
                <td class='tableitem'>
                  <p class='itemtext'>$750.00</p>
                </td>
              </tr>

              <tr class='tabletitle'>
                <td></td>
                <td class='Rate'>
                  <h2>tax</h2>
                </td>
                <td class='payment'>
                  <h2>$419.25</h2>
                </td>
              </tr>

              <tr class='tabletitle'>
                <td></td>
                <td class='Rate'>
                  <h2>Total</h2>
                </td>
                <td class='payment'>
                  <h2>$3,644.25</h2>
                </td>
              </tr>
            </table>
          </div>

          <div id='legalcopy'>
            <p class='legal'>
              <strong>Thank you for your business!</strong>  Payment is expected
              within 31 days; please process this invoice within that time.
              There will be a 5% interest charge per month on late invoices.
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
