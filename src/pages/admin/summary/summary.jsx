import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import SelectPeriod from '../../../components/select-period/select-period';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
} from '../../../services/api-handle';
import {time_periods} from '../../../services/constants';
import {formatDate, formatUrl} from '../../../services/utility';
import withTemplate from '../with-template';

function Summary() {
  const [period, setPeriod] = useState(time_periods.ALL_TIME.value);
  const [summary, setSummary] = useState([]);

  const updateData = () => {
    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(formatUrl('summary', {period}))).then(
          (res) => {
            setSummary(res.data.summary);
          }
        )
      )
    );
  };

  useEffect(updateData, [period]);

  return (
    <div className='mt-3'>
      <h1 className='mb-4'>
        Summary
        <div className='float-right'>
          <SelectPeriod
            selectedPeriod={period}
            updatePeriod={(period) => setPeriod(period)}
          />
        </div>
      </h1>

      {summary.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function HistoryItem(props) {
  const {item} = props;
  return (
    <div className='w-100 card'>
      <div className='card-header'>
        <h4>{formatDate(item.created_at)}</h4>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col border-right border-dark'>
            <DisplayLabel display={item.sales_total} label='Total Sales' />
            <DisplayLabel display={item.mpesa_sales} label='Mpesa sales' />
            <DisplayLabel display={item.cash_sales} label='Jumia sales' />
            <DisplayLabel display={item.card_sales} label='Card Sales' />
            <DisplayLabel display={item.glovo_sales} label='Glovo Sales' />
            <DisplayLabel
              display={item.uber_eats_sales}
              label='Uber Eats Sales'
            />
            <DisplayLabel
              display={item.little_cab_sales}
              label='Little Cab Sales'
            />
          </div>
          <div className='col '>
            <DisplayLabel display={item.credit_sales} label='Credit Sales' />
            <DisplayLabel
              display={item.expenses_amount_total}
              label='Total Expenses'
            />
            <DisplayLabel
              display={item.closing_bar_stock}
              label='Closing Bar Stock'
            />
            <DisplayLabel
              display={item.closing_restaurant_stock}
              label='Closing Restaurant Stock'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function DisplayLabel(props) {
  const {display, label} = props;
  return (
    <>
      <h6>{label}</h6>
      <p>{'Ksh ' + display}</p>
    </>
  );
}

export default withTemplate(Summary);
