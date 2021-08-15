import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput as RNTextInput} from 'react-native';
import {w} from '~/utils';

const TextInput = props => {
  return;
};

export {TextInput};

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <RNTextInput {...props} style={styles.searchInput} />
      </View>
    </View>
  );
};
TextInput.propTypes = {
  ...RNTextInput.propTypes,
};

const styles = StyleSheet.create({
  container: {
    width: w,
    margin: 10,
  },
  inputContainer: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#eceff1',
  },
  searchInput: {
    color:'black',
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#eceff1',
    borderRadius: 10,
  },
});

export {SearchBar};
