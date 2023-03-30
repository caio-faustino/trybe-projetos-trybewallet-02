// Requisito

// // 05

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Login from '../pages/Login';

describe('Testes do requisito 05', () => {
  test('Testa a rota de pg ao validar email e senha', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailImput = screen.getByTestId('email-input');
    userEvent.type(emailImput, 'matias@trybe.com');
    const senhaImput = screen.getByTestId('password-input');
    await userEvent.type(senhaImput, '123456');
    const btn = screen.getByRole('button');
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    const heading = await screen.findByRole('heading', { name: 'TrybeWallet' });
    expect(heading).toBeVisible();

    expect(history.location.pathname).toBe('/carteira');
  });

  test('Testa se a tela tem os componentes', () => {
    renderWithRedux(<Login />);

    const btn = screen.getByRole('button');
    const emailImput = screen.getByTestId('email-input');
    const senhaImput = screen.getByTestId('password-input');

    expect(btn).toBeInTheDocument();
    expect(emailImput).toBeInTheDocument();
    expect(senhaImput).toBeInTheDocument();
  });
});
