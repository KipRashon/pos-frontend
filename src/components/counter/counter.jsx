import React from 'react';

export default function Counter(props) {
  const {icon, title, displayValue, extraTitle, onClick} = props;

  return (
    <div
      className='col-xl-3 col-xxl-3 col-lg-6 col-md-6 col-sm-6 animate__animated animate__zoomInUp'
      onClick={onClick}
    >
      <div className='widget-stat card'>
        <div className='card-body p-4'>
          <div className='media ai-icon'>
            <span className='mr-3 bgl-primary text-primary'>
              <i className={icon}></i>
            </span>
            <div className='media-body'>
              <h3 className='mb-0 text-black'>
                <span className='counter ml-0'>{displayValue}</span>
              </h3>
              <p className='mb-0'>{title}</p>
              {extraTitle ? <small>{extraTitle}</small> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
