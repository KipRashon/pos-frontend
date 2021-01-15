import React, {useEffect, useState} from 'react';
import {trackPromise} from 'react-promise-tracker';
import Counter from '../../components/counter/counter';
import SelectPeriod from '../../components/select-period/select-period';
import {
  handleError,
  handleSuccess,
  sendGetRequest,
  sendPostRequest,
} from '../../services/api-handle';
import {time_periods} from '../../services/constants';
import {formatUrl, getFromLocal} from '../../services/utility';
import CreditorsList from './creditors-list';
import ExpensesList from './expenses-list';
import SalesList from './sales-list';
import withEmployeeValidation from './with-employee-validation';

const pages = {
  SALES: 1,
  EXPENSES: 2,
  CREDITORS: 3,
};
function EmployeeSales(props) {
  const currentUser = getFromLocal('currentUser');
  const [sales, setSales] = useState([]);
  const [totals, setTotals] = useState({});
  const [period, setPeriod] = useState(time_periods.TODAY.value);
  const [page, setPage] = useState(pages.SALES);

  const updateData = () => {
    let url = formatUrl('sales', {sold_by: currentUser.id, period});

    trackPromise(
      handleError(
        handleSuccess(sendGetRequest(url)).then((res) => {
          let {sales, totals} = res.data;
          setSales(sales);
          setTotals(totals);
        })
      )
    );
  };

  useEffect(updateData, [period, currentUser.id]);

  const handleDelete = (id) => {
    const updated_by = `${currentUser.firstname} ${currentUser.lastname}`;

    trackPromise(
      handleError(
        handleSuccess(
          sendPostRequest(`sales/${id}/delete`, {sale_id: id, updated_by}),
          'Sale deleted successfully'
        ).then((res) => {
          updateData();
        })
      )
    );
  };
  const place = props.match.params.place;

  return (
    <div className='container-fluid ml-2 mr-2'>
      <h2 className='text-center'>
        <div className='float-right mx-3'>
          <div className='form-group'>
            <SelectPeriod
              selectedPeriod={period}
              updatePeriod={(prd) => setPeriod(prd)}
            />
          </div>
        </div>
      </h2>
      <div className=''>
        <div className='card w-100 my-2'>
          <div className='card-body'>
            <div className='row justify-content-start'>
              <Counter
                title='Total Sales'
                icon='fa fa-shopping-cart'
                displayValue={totals.total_sales || 0}
                onClick={() => setPage(pages.SALES)}
              />
              <Counter
                title='Total Expenses'
                icon='fa fa-dollar'
                displayValue={totals.total_expenses || 0}
                onClick={() => setPage(pages.EXPENSES)}
              />
              <Counter
                title='Total Credits in Ksh'
                icon='fa fa-exclamation-circle'
                displayValue={totals.total_credit_amount || 0}
                onClick={() => setPage(pages.CREDITORS)}
              />
              <Counter
                title='Mpesa '
                icon='fa fa-dollar'
                displayValue={totals.mpesa_pay || 0}
              />
              <Counter
                title='Cash'
                icon='fa fa-money-bill-wave'
                displayValue={totals.cash_pay || 0}
              />
            </div>
          </div>
        </div>

        {page === pages.SALES ? (
          <SalesList sales={sales} handleDelete={handleDelete} place={place} />
        ) : page === pages.EXPENSES ? (
          <ExpensesList period={period} currentUser={currentUser} />
        ) : (
          <CreditorsList period={period} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
}

export default withEmployeeValidation(EmployeeSales);
