import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './pages/Loading';
import { addSong } from './services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    favorite: false,
    loading: false,
  };

  chamaFuncao = async () => {
    const { music } = this.props;
    const { favorite } = this.state;
    if (favorite === true) {
      this.setState({ loading: true });
      // const x = await addSong({ trackId, trackName, previewUrl });
      // console.log(x);
      console.log(music);
      await addSong({ music });
      this.setState({ loading: false });
    }
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.chamaFuncao());
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
                    onChange={ this.onInputChange }

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
