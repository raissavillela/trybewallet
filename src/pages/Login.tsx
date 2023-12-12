import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetStateAction, useState } from 'react';
import { setEmail } from '../redux/actions';

function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isEmailValid(emailValue) && password.length >= 6) {
      dispatch(setEmail(emailValue));
      navigate('/carteira');
    }
  };

  return (
    <form>
      <input
        type="text"
        name="email"
        onChange={ (e: { target:
        { value: SetStateAction<string>; }; }) => setEmailValue(e.target.value) }
        value={ emailValue }
        placeholder="E-mail"
        data-testid="email-input"
        required
      />
      <input
        type="password"
        name="password"
        onChange={ (e: { target:
        { value: SetStateAction<string>; }; }) => setPassword(e.target.value) }
        value={ password }
        placeholder="Senha"
        data-testid="password-input"
        required
      />
      <button
        type="button"
        onClick={ handleLogin }
        disabled={ !isEmailValid(emailValue) || password.length < 6 }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
