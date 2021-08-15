import React from 'react';
import {StatusBar, View} from 'react-native';
import {Navigation} from '~/Navigation';
import {appStyle} from './utils';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={appStyle.color} barStyle={'black'} />
      <Navigation />
    </View>
  );
};

export {App};
