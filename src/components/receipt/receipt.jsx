import React, {useEffect, useState} from 'react';
import {showNotification} from '../../services/api-handle';
import {
  payment_methods,
  places,
  printer_widths,
} from '../../services/constants';
import {getFormattedAmount, getFormattedMeasure} from '../../services/utility';

function Receipt(props) {
  const {cartItems, removeFromCart, handleSale, place} = props;
  const [useOnlinePrice, setUseOnlinePrice] = useState(false);

  const getRawTotalAmount = () => {
    if (cartItems.length) {
      let amount = 0;
      cartItems.forEach((item) => {
        if (useOnlinePrice && parseInt(item.price.online_price) === 0) {
          showNotification(
            'This good does not have online price. please add',
            'error',
            null,
            'no-duplicate'
          );
          setUseOnlinePrice(false);
          return;
        }
        amount +=
          (useOnlinePrice
            ? parseInt(item.price.online_price)
            : item.price.amount) * item.quantity;
      });
      return amount;
    }
    return 0;
  };
  const getTotalAmount = () => {
    return getFormattedAmount(getRawTotalAmount(), 1);
  };

  const [payment, setPayment] = useState({
    payment_method: payment_methods[0],
    transaction_code: '',
    total: getTotalAmount(),
    receiptWidth:
      parseInt(place) === places.BAR
        ? printer_widths.FUSION_PRINTER
        : printer_widths.KITCHEN_PRINTER,
  });

  const checkIfUseOnline = (method) => {
    let methods = [...payment_methods];
    const removeFromArray = (item, arr) => {
      return arr.filter((it) => it !== item);
    };

    methods = removeFromArray(
      'Mpesa',
      removeFromArray('Cash', removeFromArray('Card', methods))
    );
    return methods.includes(method);
  };

  return (
    <div className='card bg-transparent border-0'>
      <h4 className='text-uppercase text-center mb-3'>Receipt</h4>
      {cartItems.map((item) => (
        <Item
          key={item.id + item.price.amount}
          item={item}
          removeFromCart={removeFromCart}
          useOnlinePrice={useOnlinePrice}
        />
      ))}
      <hr />
      <div className='form-group row'>
        <div className='col text-left'>PAYMENT METHOD</div>
        <div className='col text-center'>
          <select
            name=''
            id=''
            className='form-control'
            value={payment.payment_method}
            onChange={(e) => {
              let payment_method = e.target.value;
              setPayment({
                ...payment,
                payment_method,
              });

              let useOnline = checkIfUseOnline(payment_method);
              setUseOnlinePrice(useOnline);
            }}
          >
            {payment_methods.map((method) => (
              <option value={method} key={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='form-group row'>
        <div className='col text-left'>SUB TOTAL</div>
        <div className='col text-center'>{getTotalAmount()}</div>
      </div>
      <div className='form-group row'>
        <div className='col text-left'>ADDITIONAL CHARGES</div>
        <div className='col text-center'>Ksh 0</div>
      </div>
      <div className='form-group row'>
        <div className='col text-left'>TOTAL</div>
        <div className='col text-center'>{getTotalAmount()}</div>
      </div>
      {payment.payment_method === 'Mpesa' && (
        <div className='form-group  mt-3'>
          <label htmlFor=''>Transaction Code</label>
          <input
            type='text'
            className='form-control'
            placeholder='OK749ZTL6Y'
            onChange={(e) =>
              setPayment({...payment, transaction_code: e.target.value})
            }
          />
        </div>
      )}
      <div className='form-group  mt-3'>
        <label htmlFor=''>Customer Paid</label>
        <input
          type='text'
          className='form-control'
          placeholder='Amount customer paid'
          onChange={(e) =>
            setPayment({
              ...payment,
              customer_pay: e.target.value,
              customer_change: parseFloat(e.target.value) - getRawTotalAmount(),
            })
          }
        />
      </div>
      <div className='form-group'>
        <label htmlFor=''>Choose Printer</label>
        <select
          name=''
          id=''
          className='form-control'
          value={payment.receiptWidth}
          onChange={(e) =>
            setPayment({...payment, receiptWidth: e.target.value})
          }
        >
          <option value={printer_widths.FUSION_PRINTER}>Fusion Printer</option>
          <option value={printer_widths.KITCHEN_PRINTER}>
            Kitchen Printer
          </option>
        </select>
      </div>
      <div className='mt-4 row justify-content-center '>
        <button
          className='btn btn-secondary text-uppercase p-1 mr-2'
          onClick={() =>
            handleSale({
              ...payment,
              total: getTotalAmount(),
              continueToPrint: false,
            })
          }
        >
          Confirm
        </button>
        <button
          className='btn btn-success text-uppercase p-1 ml-2'
          onClick={() =>
            handleSale({
              ...payment,
              total: getTotalAmount(),
              continueToPrint: true,
            })
          }
        >
          Confirm & Print
        </button>
      </div>
    </div>
  );
}

function Item(props) {
  const {item, removeFromCart, useOnlinePrice} = props;
  const [itemPrice, setItemPrice] = useState('Ksh 0');

  useEffect(() => {
    setItemPrice(
      getFormattedAmount(
        useOnlinePrice ? item.price.online_price : item.price.amount,
        item.quantity
      )
    );
  }, [
    item.quantity,
    item.price.online_price,
    item.price.amount,
    useOnlinePrice,
  ]);

  return (
    <div className='item p-2  mb-2'>
      <div className='row'>
        <div className='col text-left'>{item.name}</div>
        <div className='col text-center'>
          {getFormattedMeasure(item.price.unit, item.price.measure)}
        </div>
        <div className='col text-center'>{item.quantity}</div>
        <div className='col text-center'>{itemPrice}</div>
        <div
          className='col text-right link'
          onClick={() => removeFromCart(item)}
        >
          <i className='fa fa-times'></i>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
