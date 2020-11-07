import React, {Component} from 'react';
import {toast} from 'react-toastify';
import TableIcon from '../../../components/table-icon/table-icon';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../../services/api-handle';
import {formatDate, getDateTimeAgo} from '../../../services/utility';
import withTemplate from '../with-template';

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricings: [],
      selectedPricing: {},
    };
  }

  getPricings() {
    let goodId = this.props.match.params.id;
    if (!goodId) {
      toast.warn('The good id is required to view this page');
      this.props.history.goBack();
      return;
    }

    handleError(
      handleSuccess(sendGetRequest('pricings?good=' + goodId)).then((res) => {
        let pricings = res.data.pricings;
        this.setState({pricings});
      })
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
    handleError(
      handleSuccess(sendPostRequest(url, selectedPricing), successMessage).then(
        (res) => {
          this.setState({
            selectedPricing: {},
          });
          this.getPricings();
        }
      )
    );
  };

  showEditPricing = (selectedPricing) => {
    this.setState({selectedPricing});
  };
  onDelete = (pricing) => {
    handleError(
      handleSuccess(
        sendPostRequest(`pricings/${pricing.id}/delete`)
      ).then((res) => this.getPricings())
    );
  };
  render() {
    const {pricings, selectedPricing} = this.state;
    return (
      <div className='mt-3'>
        <h2>Pricing </h2>
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
                <label htmlFor=''>Cost</label>
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
                    <th>Price</th>
                    <th>Created</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {pricings.map((pricing, index) => (
                    <tr
                      key={pricing.id}
                      className='link'
                      onClick={() => this.showEditPricing(pricing)}
                    >
                      <td>{++index}</td>
                      <td>{pricing.measure + ' ' + pricing.unit}</td>
                      <td>{'Ksh ' + pricing.amount}</td>
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
                        <TableIcon onClick={() => this.onDelete(pricing)}>
                          <i className='fa fa-trash'></i>
                        </TableIcon>
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
