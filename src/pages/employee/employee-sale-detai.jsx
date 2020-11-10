import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {
  sendGetRequest,
  handleError,
  handleSuccess,
} from '../../services/api-handle';
import {formatDate, formatUrl} from '../../services/utility';
import withEmployeeValidation from './with-employee-validation';

function EmployeeSaleDetail(props) {
  const [sale, setSale] = useState({});
  const [history, setHistory] = useState([]);
  const saleId = props.match.params.id;

  useEffect(() => {
    let url = formatUrl('sales/history', {sale_id: saleId});

    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(url)).then((res) => {
          let sale = res.data.sale[0];
          let history = res.data.history;
          setSale(sale);
          setHistory(history);
        })
      )
    );
  }, []);
  return (
    <div className='container-fluid p-2 ml-2 mr-2'>
      <h4 className='text-center'>Sale Details</h4>
      <div className='p-2 col-12 row'>
        <div className='col'>
          Sold By : {`${sale.firstname} ${sale.lastname}`}
        </div>
        <div className='col'>Date: {formatDate(sale.created_at)}</div>
        <div className='col'>Goods: {history.length}</div>
        <div className='col'>Total: {sale.total}</div>
      </div>
      <div className='row justify-content-center pr-2 pl-2'>
        <div className='table-responsive'>
          <table className='table table-bordered table-hover'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Measure</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map((sale, index) => (
                <tr key={sale.id}>
                  <td>{++index}</td>
                  <td>{sale.good_name}</td>
                  <td>{sale.category_name}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.measure}</td>
                  <td>{sale.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withEmployeeValidation(EmployeeSaleDetail);
