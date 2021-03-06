import React, {useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {toast} from 'react-toastify';
import Modal from '../../../components/modal/modal';
import {
  handleError,
  handleSuccess,
  sendPostRequest,
} from '../../../services/api-handle';
import {objetPropEmpty} from '../../../services/utility';

function AddAdmin(props) {
  const {handleClose} = props;
  const [admin, setAdmin] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
  });

  const updateAdminProp = (obj) => {
    setAdmin({...admin, ...obj});
  };

  const saveAdmin = () => {
    if (admin.password !== admin.confirm_password) {
      toast.error('The two passwords do not match');
    } else if (objetPropEmpty(admin)) {
      toast.error('Do not leave fields empty');
    } else {
      trackPromise(
        handleError(
          handleSuccess(
            sendPostRequest('admins', admin),
            'Admin added successfully'
          ).then((res) => {
            handleClose();
          })
        )
      );
    }
  };
  return (
    <Modal>
      <div className=''>
        <div className='modal-header'>
          <div className='h4 text-center'>New Admin</div>
        </div>
        <div className='modal-body'>
          <div className='form-group'>
            <label htmlFor='firstname'>First name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter firstname'
              value={admin.firstname}
              onChange={(e) => updateAdminProp({firstname: e.target.value})}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='firstname'>Last name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter lastname'
              value={admin.lastname}
              onChange={(e) => updateAdminProp({lastname: e.target.value})}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='firstname'>Phone Number</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter phone number'
              value={admin.phone}
              onChange={(e) => updateAdminProp({phone: e.target.value})}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='firstname'>Email</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter email'
              value={admin.email}
              onChange={(e) => updateAdminProp({email: e.target.value})}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='firstname'>Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='Enter password'
              value={admin.password}
              onChange={(e) => updateAdminProp({password: e.target.value})}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='firstname'>Confirm Password</label>
            <input
              type='text'
              className='form-control'
              placeholder='Confirm password'
              value={admin.confirm_password}
              onChange={(e) =>
                updateAdminProp({confirm_password: e.target.value})
              }
            />
          </div>

          <div className='mt-2 mb-2 row justify-content-between pl-2 pr-2'>
            <button className='btn btn-secondary col-4' onClick={handleClose}>
              Cancel
            </button>
            <button className='btn btn-primary col-4' onClick={saveAdmin}>
              Save Admin
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddAdmin;
