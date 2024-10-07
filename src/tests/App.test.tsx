import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './renderWith';

const testIdEmail = 'email-input';
const testIdPassword = 'password-input';
const testIdValue = 'value-input';
const testDescription = 'Primeira despesa';
const testIdDescription = 'description-input';
const testIdmethod = 'method-input';
const testIdCartao = 'Cartão de débito';

describe('Teste para o formulário', () => {
  it('Testa se os campos de email e password aparecem na rota principal com o botão "Entrar"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  it('Teste se o input aceita apenas e-mail válido, se aceita apenas senha maior ou igual a 6 digítos e se o botão fica ativo apenas quando os dois inputs forem validados', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const emailInput = screen.getByTestId(testIdEmail);
    const passwordInput = screen.getByTestId(testIdPassword);
    const btn = screen.getByRole('button', { name: /Entrar/i });

    expect(btn).toBeDisabled();

    await userEvent.type(emailInput, 'test@trybe.com');

    expect(btn).toBeDisabled();

    await userEvent.type(passwordInput, '1234567');

    expect(btn).toBeEnabled();
  });

  it('testa se ao clicar no botão entrar, navega pra rota correta', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const emailInput = screen.getByTestId(testIdEmail);
    const passwordInput = screen.getByTestId(testIdPassword);
    const btn = screen.getByRole('button', { name: /Entrar/i });

    await userEvent.type(emailInput, 'test@trybe.com');
    await userEvent.type(passwordInput, '1234567');

    await userEvent.click(btn);

    const headerText = screen.getByRole('heading', { name: /Usuário/i });
    expect(headerText).toBeInTheDocument();
  });
  it('Testa na rota /carteira se renderiza os elementos corretamente', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const btnExpense = screen.getByRole('button', { name: /Adicionar Despesa/i });
    const inputExpense = screen.getByTestId(testIdValue);
    const inputDescription = screen.getByTestId(testIdDescription);
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId(testIdmethod);
    const inputTag = screen.getByTestId('tag-input');

    expect(btnExpense).toBeInTheDocument();
    expect(inputExpense).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
  });
  it('testa se na rota carteira, a função adicionar despesa funciona', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const btnExpense = screen.getByRole('button', { name: /Adicionar Despesa/i });
    const inputExpense = screen.getByTestId(testIdValue);
    const inputDescription = screen.getByTestId(testIdDescription);
    const methodSelect = screen.getByTestId(testIdmethod);

    await userEvent.type(inputExpense, '100');
    await userEvent.type(inputDescription, testDescription);
    await userEvent.selectOptions(methodSelect, testIdCartao);

    expect(inputExpense).toHaveValue('100');
    expect(inputDescription).toHaveValue(testDescription);
    screen.debug();
    expect(methodSelect).toHaveValue(testIdCartao);

    await userEvent.click(btnExpense);

    expect(inputExpense).toHaveValue('');
    expect(inputDescription).toHaveValue('');
    expect(methodSelect).toHaveValue('Dinheiro');

    await waitFor(() => {
      const newExpense = store.getState().wallet.expenses;
      expect(newExpense.length).toBe(1);
    });
  });
  it('testa se ao clicar excluir, a despesa é excluída do estado', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const btnExpense = screen.getByRole('button', { name: /Adicionar Despesa/i });
    const inputExpense = screen.getByTestId(testIdValue);
    const inputDescription = screen.getByTestId(testIdDescription);
    const methodSelect = screen.getByTestId(testIdmethod);

    await userEvent.type(inputExpense, '100');
    await userEvent.type(inputDescription, testDescription);
    await userEvent.selectOptions(methodSelect, testIdCartao);

    expect(inputExpense).toHaveValue('100');
    expect(inputDescription).toHaveValue(testDescription);
    screen.debug();
    expect(methodSelect).toHaveValue(testIdCartao);

    await userEvent.click(btnExpense);

    expect(inputExpense).toHaveValue('');
    expect(inputDescription).toHaveValue('');
    expect(methodSelect).toHaveValue('Dinheiro');

    await waitFor(() => {
      const newExpense = store.getState().wallet.expenses;
      expect(newExpense.length).toBe(1);
    });

    const btnDelete = screen.getByTestId('delete-btn');
    await userEvent.click(btnDelete);

    await waitFor(() => {
      const newExpense = store.getState().wallet.expenses;
      expect(newExpense.length).toBe(0);
    });
  });
});
