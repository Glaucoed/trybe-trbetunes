import React from 'react';
import Header from '../Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Card from '../Card';

class Search extends React.Component {
  state = {
    artistas: '',
    loadingAlbum: false,
    isButtonDisable: true,
    albums: [],
    nomeArtista: '',
    naoEncontrado: true,
  };

  findAlbum = async () => {
    const { artistas } = this.state;
    this.setState({ loadingAlbum: true, nomeArtista: artistas });
    const teste = await searchAlbumsAPI(artistas);
    this.setState({
      artistas: '',
      albums: teste,
      loadingAlbum: false,
      naoEncontrado: teste.length > 0,
    });
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
    const {
      isButtonDisable,
      artistas,
      loadingAlbum,
      nomeArtista,
      albums,
      naoEncontrado,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {
          loadingAlbum
            ? <Loading />
            : (
              <>
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
                    onClick={ this.findAlbum }
                  >
                    Pesquisar

                  </button>
                </form>
                <div>
                  {albums.length > 0
                    && (
                      <h2>
                        {`Resultado de álbuns de: ${nomeArtista}`}
                      </h2>
                    )}

                  {
                    !naoEncontrado
                      ? <span>Nenhum álbum foi encontrado</span>
                      : albums
                        .map(({
                          artistName,
                          artworkUrl100,
                          collectionName,
                          collectionId,
                        }) => (<Card
                          key={ collectionId }
                          artistName={ artistName }
                          artworkUrl100={ artworkUrl100 }
                          collectionName={ collectionName }
                          collectionId={ collectionId }
                          nomeArtista={ nomeArtista }
                        />))
                  }
                </div>
              </>
            )
        }
      </div>
    );
  }
}

export default Search;
