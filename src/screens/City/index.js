import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {appStyle} from '~/utils';
const Tab = createBottomTabNavigator();

const Comp = () => {
  return (
    <View>
      <Text>ASD</Text>
    </View>
  );
};
const City = ({navigation, route}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'HomeScreen':
              iconName = focused ? 'home' : 'home-outline';
              color = focused ? appStyle.color : 'gray';
              break;
            case 'Sepet':
              iconName = focused ? 'ios-cart-sharp' : 'ios-cart-outline';
              color = focused ? appStyle.color : 'gray';
              break;
            case 'ProfileScreen':
              iconName = focused ? 'person' : 'person-outline';
              color = focused ? appStyle.color : 'gray';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: appStyle.color,
        inactiveTintColor: 'white',
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{headerShown: false, title: 'Anasayfa'}}
        component={Comp}
      />
      <Tab.Screen
        options={{headerShown: false, title: 'Sepet'}}
        name="Sepet"
        component={Comp}
      />
      <Tab.Screen
        options={{headerShown: false, title: 'Profil'}}
        name="ProfileScreen"
        component={Comp}
      />
    </Tab.Navigator>
  );
};

export {City};
