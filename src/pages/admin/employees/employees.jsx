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
import AddEmployee from './add-employee';

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddEmployee: false,
      employees: [],
    };
  }
  fetchEmployees() {
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest('employees')).then((res) => {
          let employees = res.data;
          this.setState({employees});
        })
      )
    );
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  updateShowAdmin = (showAddEmployee) => {
    this.setState({showAddEmployee});
  };

  onDelete = (employee) => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(`employees/${employee.id}/delete`),
          'Employee deleted successfully'
        ).then((res) => this.fetchEmployees())
      )
    );
  };
  render() {
    const {showAddEmployee, employees} = this.state;
    return (
      <div className='mt-3'>
        {showAddEmployee && (
          <AddEmployee
            handleClose={() => {
              this.updateShowAdmin(false);
              this.fetchEmployees();
            }}
          />
        )}

        <h2>Employees </h2>
        <div className='w-100 row justify-content-end mb-2'>
          <button
            className='btn btn-info'
            onClick={() => this.updateShowAdmin(true)}
          >
            <i className='fa fa-plus mr-2'></i>Add New
          </button>
        </div>
        <div className='table-responsive'>
          <table
            className='table display table-hover table-striped datatable'
            style={{width: '100%'}}
          >
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
              {employees.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{++index}</td>
                  <td>{emp.firstname + ' ' + emp.lastname}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.email}</td>
                  <td>
                    <span title={formatDate(emp.updated_at)}>
                      {getDateTimeAgo(emp.updated_at)}
                    </span>
                  </td>
                  <td>
                    <TableIcon onClick={() => this.onDelete(emp)}>
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

export default withTemplate(Employees);
