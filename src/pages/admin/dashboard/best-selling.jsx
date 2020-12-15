import React from 'react';

export default function BestSelling(props) {
  const {bestSelling} = props;
  return (
    <div class='row'>
      <div class='col-xl-12'>
        <div class='card'>
          <div class='card-header border-0 pb-0 d-sm-flex d-block'>
            <div>
              <h4 class='card-title mb-1'>Best Selling Items</h4>
            </div>
          </div>
          <div class='card-body p-0 pt-3 border-top border-darken-1'>
            {bestSelling.map((item, index) => (
              <div class='media items-list-1' key={item.pricing}>
                <span class='number col-1 px-0 align-self-center'>
                  #{++index}
                </span>
                <div class='media-body col-sm-4 col-6 col-xxl-5 px-0'>
                  <h5 class='mt-0 mb-3'>
                    <a class='text-black' href='ecom-product-detail.html'>
                      {item.stock_name}
                    </a>
                  </h5>
                  <small class='font-w500'>
                    <strong class='text-secondary mr-2'>
                      Ksh {item.amount}
                    </strong>
                    <span class='text-primary'>{item.category_name}</span>
                  </small>
                </div>
                <div class='media-footer ml-auto col-3 px-0 d-flex align-self-center align-items-center'>
                  <div>
                    <h3 class='mb-0 font-w600 text-black'>{item.count}</h3>
                    <span class='fs-14'>Sales </span>
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
