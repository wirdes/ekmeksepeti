import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './redux/store/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Splash, Register, Main} from '~screens';
import Login from './screens/Login';

const STACK1 = createStackNavigator();

const Navigation = () => {
  const [showSplash, setShowSplash] = useState(true);
  const isLoggedIn = false;

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 4500);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <STACK1.Navigator>
          {!isLoggedIn ? (
            <>
              <STACK1.Screen
                name={showSplash ? 'Splash' : 'Login'}
                component={showSplash ? Splash : Login}
                options={{headerShown: false}}
              />
              <STACK1.Screen name="Kayıt" component={Register} />
            </>
          ) : (
            <STACK1.Screen
              name={showSplash ? 'Splash' : 'Main'}
              component={showSplash ? Splash : Main}
              options={{headerShown: false}}
            />
          )}
        </STACK1.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export {Navigation};
