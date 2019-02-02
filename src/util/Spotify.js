let accessToken;
let expiresIn;
const clientID = 'd434bc34746c4d2e8f1db98a0b8909b7';
const redirectURI = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
    else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))
    {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

      window.setTimeout(() => accessToken = '', expiresIn*1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    }
    else
    {
      let url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = url;

    }
  },

  search(searchTerm) {
    accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => {
          return response.json();
      }).then(jsonResponse => {
          if (jsonResponse.tracks.items) {
            return jsonResponse.tracks.items.map(track => ({
              id : track.id,
              name : track.name,
              artist : track.artists[0].name,
              album : track.album.name,
              uri : track.uri
            }));
          }
        })
  },

  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris) {
// If either playlistName or tracks is empty, return without doing anything
      return
    }
    accessToken = this.getAccessToken();
    let userId;
    let playlistId;
    try {

// This section retrieves the user ID from Spotify,
// which is necessary for creating a new playlist

      let response = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!response.ok) {
        alert('There was a problem retrieving your user ID.');
        return;
      }
      let jsonResponse = await response.json();
      userId = jsonResponse.id;

// If the user ID was successfully retrieved, this section will create
// a new playlist on Spotify with the name chosen by the user

      let nameResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playlistName
        })
      });
      if (!nameResponse.ok) {
        alert('There was a problem posting the playlist name.');
        return;
      }
      jsonResponse = await nameResponse.json();
      playlistId = jsonResponse.id;

// If the playlist was successfully created, this section will pass the
// list of tracks to the playlist in the form of uri's

      let tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({uris: trackUris})
      });
      if (!tracksResponse.ok) {
        alert('There was a problem posting the playlist tracks.');
        return;
      }
    } // End of try
    // Catch errors from try
    catch(error) {
      console.log(error);
      return;
    }
    return 'Done';
}
};

export default Spotify;
