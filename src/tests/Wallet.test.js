import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const VALUE_INPUT = 'value-input';
const CURRENCY_INPUT = 'currency-input';
const DESCRIPTION_INPUT = 'description-input';
const ADD_EXPENSE = 'Adicionar despesa';

describe('Testando o componente Wallet <Wallet />', () => {
  test('Testar se a página renderiza uma nova despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    const inputValue = screen.getByTestId(VALUE_INPUT);
    userEvent.type(inputValue, '100');
    const inputCurrency = screen.getByTestId(CURRENCY_INPUT);
    await waitFor(() => {
      userEvent.selectOptions(inputCurrency, 'ARS');

      const inputDescription = screen.getByTestId(DESCRIPTION_INPUT);
      userEvent.type(inputDescription, 'Viagem');

      const addExpenseButton = screen.getByRole('button', { name: ADD_EXPENSE });
      expect(addExpenseButton).toBeVisible();
      userEvent.click(addExpenseButton);
    });

    const descriptionField = await screen.findByText(/viagem/i);
    const valueField = await screen.findByText('100.00');
    const currencySwapField = await screen.findByText(/peso argentino/i);
    const deleteButton = await screen.findByRole('button', { name: 'Excluir' });
    const editButton = await screen.findByRole('button', { name: 'Editar' });

    expect(descriptionField).toBeInTheDocument();
    expect(valueField).toBeInTheDocument();
    expect(currencySwapField).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  test('Testar se é possível deletar uma despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    const inputValue = screen.getByTestId(VALUE_INPUT);
    userEvent.type(inputValue, '100');
    const inputCurrency = screen.getByTestId(CURRENCY_INPUT);
    await waitFor(() => {
      userEvent.selectOptions(inputCurrency, 'ARS');

      const inputDescription = screen.getByTestId(DESCRIPTION_INPUT);
      userEvent.type(inputDescription, 'Viagem');

      const addExpenseButton = screen.getByRole('button', { name: ADD_EXPENSE });
      expect(addExpenseButton).toBeVisible();
      userEvent.click(addExpenseButton);
    });

    const descriptionField = screen.queryByText(/viagem/i);
    const valueField = screen.queryByText('100.00');
    const currencySwapField = screen.queryByText(/peso argentino/i);
    const deleteButton = await screen.findByRole('button', { name: 'Excluir' });

    userEvent.click(deleteButton);

    expect(descriptionField).not.toBeInTheDocument();
    expect(valueField).not.toBeInTheDocument();
    expect(currencySwapField).not.toBeInTheDocument();
  });

  test('Testar se é possível editar uma despesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    const inputValue = screen.getByTestId(VALUE_INPUT);
    userEvent.type(inputValue, '100');
    const inputCurrency = screen.getByTestId(CURRENCY_INPUT);
    await waitFor(() => {
      userEvent.selectOptions(inputCurrency, 'ARS');
    });

    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT);
    userEvent.type(inputDescription, 'Viagem');

    const addExpenseButton = screen.getByRole('button', { name: ADD_EXPENSE });
    expect(addExpenseButton).toBeVisible();
    userEvent.click(addExpenseButton);

    const descriptionField = await screen.findByText(/viagem/i);
    const valueField = await screen.findByText('100.00');

    expect(descriptionField).toBeInTheDocument();
    expect(valueField).toBeInTheDocument();

    const editButton = await screen.findByRole('button', { name: 'Editar' });

    userEvent.click(editButton);

    userEvent.type(inputValue, '50');
    userEvent.type(inputDescription, 'Sushi');

    const editExpenseButton = screen.getByRole('button', { name: 'Editar despesa' });
    expect(editExpenseButton).toBeVisible();
    userEvent.click(editExpenseButton);

    const newDescriptionField = await screen.findByText(/sushi/i);
    const newValueField = await screen.findByText('50.00');

    expect(newDescriptionField).toBeInTheDocument();
    expect(newValueField).toBeInTheDocument();
  });
});