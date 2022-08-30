import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

class App extends React.Component {
  state = {
    user: '',
    isButtonDisable: true,
  };

  habilitaBotao = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { user } = this.state;
      const numberMin = 2;
      if (user.length > numberMin) {
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
    const { user, isButtonDisable, loading } = this.state;
    return (

      <Switch>
        <Route
          exact
          path="/"
          render={
            (props) => (<Login
              { ...props }
              user={ user }
              isButtonDisable={ isButtonDisable }
              habilitaBotao={ this.habilitaBotao }
              loading={ loading }
            />)
          }
        />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="*" component={ NotFound } />

      </Switch>

    );
  }
}

export default App;
