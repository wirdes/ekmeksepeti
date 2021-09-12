import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput as RNTextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {H, W, w} from '~/utils';

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <AntDesign name={'search1'} color={'purple'} size={30} />
        </View>

        <RNTextInput {...props} style={styles.searchInput} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {justifyContent: 'center', alignItems: 'center'},
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: w,
    margin: 10,
  },
  inputContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: W(80),
    height: H(7),
    borderRadius: 15,
    textAlign: 'center',
    //shadow-start
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    //shadow-end
  },
  searchInput: {
    width: W(60),
    color: 'black',
    textAlign: 'center',
    borderWidth: 5,
    borderColor: '#eceff1',
    borderRadius: 10,
  },
});

export {SearchBar};
