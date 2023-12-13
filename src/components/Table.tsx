import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '../types';
import { deleteExpenses } from '../redux/actions';
import { Expense } from '../redux/reducers/wallet';

function Table() {
  const { expenses }: { expenses: Expense[] } = useSelector((
    state: GlobalState,
  ) => state.wallet);
  const dispatch = useDispatch();

  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    const expenseNew = expenses
      .filter((expense) => expense.id === +event.currentTarget.id);
    dispatch(deleteExpenses(expenseNew));
  };

  return (
    <div>
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {
            expenses.length > 0 && expenses.map((expense:Expense) => {
              return (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ (+expense.value).toFixed(2) }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>{ (+expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
                  <td>
                    { (+expense.value * +expense.exchangeRates[expense.currency]
                      .ask).toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button>Editar</button>
                    <button
                      id={ (expense.id).toString() }
                      onClick={ (event) => handleClick(event) }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
