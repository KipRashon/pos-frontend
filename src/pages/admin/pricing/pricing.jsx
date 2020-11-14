import React, {Component} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {toast} from 'react-toastify';
import TableIcon from '../../../components/table-icon/table-icon';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../../services/api-handle';
import {
  formatDate,
  getDateTimeAgo,
  getFormattedMeasure,
} from '../../../services/utility';
import withTemplate from '../with-template';

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricings: [],
      selectedPricing: {},
      good: {},
    };
  }

  getPricings() {
    let goodId = this.props.match.params.id;
    if (!goodId) {
      toast.warn('The good id is required to view this page');
      this.props.history.goBack();
      return;
    }

    trackPromise(
      handleError(
        handleSuccess(sendGetRequest('pricings?good=' + goodId)).then((res) => {
          let pricings = res.data.pricings;
          let good = res.data.good;
          this.setState({pricings, good});
        })
      )
    );
  }

  componentDidMount() {
    this.getPricings();
  }

  updatePropChange = (obj) => {
    this.setState({
      selectedPricing: {
        ...this.state.selectedPricing,
        ...obj,
      },
    });
  };

  addPricing = () => {
    const {selectedPricing} = this.state;
    let goodId = this.props.match.params.id;

    let url = 'pricings',
      successMessage = 'Price added successfully';
    if (selectedPricing.id) {
      url = `pricings/${selectedPricing.id}/edit`;
      successMessage = 'Price updated successfully';
    }

    selectedPricing.good = goodId;
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(url, selectedPricing),
          successMessage
        ).then((res) => {
          this.getPricings();
        })
      )
    );
  };

  showEditPricing = (selectedPricing) => {
    this.setState({selectedPricing});
  };
  onDelete = (pricing) => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(`pricings/${pricing.id}/delete`)
        ).then((res) => this.getPricings())
      )
    );
  };
  render() {
    const {pricings, selectedPricing, good} = this.state;
    return (
      <div className='mt-3'>
        <h2>{`Pricing (${good.name})`} </h2>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='form-group'>
                <label htmlFor=''>Unit</label>
                <select
                  name=''
                  id=''
                  className='form-control'
                  onChange={(e) =>
                    this.updatePropChange({unit: e.target.value})
                  }
                  value={selectedPricing.unit}
                >
                  <option value=''>Select Unit</option>
                  <option value='ml'>ML</option>
                  <option value='kg'>KG</option>
                  <option value='count'>Count</option>
                </select>
              </div>
              <div className='form-group ml-1'>
                <label htmlFor=''>Measure - {selectedPricing.unit}</label>

                <input
                  type='text'
                  className='form-control'
                  placeholder='Eg 1/4'
                  value={selectedPricing.measure}
                  onChange={(e) =>
                    this.updatePropChange({measure: e.target.value})
                  }
                />
              </div>
              <div className='form-group ml-1'>
                <label htmlFor=''>Retail Price</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder=' Eg 300'
                  value={selectedPricing.amount}
                  onChange={(e) =>
                    this.updatePropChange({amount: e.target.value})
                  }
                />
              </div>
              <div className='form-group ml-1'>
                <label htmlFor=''>Online Price</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder=' Eg 400'
                  value={selectedPricing.online_price}
                  onChange={(e) =>
                    this.updatePropChange({online_price: e.target.value})
                  }
                />
              </div>
              <div className='form-group ml-2 mt-2 col-3'>
                <button
                  className='btn btn-primary mt-4 w-100'
                  onClick={this.addPricing}
                >
                  {selectedPricing.id ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='card mt-3'>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-striped table-sm'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Measure</th>
                    <th>Retail Price</th>
                    <th>Online Price</th>
                    <th>Created</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {pricings.map((pricing, index) => (
                    <tr key={pricing.id} className='link'>
                      <td>{++index}</td>
                      <td>
                        {getFormattedMeasure(pricing.unit, pricing.measure)}
                      </td>
                      <td>{'Ksh ' + pricing.amount}</td>
                      <td>{'Ksh ' + pricing.online_price}</td>
                      <td>
                        <span title={formatDate(pricing.created_at)}>
                          {getDateTimeAgo(pricing.created_at)}
                        </span>
                      </td>
                      <td>
                        <span title={formatDate(pricing.updated_at)}>
                          {getDateTimeAgo(pricing.updated_at)}
                        </span>
                      </td>
                      <td>
                        <div className='d-flex justify-content-around w-75'>
                          <TableIcon onClick={() => this.onDelete(pricing)}>
                            <i className='fa fa-trash'></i>
                          </TableIcon>
                          <TableIcon
                            onClick={() => this.showEditPricing(pricing)}
                          >
                            <i className='fa fa-edit'></i>
                          </TableIcon>
                        </div>
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
}

export default withTemplate(Pricing);
