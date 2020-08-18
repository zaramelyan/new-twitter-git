import React from 'react';
import { checkSession } from '../services/session';


//TODO: fix wrapper to stop login if authenticated

class AuthWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  async checkAuth() {
    const { history } = this.props;
    const isAuthenticated = await checkSession();

    if (!isAuthenticated) {
      history.replace('/login');
    } else {
      this.setState({
        isAuthenticated: true,
      });
    }

}

  componentDidMount() {
    this.checkAuth();
  }

  render() {
    const { isAuthenticated } = this.state;
    const { children } = this.props;
 
    return isAuthenticated ? children : <div>Authenticating...</div>;
  }
}

export default AuthWrapper;