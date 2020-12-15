import React from 'react';
import renderer, {act} from 'react-test-renderer';
import LoginScreen from '../Components/LoginScreen';

const tree = renderer.create(<LoginScreen />);

describe('Login Screen Tests', () => {
  test('Renders an error message if fields are empty', () => {
    const instance = tree.getInstance();
    const serialNo = tree.root.findByProps({testID: 'serialNoTest'}).props;
    act(() => serialNo.onChangeText('', 'serialNo'));
    const password = tree.root.findByProps({testID: 'passwordTest'}).props;
    act(() => password.onChangeText('', 'password'));
    const loginButton = tree.root.findByProps({testID: 'loginButtonTest'})
      .props;
    act(() => loginButton.onPress());

    expect(instance.state.serialNo).toEqual('');
    expect(instance.state.password).toEqual('');
    expect(instance.state.error).toBeTruthy();
    expect(instance.state.errorMsg).toEqual('Fill all the fields');
  });

  test('Renders an error message if the passed credentials are incorrect', () => {
    const instance = tree.getInstance();
    const serialNo = tree.root.findByProps({testID: 'serialNoTest'}).props;
    act(() => serialNo.onChangeText('1010101010', 'serialNo'));
    const password = tree.root.findByProps({testID: 'passwordTest'}).props;
    act(() => password.onChangeText('incorrectPassword', 'password'));
    const loginButton = tree.root.findByProps({testID: 'loginButtonTest'})
      .props;
    act(() => loginButton.onPress());

    expect(instance.state.error).toBeTruthy();
    expect(instance.state.errorMsg).toEqual('Invalid credentials');
  });

  test('LoggedIn flag is set to true if valid credentials are passed', () => {
    const instance = tree.getInstance();
    const serialNo = tree.root.findByProps({testID: 'serialNoTest'}).props;
    act(() => serialNo.onChangeText('12345678', 'serialNo'));
    const password = tree.root.findByProps({testID: 'passwordTest'}).props;
    act(() => password.onChangeText('samplepwd', 'password'));
    const loginButton = tree.root.findByProps({testID: 'loginButtonTest'})
      .props;
    act(() => loginButton.onPress());

    expect(instance.state.error).toBeFalsy();
    expect(instance.state.loggedIn).toBeTruthy();
    expect(instance.state.errorMsg).toEqual('');
  });
});
