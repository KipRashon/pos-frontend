import React from 'react';
import './loader.scss';
import {usePromiseTracker} from 'react-promise-tracker';

function Loader() {
  const {promiseInProgress} = usePromiseTracker();
  if (promiseInProgress) {
    return (
      <div className='loader-container hidden-print'>
        <div className='loader'>
          <span>Loading...</span>
        </div>
      </div>
    );
  }
  return <></>;
}

export default Loader;
