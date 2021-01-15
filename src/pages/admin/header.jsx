import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getFromLocal, removeFromLocalStorage} from '../../services/utility';
import $ from 'jquery';

export default function Header(props) {
  const handleLogout = () => {
    removeFromLocalStorage('currentUser');
    props.history.push('/');
  };

  useEffect(() => {
    $('.nav-control').on('click', function () {
      $('#main-wrapper').toggleClass('menu-toggle');

      $('.hamburger').toggleClass('is-active');
      $('.deznav').toggleClass('d-none');
      $('.content-body').toggleClass('ml-0');
    });
  }, []);

  let currentUser = getFromLocal('currentUser');
  return (
    <>
      <div className='nav-header'>
        <Link to='/admin' className='brand-logo h4 text-dark'>
          SCRATCH LTD
        </Link>

        <div className='nav-control'>
          <div className='hamburger'>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </div>
        </div>
      </div>
      <div className='header'>
        <div className='header-content'>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              <div className='header-left'></div>
              <ul className='navbar-nav header-right'>
                <li className='nav-item dropdown header-profile'>
                  <a
                    className='nav-link'
                    href='#'
                    role='button'
                    data-toggle='dropdown'
                  >
                    <div className='header-info'>
                      <span>
                        Hello, <strong>{currentUser.firstname}</strong>
                      </span>
                    </div>
                    <div
                      className='text-white h3 p-1 mr-2'
                      style={{color: '#fff'}}
                    >
                      <svg
                        id='icon-user1'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-white'
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      >
                        <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                        <circle cx='12' cy='7' r='4'></circle>
                      </svg>
                    </div>
                  </a>
                  <div className='dropdown-menu dropdown-menu-right'>
                    <a
                      href='app-profile.html'
                      className='dropdown-item ai-icon d-none'
                    >
                      <svg
                        id='icon-user1'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-primary'
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      >
                        <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                        <circle cx='12' cy='7' r='4'></circle>
                      </svg>
                      <span className='ml-2'>Profile </span>
                    </a>
                    <a
                      href='email-inbox.html'
                      className='dropdown-item ai-icon d-none'
                    >
                      <svg
                        id='icon-inbox'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-success'
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      >
                        <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
                        <polyline points='22,6 12,13 2,6'></polyline>
                      </svg>
                      <span className='ml-2'>Inbox </span>
                    </a>
                    <button
                      onClick={handleLogout}
                      className='dropdown-item ai-icon'
                    >
                      <svg
                        id='icon-logout'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-danger'
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      >
                        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                        <polyline points='16 17 21 12 16 7'></polyline>
                        <line x1='21' y1='12' x2='9' y2='12'></line>
                      </svg>
                      <span className='ml-2' onClick={handleLogout}>
                        Logout{' '}
                      </span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
