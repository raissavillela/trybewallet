import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

const emailInputTest = 'email-input';
const passwordInputTest = 'password-input';

describe('Testando a página de login', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
  });

  test('Verifica se os campos para login estão corretos', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailInputTest);
    const passwordInput = screen.getByTestId(passwordInputTest);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Verifica se o botão está habilitado/desabilitado', async () => {
    const emailInput = screen.getByTestId(emailInputTest);
    const passwordInput = screen.getByTestId(passwordInputTest);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    expect(loginButton).toBeDisabled();

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, '1234567');
    });

    expect(loginButton).not.toBeDisabled();
  });

  test('Verifica se a rota é mudada para /carteira após o clique no botão', async () => {
    const emailInput = screen.getByTestId(emailInputTest);
    const passwordInput = screen.getByTestId(passwordInputTest);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, '1234567');
      await userEvent.click(loginButton);
    });

    const userName = screen.getByTestId('email');

    expect(userName).toBeInTheDocument();
  });
});

describe('Página da carteira', () => {
  test('Verifica se todos os elementos estão na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const elementIds = [
      'valor',
      'descrição',
      'moeda',
      'método de pagamento',
      'categoria',
      'adicionar despesa',
    ];

    elementIds.forEach((elementId) => {
      expect(screen.getByTestId(elementId)).toBeInTheDocument();
    });
  });

  test('Verifica se o e-mail do usuário é mostrado na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const userEmail = 'user@email.com';
    const userPassword = '1234567';

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    await act(async () => {
      await userEvent.type(emailInput, userEmail);
      await userEvent.type(passwordInput, userPassword);
      await userEvent.click(loginButton);
    });

    const userName = screen.getByTestId('email-field');

    expect(userName).toHaveTextContent(userEmail);
  });
});
