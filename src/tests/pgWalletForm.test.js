import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';

describe('Testando o componente Wallet <Wallet />', () => {
  test('Testar se a página contém os inputs e o button', () => {
    renderWithRedux(<WalletForm />);

    const inputValue = screen.getByTestId('value-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');
    const inputDescription = screen.getByTestId('description-input');
    const addExpenseButton = screen.getByRole('button');

    expect(inputValue).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(addExpenseButton).toBeInTheDocument();
  });
});