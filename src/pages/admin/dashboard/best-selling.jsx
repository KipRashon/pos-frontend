import React from 'react';

export default function BestSelling(props) {
  const {bestSelling} = props;
  return (
    <div className='row'>
      <div className='col-xl-12'>
        <div className='card'>
          <div className='card-header border-0 pb-0 d-sm-flex d-block'>
            <div>
              <h4 className='card-title mb-1'>Best Selling Items</h4>
            </div>
          </div>
          <div className='card-body p-0 pt-3 border-top border-darken-1'>
            {bestSelling.map((item, index) => (
              <div className='media items-list-1' key={item.pricing}>
                <span className='number col-1 px-0 align-self-center'>
                  #{++index}
                </span>
                <div className='media-body col-sm-4 col-6 col-xxl-5 px-0'>
                  <h5 className='mt-0 mb-3'>
                    <a className='text-black' href='ecom-product-detail.html'>
                      {item.stock_name}
                    </a>
                  </h5>
                  <small className='font-w500'>
                    <strong className='text-secondary mr-2'>
                      Ksh {item.amount}
                    </strong>
                    <span className='text-primary'>{item.category_name}</span>
                  </small>
                </div>
                <div className='media-footer ml-auto col-3 px-0 d-flex align-self-center align-items-center'>
                  <div>
                    <h3 className='mb-0 font-w600 text-black'>{item.count}</h3>
                    <span className='fs-14'>Sales </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
