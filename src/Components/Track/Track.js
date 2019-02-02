import React from 'react';

class Track extends React.Component {
  renderAction () {
    let isRemoval = true;  //temp fix to render DELETE AT SOME POINT!
    if(isRemoval) {
      return <a className='Track-action' >-</a>;
    } else {
      return <a className='Track-action' >+</a>;
    }
  }

  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.tracks.name}</h3>
          <p>  {this.props.tracks.artist} | {this.props.track.album} </p>
        </div>
        <a className="Track-action">+ or - will go here </a>
      </div>
    );
  }
}

export default Track;
