import React, {Component} from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='card shadow shadow-secondary mt-4'>
            <div className='card-body'>
              <h1 className='jumbotron jumbotron-fluid bg-transparent'>
                SCRATCH KITCHEN
              </h1>
              <hr />
              <div className='form-group row justify-content-center'>
                <div
                  className='btn-group col-12'
                  role='group'
                  aria-label='Basic example'
                >
                  <button type='button' className='btn btn-dark mr-1'>
                    Admin
                  </button>
                  <button
                    type='button'
                    className='btn btn-light border  border-dark'
                  >
                    Employee
                  </button>
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter username'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='username'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Enter password'
                />
              </div>

              <hr />
              <div className='row justify-content-center'>
                <button
                  className='btn btn-primary col-6'
                  onClick={() => this.props.history.push('/admin')}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
