import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../type';
import { deleteExpense } from '../redux/actions';

function Table() {
  const { expenses } = useSelector((globalState: any) => globalState.wallet);

  const dispatch: AppDispatch = useDispatch();

  const handleClick = (id: number) => {
    dispatch(deleteExpense(id));
  };

  return (
    <table>
      <thead>
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
      </thead>
      <tbody>
        {expenses.map((expense: any) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{parseFloat(expense.value).toFixed(2)}</td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              {(parseFloat(expense.value)
              * parseFloat(expense.exchangeRates[expense.currency].ask))
                .toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => handleClick(expense.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
