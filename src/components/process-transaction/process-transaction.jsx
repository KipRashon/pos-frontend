import React, {useEffect, useState} from 'react';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
} from '../../services/api-handle';
import {getFromLocal} from '../../services/utility';
import './process-transaction.scss';
import {trackPromise} from 'react-promise-tracker';
import {places} from '../../services/constants';

export default function ProcessTransaction(props) {
  const {selectedItem, handleAddToCart, place} = props;
  const [pricings, setPricings] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedForCart, setSelectedForCart] = useState({
    quantity: 1,
  });
  const currentUser = getFromLocal('currentUser');

  useEffect(() => {
    let itemId = selectedItem.id;
    if (itemId) {
      trackPromise(
        handleError(
          handleSuccess(
            sendGetRequest('pricings?good=' + itemId).then((res) => {
              let pricings = res.data.pricings;
              setPricings(pricings);
              setCount(0);
            })
          )
        )
      );
    }
  }, [selectedItem.id]);

  const getCurrentPricing = () => {
    if (pricings.length) {
      return pricings[count] || {};
    }
    return {};
  };

  const handleAddCart = () => {
    let toSend = {
      ...selectedForCart,
      price: pricings[count],
      ...selectedItem,
    };
    handleAddToCart(toSend);
  };

  let pricingItem = getCurrentPricing();
  if (!selectedItem.name) {
    return (
      <div className='process-section bg-secondary pb-4'>
        <h1 className='jumbotron jumbotron-fluid text-center bg-transparent  text-white '>
          Hi there {currentUser.firstname},
        </h1>
        <p className='text-lead text-center text-warning'>
          Please choose an item in the menu to proceed
        </p>
      </div>
    );
  }

  return (
    <div className='process-section'>
      <h1 className='text-center text-dark text-uppercase mb-4'>
        {selectedItem.name}
      </h1>

      {pricings.length ? (
        <>
          <h3 className='text-center text-dark text-uppercase mt-4'>
            Ksh {pricingItem.amount}
          </h3>

          <div className='add-subtract row justify-content-center'>
            {pricingItem.unit === 'count' ? null : (
              <>
                <button
                  className='btn btn-light col-3'
                  onClick={() => {
                    if (count > 0) {
                      setCount(count - 1);
                    }
                  }}
                >
                  <i className='fa fa-minus'></i>
                </button>
                <div className='h4 text-center p-2 ml-1 mr-1'>
                  {pricingItem.measure + ' ' + pricingItem.unit}
                </div>
                <button
                  className='btn btn-light col-3'
                  onClick={() => {
                    if (count < pricings.length - 1) {
                      setCount(count + 1);
                    }
                  }}
                >
                  <i className='fa fa-plus'></i>
                </button>
              </>
            )}

            <div className='w-100'></div>

            <div className='form-group col-2 mt-3'>
              <label htmlFor=''>Quantity</label>
              <input
                type='
            '
                className='form-control '
                value={selectedForCart.quantity}
                onChange={(e) =>
                  setSelectedForCart({
                    ...selectedForCart,
                    quantity: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {(!pricingItem.quantity_remaining &&
            parseInt(place) === places.BAR) ||
          (pricingItem.quantity_remaining &&
            parseInt(pricingItem.quantity_remaining) <
              parseInt(selectedForCart.quantity) &&
            parseInt(place) === places.BAR) ? (
            <div className=' badge badge-danger text-white p-1 w-100'>
              <h1 className='text-center'>Oops !</h1>
              <h5 className='text-center'>This product is out of quantity!</h5>
            </div>
          ) : (
            <div
              className='mt-4 row justify-content-center'
              onClick={handleAddCart}
            >
              <button className='btn btn-primary text-uppercase p-2 col-6'>
                Add To Cart
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='add-subtract bg-danger text-white p-2'>
          <h1 className='text-center'>Oops !</h1>
          <h5 className='text-center'>
            This product do not have pricing, please add pricing in the admin
            section
          </h5>
        </div>
      )}
    </div>
  );
}
