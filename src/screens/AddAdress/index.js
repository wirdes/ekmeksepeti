import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {appStyle, H, W, w} from '~/utils';
import axios from 'axios';
import {updateProfile} from '~/redux/actions/authActions';

const AddAddress = props => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.auth);
  const [address, setAddress] = useState(userData.address);
  const [isLoading, setIsLoading] = useState(false);
  const updateAddress = async navigation => {
    setIsLoading(true);
    const body = {address, adminId: userData.userId};
    console.log(body);
    try {
      await axios.post(
        'https://backendfood.herokuapp.com/api/admin/addAddress',
        body,
      );
      Toast.show({
        type: 'success',
        text1: 'Güncellendi',
        text2:
          'Adresiniz Güncellendi. Anasayfaya Sayfasına yönlendiriliyorsunuz',
      });
      dispatch(updateProfile(userData.userId));

      setTimeout(() => {
        navigation.navigate('HomeScreen');
        setIsLoading(false);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.toast}>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
      <View style={style.textContainer}>
        <Text style={{fontSize: 25, color: appStyle.color}}>
          Adres Ekleme veya Değiştirme
        </Text>
      </View>
      <View style={style.form}>
        <TextInput
          multiline
          style={style.input}
          autoCapitalize="none"
          placeholder="Adresinizi Giriniz"
          value={address}
          onChangeText={d => setAddress(d)}
        />

        <TouchableOpacity
          disabled={isLoading}
          activeOpacity={isLoading ? 1 : 0.5}
          onPress={() => updateAddress(props.navigation)}
          style={style.button}>
          <Text style={style.buttonText}>
            {!isLoading ? 'Kaydet' : 'Kayıt ediliyor...'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: w,
  },
  toast: {
    flex: 2,
    width: w,
  },
  textContainer: {flex: 1},
  form: {flex: 4, alignItems: 'center', width: w},
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

  input: {
    margin: 5,
    width: W(80),
    height: H(25),
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

export {AddAddress};
