import React, {Component} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {
  handleError,
  handleSuccess,
  sendPostRequest,
} from '../../services/api-handle';
import {user_types} from '../../services/constants';
import {removeFromLocalStorage, storeUserLocally} from '../../services/utility';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        level: user_types.EMPLOYEE,
      },
    };
  }

  updatePropChange = (obj) => {
    this.setState({
      user: {
        ...this.state.user,
        ...obj,
      },
    });
  };
  componentDidMount() {
    removeFromLocalStorage('currentUser');
  }

  handleLogin = () => {
    const {user} = this.state;
    let url = 'admins/login';
    let successMessage = 'Login successful';
    let redirectUrl = '/admin';
    let isAdmin = user.level === user_types.ADMIN;
    if (!isAdmin) {
      url = 'employees/login';
      redirectUrl = '/employee';
    }
    trackPromise(
      handleError(
        handleSuccess(sendPostRequest(url, user), successMessage).then(
          (res) => {
            let user = res.data.user;
            storeUserLocally('currentUser', {
              ...user,
              isAdmin,
            });
            this.props.history.push(redirectUrl);
          }
        )
      )
    );
  };
  render() {
    const {user} = this.state;
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='card shadow shadow-secondary mt-4 col-md-5'>
            <div className='card-body'>
              <h1 className='jumbotron jumbotron-fluid bg-transparent'>
                POINT OF SALE
              </h1>
              <hr />
              <div className='form-group row justify-content-center'>
                <div
                  className='btn-group col-12'
                  role='group'
                  aria-label='Basic example'
                >
                  <button
                    type='button'
                    className={`btn btn-${
                      user.level === user_types.EMPLOYEE
                        ? 'white border-dark'
                        : 'dark'
                    }`}
                    onClick={() =>
                      this.updatePropChange({level: user_types.ADMIN})
                    }
                  >
                    Admin
                  </button>
                  <button
                    type='button'
                    className={`btn btn-${
                      user.level === user_types.ADMIN
                        ? 'white border-dark'
                        : 'dark'
                    }`}
                    onClick={() =>
                      this.updatePropChange({level: user_types.EMPLOYEE})
                    }
                  >
                    Employee
                  </button>
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter email'
                  onChange={(e) =>
                    this.updatePropChange({email: e.target.value})
                  }
                />
              </div>
              <div className='form-group'>
                <label htmlFor='username'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Enter password'
                  onChange={(e) =>
                    this.updatePropChange({password: e.target.value})
                  }
                />
              </div>

              <hr />
              <div className='row justify-content-center'>
                <button
                  className='btn btn-primary col-6'
                  onClick={this.handleLogin}
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
