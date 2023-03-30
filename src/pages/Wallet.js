import React from 'react';
import Table from '../components/Table';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

export default class Wallet extends React.Component {
  render() {
    return (
      <section>
        {' '}
        <Header />
        {' '}
        <WalletForm />
        {' '}
        <Table />
        {' '}
      </section>
    );
  }
}
