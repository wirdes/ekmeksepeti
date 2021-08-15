import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/authActions';
import style from './loginStyle';

import {useSelector, useDispatch} from 'react-redux';
import {Logo} from '~/components/Logo';

const Login = props => {
  const dispatch = useDispatch();

  const {error} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userData} = useSelector(state => state.auth);
  const login = () => {
    if (email === '' || password === '') {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Lütfen alanları doldurunuz.',
      });
      return;
    }
    props.login(email, password);
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: `${error.message} ☠️`,
      });
    }
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
        <TouchableOpacity style={style.button} onPress={login}>
          <Text style={style.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <View style={style.register}>
          <Text style={style.registerTextPrimary}>
            Eğer hala hesabın yoksa,
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Kayıt')}>
            <Text style={style.registerText}> kayıt ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  userData: state.auth.userData,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(actions.login({email, password})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
