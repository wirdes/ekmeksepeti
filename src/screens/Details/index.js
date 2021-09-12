/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {appStyle, H, w, W} from '~/utils';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addToCart} from '~/redux/actions/cartActions';

const colorCalcu = avgPoint => {
  if (avgPoint < 4) {
    return 'red';
  } else if (avgPoint >= 4 && avgPoint <= 7) {
    return '#F1C40F';
  } else if (avgPoint >= 7 && avgPoint <= 10) {
    return 'green';
  }
};

const Details = props => {
  const dispatch = useDispatch();
  const [detailsData, setDetailsData] = useState({
    products: [{}],
    resturant: [{}],
  });
  const [loading, setLoading] = useState();

  async function fetchData() {
    setLoading(true);
    const {data} = await axios.get(
      `https://backendfood.herokuapp.com/api/resturant/restaurantDetails?id=${props.route.params.id}`,
    );
    setDetailsData(data);

    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [props.route.params.id]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Image
          style={styles.gif}
          source={require('../../assets/img/loading3.gif')}
        />
      ) : (
        <>
          <View style={styles.info}>
            <View
              style={{
                margin: 5,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <Image
                style={styles.image}
                source={{uri: detailsData.resturant[0].picture}}
              />
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text numberOfLines={1} style={styles.name}>
                  {`${detailsData.resturant[0].name}`}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      ...styles.pointTable,
                      backgroundColor: colorCalcu(
                        detailsData.resturant[0].speedPoint,
                      ),
                    }}>
                    <Text style={{color: 'white', fontSize: 13}}>Hız</Text>
                    <Text style={{color: 'white'}}>
                      {detailsData.resturant[0].speedPoint}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.pointTable,
                      backgroundColor: colorCalcu(
                        detailsData.resturant[0].servicePoint,
                      ),
                    }}>
                    <Text style={{color: 'white', fontSize: 13}}>Servis</Text>
                    <Text style={{color: 'white'}}>
                      {detailsData.resturant[0].servicePoint}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.pointTable,
                      backgroundColor: colorCalcu(
                        detailsData.resturant[0].flavorPoint,
                      ),
                    }}>
                    <Text style={{color: 'white', fontSize: 13}}>Lezzet</Text>
                    <Text style={{color: 'white'}}>
                      {detailsData.resturant[0].flavorPoint}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.innerContainer}>
              <View
                style={{
                  borderWidth: 1,
                  width: W(85),
                  borderColor: 'gray',
                }}
              />
              <View
                style={{
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Icon
                    size={15}
                    name={'money-bill-wave'}
                    color={appStyle.color}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                    }}>{`   Min: ${detailsData.resturant[0].min}₺`}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon size={15} name={'clock'} color={appStyle.color} />
                  <Text
                    style={{
                      fontSize: 12,
                    }}>{`   ${detailsData.resturant[0].clock} dk`}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon size={15} name={'motorcycle'} color={appStyle.color} />
                  <Text
                    style={{
                      fontSize: 12,
                    }}>{`   ${detailsData.resturant[0].price}₺`}</Text>
                </View>
              </View>
            </View>
          </View>
          {!detailsData.products.length <= 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={detailsData.products}
              renderItem={({item}) => {
                return (
                  <View style={styles.orderItem}>
                    <Image
                      style={styles.orderImage}
                      source={{uri: item.image}}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 19,
                        color: 'black',
                      }}>
                      {item.description}
                    </Text>
                    <View
                      style={{
                        width: W(80),
                        alignItems: 'baseline',
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => dispatch(addToCart(item))}
                        style={{
                          backgroundColor: appStyle.color,
                          padding: 5,
                          width: W(60),
                          borderRadius: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          Sepete Ekle
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.orderPrice}>{item.price + ' ₺'}</Text>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <Text style={{color: appStyle.color, fontSize: 50, margin: 25}}>
              Malesef bu restorantta ürün bulunmamaktadır.
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
  info: {
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
  },
  orderPrice: {color: appStyle.color, fontSize: 20, fontWeight: 'bold'},
  orderImage: {width: W(90), height: 45, borderRadius: 10, marginTop: 9},
  orderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: W(95),
    height: H(19),
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
  },
  gif: {
    borderWidth: 2,
    marginTop: H(80),
    height: H(12),
    width: W(12),
  },
  image: {
    height: H(13),
    width: W(32),
    borderRadius: 10,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingLeft: W(5),
    paddingBottom: H(1.8),
  },
  pointTable: {
    borderRadius: 9,
    width: W(12),
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    padding: 3,
  },

  name: {
    color: appStyle.color,
    fontWeight: '700',
    fontSize: 18,
  },
  address: {
    width: W(45),
    color: appStyle.color2,
    fontWeight: 'bold',
    fontSize: 11,
  },
});

export {Details};
