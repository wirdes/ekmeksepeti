/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  onDecrease,
  onIncrease,
  removeFromCart,
} from '~/redux/actions/cartActions';
import {appStyle, H, w, W} from '~/utils';
import InputSpinner from 'react-native-input-spinner';
import axios from 'axios';

const Cart = props => {
  const dispatch = useDispatch();
  const {items, itemsCounter} = useSelector(state => state.cart);
  const {userData} = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);

  const totalPrice = items.reduce(
    (prev, cur) =>
      Number(prev) +
      Number(cur.price) *
        itemsCounter[itemsCounter.findIndex(e => e._id === cur._id)].quantity,
    0,
  );
  const orderComplate = async navigation => {
    setLoading(true);
    if (userData.address === undefined) {
      setLoading(false);
      Alert.alert(
        'Adres Hatası',
        'Lütfen sipariş vermeden önce adres ekleyiniz',
        [
          {
            text: 'Adres Ekle',
            onPress: () => navigation.navigate('AddAddress'),
            style: 'cancel',
          },
          {
            text: 'Tamam',
            style: 'cancel',
          },
        ],
      );
      return;
    }
    const body = {
      userId: userData.userId,
      orderElements: itemsCounter,
      address: userData.address,
      total: totalPrice.toString(),
    };
    try {
      let {data} = await axios.post(
        'https://backendfood.herokuapp.com/api/orders/add',
        body,
      );
      navigation.navigate('OrderDetails', data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={style.container}>
      {!itemsCounter.length <= 0 ? (
        <Text
          style={style.mainText}>{`Sepetteki Ürünler : ${items.length}`}</Text>
      ) : (
        <Text style={style.mainText}>{'Sepet boş'}</Text>
      )}

      <View style={style.list}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={items}
          renderItem={({item}) => {
            const a = itemsCounter.findIndex(e => e._id === item._id);
            return (
              <View style={style.renderItemContainer}>
                <View style={style.imageContainer}>
                  <Image style={style.orderImage} source={{uri: item.image}} />
                </View>
                <View style={style.descriptionContainer}>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      width: W(65),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(removeFromCart(item));
                      }}
                      style={{
                        height: 20,
                        width: 30,
                        borderRadius: 9,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 13,
                          color: 'white',
                        }}>
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: W(60),
                      justifyContent: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: appStyle.color,
                      }}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={style.priceContainer}>
                    <InputSpinner
                      skin={'Clean'}
                      onDecrease={() => dispatch(onDecrease(item))}
                      onIncrease={() => dispatch(onIncrease(item))}
                      min={1}
                      value={itemsCounter[a].quantity}
                    />
                    <View>
                      <Text
                        style={
                          style.priceText
                        }>{`Birim : ${item.price}₺`}</Text>
                      <Text style={style.priceText}>{`Toplam : ${
                        item.price * itemsCounter[a].quantity
                      }₺`}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View
          style={{
            backgroundColor: appStyle.secondColor,
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
          }}>
          {!itemsCounter.length <= 0 ? (
            <View
              style={{
                flexDirection: 'row',
                height: H(5),
                alignItems: 'center',
                justifyContent: 'space-around',
                width: w,
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  paddingRight: 15,
                  fontSize: 19,
                  color: appStyle.color,
                  fontWeight: 'bold',
                }}>{`Toplam: ${totalPrice}₺`}</Text>
              <TouchableOpacity
                onPress={() => orderComplate(props.navigation)}
                style={{
                  borderRadius: 5,
                  backgroundColor: appStyle.color,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 3,
                    width: W(30),
                    fontSize: 19,
                    color: appStyle.secondColor,
                    fontWeight: 'bold',
                  }}>
                  {loading ? 'Onaylanıyor..' : 'Onayla'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  list: {
    flex: 1,
  },
  priceText: {
    color: appStyle.color,
    padding: 3,
    fontWeight: 'bold',
    fontSize: 15,
  },
  priceContainer: {
    width: W(69),
    paddingRight: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  mainText: {
    color: appStyle.color,
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  descriptionContainer: {
    justifyContent: 'space-between',
    flex: 3,
    height: H(12),
    alignItems: 'center',
  },
  renderItemContainer: {
    //alignItems: 'center',
    paddingTop: 5,
    paddingLeft: 10,
    width: W(95),
    height: H(20),
    backgroundColor: appStyle.secondColor,
    borderRadius: 10,
    margin: 10,
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
    flexDirection: 'row',
  },
  orderImage: {
    borderRadius: 7,
    width: W(25),
    height: W(25),
  },
});

export {Cart};
