import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import Modal from '../../../components/modal/modal';
import SelectPeriod from '../../../components/select-period/select-period';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../../services/api-handle';
import {
  formatDate,
  formatUrl,
  getDateTimeAgo,
  getFromLocal,
} from '../../../services/utility';

import withTemplate from '../with-template';

function Expenses() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [period, setPeriod] = useState({});

  const toggleShowAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };

  const updateData = () => {
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(formatUrl('expenses', {period}))).then(
          (res) => {
            setExpenses(res.data.expenses);
          }
        )
      )
    );
  };

  useEffect(updateData, [period]);

  const handleDelete = (expense) => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest('expenses/delete', {expense_id: expense.id}),
          'Expense deleted successfully'
        ).then((res) => updateData())
      )
    );
  };
  const currentUser = getFromLocal('currentUser');

  return (
    <div className='mt-3'>
      <div className='card w-100'>
        {showAddExpense && (
          <AddExpense
            currentUser={currentUser}
            handleCloseModal={toggleShowAddExpense}
            updateData={updateData}
          />
        )}
        <div className='card-header'>
          <h1 className='w-100'>
            Expenses
            <div className='float-right row justify-content-end'>
              <div className='form-group mx-1'>
                <SelectPeriod
                  selectedPeriod={period}
                  updatePeriod={(period) => setPeriod(period)}
                />
              </div>
              <div className='form-group mx-1'>
                <button
                  className='btn btn-info '
                  onClick={toggleShowAddExpense}
                >
                  <i className='fa fa-plus mr-2'></i>
                  Add Expense
                </button>
              </div>
            </div>
          </h1>
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table
              className='table display table-hover table-striped datatable'
              style={{width: '100%'}}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recorded By</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={expense.id}>
                    <td>{++index}</td>
                    <td>
                      {expense.admin_name
                        ? expense.admin_name + ' (admin)'
                        : expense.employee_name + ' (employee)'}
                    </td>
                    <td>
                      <span className='text-wrap'>
                        {expense.expense_description}
                      </span>
                    </td>
                    <td>{expense.expense_amount}</td>
                    <td title={formatDate(expense.created_at)}>
                      {getDateTimeAgo(expense.created_at)}
                    </td>
                    <td title={formatDate(expense.updated_at)}>
                      {getDateTimeAgo(expense.updated_at)}
                    </td>
                    <td>
                      <button
                        className='btn btn-danger'
                        onClick={() => handleDelete(expense)}
                      >
                        <i className='fa fa-trash mr-2'></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddExpense(props) {
  const {handleCloseModal, currentUser, updateData} = props;
  const [expense, setExpense] = useState({});

  useEffect(() => {
    setExpense({admin_id: currentUser.id});
  }, [currentUser]);

  const handleSaveExpense = () => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest('expenses/new', expense),
          'Expense added successfully'
        ).then((res) => {
          handleCloseModal();
          updateData();
        })
      )
    );
  };

  return (
    <Modal>
      <div className=''>
        <div className='modal-header'>
          <div className='h4 text-center'>Expense Details</div>
        </div>
        <div className='modal-body'>
          <div className='form-group'>
            <label htmlFor=''>Expense Amount</label>
            <input
              type='number'
              className='form-control'
              placeholder='E.g 400'
              value={expense.expense_amount}
              onChange={(e) =>
                setExpense({...expense, expense_amount: e.target.value})
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Expense Description</label>
            <textarea
              name=''
              id=''
              cols='30'
              rows='3'
              className='form-control'
              placeholder='E.g Payment for motorbike'
              value={expense.expense_description}
              onChange={(e) =>
                setExpense({...expense, expense_description: e.target.value})
              }
            ></textarea>
          </div>
          <div className='mt-2 mb-2 row justify-content-between pl-2 pr-2'>
            <button
              className='btn btn-secondary col-4'
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className='btn btn-primary col-4'
              onClick={handleSaveExpense}
            >
              Save Expense
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default withTemplate(Expenses);
