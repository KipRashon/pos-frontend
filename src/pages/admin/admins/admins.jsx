import React, {Component} from 'react';
import {trackPromise} from 'react-promise-tracker';
import TableIcon from '../../../components/table-icon/table-icon';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../../services/api-handle';
import {formatDate, getDateTimeAgo} from '../../../services/utility';
import withTemplate from '../with-template';
import AddAdmin from './add-admin';

class Admins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddAdmin: false,
      admins: [],
    };
  }
  fetchAdmins() {
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest('admins')).then((res) => {
          let admins = res.data;
          this.setState({admins});
        })
      )
    );
  }

  componentDidMount() {
    this.fetchAdmins();
  }

  updateShowAdmin = (showAddAdmin) => {
    this.setState({showAddAdmin});
  };

  onDelete = (admin) => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(`admins/${admin.id}/delete`),
          'Admin deleted successfully'
        ).then((res) => this.fetchAdmins())
      )
    );
  };
  render() {
    const {showAddAdmin, admins} = this.state;
    return (
      <div className='mt-3'>
        {showAddAdmin && (
          <AddAdmin
            handleClose={() => {
              this.updateShowAdmin(false);
              this.fetchAdmins();
            }}
          />
        )}

        <h2>Admins </h2>
        <div className='w-100 row justify-content-end mb-2'>
          <button
            className='btn btn-info'
            onClick={() => this.updateShowAdmin(true)}
          >
            <i className='fa fa-plus mr-2'></i>Add New
          </button>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin.id}>
                  <td>{++index}</td>
                  <td>{admin.firstname + ' ' + admin.lastname}</td>
                  <td>{admin.phone}</td>
                  <td>{admin.email}</td>
                  <td>
                    <span title={formatDate(admin.updated_at)}>
                      {getDateTimeAgo(admin.updated_at)}
                    </span>
                  </td>
                  <td>
                    <TableIcon onClick={() => this.onDelete(admin)}>
                      <i className='fa fa-trash'></i>
                    </TableIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withTemplate(Admins);
