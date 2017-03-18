/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import NowPlayingTab from './apps/nowPlayingTab';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default class Cinema extends Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'Now Playing' },
        { key: '2', title: 'Top Rating' },
      ],
    }
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <NowPlayingTab/>;
      case '2':
        return <View style={[styles.page, { backgroundColor: '#673ab7' }]} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }

};

AppRegistry.registerComponent('Cinema', () => Cinema);
