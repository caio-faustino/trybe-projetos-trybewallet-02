import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpense, editExpense } from '../redux/actions/acoesWallet';

class Table extends Component {
  handleDelete = (id) => {
    const { expenses, dispatch } = this.props;
    const delExpense = expenses.filter((expense) => expense.id !== id);
    dispatch(updateExpense(delExpense));
  };

  render() {
    const {
      expenses,
      dispatch,
    } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Valor convertido</th>
            <th>Moeda</th>
            <th>Moeda de conversão</th>
            <th>Câmbio utilizado</th>
            <th>Método de pagamento</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const {
                method, tag, description,
                exchangeRates,
                id, value, currency,
              } = expense;
              const trocaMoeda = exchangeRates[currency
              ].name;
              const valorTroca = Number(exchangeRates[currency
              ].ask).toFixed(2);
              const valorConvertido = value * Number(exchangeRates[currency
              ].ask);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{valorConvertido.toFixed(2)}</td>
                  <td>{tag}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{method}</td>
                  <td>{valorTroca}</td>
                  <td>{trocaMoeda}</td>
                  <td>Real</td>
                  <td>
                    <button
                      onClick={ () => this.handleDelete(id) }
                      data-testid="delete-btn"
                      type="button"
                    >
                      Excluir
                    </button>
                    <button
                      onClick={ () => dispatch(editExpense(id, true)) }
                      data-testid="edit-btn"
                      type="button"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

Table.propTypes = { expenses: PropTypes.arrayOf(PropTypes.object) }.isRequired;

export default connect(mapStateToProps)(Table);
