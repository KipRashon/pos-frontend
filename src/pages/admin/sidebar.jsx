import React from 'react';
import {Link} from 'react-router-dom';

export default function SideBar() {
  return (
    <nav
      id='sidebarMenu'
      className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'
    >
      <div className='sidebar-sticky pt-3'>
        <ul className='nav flex-column'>
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
            <Link to={'/admin/sales'} className='nav-link'>
              <span data-feather='layers'></span>
              Sale History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
