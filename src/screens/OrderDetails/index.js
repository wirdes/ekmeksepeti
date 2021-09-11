import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Image, StyleSheet} from 'react-native';
import {H, W} from '~/utils';

const OrderDetails = props => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  async function fetchData(id) {
    const {data} = await axios.get(
      'https://backendfood.herokuapp.com/api/orders/get?id=' + id,
    );
    setData(data.data);
    console.log(data.data);
    setLoading(true);
  }
  useEffect(() => {
    if (props.route.params.past) {
      fetchData(props.route.params.id);
      console.log(props.route.params.past);
    } else {
      setData(props.route.params);
      console.log(data);
      console.log(3);
    }
  }, [props]);
  const renderItem = ({item}) => {
    return (
      <View style={style.renderItem}>
        <Image
          style={style.renderItemImage}
          source={{uri: item.product.image}}
        />
        <View style={style.renderItemBody}>
          <Text style={style.renderItemText}>{item.product.description}</Text>
          <Text style={style.renderItemText}>→</Text>
          <Text style={style.renderItemText}>{item.quantity}</Text>
          <Text style={style.renderItemText}>x</Text>
          <Text style={style.renderItemText}>{item.product.price + ' ₺'}</Text>
        </View>
      </View>
    );
  };

  return loading ? (
    <View style={style.container}>
      <View style={style.headers}>
        <Text style={style.headersText}>Fatura Detayı</Text>
        <Text>{'Adres: ' + data.address}</Text>
        <Text>{'Tarih: ' + data.orderTime}</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data.orderElements}
        renderItem={renderItem}
      />
      <View style={style.priceContainer}>
        <Text style={style.priceText}>
          {'Fatura Tutarı: ' + data.total + ' ₺'}
        </Text>
      </View>
    </View>
  ) : (
    <Text>Yükleniyor</Text>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: H(2),
    flex: 1,
  },
  headers: {alignItems: 'center', padding: H(5)},
  renderItem: {
    flexDirection: 'row',
    padding: 15,
  },
  renderItemText: {fontWeight: 'bold', fontSize: 15},
  renderItemImage: {width: H(8), height: H(8), marginRight: 15},
  headersText: {fontWeight: 'bold', fontSize: 25},
  renderItemBody: {
    width: W(75),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    paddingRight: W(3),
    justifyContent: 'flex-end',
  },
  priceText: {color: 'red', fontWeight: 'bold', fontSize: 30},
});

export {OrderDetails};
