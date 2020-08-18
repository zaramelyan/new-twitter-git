import React from 'react';
import AuthWrapper from '../hoc/AuthWrapper';

function withAuth(Component) {
    return class extends React.Component {
      render() {
        return (
          <AuthWrapper {...this.props}>
            <Component {...this.props} />
          </AuthWrapper>
        );
      }
    }
  }

export default withAuth;