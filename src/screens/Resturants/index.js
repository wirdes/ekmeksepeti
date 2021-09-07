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
import {appStyle, H, W} from '~/utils';

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
      <Text
        style={{
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
          textAlign: 'center',
          backgroundColor: appStyle.secondColor,
          fontWeight: 'bold',
          color: appStyle.color,
          fontSize: 45,
          width: W(98),
          borderRadius: 7,
        }}>
        Restorantlarımız
      </Text>
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
          <TouchableOpacity onPress={() => props.navigation.replace('Main')}>
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
