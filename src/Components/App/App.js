import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchResults: [{name: 'name1', artist: 'art1', album: 'alb1', id: 'id1'}, {
                     name: 'name2', artist: 'art2', album: 'alb2', id: 'id2'  }]
    }
  }
  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} />
        <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
