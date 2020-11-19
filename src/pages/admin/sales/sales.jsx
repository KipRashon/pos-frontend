import React, {Component} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
} from '../../../services/api-handle';
import {formatDate, getFormattedAmount} from '../../../services/utility';
import withTemplate from '../with-template';

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    };
  }
  componentDidMount() {
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest('sales')).then((res) => {
          let sales = res.data.sales;
          this.setState({sales});
        })
      )
    );
  }
  render() {
    const {sales} = this.state;
    return (
      <div className='mt-3'>
        <h2>
          Sales
          <small className='float-right'>
            <span className='badge badge-success'>Total- {sales.length}</span>
          </small>
        </h2>
        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={sale.id}>
                  <td>{++index}</td>
                  <td>{sale.firstname + ' ' + sale.lastname}</td>
                  <td>{sale.payment_method}</td>
                  <td>{sale.goods_count}</td>
                  <td>{sale.total}</td>
                  <td>{getFormattedAmount(sale.customer_pay, 1)}</td>
                  <td>{getFormattedAmount(sale.customer_change, 1)}</td>
                  <td>{formatDate(sale.created_at)}</td>
                  <td>
                    <button
                      className='btn btn-secondary'
                      onClick={() =>
                        this.props.history.push('/admin/sales/view/' + sale.id)
                      }
                    >
                      <i className='fa fa-eye mr-2'></i>
                      View
                    </button>
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
