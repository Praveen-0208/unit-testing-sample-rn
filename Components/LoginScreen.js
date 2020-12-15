import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Input, CheckBox, Button} from 'react-native-elements';
class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      serialNo: '',
      password: '',
      errorMsg: '',
      loggedIn: false,
      error: false,
    };
  }

  handleChange(value, fieldName) {
    this.setState({[fieldName]: value});
  }

  handleSubmit() {
    if (this.state.serialNo !== '' && this.state.password !== '') {
      if (
        this.state.serialNo === '12345678' &&
        this.state.password === 'samplepwd'
      ) {
        this.setState({loggedIn: true, error: false, errorMsg: ''});
      } else {
        this.setState({
          error: true,
          loggedIn: false,
          errorMsg: 'Invalid credentials',
        });
      }
    } else {
      this.setState({
        error: true,
        loggedIn: false,
        errorMsg: 'Fill all the fields',
      });
    }
  }

  render() {
    return (
      <View>
        <View style={styles.bgColor}></View>
        <View style={styles.loginCard}>
          <View style={styles.inputContainer}>
            <Input
              testID="serialNoTest"
              placeholder="Serial Number"
              leftIcon={
                <Image
                  source={require('../assets/UsernameIcon.png')}
                  style={styles.icon}
                />
              }
              onChangeText={(value, field = 'serialNo') =>
                this.handleChange(value, field)
              }
            />
            <Input
              testID="passwordTest"
              placeholder="Password"
              leftIcon={
                <Image
                  source={require('../assets/PasswordIcon.png')}
                  style={styles.icon}
                />
              }
              onChangeText={(value, field = 'password') =>
                this.handleChange(value, field)
              }
              secureTextEntry={true}
            />
            {this.state.error && (
              <Text testID="msgTest">{this.state.errorMsg}</Text>
            )}
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                testID="loginButtonTest"
                buttonStyle={styles.buttonStyles}
                titleStyle={styles.titleStyles}
                onPress={this.handleSubmit.bind(this)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgColor: {
    width: '100%',
    height: 283,
    backgroundColor: '#184589',
  },
  loginCard: {
    position: 'absolute',
    top: 203,
    left: '5%',
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    height: 308,
    elevation: 5,
  },
  logo: {
    alignSelf: 'center',
    marginTop: '8%',
  },
  mutedTextContainer: {
    width: 243,
    alignSelf: 'center',
  },
  mutedText: {
    color: '#7591F5',
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
  icon: {
    width: 15,
    height: 15,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginBottom: 30,
    paddingVertical: 20,
  },
  buttonStyles: {
    backgroundColor: '#184589',
    width: 186,
    height: 46,
    alignSelf: 'center',
    borderRadius: 25,
  },
  titleStyles: {
    fontSize: 20,
    fontWeight: '600',
  },
  checkboxContainer: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    padding: 0,
  },
  checkboxText: {
    fontWeight: '400',
    fontSize: 15,
  },
});

export default LoginScreen;
