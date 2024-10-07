import { useSelector } from 'react-redux';

function Header() {
  const user = useSelector((globalState: any) => globalState.user);
  const wallet = useSelector((globalState: any) => globalState.wallet);

  const totalExpensive = () => {
    const convertion = wallet.expenses
      .filter((expense: any) => {
        const { currency, exchangeRates } = expense;
        return currency === exchangeRates[currency].code;
      })
      .map((expense: any) => expense.value * expense.exchangeRates[expense.currency].ask)
      .reduce((soma: any, i: any) => {
        return soma + i;
      }, 0);

    return convertion.toFixed(2);
  };

  if (!user || !user.email) {
    return <div>Loading...</div>;
  }

  return (

    <div>
      <h1 data-testid="email-field">
        Usuário:
        {' '}
        {user.email}
      </h1>
      <h2>
        Total:
        <span data-testid="total-field">{totalExpensive()}</span>
      </h2>

      <h2 data-testid="header-currency-field">BRL</h2>
    </div>
  );
}

export default Header;
