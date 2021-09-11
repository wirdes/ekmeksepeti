/* eslint-disable react/self-closing-comp */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {appStyle, H, W} from '~/utils';

const PastOrders = props => {
  const {userData} = useSelector(state => state.auth);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    const {data} = await axios.get(
      'https://backendfood.herokuapp.com/api/orders/getByUser?id=' +
        userData.userId,
    );

    setProductList(data.data);
    setLoading(false);
  }
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);
  useEffect(() => fetchData(), [props]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.renderItem}
        onPress={() =>
          props.navigation.navigate('OrderDetails', {past: true, id: item._id})
        }>
        <View style={style.renderItemBody}>
          <Text numberOfLines={1} style={style.renderItemText}>
            {'Adres: ' + item.address}
          </Text>
          <Text style={style.renderItemText}>
            {'Ürün Sayısı: ' + item.orderElements.length}
          </Text>
          <Text style={style.renderItemText}>{item.orderTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={style.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }></ScrollView>
      <View style={style.container}>
        <View style={style.headers}>
          <Text style={style.headersText}>Geçmiş Siparişlerim</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={productList}
          renderItem={renderItem}
          inverted={true}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  scrollView: {
    height: H(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingTop: H(2),
    flex: 500,
  },
  headers: {alignItems: 'center', height: H(8)},
  renderItem: {
    width: W(90),
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: appStyle.color,
    borderRadius: 9,
    padding: 15,
  },
  renderItemText: {fontWeight: 'bold', fontSize: 15},
  renderItemImage: {width: H(8), height: H(8), marginRight: 15},
  headersText: {fontWeight: 'bold', fontSize: 25},
  renderItemBody: {
    width: W(75),

    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    paddingRight: W(3),
    justifyContent: 'flex-end',
  },
  priceText: {color: 'red', fontWeight: 'bold', fontSize: 30},
});

export {PastOrders};
