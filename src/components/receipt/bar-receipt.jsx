import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
} from '../../services/api-handle';
import {formatDate} from '../../services/utility';
import './bar-receipt.scss';

import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

export default function BarReceipt(props) {
  const {width, sale_id} = props;

  const [cartItems, setCartItems] = useState([]);
  const [payment, setPayment] = useState({});
  const [count, setCount] = useState(1);

  useEffect(() => {
    let url = 'sales/cart-items/' + sale_id;

    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(url)).then((res) => {
          setCartItems(res.data.cart_items);
          setPayment(res.data.sale);
        })
      )
    );
  }, [sale_id]);
  const onAfterPrint = () => {
    props.history.goBack();
  };

  const printAndroid = () => {
    setCount(1);
    for (let i = 1; i <= 2; i++) {
      setCount(i);
      html2canvas(document.getElementById('receipt')).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save(`receipt${sale_id}-${i === 1 ? 'bill' : 'order'}.pdf`);
      });
    }
  };

  const handlePrint = () => {
    setCount(1);
    for (let i = 1; i <= 2; i++) {
      setCount(i);
      window.print();
    }
    onAfterPrint();
  };

  return (
    <>
      <div
        className='ticket'
        style={{width: width, maxWidth: width}}
        id='receipt'
      >
        <p className='centered'>
          <span className='titles'>POS</span>
          <br />
          <span className='titles'>
            {count === 1 ? 'CUSTOMER BILL' : 'ORDER'}
          </span>
          <br />
          <p style={{fontSize: '13px'}}>
            P.O.BOX 102358-00101 NRB TELEPHONE: 0791 482 995/0756936852
          </p>
          <br />
          <p id='till-number'>Till No. 4028177</p>
        </p>
        <table className='my-4'>
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
            <tr style={{paddingTop: '30px', borderTop: '1px solid #000'}}>
              <td className='description  totals' colSpan='1'>
                Total
              </td>
              <td className='price  font-weight-bolder totals' colSpan='2'>
                {payment.total}
              </td>
            </tr>
            <tr>
              <td className='description  text-uppercase' colSpan='1'>
                Customer Pay
              </td>
              <td className='price  font-weight-bolder' colSpan='2'>
                {payment.customer_pay}
              </td>
            </tr>
            <tr>
              <td className='description text-uppercase ' colSpan='1'>
                Change
              </td>
              <td className='price  font-weight-bolder' colSpan='2'>
                {payment.customer_change}
              </td>
            </tr>
          </tbody>
        </table>
        <p className='centered text-uppercase' style={{fontSize: '20px'}}>
          Served by
          {' ' +
            payment.firstname +
            ' ' +
            payment.lastname +
            ' at ' +
            formatDate(payment.created_at)}
          <br />
          infocomany@gmail.com
        </p>
      </div>
      <div
        className='justify-content-center  row hidden-print'
        style={{width: width, maxWidth: width}}
      >
        <button
          className='btn btn-secondary ml-2'
          onClick={() => onAfterPrint()}
        >
          Back
        </button>
        <button
          id='btnPrint'
          className='hidden-print btn btn-dark ml-5 print-computer'
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          id='btnPrint'
          className='hidden-print btn btn-dark ml-5 print-android'
          onClick={printAndroid}
        >
          Download Pdf
        </button>
      </div>
    </>
  );
}
