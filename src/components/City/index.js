/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {appStyle, H} from '~/utils';

const City = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={{alignItems: 'center'}}
      onPress={() => {
        navigation.replace('City', item);
      }}>
      <View style={style.container}>
        <Text style={style.textPla}>{item.plaka}</Text>
      </View>
      <Text style={style.textName}>{item.sehir}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: 55,
    width: H(11),
    height: H(11),
    marginLeft: 12.5,
    marginRight: 12.5,
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: appStyle.color,
    alignItems: 'center',
    justifyContent: 'center',
    //shadow-start
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    //shadow-end
  },
  textPla: {
    fontSize: 35,
    color: appStyle.secondColor,
    fontWeight: 'bold',
  },
  textName: {
    fontSize: appStyle.fontSize - 2,
    color: appStyle.color,
    paddingTop: -15,
  },
});

export {City};
