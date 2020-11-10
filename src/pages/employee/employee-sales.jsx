import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
} from '../../services/api-handle';
import {
  formatDate,
  formatUrl,
  getFormattedAmount,
  getFromLocal,
} from '../../services/utility';
import withEmployeeValidation from './with-employee-validation';

function EmployeeSales(props) {
  const currentUser = getFromLocal('currentUser');
  const [sales, setSales] = useState([]);

  useEffect(() => {
    let url = formatUrl('sales', {sold_by: currentUser.id});

    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(url)).then((res) => {
          let sales = res.data.sales;
          setSales(sales);
        })
      )
    );
  }, []);
  return (
    <div className='container-fluid ml-2 mr-2'>
      <h4 className='text-center'>Sales for {currentUser.firstname}</h4>
      <div className='row justify-content-center'>
        <div className='table-responsive'>
          <table className='table table-bordered table-hover'>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Number of goods</th>
                <th>Total amount</th>
                <th>Payment Type</th>
                <th>Customer Pay</th>
                <th>Customer Change</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={sale.id}>
                  <td>{++index}</td>
                  <td>{formatDate(sale.created_at)}</td>
                  <td>{sale.goods_count}</td>
                  <td>{sale.total}</td>
                  <td>{sale.payment_method}</td>
                  <td>{getFormattedAmount(sale.customer_pay, 1)}</td>
                  <td>{getFormattedAmount(sale.customer_change, 1)}</td>
                  <td>
                    <button
                      className='btn btn-secondary'
                      onClick={() =>
                        props.history.push(`/employee/sales/view/${sale.id}`)
                      }
                    >
                      <i className='fa fa-eye mr-2'></i>
                      view
                    </button>
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

export default withEmployeeValidation(EmployeeSales);
