import React from 'react';
import Header from '../Header';

class Search extends React.Component {
  state = {
    artistas: '',
    isButtonDisable: true,
  };

  habilitaBotao = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { artistas } = this.state;
      const numberMin = 1;
      if (artistas.length > numberMin) {
        this.setState({
          isButtonDisable: false,
        });
      } else {
        this.setState({
          isButtonDisable: true,
        });
      }
    });
  };

  render() {
    const { isButtonDisable, artistas } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="buscaArtista">
            <input
              data-testid="search-artist-input"
              name="artistas"
              value={ artistas }
              onChange={ this.habilitaBotao }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isButtonDisable }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
