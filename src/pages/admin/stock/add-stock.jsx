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
  const {handleCloseModal, updateData, selectedStock, selectedPlace} = props;
  const [isEdit, setIsEdit] = useState(false);
  const [stock, setStock] = useState({});

  useEffect(() => {
    if (selectedStock.id) {
      setStock(selectedStock);
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
      }
    } else {
      if (isEdit) {
        url = `pricings/${stock.id}/edit`;
        successMessage = 'Stock updated successfully';
        stock.quantity_remaining = stock.quantity;
        stock.buying_price = stock.price;
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
            {isEdit ? 'Edit Stock' : 'New Stock'}
          </div>
        </div>
        <div className='modal-body'>
          <div className='form-group'>
            <label htmlFor=''>Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='E.g Salt'
              value={stock.stock_name}
              onChange={(e) => updateStockChange({stock_name: e.target.value})}
              disabled={selectedPlace === places.BAR}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Buying Price</label>
            <input
              type='text'
              className='form-control'
              placeholder='Eg 300'
              value={stock.price}
              onChange={(e) => updateStockChange({price: e.target.value})}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Quantity</label>
            <input
              type='text'
              className='form-control'
              placeholder='Eg 2Kg'
              value={stock.quantity}
              onChange={(e) => updateStockChange({quantity: e.target.value})}
            />
          </div>
          <div className='mt-2 mb-2 row justify-content-between pl-2 pr-2'>
            <button
              className='btn btn-secondary col-4'
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button className='btn btn-primary col-4' onClick={handleSubmit}>
              Save Stock
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
