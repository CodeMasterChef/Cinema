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
    TextInput,
    RefreshControl
} from 'react-native';

import Movie from './movie';


export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            loading: true,
            refreshing: false,
            page: 1,
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        )
    }
    _onRefresh() {
        let page = this.state.page + 1 ; 
        this.setState({ refreshing: true, page: page });

        this.getMoviesFromApiAsync(page).then((movies) => {
            console.log("refesh data " + this.state.page);
            console.log(movies);
            this.setState({ refreshing: false });
            this.setMovieList(movies , true ) ;
        });
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
        this.getMoviesFromApiAsync(1).then(movies => {
            this.setMovieList(movies, false);

        })
    }
    setMovieList(movies, isAdded) {
        if (isAdded) {
            this.setState({ loading: false, movieList: movies.concat (this.state.movieList)});

        } else {
            this.setState({ loading: false, movieList: movies });
        }
        console.log(this.state.movieList);
        let ds = new ListView.DataSource({ rowHasChanged: () => { (r1, r2) => r1 !== r2 } });
        this.setState({ moviesDataSource: ds.cloneWithRows(this.state.movieList) });

    }

    getMoviesFromApiAsync(page) {
        let type = this.props.type;
        let url = '';
        if (type == 'NOW_PLAYING') {
            url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=' + page;
        } else {
            url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=' + page;
        }
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.results;

            })
            .catch((error) => {
               // console.error(error);
                alert("Can not connect internet");
                return [];
            });
    }

}