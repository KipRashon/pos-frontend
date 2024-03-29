import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Admins from './pages/admin/admins/admins';
import AdminDashboard from './pages/admin/dashboard/admin-dashboard';
import EmployeeDashboard from './pages/employee/employee-dashboard';
import Employees from './pages/admin/employees/employees';
import Login from './pages/login/login';
import Categories from './pages/admin/category/categories';
import Goods from './pages/admin/goods/goods';
import Pricing from './pages/admin/pricing/pricing';
import EmployeeWelcome from './pages/employee/employee-welcome';
import EmployeeSales from './pages/employee/employee-sales';
import EmployeeSaleDetail from './pages/employee/employee-sale-detai';
import SaleDetail from './pages/admin/sales/sale-detail';
import Sales from './pages/admin/sales/sales';
import Loader from './components/loader/loader';
import ReceiptPrint from './components/receipt/receipt-print';
import Stock from './pages/admin/stock/stock';
import StockHistory from './pages/admin/stock/stock-history';
import EmployeeStock from './pages/employee/employee-stock';
import Expenses from './pages/admin/expenses/expenses';
import Debtors from './pages/admin/debtors/debtors';
import Summary from './pages/admin/summary/summary';
import BarReceipt from './components/receipt/bar-receipt';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Routes() {
  let query = useQuery();
  return (
    <>
      <Loader />

      <ToastContainer hideProgressBar={true} />
      <Switch>
        <Route path='/login' render={(props) => <Login {...props} />}></Route>
        <Route
          exact
          path='/employee'
          render={(props) => <EmployeeWelcome {...props} />}
        ></Route>
        <Route
          exact
          path='/employee/dashboard/:id'
          render={(props) => <EmployeeDashboard {...props} />}
        ></Route>
        <Route
          exact
          path='/employee/dashboard/:id/edit/:sale_id'
          render={(props) => <EmployeeDashboard {...props} />}
        ></Route>
        <Route
          exact
          path='/employee/sales/:place'
          render={(props) => <EmployeeSales {...props} />}
        ></Route>
        <Route
          exact
          path='/employee/stock'
          render={(props) => <EmployeeStock {...props} />}
        ></Route>
        <Route
          exact
          path='/employee/sales/view/:id'
          render={(props) => <EmployeeSaleDetail {...props} />}
        ></Route>
        <Route
          exact
          path='/employee/print'
          render={(props) => (
            <ReceiptPrint
              {...props}
              sale_id={query.get('sale_id')}
              width={query.get('width')}
            />
          )}
        ></Route>
        <Route
          exact
          path='/employee/print-bar'
          render={(props) => (
            <BarReceipt
              {...props}
              sale_id={query.get('sale_id')}
              width={query.get('width')}
            />
          )}
        ></Route>
        <Route
          exact
          path='/admin'
          render={(props) => <AdminDashboard {...props} />}
        ></Route>
        <Route
          exact
          path='admin/dashboard'
          render={(props) => <AdminDashboard {...props} />}
        ></Route>
        <Route
          exact
          path='/admin/sales/view/:id'
          render={(props) => <SaleDetail {...props} />}
        ></Route>
        <Route
          exact
          path='/admin/sales'
          render={(props) => <Sales {...props} />}
        ></Route>
        <Route
          exact
          path='/admin/expenses'
          render={(props) => <Expenses {...props} />}
        ></Route>
        <Route
          exact
          path='/admin/debtors'
          render={(props) => <Debtors {...props} />}
        ></Route>
        <Route
          exact
          path='/admin/summary'
          render={(props) => <Summary {...props} />}
        ></Route>

        <Route
          exact
          path='/admin/admins'
          render={(props) => <Admins {...props} />}
        ></Route>
        <Route
          exact
          path='/admin/stock'
          render={(props) => <Stock {...props} />}
        ></Route>
        <Route
          exact
          path='/admin/stock/history'
          render={(props) => (
            <StockHistory
              {...props}
              stock={query.get('stock')}
              place={query.get('place')}
            />
          )}
        ></Route>
        <Route
          exact
          path='/admin/employees'
          render={(props) => <Employees {...props} />}
        ></Route>
        <Route
          exact
          path='/admin/categories'
          render={(props) => <Categories {...props} />}
        ></Route>

        <Route
          exact
          path='/admin/products/:id'
          render={(props) => <Goods {...props} />}
        ></Route>
        <Route
          exact
          path='/admin/products/:id/pricing'
          render={(props) => <Pricing {...props} />}
        ></Route>

        <Redirect exact to='/login' />
      </Switch>
    </>
  );
}

export default Routes;
