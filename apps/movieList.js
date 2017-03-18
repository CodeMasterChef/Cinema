import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ListView,
    Navigator
} from 'react-native';

import Movie from './movie';


export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            loading: true
        }
    }
    render() {
        if (this.state.loading) {
            return <Text>Loading ... </Text>
        }
        const ds = new ListView.DataSource({ rowHasChanged: () => { (r1, r2) => r1 !== r2 } });
        const moviesDataSource = ds.cloneWithRows(this.state.movieList);

        return (
            <View style={{ backgroundColor: '#f1b344' }}>
                <ListView
                    enableEmptySections={true}
                    dataSource={moviesDataSource}
                    renderRow={
                        (movieData) =>
                            <TouchableOpacity onPress={ () => { 
                                this.props.goMovieDetailPage(movieData);

                                 }}>
                                <Movie data={movieData} />
                            </TouchableOpacity>

                    }
                />
            </View>
        )
    }


    componentDidMount() {
        this.getMoviesFromApiAsync().then(movies => {
            this.setState({ loading: false, movieList: movies });
            console.log("movie list : ", this.state.movieList);

        })
    }

    getMoviesFromApiAsync() {
        return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.results;

            })
            .catch((error) => {
                console.error(error);
            });
    }

}