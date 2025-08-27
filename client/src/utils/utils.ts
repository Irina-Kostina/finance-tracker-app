// Done
import { Account, FinanceEntry, PeriodType } from '../types';
import { ALL_CATEGORIES } from '../constants';

export const getTotalBalance = (accounts: Account[]) => 
  accounts.reduce((sum, account) => sum + account.balance, 0);

export const getMonthlyStats = (entries: FinanceEntry[]) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
  });

  const income = monthlyEntries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const expenses = monthlyEntries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);

  return {
    income,
    expenses,
    net: income - expenses,
    savingsRate: income > 0 ? ((income - expenses) / income * 100) : 0
  };
};

export const getCategorySpending = (entries: FinanceEntry[], period: PeriodType = 'month') => {
  const now = new Date();
  const startDate = new Date();

  switch (period) {
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      startDate.setMonth(now.getMonth() - 3);
      break;
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= startDate && entryDate <= now && entry.type === 'expense';
  });

  const categorySpending: Record<string, number> = {};
  filteredEntries.forEach(entry => {
    categorySpending[entry.category] = (categorySpending[entry.category] || 0) + entry.amount;
  });

  return categorySpending;
};

export const findCategoryById = (categoryId: string) => 
  ALL_CATEGORIES.find(c => c.id === categoryId);

export const formatCurrency = (amount: number) => 
  amount.toLocaleString('en-US', { minimumFractionDigits: 2 });

export const getCurrentDateString = () => 
  new Date().toISOString().split('T')[0];