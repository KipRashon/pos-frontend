import React from 'react';
import {Link} from 'react-router-dom';
import {places} from '../../services/constants';
import './header.scss';

function Header(props) {
  const {place} = props;

  return (
    <div className='header w-100'>
      <div className='float-left pl-3 '>
        {parseInt(place) === places.BAR ? (
          <i className='fas fa-glass-cheers'></i>
        ) : (
          <i className='fas fa-utensils'></i>
        )}
      </div>
      <div class='dropdown float-right pr-3 dropleft'>
        <button
          className='btn btn-light dropdown-toggle '
          data-toggle='dropdown'
        >
          <i className='fas fa-bars'></i>
        </button>
        <div class='dropdown-menu ' aria-labelledby='dropdownMenuButton'>
          <Link class='dropdown-item ' to={'/employee/sales'}>
            Sales
          </Link>
          <Link class='dropdown-item ' to={'/employee'}>
            Main Page
          </Link>
          <Link class='dropdown-item ' to={'/'}>
            Logout
          </Link>
        </div>
      </div>
      <div className='h3 text-center'>
        {parseInt(place) === places.BAR ? 'SCRATCH BAR' : 'SCRATCH RESTAURANT'}
      </div>
    </div>
  );
}

export default Header;
