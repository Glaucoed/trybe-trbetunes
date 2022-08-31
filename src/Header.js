import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './pages/Loading';
import { getUser } from './services/userAPI';

export default class Header extends Component {
  state = {
    nome: '',
    loading: true,
  };

  componentDidMount() {
    this.getDados();
  }

  getDados = async () => {
    const dadosUser = await getUser();
    this.setState({
      nome: dadosUser.name,
      loading: false,
    });
  };

  render() {
    const { loading, nome } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <p data-testid="header-user-name">{nome}</p>}

        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>

      </header>
    );
  }
}
