import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import Modal from '../../../components/modal/modal';
import {
  handleError,
  handleSuccess,
  sendPostRequest,
} from '../../../services/api-handle';
import {places} from '../../../services/constants';
import {getFromLocal} from '../../../services/utility';

export default function AddStock(props) {
  const {
    handleCloseModal,
    updateData,
    selectedStock,
    selectedPlace,
    isAddEdit,
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [stock, setStock] = useState({});
  const [stockAdd, setStockAdd] = useState({});

  useEffect(() => {
    if (selectedStock.id) {
      setStock(selectedStock);
      setStockAdd({price: selectedStock.buying_price});
      setIsEdit(true);
    }
  }, [selectedStock]);

  const handleSubmit = () => {
    let url = '',
      successMessage = '';
    const currentUser = getFromLocal('currentUser') || {};

    if (selectedPlace === places.RESTAURANT) {
      url = 'stock/add-restaurant';
      successMessage = 'Stock added successfully';

      if (isEdit) {
        url = 'stock/edit-restaurant';
        successMessage = 'Stock edited successfully';
        delete stock.quantity;
        delete stock.price;
      }
    } else {
      if (isEdit) {
        url = `pricings/${stock.id}/edit`;
        successMessage = 'Stock updated successfully';
        stock.quantity_remaining = stock.quantity;
        stock.buying_price = stock.price;
      }
    }

    if (!isAddEdit && isEdit) {
      if (selectedPlace === places.RESTAURANT) {
        stock.price = stockAdd.price;
        stock.quantity = stockAdd.quantity;
        successMessage = 'Stock quantity updated';
      } else {
        stock.quantity_remaining = stockAdd.quantity;
        stock.buying_price = stockAdd.price;
        successMessage = 'Stock quantity updated';
      }
    }

    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(url, {
            ...stock,
            updated_by: `${currentUser.firstname} ${currentUser.lastname}`,
          }),
          successMessage
        ).then((res) => {
          setStock({});
          handleCloseModal();
          updateData();
        })
      )
    );
  };

  const updateStockChange = (obj) => {
    setStock({...stock, ...obj});
  };

  return (
    <Modal>
      <div className=''>
        <div className='modal-header'>
          <div className='h4 text-center'>
            {!isAddEdit
              ? 'Update Good Stock'
              : isEdit
              ? 'Edit Stock'
              : 'New Stock'}
          </div>
        </div>
        <div className='modal-body'>
          {isAddEdit ? (
            <div className='form-group'>
              <label htmlFor=''>Name</label>
              <input
                type='text'
                className='form-control'
                placeholder='E.g Salt'
                value={stock.stock_name}
                onChange={(e) =>
                  updateStockChange({stock_name: e.target.value})
                }
                disabled={selectedPlace === places.BAR}
              />
            </div>
          ) : null}
          {selectedPlace === places.RESTAURANT && isAddEdit ? (
            <div className='form-group'>
              <label htmlFor=''>Measure</label>
              <input
                type='text'
                className='form-control'
                placeholder='E.g Bales'
                value={stock.measure}
                onChange={(e) => updateStockChange({measure: e.target.value})}
              />
            </div>
          ) : null}
          {!isAddEdit ? (
            <div className='form-group'>
              <label htmlFor=''>
                Buying Price{' '}
                {stock.measure ? `Per ${stock.measure.slice(0, -1)}` : ''}
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Eg 300'
                value={stockAdd.price}
                onChange={(e) =>
                  setStockAdd({...stockAdd, price: e.target.value})
                }
              />
            </div>
          ) : null}
          '
          {!isAddEdit && (
            <div className='form-group'>
              <label htmlFor=''>Quantity in {selectedStock.measure}</label>
              <input
                type='text'
                className='form-control'
                placeholder='e.g 4'
                value={stockAdd.quantity}
                onChange={(e) =>
                  setStockAdd({...stockAdd, quantity: e.target.value})
                }
              />
            </div>
          )}
          <div className='mt-2 mb-2 row justify-content-between pl-2 pr-2'>
            <button
              className='btn btn-secondary col-4'
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button className='btn btn-primary col-4' onClick={handleSubmit}>
              {isAddEdit ? 'Save Stock' : 'Add stock'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
