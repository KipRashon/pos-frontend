import React from 'react';
import {places} from '../../services/constants';
import withEmployeeValidation from './with-employee-validation';

function EmployeeWelcome(props) {
  return (
    <div
      className='row'
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        marginTop: '15vh',
      }}
    >
      <h1 className='jumbotron-fluid bg-transparent text-center col-12'>
        Menu
      </h1>
      <div
        className='col-md-8 pt-4 shadow shadow-dark   link emp-menu'
        style={{height: '80px'}}
        onClick={() => props.history.push(`/employee/dashboard/${places.BAR}`)}
      >
        <h5>
          Bar <i className='float-right fas fa-glass-cheers'></i>
        </h5>
      </div>
      <div
        className='col-md-8 pt-4 shadow shadow-dark   link emp-menu'
        style={{height: '80px'}}
        onClick={() =>
          props.history.push(`/employee/dashboard/${places.RESTAURANT}`)
        }
      >
        <h5>
          Restaurant <i class='float-right fas fa-utensils'></i>
        </h5>
      </div>
      <div
        className='col-md-8 pt-4 shadow shadow-dark   link emp-menu'
        style={{height: '80px'}}
        onClick={() => props.history.push(`/employee/sales`)}
      >
        <h5>
          Sale History <i class='float-right fas fa-history'></i>
        </h5>
      </div>
    </div>
  );
}

export default withEmployeeValidation(EmployeeWelcome);