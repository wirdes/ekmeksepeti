import React from 'react';

import {Text, View} from 'react-native';

const City = ({navigation, route}) => {
  return (
    <View>
      <Text>{route.params.sehir}</Text>
    </View>
  );
};

export {City};

