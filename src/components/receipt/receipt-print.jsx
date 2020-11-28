import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
} from '../../services/api-handle';
import {formatDate} from '../../services/utility';
import './receipt-print.scss';

import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

export default function ReceiptPrint(props) {
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
        pdf.save(`receipt.pdf`);
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
          SCRATCH KITCHEN LTD
          <br />
          {count === 1 ? 'CUSTOMER BILL' : 'ORDER'}
          <br />
          <small>
            P.O.BOX 102358-00101 NRB TELEPHONE: 0791 482 995/0756936852
          </small>
          <br />
          <small style={{fontWeight: 'bolder'}}>Till No. 4028177</small>
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
          {' ' +
            payment.firstname +
            ' ' +
            payment.lastname +
            ' at ' +
            formatDate(payment.created_at)}
          <br />
          askscratchkitchen@gmail.com /ig@scratchkitchen
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
