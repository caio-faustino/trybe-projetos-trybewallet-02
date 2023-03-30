import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { usuarioLogin } from '../redux/actions/usuarioLogin';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValid: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validate();
    });
  };

  validate = () => {
    const { email, password } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const magicNumber = 6;
    console.log(regex.test(email) && password.length > magicNumber);
    if (regex.test(email) && password.length >= magicNumber) {
      this.setState({
        isValid: true,
      });
    } else {
      this.setState({
        isValid: false,
      });
    }
  };

  render() {
    const { email, password, isValid } = this.state;
    const { dispatch, history } = this.props;
    console.log(this.props);
    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          history.push('/carteira');
        } }
      >
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ () => dispatch(usuarioLogin({ email })) }
          disabled={ !isValid }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Login);
