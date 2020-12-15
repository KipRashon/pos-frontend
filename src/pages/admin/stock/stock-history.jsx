import React, {Component} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
} from '../../../services/api-handle';
import {action_types} from '../../../services/constants';
import {
  formatDate,
  formatUrl,
  getDateTimeAgo,
  convertObjectToArray,
} from '../../../services/utility';
import withTemplate from '../with-template';

class StockHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      stock: {},
    };
  }

  updateData = () => {
    const {stock, place} = this.props;
    trackPromise(
      handleError(
        handleSuccess(
          sendGetRequest(formatUrl('stock/history', {stock_id: stock, place}))
        ).then((res) => {
          const {history, stock} = res.data;
          this.setState({history, stock});
        })
      )
    );
  };

  componentDidMount() {
    this.updateData();
  }

  getBadgeColor = (action_type) => {
    let action =
      convertObjectToArray(action_types).find(
        (act) => act.value === parseInt(action_type)
      ) || {};

    return (
      <span className={`badge badge-${action.badgeColor}`}>
        {action.display}
      </span>
    );
  };
  render() {
    const {history, stock} = this.state;
    return (
      <div className='mt-3'>
        <h3 className='text-center mb-2'>Stock history</h3>
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-lg-3 col-lg-4 col-12'>
                <h6 className='text-secondary'>Stock Name</h6>
                <p className='text-dark'>{stock.stock_name}</p>
              </div>
              <div className='col-lg-3 col-lg-4 col-12'>
                <h6 className='text-secondary'>Current Quantity</h6>
                <p className='text-dark'>{stock.quantity}</p>
              </div>
              <div className='col-lg-3 col-lg-4 col-12'>
                <h6 className='text-secondary'>Total Stock Cost</h6>
                <p className='text-dark'>{stock.price}</p>
              </div>
              <div className='col-lg-3 col-lg-4 col-12'>
                <h6 className='text-secondary'>Created</h6>
                <p className='text-dark'>{formatDate(stock.created_at)}</p>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-striped table-sm'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Buying Price</th>
                    <th>Quantity</th>
                    <th>Action Type</th>
                    <th>Updated By</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((hst, index) => (
                    <tr key={hst.id}>
                      <td>{++index}</td>
                      <td title={formatDate(hst.updated_at)}>
                        {getDateTimeAgo(hst.updated_at)}
                      </td>
                      <td>{'Ksh ' + hst.buying_price}</td>
                      <td>{hst.quantity}</td>
                      <td>{this.getBadgeColor(hst.action_type)}</td>
                      <td>{hst.updated_by}</td>
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
}

export default withTemplate(StockHistory);
