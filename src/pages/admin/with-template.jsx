import React from 'react';
import Header from './header';
import SideBar from './sidebar';
import './dashboard/dashboard.css';
import {getFromLocal} from '../../services/utility';

export default function withTemplate(WrappedComponent) {
  return class WithTemplate extends React.Component {
    constructor(props) {
      super(props);
      let currentUser = getFromLocal('currentUser');
      if (!currentUser) {
        this.props.history.push('/');
      } else if (!currentUser.isAdmin) {
        this.props.history.push('/');
      }
    }
    render() {
      return (
        <>
          <Header {...this.props} />
          <div className='container-fluid'>
            <div className='row'>
              <SideBar />

              <main
                role='main'
                className='col-md-9 ml-sm-auto col-lg-10 px-md-4'
              >
                <WrappedComponent {...this.props} />
              </main>
            </div>
          </div>
        </>
      );
    }
  };
}
