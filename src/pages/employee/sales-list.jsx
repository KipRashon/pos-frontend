import React from 'react';
import {Link} from 'react-router-dom';
import ToolTipElement from '../../components/tooltip/tooltip-element';
import {formatDate, getFormattedAmount} from '../../services/utility';

export default function SalesList(props) {
  const {sales, handleDelete, place} = props;
  return (
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
                  <td>
                    {sale.payment_method}
                    {sale.transaction_code ? (
                      <>
                        <br />
                        <b>Transaction Code: </b>
                        {sale.transaction_code}
                      </>
                    ) : null}
                  </td>
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
                        tooltip={`Edited by ${sale.updated_by} at ${formatDate(
                          sale.updated_at
                        )}`}
                      >
                        <div className='badge badge-success'>Edited</div>
                      </ToolTipElement>
                    )}

                    {sale.status === 1 && (
                      <ToolTipElement
                        tooltip={`Deleted by ${sale.updated_by} at ${formatDate(
                          sale.updated_at
                        )}`}
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
  );
}
