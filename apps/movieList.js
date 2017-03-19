import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ListView,
    Navigator,
    TextInput
} from 'react-native';

import Movie from './movie';


export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            loading: true,
            moviesDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }

    }
    render() {
        if (this.state.loading) {
            return <Text>Loading ... </Text>
        }

        return (
            <View >
                <TextInput style={{ height: 30, padding: 5, backgroundColor: 'white', margin: 5, borderRadius: 5 }}
                    placeholder="Search"
                    onChangeText={(text) => this.filterMovies({ text })} />
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.moviesDataSource}
                    renderRow={
                        (movieData) =>
                            <TouchableOpacity onPress={() => {
                                this.props.goMovieDetailPage(movieData);

                            }}>
                                <Movie data={movieData} />
                            </TouchableOpacity>

                    }
                />
            </View>
        )
    }
    filterMovies(name) {
        let keyword = name.text.toLowerCase();
        let rows = [];
        console.log(keyword);
        for (let i = 0; i < this.state.movieList.length; i++) {
            let movie = this.state.movieList[i];
            let title = movie.original_title.toLowerCase();
            if (title.search(keyword) !== -1) {
                rows.push(movie);
            }
        }
        let ds = new ListView.DataSource({ rowHasChanged: () => { (r1, r2) => r1 !== r2 } });
        this.setState({ moviesDataSource: ds.cloneWithRows(rows) });

    }

    componentDidMount() {
        this.getMoviesFromApiAsync().then(movies => {
            this.setState({ loading: false, movieList: movies });
            let ds = new ListView.DataSource({ rowHasChanged: () => { (r1, r2) => r1 !== r2 } });
            this.setState({ moviesDataSource: ds.cloneWithRows(this.state.movieList) });

        })
    }

    getMoviesFromApiAsync() {
        console.log("type: ", this.props.type);
        let type = this.props.type;
        let url = '';
        if (type == 'NOW_PLAYING') {
            url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed';
        } else {
            url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed';
        }
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.results;

            })
            .catch((error) => {
                console.error(error);
            });
    }

}