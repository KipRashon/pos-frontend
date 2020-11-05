import React, {Component} from 'react';
import withTemplate from '../with-template';

class Pricing extends Component {
  render() {
    return (
      <div className='mt-3'>
        <h2>Pricing </h2>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='form-group'>
                <label htmlFor=''>Unit</label>
                <select name='' id='' className='form-control'>
                  <option value=''>Select Unit</option>
                  <option value='ml'>ML</option>
                  <option value='kg'>KG</option>
                  <option value='count'>Count</option>
                </select>
              </div>
              <div className='form-group ml-1'>
                <label htmlFor=''>Measure</label>

                <input
                  type='text'
                  className='form-control'
                  placeholder='Eg 300ml'
                />
              </div>
              <div className='form-group ml-1'>
                <label htmlFor=''>Cost</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder=' Eg 300'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTemplate(Pricing);
