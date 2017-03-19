import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ListView,
    Dimensions,
    LayoutAnimation
} from 'react-native';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';
export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 200,
            line: 4,
            marginScroll: 500
        }
    }
    clickToOpen() {
        var height = this.state.height;
        var line = this.state.line;
        var marginScroll = this.state.marginScroll;
        if (height == 200) {
            height = 50;
            line = 0
            marginScroll = 100
        } else {
            height = 200;
            line = 4
            marginScroll = 500
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
            height,
            line,
            marginScroll
        })
    }
    render() {
        let movie = this.props.data;
        let poster_path = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
      
        var height = this.state.height;
        var line = this.state.line; // 0: will be showed all lines
        var marginScroll = this.state.marginScroll;
      
        return (
            <View style={{ flex: 1, marginTop: 10 }} >
                <View style={{ flex: 1, position: 'absolute', zIndex: 100, top: 0, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        this.props.returnMovieListPage();
                    }}>
                        <Text style={{ color: 'white', padding: 10 }} >Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <Image indicator={Progress} style={{ flex: 1, height: 500 }} source={{ uri: poster_path }} />
                </View>

                <View style={{ position: 'absolute', bottom: 10, backgroundColor: 'rgba(0,0,0,0.8)' }}>

                    <ScrollView>
                        <TouchableOpacity onPress={() => this.clickToOpen()}>
                            <View style={{ padding: 20 }}>
                                <Text style={{ color: 'white' }}>{movie.original_title}</Text>
                                <Text style={{ color: 'white' }}>{movie.release_date}</Text>
                                <Text style={{ color: 'white' }} numberOfLines={line}>{movie.overview}</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>


                </View>


            </View>

        )

    }

}