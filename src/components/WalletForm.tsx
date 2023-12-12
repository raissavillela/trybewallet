import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { RootState } from '../types';
import { addExpenseRates, fetchCurrencies } from '../redux/actions';

function WalletForm() {
  const dispatch = useDispatch();
  const { currencies, expenses } = useSelector((state: RootState) => state.wallet);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');

  useEffect(() => {
    dispatch(fetchCurrencies() as any);
  }, [dispatch]);

  const handleAddExpense = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const lastExpense = expenses[expenses.length - 1];
    const newId = lastExpense ? lastExpense.id + 1 : 0;
    const expense = {
      id: newId,
      value,
      description,
      currency,
      method,
      tag,
    };

    dispatch(addExpenseRates(expense) as unknown as AnyAction);
    setValue('');
    setDescription('');
    setCurrency('USD');
  };

  return (
    <form>
      <label>
        Valor:
        <input
          type="text"
          data-testid="value-input"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
      </label>

      <label>
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          value={ description }
          onChange={ (e) => setDescription(e.target.value) }
        />
      </label>

      <label>
        Moeda:
        <select
          data-testid="currency-input"
          value={ currency }
          onChange={ (e) => setCurrency(e.target.value) }
        >
          {currencies.map((curre) => (
            <option key={ curre } value={ curre }>
              {curre}
            </option>
          ))}
        </select>
      </label>

      <label>
        Método de Pagamento:
        <select
          data-testid="method-input"
          value={ method }
          onChange={ (e) => setMethod(e.target.value) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>

      <label>
        Categoria (Tag):
        <select
          data-testid="tag-input"
          value={ tag }
          onChange={ (e) => setTag(e.target.value) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>

      <button type="button" onClick={ handleAddExpense }>
        Adicionar Despesa
      </button>
    </form>
  );
}

export default WalletForm;
