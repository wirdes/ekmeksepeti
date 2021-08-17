import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {useSelector} from 'react-redux';
import {appStyle, H, W, w} from '~/utils';
import {Logo} from '~/components';

import * as actions from '../../redux/actions/authActions';

const Register = props => {
  const {error} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const register = () => {
    if (email === '' || password === '' || name === '' || surname === '') {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Lütfen alanları doldurunuz.',
      });
      return;
    }
    props.register(name, surname, email, password);
  };

  return (
    <View style={style.container}>
      <View style={style.toast}>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
      <View style={style.form}>
        <Logo color="purple" secondColor="white" noborder />
        <TextInput
          style={style.input}
          autoCapitalize="none"
          placeholder="Ad"
          value={name}
          onChangeText={d => setName(d)}
        />
        <TextInput
          style={style.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Soyad"
          value={surname}
          onChangeText={d => setSurname(d)}
        />
        <TextInput
          style={style.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="E-mail"
          value={email}
          onChangeText={d => setEmail(d)}
        />
        <TextInput
          style={style.input}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Şifre"
          value={password}
          onChangeText={d => setPassword(d)}
        />
        <TouchableOpacity style={style.button} onPress={register}>
          <Text style={style.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <View style={style.register}>
          <Text style={style.registerTextPrimary}>
            Eğer zaten hesabın varsa,
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={style.registerText}> giriş yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', width: w},
  toast: {
    flex: 1,
    width: w,
  },
  register: {
    flexDirection: 'row',
  },
  form: {flex: 13, alignItems: 'center', width: w},
  button: {
    width: W(80),
    height: H(7),
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: appStyle.color,
    borderRadius: 25,
    //shadow-start
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    //shadow-end
  },
  buttonText: {
    fontSize: appStyle.buttonTextSize,
    color: appStyle.secondColor,
  },
  registerTextPrimary: {
    marginTop: W(5),
    fontSize: appStyle.fontSize,
    color: 'black',
  },
  registerText: {
    marginTop: W(5),
    fontSize: appStyle.fontSize,
    color: 'blue',
  },
  input: {
    margin: 5,
    width: W(80),
    height: H(7),
    borderRadius: 15,
    textAlign: 'center',
    //shadow-start
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    //shadow-end
  },
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  userData: state.auth.userData,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  register: (name, surname, email, password) =>
    dispatch(actions.register({name, surname, email, password})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
