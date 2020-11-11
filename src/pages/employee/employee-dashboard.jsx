import React, {Component} from 'react';
import Category from '../../components/category/category';
import Header from '../../components/header/header';
import ProcessTransaction from '../../components/process-transaction/process-transaction';
import Receipt from '../../components/receipt/receipt';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
  showNotification,
} from '../../services/api-handle';
import {
  formatUrl,
  getFormattedMeasure,
  getFromLocal,
} from '../../services/utility';
import './employee.scss';
import ReactToPrint from 'react-to-print-advanced';
import ReceiptPrint from '../../components/receipt/receipt-print';
import withEmployeeValidation from './with-employee-validation';
import {trackPromise} from 'react-promise-tracker';

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      filteredCategories: [],
      selectedCategoryId: '',
      q: '',
      selectedItem: {},
      cartItems: [],
      payment: {},
    };
    this.receiptRef = React.createRef();
  }
  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    let place = this.props.match.params.id;

    let url = formatUrl('categories', {place});
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(url)).then((res) => {
          let categories = res.data.categories;
          this.setState({
            categories: categories,
            filteredCategories: categories,
          });
        })
      )
    );
  }
  getFilteredCategories() {
    const {selectedCategoryId, q} = this.state;
    let place = this.props.match.params.id;

    let url = formatUrl(
      'categories/filtered',
      {category: selectedCategoryId},
      {q},
      {place}
    );
    handleError(
      handleSuccess(sendGetRequest(url)).then((res) => {
        this.setState({filteredCategories: res.data.categories});
      })
    );
  }

  handleChangeCategory = (e) => {
    this.setState({selectedCategoryId: e.target.value}, () =>
      this.getFilteredCategories()
    );
  };

  handleSearch = (e) => {
    this.setState({q: e.target.value}, () => this.getFilteredCategories());
  };

  onItemClick = (selectedItem) => {
    this.setState({selectedItem});
  };

  handleAddToCart = (item) => {
    let {cartItems} = this.state;
    let index = cartItems.findIndex(
      (cItem) =>
        cItem.id === item.id && item.price.measure === cItem.price.measure
    );
    if (index >= 0) {
      showNotification('Item updated in the cart', 'success', 'bottom-right');
      cartItems[index] = item;
    } else {
      showNotification('Item added to cart', 'success', 'bottom-right');
      cartItems.push(item);
    }

    this.setState({cartItems});
  };

  removeFromCart = (item) => {
    let {cartItems} = this.state;

    let index = cartItems.findIndex(
      (cItem) =>
        cItem.id === item.id && item.price.measure === cItem.price.measure
    );
    if (index >= 0) {
      cartItems.splice(index, 1);

      showNotification('Item removed from cart', 'warning', 'bottom-right');
      this.setState(cartItems);
    }
  };

  handleSale = (payment) => {
    const {cartItems} = this.state;
    const currentUser = getFromLocal('currentUser');

    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest('sales', {
            ...payment,
            sold_by: `${currentUser.id}`,
            sold_goods: cartItems.length,
          }).then((res) => {
            let saleResp = res.data.sale;
            this.setState({
              payment: {
                ...saleResp,
                sold_by_text: `${currentUser.firstname} ${currentUser.lastname}`,
              },
            });
            let goods = [];
            let quantities = [];
            let measures = [];
            let prices = [];

            cartItems.forEach((item) => {
              goods.push(item.id);
              quantities.push(parseInt(item.quantity));
              measures.push(
                getFormattedMeasure(item.price.unit, item.price.measure)
              );
              prices.push(`Ksh ${item.price.amount}`);
            });

            trackPromise(
              handleError(
                handleSuccess(
                  sendPostRequest('sales/history', {
                    goods,
                    quantities,
                    prices,
                    measures,
                    sale_id: saleResp.id,
                  }),
                  'Sale made successfully'
                ).then((res) => {
                  this.printReceipt();
                })
              )
            );
          })
        )
      )
    );
  };

  printReceipt = () => {
    this.setState(
      {payment: {...this.state.payment, title: 'Customer Bill'}},
      () => {
        document.getElementById('trigger-print').click();
      }
    );
  };

  render() {
    const {
      categories,
      filteredCategories,
      q,
      selectedItem,
      cartItems,
      payment,
    } = this.state;
    return (
      <div className='container-fluid'>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return (
              <a href='#' className='d-none' id='trigger-print'>
                Print this out!
              </a>
            );
          }}
          content={() => this.receiptRef.current}
          removeAfterPrint={true}
          onAfterPrint={() => {
            this.setState({
              selectedItem: {},
              cartItems: [],
              payment: {},
            });
          }}
        />
        <div style={{display: 'none'}}>
          <ReceiptPrint
            ref={this.receiptRef}
            cartItems={cartItems}
            payment={payment}
          />
        </div>

        <div className='row'>
          <Header place={this.props.match.params.id} />

          <div className='col-md-12 row mt-2 justify-content-center'>
            <div className='col-sm  side-part p-2 section'>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search anything'
                  aria-label="Recipient's username"
                  aria-describedby='basic-addon2'
                  value={q}
                  onChange={this.handleSearch}
                />
                <div className='input-group-append'>
                  <button className='btn btn-outline-secondary' type='button'>
                    <i className='fa fa-search'></i>
                  </button>
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='category'>Select Category</label>
                <select
                  name='
                '
                  id=''
                  className='form-control'
                  onChange={this.handleChangeCategory}
                >
                  <option value=''>All Categories</option>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {filteredCategories.map((category) =>
                category.goods.length ? (
                  <Category
                    category={category}
                    onItemClick={this.onItemClick}
                    key={category.id}
                  />
                ) : null
              )}
            </div>

            <div className='col-sm border-right border-dark border-left border-dark section'>
              <ProcessTransaction
                selectedItem={selectedItem}
                handleAddToCart={this.handleAddToCart}
              />
            </div>
            <div className='col-sm'>
              <Receipt
                cartItems={cartItems}
                removeFromCart={this.removeFromCart}
                handleSale={this.handleSale}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withEmployeeValidation(EmployeeDashboard);
