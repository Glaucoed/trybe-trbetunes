import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './pages/Loading';
import { addSong, removeSong } from './services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    favorite: false,
    loading: false,
  };

  async componentDidMount() {
    this.verificaListFavoritesState();
  }

  verificaListFavoritesState = () => {
    const { trackId, listFavorites } = this.props;
    listFavorites.some((musica) => {
      if (musica.trackId === trackId) {
        return this.setState({ favorite: true });
      }
      return null;
    });
  };

  enviaFavoritoLocalStorage = async () => {
    const { music } = this.props;
    const { favorite } = this.state;
    this.setState({ loading: true });
    if (!favorite) {
      await addSong(music);
      this.setState({ loading: false, favorite: true });
    } else {
      await removeSong(music);
      this.setState({ loading: false, favorite: false });
    }
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { favorite, loading } = this.state;

    return (
      <div>

        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {
          loading
            ? <Loading />
            : (
              <form>
                <label htmlFor="idFavorite">
                  Favorita
                  <input
                    data-testid={ `checkbox-music-${trackId}` }
                    id="idFavorite"
                    name="favorite"
                    type="checkbox"
                    checked={ favorite }
                    onChange={ () => this.enviaFavoritoLocalStorage() }

                  />
                </label>
              </form>

            )
        }
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;
