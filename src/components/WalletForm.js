import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/acessoAPI';
import {
  accDespesa, edtDespesas,
  accDespesaNoTotal, atualizaDespesas } from '../redux/actions/acoesWallet';


class WalletForm extends Component {
  state = {

    tag: 'Alimentação',
    description: '',
    exchangeRates: [],
    id: 0,
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',

  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accDespesaNoTotal());
  }

  handleedtDespesas = async () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const despesasEditadas = {
      ...this.state,
      id: idToEdit,
      exchangeRates: await fetchCurrencies(),
    };
    const indexDespEditadas = expenses.findIndex((obj) => obj.id === idToEdit);
    const despesasCP = [...expenses];

    despesasCP[indexDespEditadas] = despesasEditadas;
    dispatch(atualizaDespesas(despesasCP));
    dispatch(edtDespesas(0, false));
  };

  handleaccDespesa = async () => {
    const { dispatch } = this.props;
    this.setState({
      exchangeRates: await fetchCurrencies(),
    }, () => {
      dispatch(accDespesa(this.state));
      this.setState((prevState) => ({
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        exchangeRates: {},
        id: prevState.id + 1,
        value: '',
        currency: 'USD',
  
      }));
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({[name]: value})
  };



  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies, editor } = this.props;
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
        {
          !editor ? (
            <button
              type="submit"
              onClick={ this.handleaccDespesa }
            >
              Adicionar despesa
            </button>
          ) : (
            <button
              type="submit"
              onClick={ this.handleedtDespesas }
            >
              Editar despesa
            </button>
          )
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
  expenses: PropTypes.arrayOf(PropTypes.object),
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
