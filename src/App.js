import React, {Component} from 'react';
import {Provider} from 'react-redux';
import LoginScreen from './containers/loginContainer';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );
  }
}

export default App;
