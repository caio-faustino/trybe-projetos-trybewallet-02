import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando a página Login <Login />', () => {
  test('Testar se a página contém 2 inputs e 1 button', () => {
    renderWithRedux(<Login />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Testar se ao digitar um e-mail válido e um password válido e clicar no botão, vai para a proxima pagina', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'matias@trybe.com');
    const inputPassword = screen.getByTestId('password-input');
    await userEvent.type(inputPassword, '123456');
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    const heading = await screen.findByRole('heading', { name: 'TrybeWallet' });
    expect(heading).toBeVisible();

    expect(history.location.pathname).toBe('/carteira');
  });
});