import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ListView
} from 'react-native';

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Text>This is movie detail</Text>
                <TouchableOpacity onPress={() => {
                    this.props.returnMovieListPage();
                }}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>

        )

    }

}