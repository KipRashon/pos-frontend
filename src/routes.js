import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
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

function Routes() {
  return (
    <Router>
      <ToastContainer hideProgressBar={true} />
      <Switch>
        <Route path='/login' render={(props) => <Login {...props} />}></Route>
        <Route
          path='/employee'
          render={(props) => <EmployeeDashboard {...props} />}
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
          path='/admin/admins'
          render={(props) => <Admins {...props} />}
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
        <Redirect exact to='login' />
      </Switch>
    </Router>
  );
}

export default Routes;
