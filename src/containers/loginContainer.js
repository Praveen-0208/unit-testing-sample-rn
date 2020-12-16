import React, {Component} from 'react';
import LoginScreen from '../Components/LoginScreen';
import {setLoggedInFlag} from '../actions/loginActions';
import {connect} from 'react-redux';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <LoginScreen {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (loginFlag) => {
      dispatch(setLoggedInFlag(loginFlag));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
