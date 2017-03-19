import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ListView,
    Navigator,
} from 'react-native';

import MovieList from './movieList';
import MovieDetail from './movieDetail';


const styles =  StyleSheet.create ({ 
    container : {
        
    }
})


export default class NowPlayingTab extends Component {

    constructor(props) {
        super(props);
    }
    render() {

        const routes = [
            { title: 'First Scene', index: 0 },
            { title: 'Second Scene', index: 1 },
        ];

        return (
            <Navigator
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={(route, navigator) => {
                    if (route.index === 0) {
                        return (
                            <MovieList style={styles.container} goMovieDetailPage={(movieData) => {
                                navigator.push(
                                    {
                                        index: 1,
                                        data: movieData
                                    }
                                )
                            }} />
                        )
                    } else {
                        if (route.data) {
                            return (
                                
                                    <MovieDetail data={route.data} returnMovieListPage={() => {
                                        navigator.pop();
                                    }} />
                                

                            )
                        }
                    }
                }
                }
            />




        )
    }




}