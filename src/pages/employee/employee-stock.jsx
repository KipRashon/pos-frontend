import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import Modal from '../../components/modal/modal';
import TableIcon from '../../components/table-icon/table-icon';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../services/api-handle';
import {places} from '../../services/constants';
import {formatUrl, getFromLocal} from '../../services/utility';
import AddStock from '../admin/stock/add-stock';

export default function EmployeeStock(props) {
  const [stock, setStock] = useState([]);
  const [place, setPlace] = useState(places.BAR);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});

  const updateData = () => {
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(formatUrl('stock', {place}))).then(
          (res) => {
            setStock(res.data.stock);
          }
        )
      )
    );
  };
  useEffect(updateData, [place]);

  const toggleShowAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div className='container-fluid'>
      {showAdd && (
        <AddStock
          selectedStock={{}}
          handleCloseModal={toggleShowAdd}
          updateData={updateData}
          selectedPlace={place}
          isAddEdit={true}
        />
      )}

      {showUpdate && (
        <UpdateStock
          handleCloseModal={() => {
            setShowUpdate(false);
            setSelectedStock({});
          }}
          updateData={updateData}
          selectedStock={selectedStock}
          place={place}
        />
      )}
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header border-bottom-0'>
              <h1 className='text-center jumbotron w-100 gradient-3'>Stock</h1>
            </div>
            <div className='card-body'>
              <div className='w-100 row'>
                <div className='col row justify-content-start'>
                  <div className='form-group'>
                    <div
                      className='btn-group col-12'
                      role='group'
                      aria-label='Basic example'
                    >
                      <button
                        type='button'
                        className={`btn btn-${
                          place === places.RESTAURANT
                            ? 'white border-dark'
                            : 'dark'
                        }`}
                        onClick={() => setPlace(places.BAR)}
                      >
                        Bar Stock
                      </button>
                      <button
                        type='button'
                        className={`btn btn-${
                          place === places.BAR ? 'white border-dark' : 'dark'
                        }`}
                        onClick={() => setPlace(places.RESTAURANT)}
                      >
                        Restaurant Stock
                      </button>
                    </div>
                  </div>
                </div>
                <div className='col row justify-content-end'>
                  {place === places.RESTAURANT && (
                    <div className='form-group'>
                      <button className='btn btn-info' onClick={toggleShowAdd}>
                        <i className='fa fa-plus mr-2'></i>
                        Add Stock
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className='table-responsive'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Good</th>
                      <th>Quantity</th>
                      <th>@</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.map((item, index) => (
                      <tr key={item.id}>
                        <td>{++index}</td>
                        <td>{item.stock_name}</td>
                        <td>{item.quantity}</td>
                        <td>
                          {item.buying_price ? 'Ksh ' + item.buying_price : '_'}
                        </td>
                        <td>{'Ksh ' + item.price}</td>
                        <td>
                          <div className='d-flex justify-content-center w-75'>
                            <TableIcon
                              onClick={() => {
                                setShowUpdate(true);
                                setSelectedStock(item);
                              }}
                            >
                              <i className='fa fa-plus'></i>
                            </TableIcon>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdateStock(props) {
  const {selectedStock, handleCloseModal, place, updateData} = props;
  const [stock, setStock] = useState({});

  useEffect(() => {
    if (selectedStock.id) {
      setStock({
        id: selectedStock.id,
        price: selectedStock.buying_price,
      });
    }
  }, [selectedStock]);

  const updateStockChange = (obj) => {
    setStock({...stock, ...obj});
  };

  const handleSubmit = () => {
    let url = '',
      successMessage = '';
    const currentUser = getFromLocal('currentUser') || {};

    if (place === places.RESTAURANT) {
      url = 'stock/edit-restaurant';
      successMessage = 'Stock edited successfully';
    } else {
      url = `pricings/${stock.id}/edit`;
      successMessage = 'Stock updated successfully';
      stock.quantity_remaining = stock.quantity;
      stock.buying_price = stock.price;
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
  return (
    <Modal>
      <div className=''>
        <div className='modal-header'>
          <div className='h4 text-center'>
            New Stock for -{selectedStock.stock_name}
          </div>
        </div>
        <div className='modal-body'>
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
            <label htmlFor=''>Quantity in {selectedStock.measure}</label>
            <input
              type='text'
              className='form-control'
              placeholder='Eg 3'
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
              Add Stock
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
