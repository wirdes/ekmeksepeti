/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {appStyle} from '~/utils';
import {
  Resturants,
  Details,
  Cart,
  Profile,
  OrderDetails,
  AddAddress,
  PastOrders,
} from '~/screens';
import {Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const City = prop => {
  const {items} = useSelector(state => state.cart);
  return (
    <Tab.Navigator
      tabBar={({state, descriptors, navigation}) => {
        return (
          <View style={style.tabBar}>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;
              let iconName;
              let color;
              switch (route.name) {
                case 'HomeScreen':
                  iconName = isFocused ? 'home' : 'home-outline';
                  color = isFocused ? appStyle.color : 'gray';
                  break;
                case 'Sepet':
                  iconName = isFocused ? 'ios-cart-sharp' : 'ios-cart-outline';
                  color = isFocused ? appStyle.color : 'gray';
                  break;
                case 'ProfileScreen':
                  iconName = isFocused ? 'person' : 'person-outline';
                  color = isFocused ? appStyle.color : 'gray';
                  break;
              }

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              return label === 'Details' ||
                label === 'OrderDetails' ||
                label === 'Adres Ekleme' ||
                label === 'pastorder' ? null : (
                <TouchableOpacity
                  onPress={onPress}
                  onLongPress={onLongPress}
                  key={label}>
                  <Icon size={32} name={iconName} color={color} />
                  {label === 'Sepet' && items.length > 0 ? (
                    <Badge
                      status="success"
                      value={items.length}
                      containerStyle={{
                        position: 'absolute',
                        top: -4,
                        right: -4,
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{headerShown: false, title: 'Anasayfa'}}
        component={Resturants}
        initialParams={prop.route.params}
      />
      <Tab.Screen
        options={{headerShown: false, title: 'Sepet'}}
        name="Sepet"
        component={Cart}
        initialParams={prop.route.params}
      />
      <Tab.Screen
        options={{headerShown: false, title: 'Profil'}}
        name="ProfileScreen"
        component={Profile}
        initialParams={prop.route.params}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          showIcon: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          showIcon: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Adres Ekleme"
        options={{
          showIcon: false,
          headerShown: false,
        }}
        component={AddAddress}
      />
      <Tab.Screen
        name="pastorder"
        options={{
          showIcon: false,
          headerShown: false,
        }}
        component={PastOrders}
      />
    </Tab.Navigator>
  );
};

export {City};

const style = StyleSheet.create({
  tabBar: {
    //shadow-start
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 2.29,
    shadowRadius: 1.65,
    elevation: 19,
    //shadow-end
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
