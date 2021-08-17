import React, {useEffect} from 'react';
import {Text, View, BackHandler, Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {appStyle} from '~/utils';
import {Resturants} from '~/screens';
const Tab = createBottomTabNavigator();

const Comp = () => {
  return (
    <View>
      <Text>ASD</Text>
    </View>
  );
};
const Comp1 = () => {
  return (
    <View>
      <Text>ASD1</Text>
    </View>
  );
};
const City = prop => {
  const backAction = () => {
    Alert.alert('Bekle!', 'Uygulamadan çıkmak istediğine emin misin?', [
      {
        text: 'Vazgeç',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'EVET', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

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
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={{headerShown: false, title: 'Anasayfa'}}
        component={Resturants}
        initialParams={prop.route.params}
      />
      <Tab.Screen
        options={{headerShown: false, title: 'Sepet'}}
        name="Sepet"
        component={Comp1}
        initialParams={prop.route.params}
      />
      <Tab.Screen
        options={{headerShown: false, title: 'Profil'}}
        name="ProfileScreen"
        component={Comp}
        initialParams={prop.route.params}
      />
    </Tab.Navigator>
  );
};

export {City};
