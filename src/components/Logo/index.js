/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {W} from '~/utils';

const Logo = props => {
  const style = StyleSheet.create({
    logo: {
      alignItems: 'center',
      paddingRight: W(5),
      paddingLeft: W(5),
      borderWidth: props.noborder ? 0 : 4,
      borderColor: props.color,
      borderRadius: 55,
    },
    text: {
      top: -45,
      fontSize: 35,
      fontWeight: 'bold',
      textAlign: 'center',
      color: props.color,
    },
  });
  return (
    <View style={style.logo}>
      {!props.noIcon && (
        <MaterialIcons name={'bakery-dining'} color={props.color} size={200} />
      )}
      <Text style={style.text}>Ekmek Sepeti</Text>
    </View>
  );
};

export {Logo};
