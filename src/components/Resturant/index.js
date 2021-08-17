import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {appStyle, H, W} from '~/utils';

const Resturant = ({item}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={{uri: item.picture}} />
      <View style={styles.innerContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>
        <Text numberOfLines={1} style={styles.address}>
          {item.address}
        </Text>
        <Text style={styles.address}>{item.phone}</Text>
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
    height: H(15),
    width: H(15),
    borderRadius: 99,
  },
  innerContainer: {
    justifyContent: 'space-between',
    paddingLeft: W(5),
    paddingBottom: H(1.8),
  },
  name: {
    color: appStyle.color,
    fontWeight: '700',
    fontSize: 20,
  },
  address: {
    width: W(45),
    color: appStyle.color2,
    fontWeight: 'bold',
    fontSize: 15,
    //margin: 3,
  },
});

export {Resturant};
