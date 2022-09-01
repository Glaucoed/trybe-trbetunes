import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './pages/Loading';
import { addSong, getFavoriteSongs } from './services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    favorite: false,
    loading: false,
    listFavorites: [],
  };

  async componentDidMount() {
    await this.retornoDaFuncao();
    this.verifica();
  }

  retornoDaFuncao = async () => {
    this.setState({ loading: true });
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ loading: false, listFavorites: favoriteMusics });
  };

  verifica = () => {
    const { listFavorites } = this.state;
    const { trackId } = this.props;
    listFavorites.find(({ music }) => {
      if (music.trackId === trackId) {
        return this.setState({ favorite: true });
      }
      return null;
    });
  };

  enviaObj = async () => {
    const { music } = this.props;
    const { favorite } = this.state;
    this.setState({ loading: true });
    if (!favorite) {
      await addSong({ music });
      this.setState({ loading: false, favorite: true });
    } else {
      this.setState({ favorite: false, loading: false });
    }
  };

  // onInputChange = ({ target }) => {
  //   const { name } = target;
  //   // const value = type === 'checkbox' ? target.checked : target.value;
  //   this.setState({
  //     [name]: true,
  //   }, () => this.enviaObj());
  // };

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
                    onChange={ this.enviaObj }

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
