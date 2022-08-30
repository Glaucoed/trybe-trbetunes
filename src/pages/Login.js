import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    loading: false,
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
    const { user, habilitaBotao, isButtonDisable } = this.props;
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
                  onChange={ habilitaBotao }
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
