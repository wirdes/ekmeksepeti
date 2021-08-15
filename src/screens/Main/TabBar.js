/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {appStyle} from '~/utils';

const TabBar = ({state: {index}, navigation: {jumpTo}}) => {
  return (
    <View style={style.container}>
      <TouchableOpacity
        disabled={index === 0}
        style={style.tabButton}
        onPress={() => jumpTo('HomeTab')}>
        <Icon
          name="home"
          color={index === 0 ? appStyle.color : '#808080'}
          size={25}
        />
        {index === 0 ? (
          <Text style={{color: appStyle.color}}>Ana Sayfa</Text>
        ) : (
          <Text style={{color: '#808080'}}>Ana Sayfa</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        disabled={index === 1}
        style={style.tabButton}
        onPress={() => jumpTo('Shopping')}>
        <Icon
          name="add-shopping-cart"
          color={index === 1 ? appStyle.color : '#808080'}
          size={25}
        />
        {index === 1 ? (
          <Text style={{color: appStyle.color}}>Sepet</Text>
        ) : (
          <Text style={{color: '#808080'}}>Sepet</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        disabled={index === 2}
        style={style.tabButton}
        onPress={() => jumpTo('Cart')}>
        <Icon
          name="shopping-cart"
          color={index === 2 ? appStyle.color : '#808080'}
          size={25}
        />
        {index === 2 ? (
          <Text style={{color: appStyle.color}}>Sepet</Text>
        ) : (
          <Text style={{color: '#808080'}}>Sepet</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  tabButton: {padding: 15},
  tabButtonMiddle: {top: -30, marginRight: 20},
});

export {TabBar};
