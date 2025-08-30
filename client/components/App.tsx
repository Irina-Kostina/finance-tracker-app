// Done
import React, { useState, useEffect } from 'react';
import { Plus, Eye, Calendar, Target, PiggyBank, BarChart3, CreditCard, Settings, Sparkles, Wallet } from 'lucide-react';
import { Account, Budget, Goal, FinanceEntry, FormData, ViewType, PeriodType } from '../src/types';
import { AddTransactionForm } from './AddTransactionForm';
import { Dashboard } from './Dashboard';
import { TransactionsList } from './TransactionsList';
import { BudgetView } from './BudgetView';
import { AccountsView } from './AccountsView';
import { GoalsView } from './GoalsView';
import { AnalyticsView } from './AnalyticsView';
import { getMonthlyStats, getCategorySpending, getCurrentDateString } from '../src/utils/utils';

export default function PersonalFinanceTracker() {
  const [accounts, setAccounts] = useState<Account[]>([
    { 
      id: 'checking', 
      name: 'Checking Account', 
      type: 'checking', 
      balance: 2500.00, 
      color: 'bg-blue-500', 
      gradient: 'from-blue-500 to-indigo-600',
      icon: '🏦' 
    },
    { 
      id: 'savings', 
      name: 'Savings Account', 
      type: 'savings', 
      balance: 15000.00, 
      color: 'bg-green-500', 
      gradient: 'from-green-500 to-emerald-600',
      icon: '💰' 
    },
    { 
      id: 'investment', 
      name: 'Investment Account', 
      type: 'investment', 
      balance: 25000.00, 
      color: 'bg-purple-500', 
      gradient: 'from-purple-500 to-violet-600',
      icon: '📈' 
    }
  ]);

  const [entries, setEntries] = useState<FinanceEntry[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([
    { categoryId: 'food', limit: 800, spent: 0 },
    { categoryId: 'shopping', limit: 300, spent: 0 },
    { categoryId: 'transport', limit: 200, spent: 0 },
    { categoryId: 'entertainment', limit: 150, spent: 0 }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', name: 'Emergency Fund', targetAmount: 20000, currentAmount: 15000, deadline: '2024-12-31', gradient: 'from-red-500 to-pink-500' },
    { id: '2', name: 'Vacation Fund', targetAmount: 5000, currentAmount: 2500, deadline: '2024-08-15', gradient: 'from-blue-500 to-cyan-500' },
    { id: '3', name: 'New Car', targetAmount: 30000, currentAmount: 8000, deadline: '2025-06-30', gradient: 'from-green-500 to-emerald-500' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('month');
  const [showMoodTracking, setShowMoodTracking] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    category: '',
    account: 'checking',
    description: '',
    date: getCurrentDateString(),
    type: 'expense',
    mood: ''
  });

  useEffect(() => {
    const sampleData: FinanceEntry[] = [
      {
        id: 1,
        amount: 3500.00,
        category: 'salary',
        account: 'checking',
        description: 'Monthly salary deposit',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
        type: 'income'
      },
      {
        id: 2,
        amount: 1500.00,
        category: 'rent',
        account: 'checking',
        description: 'Monthly rent payment',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
        type: 'expense'
      },
      {
        id: 3,
        amount: 500.00,
        account: 'checking',
        category: 'transfer',
        description: 'Transfer to savings',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        type: 'transfer'
      },
      {
        id: 4,
        amount: 85.50,
        category: 'food',
        account: 'checking',
        description: 'Grocery shopping',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        type: 'expense',
        mood: showMoodTracking ? 'neutral' : undefined
      }
    ];
    setEntries(sampleData);

    setBudgets(prevBudgets => 
      prevBudgets.map(budget => ({
        ...budget,
        spent: sampleData
          .filter(entry => entry.category === budget.categoryId && entry.type === 'expense')
          .reduce((sum, entry) => sum + entry.amount, 0)
      }))
    );
  }, [showMoodTracking]);

  const addEntry = () => {
    if (!formData.amount || !formData.account) return;
    if (formData.type !== 'transfer' && !formData.category) return;

    const newEntry: FinanceEntry = {
      id: Date.now(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      account: formData.account,
      description: formData.description,
      date: formData.date,
      timestamp: Date.now(),
      type: formData.type,
      mood: showMoodTracking ? formData.mood : undefined
    };

    setEntries([newEntry, ...entries]);

    setAccounts(prevAccounts => 
      prevAccounts.map(account => {
        if (account.id === formData.account) {
          const change = formData.type === 'income' ? parseFloat(formData.amount) : -parseFloat(formData.amount);
          return { ...account, balance: account.balance + change };
        }
        if (formData.type === 'transfer' && formData.toAccount && account.id === formData.toAccount) {
          return { ...account, balance: account.balance + parseFloat(formData.amount) };
        }
        return account;
      })
    );

    if (formData.type === 'expense') {
      setBudgets(prevBudgets => 
        prevBudgets.map(budget => 
          budget.categoryId === formData.category 
            ? { ...budget, spent: budget.spent + parseFloat(formData.amount) }
            : budget
        )
      );
    }

    setFormData({
      amount: '',
      category: '',
      account: 'checking',
      description: '',
      date: getCurrentDateString(),
      type: 'expense',
      mood: ''
    });
    setShowAddForm(false);
  };

  const deleteEntry = (id: number) => {
    const entry = entries.find(e => e.id === id);
    if (!entry) return;

    setAccounts(prevAccounts => 
      prevAccounts.map(account => {
        if (account.id === entry.account) {
          const change = entry.type === 'income' ? -entry.amount : entry.amount;
          return { ...account, balance: account.balance + change };
        }
        return account;
      })
    );

    if (entry.type === 'expense') {
      setBudgets(prevBudgets => 
        prevBudgets.map(budget => 
          budget.categoryId === entry.category 
            ? { ...budget, spent: Math.max(0, budget.spent - entry.amount) }
            : budget
        )
      );
    }

    setEntries(entries.filter(e => e.id !== id));
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateAccountBalance = (accountId: string, newBalance: number) => {
    setAccounts(prev => prev.map(a => 
      a.id === accountId ? { ...a, balance: newBalance } : a
    ));
  };

  const addToGoal = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(g => 
      g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g
    ));
  };

  const monthlyStats = getMonthlyStats(entries);
  const categorySpending = getCategorySpending(entries, selectedPeriod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto p-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20"></div>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/50">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <Wallet className="text-white" size={32} />
                </div>
                Personal Finance Tracker
              </h1>
              <p className="text-gray-600 font-medium">Take control of your spending and build wealth</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMoodTracking(!showMoodTracking)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                showMoodTracking 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                  : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-white/50'
              }`}
            >
              <Settings className="inline mr-2" size={16} />
              Mood Tracking: {showMoodTracking ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/50">
            <div className="flex">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Eye, gradient: 'from-blue-500 to-indigo-500' },
                { id: 'accounts', label: 'Accounts', icon: CreditCard, gradient: 'from-green-500 to-emerald-500' },
                { id: 'transactions', label: 'Transactions', icon: Calendar, gradient: 'from-purple-500 to-violet-500' },
                { id: 'budget', label: 'Budget', icon: Target, gradient: 'from-orange-500 to-red-500' },
                { id: 'goals', label: 'Goals', icon: PiggyBank, gradient: 'from-pink-500 to-rose-500' },
                { id: 'analytics', label: 'Analytics', icon: BarChart3, gradient: 'from-cyan-500 to-blue-500' }
              ].map(({ id, label, icon: Icon, gradient }) => (
                <button
                  key={id}
                  onClick={() => setCurrentView(id as ViewType)}
                  className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 font-semibold ${
                    currentView === id 
                      ? `bg-gradient-to-r ${gradient} text-white shadow-lg` 
                      : 'text-gray-600 hover:bg-white/60'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add Transaction Button */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 flex items-center gap-3 mx-auto transition-all duration-300 transform hover:scale-105 shadow-2xl font-semibold text-lg group"
            >
              <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              Add Transaction
              <Sparkles size={20} className="animate-pulse" />
            </button>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <AddTransactionForm
            formData={formData}
            accounts={accounts}
            showMoodTracking={showMoodTracking}
            onFormChange={handleFormChange}
            onSubmit={addEntry}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Views */}
        {currentView === 'dashboard' && (
          <Dashboard accounts={accounts} monthlyStats={monthlyStats} />
        )}

        {currentView === 'accounts' && (
          <AccountsView accounts={accounts} onUpdateBalance={updateAccountBalance} />
        )}

        {currentView === 'transactions' && (
          <TransactionsList
            entries={entries}
            accounts={accounts}
            showMoodTracking={showMoodTracking}
            onDeleteEntry={deleteEntry}
          />
        )}

        {currentView === 'budget' && (
          <BudgetView budgets={budgets} />
        )}

        {currentView === 'goals' && (
          <GoalsView goals={goals} onAddToGoal={addToGoal} />
        )}

        {currentView === 'analytics' && (
          <AnalyticsView
            selectedPeriod={selectedPeriod}
            categorySpending={categorySpending}
            entries={entries}
            showMoodTracking={showMoodTracking}
            onPeriodChange={setSelectedPeriod}
          />
        )}
      </div>
    </div>
  );
}