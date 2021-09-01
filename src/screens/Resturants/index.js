/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import {Resturant, SearchBar} from '~/components';
import {H, W} from '~/utils';

const Resturants = props => {
  const {plaka} = props.route.params;
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const {data} = await axios.get(
      'https://backendfood.herokuapp.com/api/resturant/findRestaurantByCityPlateNumber?plateNumber=' +
        plaka,
    );
    setProductList(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <SearchBar />
      {loading ? (
        <Image
          style={styles.gif}
          source={require('../../assets/img/loading3.gif')}
        />
      ) : !productList.length <= 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          //scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          data={productList}
          renderItem={({item}) => (
            <Resturant navigation={props.navigation} item={item} />
          )}
        />
      ) : (
        <>
          <Text>Malesef şehrinizde kayıtlı resturant yok</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Main')}>
            <Text style={{color: 'blue'}}>
              Şehir Değiştirmek için tıklayınız
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    borderWidth: 2,
    marginTop: H(33),
    height: H(12),
    width: W(12),
  },
});

export {Resturants};
