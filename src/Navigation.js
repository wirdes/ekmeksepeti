import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Splash, Main, City} from '~screens';
import Login from './screens/Login';
import {useSelector} from 'react-redux';
import Register from './screens/Register';

const STACK1 = createStackNavigator();

const Navigation = () => {
  const [showSplash, setShowSplash] = useState(true);
  const {isLoggedIn} = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 4500);
  }, []);

  return (
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
        <STACK1.Screen
          name="City"
          component={City}
          options={{headerShown: false}}
        />
      </STACK1.Navigator>
    </NavigationContainer>
  );
};

export {Navigation};
