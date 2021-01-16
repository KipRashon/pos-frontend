import React from 'react';
import {Link} from 'react-router-dom';

export default function SideBar() {
  return (
    <div className='deznav'>
      <div className='deznav-scroll'>
        <div className='metismenu' id='menu'>
          <li className='nav-item'>
            <Link to={'/admin'} className='nav-link  '>
              <span data-feather='home'></span>
              Dashboard <span className='sr-only'>(current)</span>
            </Link>
          </li>

          <li className='nav-item'>
            <Link to={'/admin/admins'} className='nav-link'>
              <span data-feather='file'></span>
              Admins
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/admin/employees'} className='nav-link'>
              <span data-feather='shopping-cart'></span>
              Employees
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/admin/categories'} className='nav-link'>
              <span data-feather='users'></span>
              Categories
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/admin/stock'} className='nav-link'>
              <span data-feather='users'></span>
              Stock
            </Link>
          </li>

          <li className='nav-item'>
            <Link to={'/admin/sales'} className='nav-link'>
              <span data-feather='layers'></span>
              Sale History
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/admin/expenses'} className='nav-link'>
              <span data-feather='layers'></span>
              Expenses
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/admin/debtors'} className='nav-link'>
              <span data-feather='layers'></span>
              Debtors
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={'/admin/summary'} className='nav-link'>
              <span data-feather='layers'></span>
              Summary
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}
