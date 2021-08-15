import React from 'react';
import {StatusBar, View} from 'react-native';
import {Navigation} from '~/Navigation';
import {appStyle} from './utils';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={appStyle.color} barStyle={'black'} />
        <Navigation />
      </View>
    </Provider>
  );
};

export {App};
