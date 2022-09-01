import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import MusicCard from '../MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    artistName: '',
    collectionName: '',
    tracks: [],
  };

  componentDidMount() {
    this.renderizaMusicas();
  }

  renderizaMusicas = async () => {
    const { match: { params: { id } } } = this.props;
    const received = await getMusics(id);
    const { artistName, collectionName, artworkUrl100 } = received[0];

    const filterTracks = received.filter((elemento) => elemento);
    filterTracks.splice(0, 1);

    this.setState({
      tracks: filterTracks,
      artistName,
      collectionName,
      artworkUrl100,

    });
  };

  render() {
    const { tracks, artistName, collectionName, artworkUrl100 } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ artworkUrl100 } alt={ artistName } />
          <h3 data-testid="album-name">{collectionName}</h3>
          <h4 data-testid="artist-name">{artistName}</h4>
          {
            tracks
              .map(({ trackName, previewUrl, trackId }) => (<MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />))
          }
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
