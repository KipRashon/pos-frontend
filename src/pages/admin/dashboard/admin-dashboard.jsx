import React, {Component} from 'react';
import {trackPromise} from 'react-promise-tracker';
import Counter from '../../../components/counter/counter';
import SelectPeriod from '../../../components/select-period/select-period';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
} from '../../../services/api-handle';
import {time_periods} from '../../../services/constants';
import {formatUrl} from '../../../services/utility';
import withTemplate from '../with-template';
import BestSelling from './best-selling';
import SalesGraph from './sales-graph';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: {},
      period: time_periods.THIS_YEAR.value,
    };
  }
  componentDidMount() {
    this.updateData();
  }
  updateData = () => {
    const {period} = this.state;
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(formatUrl('dashboard', {period}))).then(
          (res) => {
            let totals = res.data.totals;
            this.setState({totals});
          }
        )
      )
    );
  };

  updateFilter = (obj) => {
    this.setState({...obj}, () => this.updateData());
  };

  render() {
    const {totals, period} = this.state;
    return (
      <div className='mt-3 row'>
        <div className='w-100 row justify-content-end mb-2'>
          <div className='form-group'>
            <SelectPeriod
              selectedPeriod={period}
              updatePeriod={(period) => this.updateFilter({period})}
            />
          </div>
        </div>
        <Counter
          title='Bar Sales'
          icon='fa fa-glass-cheers'
          displayValue={totals.bar_sales_count}
        />
        <Counter
          title='Restaurant Sales'
          icon='fa fa-utensils'
          displayValue={totals.restaurant_sales_count}
        />
        <Counter
          title={
            totals.restaurant_profit > 0
              ? 'Gross Restaurant Profit'
              : 'Gross Restaurant Loss'
          }
          icon='fa fa-dollar'
          displayValue={
            <span
              className={
                totals.restaurant_profit > 0 ? 'text-success' : 'text-danger'
              }
            >
              {Math.abs(totals.restaurant_profit).toFixed(1) + '%'}
            </span>
          }
        />

        <Counter
          title={totals.bar_profit > 0 ? 'Gross Bar Profit' : 'Gross Bar Loss'}
          icon='fa fa-dollar'
          displayValue={
            <span
              className={totals.bar_profit > 0 ? 'text-success' : 'text-danger'}
            >
              {Math.abs(totals.bar_profit).toFixed(1) + '%'}
            </span>
          }
        />

        <Counter
          title='Bar Stock Worth'
          icon='fa fa-dollar'
          displayValue={totals.bar_stock_worth}
        />
        <Counter
          title='Restaurant Stock Worth'
          icon='fa fa-dollar'
          displayValue={totals.restaurant_stock_worth}
        />
        <Counter
          title={<span className='text-danger'>Out of Stock!</span>}
          icon='fa fa-exclamation-triangle'
          displayValue={totals.out_of_stock}
          extraTitle='(Bar)'
        />
        <Counter
          title='Average Sales '
          extraTitle='Per day (Bar & Restaurant)'
          icon='fa fa-cart-arrow-down'
          displayValue={Math.ceil(totals.average_daily_sales)}
        />
        <hr className='w-100 border border-secondary' />
        <div className='col-xl-6 col-xxl-6 col-lg-12 col-md-12'>
          <SalesGraph
            barSales={totals.bar_sales || []}
            restaurantSales={totals.restaurant_sales || []}
            period={period}
          />
        </div>
        <div className='col-xl-6 col-xxl-6 col-lg-12  col-lg-9 col-md-12'>
          <BestSelling bestSelling={totals.best_selling || []} />
        </div>
      </div>
    );
  }
}

export default withTemplate(AdminDashboard);
