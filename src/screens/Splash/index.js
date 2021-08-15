import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Logo} from '~/components/Logo';
import {appStyle, H, W} from '~/utils';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Logo color={'white'} />
      <Image
        style={styles.gif}
        source={require('../../assets/img/loading3.gif')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 4,
    borderColor: appStyle.secondColor,
    borderRadius: 55,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: appStyle.color,
  },
  text: {
    top: -45,
    fontSize: 35,
    color: appStyle.secondColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gif: {
    borderWidth: 2,
    marginTop: H(33),
    height: H(12),
    width: W(12),
  },
});

export {Splash};
