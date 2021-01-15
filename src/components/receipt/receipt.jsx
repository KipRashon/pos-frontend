import React, {useEffect, useState} from 'react';
import {showNotification} from '../../services/api-handle';
import {
  payment_methods,
  places,
  printer_widths,
} from '../../services/constants';
import {
  getFormattedAmount,
  getFormattedMeasure,
  removeOptionalFields,
} from '../../services/utility';
import Modal from '../modal/modal';

function Receipt(props) {
  const {cartItems, removeFromCart, handleSale, place, payObj} = props;
  const [useOnlinePrice, setUseOnlinePrice] = useState(false);
  const [showMpesaCash, setShowMpesaCash] = useState(false);
  const [showCredit, setShowCredit] = useState(false);

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
            ? parseInt(item.price.online_price) * item.quantity
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

  useEffect(() => {
    setPayment({
      ...payment,
      ...payObj,
    });
  }, [payObj.sale_id, payObj]);

  const checkIfUseOnline = (method) => {
    let methods = [...payment_methods];
    const removeFromArray = (items, arr) => {
      let result = [];
      arr.forEach((item) => {
        if (!items.find((it) => it === item)) {
          result.push(item);
        }
      });
      return result;
    };

    methods = removeFromArray(
      ['Credit', 'Mpesa', 'Cash', 'Card', 'Mpesa & Cash'],
      methods
    );

    return methods.includes(method);
  };

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (payment.payment_method == 'Mpesa & Cash') {
      setShowMpesaCash(true);
      // eslint-disable-next-line eqeqeq
    } else if (payment.payment_method == 'Credit') {
      setPayment({...payment, customer_pay: 0, customer_change: 0});
      setShowCredit(true);
    } else {
      setShowMpesaCash(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment.payment_method]);

  return (
    <div className='card bg-transparent border-0'>
      {showCredit && (
        <GetCreditDetails
          handleCloseModal={() => {
            setShowCredit(false);
          }}
          handleSave={(creditor) => {
            setPayment({...payment, ...creditor});
          }}
          payment={payment}
        />
      )}
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
            value={payment.transaction_code}
            onChange={(e) =>
              setPayment({...payment, transaction_code: e.target.value})
            }
          />
        </div>
      )}
      {showMpesaCash ? (
        <>
          <div className='form-group mt-3'>
            <label htmlFor=''>Mpesa amount</label>
            <input
              type='number'
              className='form-control'
              placeholder='E.g 300'
              value={payment.mpesa_pay}
              onChange={(e) =>
                setPayment({...payment, mpesa_pay: e.target.value})
              }
            />
          </div>
          <div className='form-group '>
            <label htmlFor=''>Cash amount</label>
            <input
              type='number'
              className='form-control'
              placeholder='E.g 100'
              value={payment.cash_pay}
              onChange={(e) =>
                setPayment({...payment, cash_pay: e.target.value})
              }
            />
          </div>
        </>
      ) : (
        <div className='form-group  mt-3'>
          <label htmlFor=''>Customer Paid</label>
          <input
            type='text'
            className='form-control'
            placeholder='Amount customer paid'
            value={payment.customer_pay}
            onChange={(e) =>
              setPayment({
                ...payment,
                customer_pay: e.target.value,
                customer_change:
                  parseFloat(e.target.value) - getRawTotalAmount(),
              })
            }
          />
        </div>
      )}
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
        {payment.payment_method === 'Credit' && payment.creditor_name ? (
          <button
            className='btn btn-dark text-uppercase p-1 mx-1'
            onClick={() => setShowCredit(true)}
          >
            <i className='fa fa-edit mr-2'></i>
            Edit Creditor
          </button>
        ) : null}
        <button
          className='btn btn-secondary text-uppercase p-1 mr-2'
          onClick={() =>
            handleSale(
              removeOptionalFields(
                {
                  ...payment,
                  total: getTotalAmount(),
                  sub_total: getRawTotalAmount(),
                  continueToPrint: false,
                },
                ['cash_pay', 'mpesa_pay']
              )
            )
          }
        >
          {payment.sale_id ? 'Edit' : 'Confirm'}
        </button>
        <button
          className='btn btn-success text-uppercase p-1 ml-2'
          onClick={() =>
            handleSale(
              removeOptionalFields(
                {
                  ...payment,
                  total: getTotalAmount(),
                  sub_total: getRawTotalAmount(),
                  continueToPrint: true,
                },
                ['cash_pay', 'mpesa_pay']
              )
            )
          }
        >
          {payment.sale_id ? 'Edit' : 'Confirm'} & Print
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

function GetCreditDetails(props) {
  const {handleCloseModal, handleSave, payment} = props;
  const [creditor, setCreditor] = useState({});

  useEffect(() => {
    if (payment.creditor_name) {
      setCreditor({
        creditor_name: payment.creditor_name,
        creditor_phone: payment.creditor_phone,
        credit_reason: payment.credit_reason,
        credit_amount: payment.credit_amount,
      });
    }
  }, [payment]);
  const handleSaveCreditor = () => {
    handleSave(creditor);
    handleCloseModal();
  };

  const updateCreditor = (obj) => {
    setCreditor({...creditor, ...obj});
  };

  return (
    <Modal>
      <div className=''>
        <div className='modal-header'>
          <div className='h4 text-center'>Creditor Details</div>
        </div>
        <div className='modal-body'>
          <div className='form-group'>
            <label htmlFor=''>Full Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='E.g John Doe'
              value={creditor.creditor_name}
              onChange={(e) => updateCreditor({creditor_name: e.target.value})}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Phone Number</label>
            <input
              type='text'
              className='form-control'
              placeholder='E.g  0702820251'
              value={creditor.creditor_phone}
              onChange={(e) => updateCreditor({creditor_phone: e.target.value})}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Amount</label>
            <input
              type='text'
              className='form-control'
              placeholder='E.g  200'
              value={creditor.credit_amount}
              onChange={(e) => updateCreditor({credit_amount: e.target.value})}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Reason</label>
            <textarea
              name=''
              id=''
              cols='30'
              rows='3'
              className='form-control'
              placeholder='Reason to give credit'
              value={creditor.credit_reason}
              onChange={(e) => updateCreditor({credit_reason: e.target.value})}
            ></textarea>
          </div>
          <div className='mt-2 mb-2 row justify-content-between pl-2 pr-2'>
            <button
              className='btn btn-secondary col-4'
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className='btn btn-primary col-4'
              onClick={handleSaveCreditor}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Receipt;
