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
import {formatDate, formatUrl, getDateTimeAgo} from '../../../services/utility';
import withTemplate from '../with-template';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      q: '',
      filtered: [],
    };
  }

  fetchCategories = () => {
    const {q} = this.state;
    handleError(
      handleSuccess(
        sendGetRequest(formatUrl(q ? 'categories/filtered' : 'categories', {q}))
      ).then((res) => {
        let {categories} = res.data;
        this.setState({categories, filtered: categories});
      })
    );
  };
  componentDidMount() {
    this.fetchCategories();
  }

  updateShowAddCategory = (showAddCategory) => {
    this.setState({showAddCategory});
  };

  onDelete = (category) => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(`categories/${category.id}/delete`),
          'Category deleted successfully'
        ).then((res) => this.fetchCategories())
      )
    );
  };

  handleSearch = (e) => {
    this.setState({q: e.target.value}, () => this.fetchCategories());
  };

  render() {
    const {showAddCategory, categories, filtered, q} = this.state;

    return (
      <div className='mt-3'>
        {showAddCategory && (
          <AddCategory
            handleClose={() => {
              this.updateShowAddCategory(false);
              this.fetchCategories();
            }}
          />
        )}

        <h2>Categories </h2>
        <div className='w-100 row justify-content-end mb-2'>
          <div className='form-group mx-1'>
            <input
              type='text'
              className='form-control'
              placeholder='Type to search anything'
              onChange={this.handleSearch}
            />
            {q ? (
              <div className=' shadow shadow-dark autocomplete rounded bg-white'>
                <ul>
                  {filtered.map((category) =>
                    category.goods.map((good) => {
                      return (
                        <li
                          className='my-1 p-1'
                          key={`${category.id}_${good.id}`}
                        >
                          <Link
                            to={`/admin/products/${good.id}/pricing`}
                            className='w-100'
                          >
                            {good.name}{' '}
                            <span className='float-right badge badge-success p-1 rounded'>
                              {category.name}
                            </span>
                          </Link>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            ) : null}
          </div>
          <div className='form-group'>
            <button
              className='btn btn-info'
              onClick={() => this.updateShowAddCategory(true)}
            >
              <i className='fa fa-plus mr-2'></i>Add New
            </button>
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
                <th>Name</th>
                <th>Type</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{++index}</td>
                  <td>
                    <Link
                      to={`/admin/products/${category.id}`}
                      className='link'
                    >
                      {category.name}
                    </Link>
                  </td>
                  <td>
                    {category.place === places.BAR ? 'Bar' : 'Restaurant'}
                  </td>
                  <td>
                    <span title={formatDate(category.created_at)}>
                      {getDateTimeAgo(category.created_at)}
                    </span>
                  </td>
                  <td>
                    <span title={formatDate(category.updated_at)}>
                      {getDateTimeAgo(category.updated_at)}
                    </span>
                  </td>
                  <td>
                    <TableIcon onClick={() => this.onDelete(category)}>
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

function AddCategory(props) {
  const {handleClose} = props;
  const [category, setCategory] = useState({});
  const onSave = () => {
    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest('categories', category),
          'Category added successfully'
        ).then((res) => handleClose())
      )
    );
  };
  return (
    <Modal>
      <div className='modal-header'>
        <div className='h4 text-center'>Add Category</div>
      </div>
      <div className='modal-body'>
        <div className='form-group'>
          <label htmlFor=''>Type</label>
          <select
            name=''
            id=''
            className='form-control'
            onChange={(e) => setCategory({...category, place: e.target.value})}
          >
            <option value=''>Select Type</option>
            <option value={places.BAR}>Bar</option>
            <option value={places.RESTAURANT}>Restaurant</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter name '
            value={category.name}
            onChange={(e) => setCategory({...category, name: e.target.value})}
          />
        </div>

        <div className='mt-2 mb-2 row justify-content-between pl-2 pr-2'>
          <button className='btn btn-secondary col-4' onClick={handleClose}>
            Cancel
          </button>
          <button className='btn btn-primary col-4' onClick={onSave}>
            Save Category
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default withTemplate(Categories);
