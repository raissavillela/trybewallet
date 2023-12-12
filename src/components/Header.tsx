import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { Expense } from '../redux/reducers/wallet';

function Header() {
  const email = useSelector((state: RootState) => state.user.email);
  const totalExpenses = useSelector((state: RootState) => state.wallet.expenses);

  const totalValue = totalExpenses.reduce((acc, expense: Expense) => {
    const currencyAsk = expense?.exchangeRates?.[expense.currency]?.ask;
    return acc + Number(expense?.value) * Number(currencyAsk);
  }, 0);

  return (
    <div>
      <span data-testid="email-field">{email}</span>
      <span data-testid="total-field">{ totalValue.toFixed(2) }</span>
      <span data-testid="header-currency-field">BRL</span>
    </div>
  );
}

export default Header;
