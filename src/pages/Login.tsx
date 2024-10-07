import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/actions';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const INITIAL_INPUT = {
    email: '',
    password: '',
  };

  const [formState, setFormState] = useState(INITIAL_INPUT);

  const handleInputChange = (prop: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };

  function isFormValid() {
    const isPasswordValid = formState.password.length >= 6;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);
    return isPasswordValid && isEmailValid;
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    dispatch(setUser(formState.email));
    navigate('/carteira');
  }

  return (
    <form>
      <label htmlFor="email" aria-label="E-mail" />
      <input
        type="email"
        placeholder="E-mail"
        name="email"
        id="email"
        data-testid="email-input"
        value={ formState.email }
        onChange={ (e) => handleInputChange('email', e.target.value) }
      />
      <label htmlFor="password" aria-label="Password" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        data-testid="password-input"
        value={ formState.password }
        onChange={ (e) => handleInputChange('password', e.target.value) }
      />
      <button
        disabled={ !isFormValid() }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
