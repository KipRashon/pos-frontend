import React, {Component} from 'react';
import ReactToPrint from 'react-to-print-advanced';
import {formatDate} from '../../services/utility';

export default class ReceiptPrint extends Component {
  constructor(props) {
    super(props);
    this.receiptRef = React.createRef();
  }
  componentDidMount() {
    document.getElementById('trigger-print').click();
  }
  render() {
    const {onAfterPrint} = this.props;
    return (
      <>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return (
              <button className='d-none' id='trigger-print'>
                Print this out!
              </button>
            );
          }}
          content={() => this.receiptRef.current}
          removeAfterPrint={true}
          onAfterPrint={onAfterPrint}
          delay={1000}
        />
        <div ref={this.receiptRef}>
          <ReceiptItem {...this.props} />
        </div>
      </>
    );
  }
}

function ReceiptItem(props) {
  const {payment, cartItems} = props;
  return (
    <div className='container-fluid '>
      <div className='card'>
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
            <small className='text-secondary'>
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
                <span className='text-secondary'>Buy Goods till</span>:{' '}
                {'4028177'}
              </p>
            </div>
            {payment.transaction_code ? (
              <div className='col'>
                <p className='text-dark'>
                  <span className='text-secondary'>Reference Number</span>:
                  {payment.transaction_code}
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <div className='card-body p-0'>
          <div className='table-responsive'>
            <table className='table table-striped table-bordered'>
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
            <div className=' row justify-content-between'>
              <span className='text-uppercase'>Total Amount</span>
              <span>{payment.total}</span>
            </div>
            <div className=' row justify-content-between'>
              <span className='text-uppercase'>{payment.payment_method}</span>
              <span>{'Ksh ' + payment.customer_pay}</span>
            </div>
            <div className=' row justify-content-between'>
              <span className='text-uppercase'>Change</span>
              <span>{'Ksh ' + payment.customer_change}</span>
            </div>
          </div>
          <div className='mt-2'>
            <h6 className='text-center'>SERVED BY {payment.sold_by_text}</h6>
          </div>
        </div>
        <div className='card-footer p-0'>
          <p className='text-center text-uppercase text-secondary'>
            <small>
              FOLLOW US ON ig@scratchkitchen for COMPLAINTS AND FEEDBACK
            </small>
          </p>
          <p className='text-center text-uppercase text-secondary'>
            <small> askscratchkitchen@gmail.com</small>
          </p>
        </div>
      </div>
    </div>
  );
}
