/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';

import jsonData from './data.json';

import {City, SearchBar} from '~/components';
import {H} from '~/utils';

const Main = ({navigation}) => {
  const [text, setText] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(jsonData);
  }, []);

  const onChangeNumber = d => {
    const data2 = jsonData;
    if (d === '') {
      setData(jsonData);
      setText('');
    } else {
      setText(d);
      let result = data2.filter(e => e.plaka.startsWith(d));
      if (result.length <= 0) {
        result = data2.filter(e => e.sehir.startsWith(d.toUpperCase()));
      }
      setData(result);
    }
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SearchBar
        onChangeText={onChangeNumber}
        value={text}
        placeholder="Plaka yada Şehir adı ?"
        //keyboardType="numeric"
        placeholderTextColor="black"
      />
      {!data.length <= 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          //scrollEnabled={false}
          numColumns={3}
          keyExtractor={item => item.plaka.toString()}
          data={data}
          renderItem={({item}) => <City navigation={navigation} item={item} />}
        />
      ) : (
        <Text>Şehir Bulunamadı..</Text>
      )}
      <View style={{height: H(12)}} />
    </View>
  );
};

export {Main};
