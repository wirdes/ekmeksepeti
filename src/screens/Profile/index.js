import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {appStyle, H, W} from '~/utils';

const Profile = props => {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.avatarContainer}>
          <Avatar
            containerStyle={{backgroundColor: appStyle.color}}
            size="large"
            rounded
            title="ME"
          />
        </View>
        <View style={{width: W(73)}}>
          <View>
            <Text style={style.nameSurname}>{`${'Mert'} ${'Erim'}`}</Text>
          </View>
          <Text
            numberOfLines={2}
            style={
              style.addressText
            }>{`${'Lorem Ipsum pasajlarının birçok çeşitlemesi vardır. Ancak bunların büyük bir çoğunluğu mizah katılarak veya rastgele sözcükler eklenerek değiştirilmişlerdir.'}`}</Text>
        </View>
      </View>
      <View style={style.body}>
        <TouchableOpacity
          style={style.bodyElements}
          onPress={() => props.navigation.replace('Main')}>
          <Text style={style.bodyElementsText}>Şehir Değiştir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.bodyElements}>
          <Text style={style.bodyElementsText}>Adres Değiştir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.bodyElements}>
          <Text style={style.bodyElementsText}>Siparişleri Gör</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.bodyElements}>
          <Text style={style.bodyElementsText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {Profile};

const style = StyleSheet.create({
  avatarContainer: {width: W(25), alignItems: 'center'},
  nameSurname: {
    fontSize: 30,
    fontWeight: '800',
    color: appStyle.color,
  },
  container: {flex: 1, backgroundColor: 'white'},
  addressText: {
    fontSize: 13,
  },
  header: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
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
  },
  body: {flex: 10, alignItems: 'center', justifyContent: 'center'},
  bodyElements: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: appStyle.color,
    alignItems: 'center',
    justifyContent: 'center',
    width: W(80),
    height: H(15),
    backgroundColor: appStyle.secondColor,
    borderRadius: 10,
    margin: 3,
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
  },
  bodyElementsText: {
    color: appStyle.color,
    fontSize: 25,
    fontWeight: '700',
  },
});
