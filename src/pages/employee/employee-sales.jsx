import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {Link} from 'react-router-dom';
import Counter from '../../components/counter/counter';
import SelectPeriod from '../../components/select-period/select-period';
import ToolTipElement from '../../components/tooltip/tooltip-element';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../services/api-handle';
import {time_periods} from '../../services/constants';
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
  const [totals, setTotals] = useState({});
  const [period, setPeriod] = useState(time_periods.TODAY.value);

  const updateData = () => {
    let url = formatUrl('sales', {sold_by: currentUser.id, period});

    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(url)).then((res) => {
          let {sales, totals} = res.data;
          setSales(sales);
          setTotals(totals);
        })
      )
    );
  };

  useEffect(updateData, [period, currentUser.id]);

  const handleDelete = (id) => {
    const updated_by = `${currentUser.firstname} ${currentUser.lastname}`;

    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(`sales/${id}/delete`, {sale_id: id, updated_by}),
          'Sale deleted successfully'
        ).then((res) => {
          updateData();
        })
      )
    );
  };
  const place = props.match.params.place;

  return (
    <div className='container-fluid ml-2 mr-2'>
      <h2 className='text-center'>
        Sales for {currentUser.firstname}
        <div className='float-right mx-3'>
          <div className='form-group'>
            <SelectPeriod
              selectedPeriod={period}
              updatePeriod={(prd) => setPeriod(prd)}
            />
          </div>
        </div>
      </h2>
      <div className=''>
        <div className='card w-100 my-2'>
          <div className='card-body'>
            <div className='row justify-content-start'>
              <Counter
                title='Total Sales'
                icon='fa fa-shopping-cart'
                displayValue={totals.total_sales || 0}
              />
              {/* <Counter
                title='Total Expenses'
                icon='fa fa-dollar'
                displayValue={40}
              /> */}
              <Counter
                title='Total Credits in Ksh'
                icon='fa fa-exclamation-circle'
                displayValue={totals.total_credit_amount || 0}
              />
              <Counter
                title='Mpesa '
                icon='fa fa-dollar'
                displayValue={totals.mpesa_pay || 0}
              />
              <Counter
                title='Cash'
                icon='fa fa-money-bill-wave'
                displayValue={totals.cash_pay || 0}
              />
            </div>
          </div>
        </div>
        <div className='card w-100'>
          <div className='card-body'>
            <div className='table-responsive'>
              <table
                className='table display table-hover table-striped datatable'
                style={{width: '100%'}}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Number of goods</th>
                    <th>Total amount</th>
                    <th>Payment Type</th>
                    <th>
                      Customer Pay
                      <br />
                      Customer Change
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale, index) => (
                    <tr key={sale.id}>
                      <td>{++index}</td>
                      <td>
                        <Link to={`/employee/sales/view/${sale.id}`}>
                          {formatDate(sale.created_at)}
                        </Link>
                      </td>
                      <td>{sale.goods_count}</td>
                      <td>
                        <ToolTipElement
                          tooltip={
                            sale.mpesa_pay
                              ? `Mpesa Pay- ${sale.mpesa_pay}. Cash Pay-${sale.cash_pay}`
                              : ''
                          }
                        >
                          <span>{sale.total}</span>
                        </ToolTipElement>
                      </td>
                      <td>{sale.payment_method}</td>
                      <td>
                        {getFormattedAmount(sale.customer_pay, 1)}
                        <br />
                        {getFormattedAmount(sale.customer_change, 1)}
                      </td>
                      <td>
                        {sale.status !== 1 && (
                          <>
                            <button
                              className='btn btn-danger ml-1'
                              onClick={() => handleDelete(sale.id)}
                            >
                              <i className='fa fa-trash mr-2'></i>
                              Delete
                            </button>
                            <button
                              className='btn btn-info ml-1'
                              onClick={() =>
                                props.history.push(
                                  `/employee/dashboard/${place}/edit/${sale.id}`
                                )
                              }
                            >
                              <i className='fa fa-edit mr-2'></i>
                              Edit
                            </button>
                          </>
                        )}
                        {sale.status === 2 && (
                          <ToolTipElement
                            tooltip={`Edited by ${
                              sale.updated_by
                            } at ${formatDate(sale.updated_at)}`}
                          >
                            <div className='badge badge-success'>Edited</div>
                          </ToolTipElement>
                        )}

                        {sale.status === 1 && (
                          <ToolTipElement
                            tooltip={`Deleted by ${
                              sale.updated_by
                            } at ${formatDate(sale.updated_at)}`}
                          >
                            <div className='badge badge-danger'>Deleted</div>
                          </ToolTipElement>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withEmployeeValidation(EmployeeSales);
