import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    const { expenses } = this.props;
    const totalSum = expenses.reduce((acc, cur) => {
      const { ask } = cur.exchangeRates[cur.currency];
      return acc + ask * cur.value;
    }, 0);
    return (
      <div>
        <p>
          {'Email: '}
          <span
            data-testid="email-field"
          >
            {email}
          </span>
        </p>
        <p>
          {'Despesa Total: R$ '}
          <span
            data-testid="total-field"
          >
            {totalSum.toFixed(2)}
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </p>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);