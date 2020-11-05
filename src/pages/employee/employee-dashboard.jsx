import React, {Component} from 'react';
import Category from '../../components/category/category';
import Header from '../../components/header/header';
import ProcessTransaction from '../../components/process-transaction/process-transaction';
import Receipt from '../../components/receipt/receipt';
import './employee.scss';

export default class EmployeeDashboard extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <Header title={'Welcome Rashon'} />

          <div className='col-md-12 row mt-2 justify-content-center'>
            <div className='col-sm  side-part p-2'>
              <div class='input-group mb-3'>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Search anything'
                  aria-label="Recipient's username"
                  aria-describedby='basic-addon2'
                />
                <div class='input-group-append'>
                  <button class='btn btn-outline-secondary' type='button'>
                    <i className='fa fa-search'></i>
                  </button>
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='category'>Select Category</label>
                <select
                  name='
                '
                  id=''
                  className='form-control'
                ></select>
              </div>

              <Category />
            </div>

            <div className='col-sm border-right border-dark border-left border-dark section'>
              <ProcessTransaction />
            </div>
            <div className='col-sm'>
              <Receipt />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
