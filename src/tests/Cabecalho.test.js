import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import Header from '../components/Header';

describe('Testando o componente Header <Header />', () => {
  test('Testar se o componente possui um campo email e outro Despesa total', () => {
    renderWithRedux(<Header />);

    const emailField = screen.getByText(/email/i);
    const totalExpenseField = screen.getByText(/despesa total/i);

    expect(emailField).toBeInTheDocument();
    expect(totalExpenseField).toBeInTheDocument();
  });
});