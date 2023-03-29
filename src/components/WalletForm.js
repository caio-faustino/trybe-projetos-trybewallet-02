import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addExpense,
  fetchCurrenciesToGlobal,
} from '../redux/actions/acoesWallet';
import { fetchCurrencies } from '../redux/acessoAPI';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCurrenciesToGlobal());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    this.setState({
      exchangeRates: await fetchCurrencies(),
    }, () => {
      dispatch(addExpense(this.state));
      this.setState((prevState) => ({
        id: prevState.id + 1,
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        exchangeRates: [],
      }));
    });
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();
        } }
      >
        <label htmlFor="value-input">
          {'Valor: '}
          <input
            type="text"
            id="value-input"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          {'Moeda: '}
          <select
            name="currency"
            id="currency-input"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {
              currencies.map((option) => (
                <option key={ option }>{ option }</option>
              ))
            }

          </select>
        </label>
        <label htmlFor="method-input">
          {'Método de pagamento: '}
          <select
            name="method"
            id="method-input"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          {'Categoria: '}
          <select
            name="tag"
            id="tag-input"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          {'Descrição: '}
          <input
            type="text"
            id="description-input"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);