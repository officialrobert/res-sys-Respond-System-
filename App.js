import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, NetInfo} from 'react-native';
import { Container} from 'native-base';
import Main from './src/Main.js';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Main/>
    );  
  }
}
