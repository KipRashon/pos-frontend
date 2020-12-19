import React, {Component} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {Link} from 'react-router-dom';
import SelectPeriod from '../../../components/select-period/select-period';
import ToolTipElement from '../../../components/tooltip/tooltip-element';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../../services/api-handle';
import {time_periods} from '../../../services/constants';
import {
  formatDate,
  formatUrl,
  getFormattedAmount,
  getFromLocal,
} from '../../../services/utility';
import withTemplate from '../with-template';

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      period: time_periods.ALL_TIME.value,
    };
  }

  updateData = () => {
    const {period} = this.state;
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(formatUrl('sales', {period}))).then(
          (res) => {
            let sales = res.data.sales;
            this.setState({sales});
          }
        )
      )
    );
  };
  componentDidMount() {
    this.updateData();
  }
  handleDelete = (id) => {
    let currentUser = getFromLocal('currentUser');
    const updated_by = `${currentUser.firstname} ${currentUser.lastname}`;

    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(`sales/${id}/delete`, {sale_id: id, updated_by}),
          'Sale deleted successfully'
        ).then((res) => {
          this.updateData();
        })
      )
    );
  };

  updateFilter = (obj) => {
    this.setState({...this.state, ...obj}, () => this.updateData());
  };
  render() {
    const {sales, period} = this.state;
    return (
      <div className='mt-3'>
        <h2>Sales</h2>
        <div className='w-100 row justify-content-end mb-2'>
          <div className='form-group'>
            <SelectPeriod
              selectedPeriod={period}
              updatePeriod={(period) => this.updateFilter({period})}
            />
          </div>
        </div>
        <div className='table-responsive'>
          <table
            className='table display table-hover table-striped datatable'
            style={{width: '100%'}}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Sold By</th>
                <th>Payment Method</th>
                <th>Number</th>
                <th>Amount</th>
                <th>Customer Pay</th>
                <th>Customer Change</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={sale.id}>
                  <td>{++index}</td>
                  <td>
                    <Link to={'/admin/sales/view/' + sale.id}>
                      {sale.firstname + ' ' + sale.lastname}
                    </Link>
                  </td>
                  <td>{sale.payment_method}</td>
                  <td>{sale.goods_count}</td>
                  <td>{sale.total}</td>
                  <td>{getFormattedAmount(sale.customer_pay, 1)}</td>
                  <td>{getFormattedAmount(sale.customer_change, 1)}</td>
                  <td>{formatDate(sale.created_at)}</td>
                  <td>
                    {sale.status === 1 && (
                      <ToolTipElement
                        tooltip={`Deleted by ${sale.updated_by} at ${formatDate(
                          sale.updated_at
                        )}`}
                      >
                        <div className='badge badge-danger'>Deleted</div>
                      </ToolTipElement>
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

export default withTemplate(Sales);
