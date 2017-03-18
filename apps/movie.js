import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Navigator,
} from 'react-native';

import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';

export default class Movie extends Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        let movieData = this.props.data;
        let poster_path =  "https://image.tmdb.org/t/p/w500/" + movieData.poster_path;


        return (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, margin: 10 }}>
                        <Image  indicator={Progress} style={{ height: 150, flex: 1 }} source={{ uri: poster_path }} />
                    </View>
                    <View style={{ flex: 2, margin: 10, height: 150 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{movieData.original_title}</Text>
                        <Text>{movieData.overview}</Text>
                    </View>
                </View>
        )
    }

}