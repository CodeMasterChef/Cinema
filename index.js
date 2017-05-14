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
import SplashScreen from 'react-native-smart-splash-screen';
import PushNotification from 'react-native-push-notification';
import PushNotificationAndroid from 'react-native-push-notification';

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


    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        alert(JSON.stringify(notification));
        this._loadNotification(notification['google.c.a.c_l']);

      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
      senderID: "308538566668",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
        hasPoppedInitialNotification: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });



  }
  _loadNotification(message) {
    console.log("recive message: " , message)
    PushNotification.localNotificationSchedule({
      message: message, // (required)
      date: new Date(Date.now() + (1 * 1000)) // in 1 secs
    });
  }




  componentDidMount() {
    //SplashScreen.close(SplashScreen.animationType.scale, 850, 500) 
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    })
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
        return <NowPlayingTab type="NOW_PLAYING" />;
      case '2':
        return <NowPlayingTab type="TOP_RATED" />;
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
        style={[styles.container, { width, transform: [{ translateX }] }]}
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
