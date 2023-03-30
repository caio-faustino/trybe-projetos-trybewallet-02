// Requisito

// // 05

import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';

describe('Testes do requisito 05', () => {
  test('Testa imputs de botao', () => {
    renderWithRedux(<WalletForm />);

    const tagImput = screen.getByTestId('tag-input');
    const descImput = screen.getByTestId('description-input');
    const accDespesasBtn = screen.getByRole('button');
    const valorImput = screen.getByTestId('value-input');
    const moedaImput = screen.getByTestId('currency-input');
    const metodoimput = screen.getByTestId('method-input');

    expect(tagImput).toBeInTheDocument();
    expect(descImput).toBeInTheDocument();
    expect(accDespesasBtn).toBeInTheDocument();
    expect(valorImput).toBeInTheDocument();
    expect(moedaImput).toBeInTheDocument();
    expect(metodoimput).toBeInTheDocument();
  });
});
