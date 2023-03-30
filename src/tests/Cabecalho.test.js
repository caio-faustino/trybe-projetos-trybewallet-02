import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import Header from '../components/Header';

describe('Testes do requisito 05', () => {
  test('Testa se o cabecalho tem email e valor total', () => {
    renderWithRedux(<Header />);

    const campoTotal = screen.getByText(/despesa total/i);
    const campoEmail = screen.getByText(/email/i);

    expect(campoTotal).toBeInTheDocument();
    expect(campoEmail).toBeInTheDocument();
  });
});
