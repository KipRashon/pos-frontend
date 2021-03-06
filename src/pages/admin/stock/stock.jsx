import React, {Component} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {Link} from 'react-router-dom';
import Pagination from '../../../components/pagination/pagination';
import TableIcon from '../../../components/table-icon/table-icon';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../../services/api-handle';
import {places} from '../../../services/constants';
import {formatUrl} from '../../../services/utility';
import withTemplate from '../with-template';
import AddStock from './add-stock';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: places.BAR,
      stock: {data: []},
      showAddStock: false,
      selectedStock: {},
      isAddEdit: false,
      q: '',
    };
  }

  updateData = (page) => {
    const {q} = this.state;
    handleError(
      handleSuccess(
        sendGetRequest(
          formatUrl('stock', {place: this.state.selectedPlace, page, q})
        )
      ).then((res) => {
        let {stock} = res.data;
        this.setState({stock, selectedStock: {}});
      })
    );
  };

  componentDidMount() {
    this.updateData();
  }

  updatePropChange = (obj) => {
    this.setState({...this.state, ...obj}, () => this.updateData());
  };

  onDelete = (item) => {
    const {selectedPlace} = this.state;
    let url = `stock/${item.id}/delete`;

    if (selectedPlace === places.BAR) {
      url = `pricings/${item.id}/delete`;
    }

    trackPromise(
      handleError(
        handleSuccess(sendPostRequest(url)).then((res) => {
          this.updateData();
        })
      )
    );
  };

  onEdit = (selectedStock) => {
    this.setState({selectedStock, showAddStock: true, isAddEdit: true});
  };

  onAddStock = (selectedStock) => {
    this.setState({selectedStock, showAddStock: true, isAddEdit: false});
  };

  toggleShowAdd = () => {
    this.setState({
      showAddStock: !this.state.showAddStock,
      selectedStock: {},
      isAddEdit: true,
    });
  };

  handleSearch = (e) => {
    this.setState({q: e.target.value}, () => this.updateData());
  };

  render() {
    const {
      selectedPlace,
      stock,
      showAddStock,
      selectedStock,
      isAddEdit,
    } = this.state;
    return (
      <div className='mt-3'>
        <h2>Stock</h2>
        {showAddStock && (
          <AddStock
            selectedStock={selectedStock}
            handleCloseModal={this.toggleShowAdd}
            updateData={this.updateData}
            selectedPlace={selectedPlace}
            isAddEdit={isAddEdit}
          />
        )}
        <div className='row '>
          <div className='col row justify-content-start'>
            <div className='form-group'>
              <div
                className='btn-group col-12'
                role='group'
                aria-label='Basic example'
              >
                <button
                  type='button'
                  className={`btn btn-${
                    selectedPlace === places.RESTAURANT
                      ? 'white border-dark'
                      : 'dark'
                  }`}
                  onClick={() =>
                    this.updatePropChange({selectedPlace: places.BAR})
                  }
                >
                  Bar Stock
                </button>
                <button
                  type='button'
                  className={`btn btn-${
                    selectedPlace === places.BAR ? 'white border-dark' : 'dark'
                  }`}
                  onClick={() =>
                    this.updatePropChange({selectedPlace: places.RESTAURANT})
                  }
                >
                  Restaurant Stock
                </button>
              </div>
            </div>
          </div>
          <div className='col row justify-content-end'>
            <div className='form-group mx-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Type to search'
                onChange={this.handleSearch}
              />
            </div>
            {selectedPlace === places.RESTAURANT && (
              <div className='form-group'>
                <button className='btn btn-info' onClick={this.toggleShowAdd}>
                  <i className='fa fa-plus mr-2'></i>
                  Add Stock
                </button>
              </div>
            )}
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
                <th>Good</th>
                <th>Quantity</th>
                <th>@</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stock.data.map((item, index) => (
                <tr key={item.id}>
                  <td>{++index}</td>
                  <td>
                    <Link
                      to={formatUrl('/admin/stock/history', {
                        stock: item.id,
                        place: selectedPlace,
                      })}
                    >
                      {item.stock_name}
                    </Link>
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.buying_price ? 'Ksh ' + item.buying_price : '_'}
                  </td>
                  <td>{'Ksh ' + item.price}</td>
                  <td>
                    <div className='d-flex justify-content-center w-75'>
                      {selectedPlace === places.RESTAURANT ? (
                        <TableIcon onClick={() => this.onEdit(item)}>
                          <i className='fa fa-edit'></i>
                        </TableIcon>
                      ) : null}
                      <TableIcon onClick={() => this.onAddStock(item)}>
                        <i className='fa fa-plus'></i>
                      </TableIcon>
                      <TableIcon onClick={() => this.onDelete(item)}>
                        <i className='fa fa-trash'></i>
                      </TableIcon>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination data={stock} updateData={this.updateData} />
        </div>
      </div>
    );
  }
}

export default withTemplate(Stock);
