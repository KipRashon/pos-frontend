import React, {Component} from 'react';
import {getFromLocal} from '../../services/utility';

function withEmployeeValidation(WrappedComponent) {
  return class WithEmployeeValidation extends Component {
    render() {
      let currentUser = getFromLocal('currentUser');
      if (!currentUser || currentUser.isAdmin) {
        this.props.history.push('/');
        return <></>;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withEmployeeValidation;
