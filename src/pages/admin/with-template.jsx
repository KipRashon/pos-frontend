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
        <div id='main-wrapper' className='show'>
          <Header {...this.props} />

          <SideBar />

          <div class='content-body' style={{minHeight: '100vh'}}>
            <div class='container-fluid'>
              <WrappedComponent {...this.props} />
            </div>
          </div>
        </div>
      );
    }
  };
}
