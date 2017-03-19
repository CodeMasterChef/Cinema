import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ListView,
    Dimensions
} from 'react-native';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';
export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let movie = this.props.data;
        console.log(movie);
        let maxWidth = Dimensions.get('window').width ; 

        let poster_path = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
        return (
            <View style={{ flex: 1 , marginTop: 10 }} >
                <View style={{flex: 1,  position: 'absolute', zIndex: 100, top: 0, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                     <TouchableOpacity style={{flex: 1}} onPress={() => {
                        this.props.returnMovieListPage();
                    }}>
                        <Text style={{ color: 'white' , padding: 10   }} >Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1 }}>
                      <Image indicator={Progress} style={{ flex: 1, height: 500 }} source={{ uri: poster_path }} />
                </View>
              
                <View style={{ position: 'absolute', bottom: 10, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <View style={{padding: 20 }}>
                        <Text style={{ color: 'white'}}>{movie.original_title}</Text>
                        <Text style={{ color: 'white'}}>{movie.release_date}</Text>
                        <Text style={{ color: 'white' }}>{movie.overview}</Text>
                    </View>
                   
                </View>


            </View>

        )

    }

}