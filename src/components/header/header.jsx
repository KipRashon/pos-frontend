import React from 'react';
import {Link} from 'react-router-dom';
import {places} from '../../services/constants';
import './header.scss';

function Header(props) {
  const {place} = props;

  return (
    <div className='employee-header w-100'>
      <div className='float-left pl-3 place-icon '>
        {parseInt(place) === places.BAR ? (
          <i className='fas fa-glass-cheers'></i>
        ) : (
          <i className='fas fa-utensils'></i>
        )}
      </div>
      <div className='dropdown float-right pr-3 dropleft'>
        <button
          className='btn bg-transparent dropdown-toggle '
          data-toggle='dropdown'
        >
          <i className='fas fa-bars'></i>
        </button>
        <div className='dropdown-menu ' aria-labelledby='dropdownMenuButton'>
          <Link className='dropdown-item ' to={`/employee/sales/${place}`}>
            Sales
          </Link>
          <Link className='dropdown-item ' to={'/employee'}>
            Main Page
          </Link>
          <Link className='dropdown-item ' to={'/'}>
            Logout
          </Link>
        </div>
      </div>
      <div className='h3 text-center text-white'>
        {parseInt(place) === places.BAR ? 'SCRATCH BAR' : 'SCRATCH RESTAURANT'}
      </div>
    </div>
  );
}

export default Header;
