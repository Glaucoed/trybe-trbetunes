import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    user: '',
    isButtonDisable: true,
    loading: false,
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

  aguardandoFunction = (user) => {
    this.setState({
      loading: true,
    }, async () => {
      const { history } = this.props;
      // console.log(history);
      await createUser({ name: user });
      history.push('/search');
    });
  };

  render() {
    const { user, isButtonDisable } = this.state;
    const { loading } = this.state;
    return (
      loading ? (
        <Loading />
      )
        : (
          <div data-testid="page-login">
            <h1>Login</h1>
            <form>
              <label htmlFor="login">
                <input
                  data-testid="login-name-input"
                  name="user"
                  value={ user }
                  onChange={ this.habilitaBotao }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ isButtonDisable }
                onClick={ () => this.aguardandoFunction(user) }
              >
                Entrar

              </button>
            </form>
          </div>
        )
    );
  }
}
Login.propTypes = {
  user: PropTypes.string,
  habilitaBotao: PropTypes.func,
  isButtonDisable: PropTypes.bool,
}.isRequired;
export default Login;
