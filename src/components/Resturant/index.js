/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {appStyle, H, numberToColorHsl, W} from '~/utils';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Resturant = prop => {
  const goToDetails = id => {
    prop.navigation.navigate('Details', {id: id});
  };
  const avgPoint =
    (prop.item.flavorPoint + prop.item.servicePoint + prop.item.speedPoint) / 3;
  const pointColor =
    avgPoint < 4
      ? 'red'
      : avgPoint >= 4 && avgPoint <= 7
      ? '#F1C40F'
      : avgPoint >= 7 && avgPoint <= 10
      ? 'green'
      : 'red';
  return (
    <TouchableOpacity
      onPress={() => goToDetails(prop.item._id)}
      style={styles.container}>
      <View
        style={{
          height: H(15),
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image style={styles.image} source={{uri: prop.item.picture}} />
        <View
          style={{
            width: W(10),
            backgroundColor: pointColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 22,
          }}>
          <Text style={{color: 'white', fontSize: 15}}>
            {avgPoint.toFixed(1)}
          </Text>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {prop.item.name}
        </Text>
        <Text numberOfLines={1} style={styles.address}>
          {prop.item.address}
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.2,
          }}
        />
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon size={15} name={'money-bill-wave'} color={appStyle.color} />
            <Text style={{fontSize: 12}}>{` Min: ${prop.item.min}₺`}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon size={15} name={'clock'} color={appStyle.color} />
            <Text style={{fontSize: 12}}>{` ${prop.item.clock} dk`}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon size={15} name={'motorcycle'} color={appStyle.color} />
            <Text style={{fontSize: 12}}>{` ${prop.item.price}₺`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: W(90),
    height: H(20),
    backgroundColor: appStyle.secondColor,
    padding: 15,
    margin: 10,
    borderRadius: 10,
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
  image: {
    height: H(10),
    width: H(10),
    borderRadius: 22,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingLeft: W(5),
    paddingBottom: H(1.8),
  },
  name: {
    color: appStyle.color,
    fontWeight: '700',
    fontSize: 22,
  },
  address: {
    width: W(45),
    color: appStyle.color2,
    fontWeight: 'bold',
    fontSize: 11,
    //margin: 3,
  },
});

export {Resturant};
