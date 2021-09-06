/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {appStyle} from '~/utils';
import {Resturants, Details, Cart} from '~/screens';

const Tab = createBottomTabNavigator();

const Comp = () => {
  return (
    <View>
      <Text>ASD</Text>
    </View>
  );
};

const City = prop => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
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
        component={Comp}
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
    </Tab.Navigator>
  );
};

export {City};

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
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
      }}>
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
        return label === 'Details' ? null : (
          <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}>
            <Icon size={32} name={iconName} color={color} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
