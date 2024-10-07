import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchApi } from '../redux/actions';
import { AppDispatch } from '../type';

function WalletForm() {
  const INITIAL_STATE = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };
  const [form, setForm] = useState(INITIAL_STATE);
  const { id, value, description, currency, method, tag } = form;

  const { currencies } = useSelector((globalState: any) => globalState.wallet);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(actionFetchApi());
  }, [dispatch]);

  if (!currencies) {
    return <div>Loading...</div>;
  }

  const handleChange = ({ target }: React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >) => {
    const { name, value: targetValue } = target;
    setForm({ ...form, [name]: targetValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(actionFetchApi(form));
    setForm({ ...INITIAL_STATE, id: id + 1 });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="value">Valor:</label>
      <input
        type="text"
        name="value"
        id="value"
        data-testid="value-input"
        value={ value }
        onChange={ handleChange }
      />
      <label>
        Moeda:
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ handleChange }
        >
          {currencies.map((coin: any, index: any) => (
            <option
              key={ index }
              value={ coin }
            >
              {coin}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          id="method"
          data-testid="method-input"
          value={ method }
          onChange={ handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>

      <label htmlFor="tag">
        Categoria:
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          name="description"
          id="description"
          data-testid="description-input"
          value={ description }
          onChange={ handleChange }
        />
      </label>
      <button type="submit">
        Adicionar Despesa
      </button>

    </form>
  );
}

export default WalletForm;
