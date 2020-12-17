import React from 'react';
import * as types from '../src/actions/action-types';
import LoginScreen from '../src/Components/LoginScreen';
import loginReducer from '../src/reducers/loginReducer';
import {render, fireEvent} from '../utils/login-test-utils';
import renderer, {act} from 'react-test-renderer';

describe('Reducer returns the new state', () => {
  it('initially returns the default state', () => {
    expect(loginReducer(undefined, {})).toEqual(false);
  });
  it('handles the LOGGED_IN action', () => {
    expect(loginReducer(false, {type: types.LOGGED_IN, payload: true})).toEqual(
      true,
    );
  });
});

describe('component response to user input and user events', () => {
  it('Renders an error message if fields are empty', () => {
    const tree = renderer.create(<LoginScreen setLogin={jest.fn()} />);
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

  it('Renders an error message if the passed credentials are incorrect', () => {
    const tree = renderer.create(<LoginScreen setLogin={jest.fn()} />);
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

  it('store gets updated on valid input', () => {
    const mockSetLogin = jest.fn();
    const props = {
      setLogin: mockSetLogin,
    };
    const {getByPlaceholderText, getByText} = render(
      <LoginScreen {...props} />,
      {initialState: false},
    );

    fireEvent.changeText(getByPlaceholderText(/Serial Number/i), '12345678');
    fireEvent.changeText(getByPlaceholderText(/Password/i), 'samplepwd');
    fireEvent.press(getByText(/Login/i));

    expect(mockSetLogin).toBeCalledWith(true);
  });
});
