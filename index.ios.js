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
  Animated
} from 'react-native';
import NowPlayingTab from './apps/nowPlayingTab';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
   tabbar: {
    backgroundColor: '#f1b344',

  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
});


export default class Cinema extends Component {

  static propTypes = {
    style: View.propTypes.style,
  };
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'Now Playing', icon: 'ios-film-outline' },
        { key: '2', title: 'Top Rating', icon: 'ios-star-outline' },
      ],
    }
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar {...props} 
      renderIcon={this._renderIcon}
     style={{ backgroundColor: '#f1b344' }} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <NowPlayingTab />;
      case '2':
        return <View style={[styles.page, { backgroundColor: '#673ab7' }]} />;
      default:
        return null;
    }
  }
  _renderIcon = ({ route }) => {
    return (
      <Icon
        name={route.icon}
        size={24}
        style={styles.icon}
      />
    );
  };
   _renderIndicator = (props) => {
    const { width, position } = props;

    const translateX = Animated.multiply(position, width);

    return (
      <Animated.View
        style={[ styles.container, { width, transform: [ { translateX } ] } ]}
      >
        <View style={styles.indicator} />
      </Animated.View>
    );
  };
   _renderFooter = (props) => {
    return (
      <TabBar
        {...props}
        renderIcon={this._renderIcon}
        renderIndicator={this._renderIndicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
      />
    );
  };
   _renderBadge = ({ route }) => {
    if (route.key === '2') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>42</Text>
        </View>
      );
    }
    return null;
  };


  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }

};

AppRegistry.registerComponent('Cinema', () => Cinema);
