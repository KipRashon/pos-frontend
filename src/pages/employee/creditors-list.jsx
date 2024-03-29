import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {Link} from 'react-router-dom';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../services/api-handle';
import {formatDate, formatUrl} from '../../services/utility';

export default function CreditorsList(props) {
  const {currentUser, period} = props;
  const [creditors, setCreditors] = useState([]);

  const updateData = () => {
    trackPromise(
      handleError(
        handleSuccess(
          sendGetRequest(
            formatUrl('creditors', {employee_id: currentUser.id, period})
          )
        ).then((res) => {
          setCreditors(res.data.creditors);
        })
      )
    );
  };

  const handleClear = (credit) => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest('creditors/clear', {
            credit_id: credit.id,
            is_cleared: !credit.is_cleared,
          }),
          'Credit Cleared successfully'
        ).then((res) => {
          updateData();
        })
      )
    );
  };
  useEffect(updateData, [period, currentUser.id]);
  return (
    <div className='card w-100'>
      <div className='card-header'>
        <h1>Creditors</h1>
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
                <th>Name</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Updated At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {creditors.map((creditor, index) => (
                <tr key={creditor.id}>
                  <td>{++index}</td>
                  <td>
                    <b>{creditor.creditor_name}</b>
                    <br />
                    {creditor.creditor_phone}
                  </td>
                  <td>{creditor.credit_amount}</td>
                  <td>
                    <span className='text-wrap'>{creditor.credit_reason}</span>
                  </td>
                  <td>{formatDate(creditor.updated_at)}</td>
                  <td>
                    {creditor.is_cleared ? (
                      <span className='badge badge-success'>Cleared</span>
                    ) : (
                      <span className='badge badge-warning'>Pending</span>
                    )}
                  </td>
                  <td>
                    {!creditor.is_cleared && (
                      <button
                        className={`btn btn-success mx-1`}
                        onClick={() => handleClear(creditor)}
                      >
                        Clear
                      </button>
                    )}
                    <Link
                      to={`/employee/sales/view/${creditor.sale_id}`}
                      className='btn btn-dark mx-1'
                    >
                      View Sale
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
