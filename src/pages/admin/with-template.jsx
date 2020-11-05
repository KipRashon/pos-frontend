import React from 'react';
import Header from './header';
import SideBar from './sidebar';
import './dashboard/dashboard.css';

export default function withTemplate(WrappedComponent) {
  return class WithTemplate extends React.Component {
    render() {
      return (
        <>
          <Header />
          <div class='container-fluid'>
            <div class='row'>
              <SideBar />

              <main role='main' class='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
                <WrappedComponent {...this.props} />
              </main>
            </div>
          </div>
        </>
      );
    }
  };
}
