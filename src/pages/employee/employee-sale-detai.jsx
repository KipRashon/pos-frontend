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
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body border-bottom-0 gradient-3'>
              <h1 className='text-center jumbotron w-100 bg-transparent'>
                Sale Details
              </h1>
              <br />
              <div className='p-2  row'>
                <div className='col text-white'>
                  Sold By : {`${sale.firstname} ${sale.lastname}`}
                </div>
                <div className='col text-white'>
                  Date: {formatDate(sale.created_at)}
                </div>
                <div className='col text-white'>Goods: {history.length}</div>
                <div className='col text-white'>Total: {sale.total}</div>
              </div>
            </div>
            <div className='card-body'>
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
        </div>
      </div>
    </div>
  );
}

export default withEmployeeValidation(EmployeeSaleDetail);
