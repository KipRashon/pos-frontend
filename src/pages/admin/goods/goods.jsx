import React, {Component, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import {Link} from 'react-router-dom';
import Modal from '../../../components/modal/modal';
import TableIcon from '../../../components/table-icon/table-icon';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../../services/api-handle';
import {places} from '../../../services/constants';
import {formatDate, getDateTimeAgo} from '../../../services/utility';
import withTemplate from '../with-template';

class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProduct: false,
      products: [],
      category: {},
    };
  }
  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    let categoryId = this.props.match.params.id;
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(`products?category=${categoryId}`)).then(
          (res) => {
            let {products, category} = res.data;
            this.setState({products, category});
          }
        )
      )
    );
  }
  updateShowAddProduct = (showAddProduct) => {
    this.setState({showAddProduct});
  };
  onDelete = (good) => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(`products/${good.id}/delete`),
          'Product deleted successfully'
        ).then((res) => this.fetchProducts())
      )
    );
  };
  render() {
    const {showAddProduct, products, category} = this.state;
    return (
      <div className='mt-3'>
        {showAddProduct && (
          <AddProduct
            handleClose={() => {
              this.updateShowAddProduct(false);
              this.fetchProducts();
            }}
            category={this.props.match.params.id}
          />
        )}
        <h2>{`Products (${category.name})`}</h2>
        <div className='w-100 row justify-content-end mb-2'>
          <button
            className='btn btn-info'
            onClick={() => this.updateShowAddProduct(true)}
          >
            <i className='fa fa-plus mr-2'></i>Add New
          </button>
        </div>
        <div className='table-responsive'>
          <table
            className='table display table-hover table-striped datatable'
            style={{width: '100%'}}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr>
                  <td>{++index}</td>
                  <td>
                    <Link
                      to={`/admin/products/${product.id}/pricing`}
                      className='link'
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td>
                    <span title={formatDate(product.created_at)}>
                      {getDateTimeAgo(product.created_at)}
                    </span>
                  </td>
                  <td>
                    <span title={formatDate(product.updated_at)}>
                      {getDateTimeAgo(product.updated_at)}
                    </span>
                  </td>
                  <td>
                    <TableIcon onClick={() => this.onDelete(product)}>
                      <i className='fa fa-trash'></i>
                    </TableIcon>
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

function AddProduct(props) {
  const {handleClose, category} = props;
  const [product, setProduct] = useState({});

  const onSave = () => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest('products', {...product, category}),
          'Product added successfully'
        ).then((res) => handleClose())
      )
    );
  };
  return (
    <Modal>
      <div className='modal-header'>
        <div className='h4 text-center'>Add Product</div>
      </div>
      <div className='modal-body'>
        <div className='form-group'>
          <label htmlFor=''>Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter name '
            value={product.name}
            onChange={(e) => setProduct({...product, name: e.target.value})}
          />
        </div>

        <div className='mt-2 mb-2 row justify-content-between pl-2 pr-2'>
          <button className='btn btn-secondary col-4' onClick={handleClose}>
            Cancel
          </button>
          <button className='btn btn-primary col-4' onClick={onSave}>
            Save Product
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default withTemplate(Goods);
