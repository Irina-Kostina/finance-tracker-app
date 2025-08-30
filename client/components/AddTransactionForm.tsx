// Done ++
import React from 'react';
import { Star } from 'lucide-react';
import { FormData, Account } from '../src/types';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MOODS } from '../src/constants';

interface AddTransactionFormProps {
  formData: FormData;
  accounts: Account[];
  showMoodTracking: boolean;
  onFormChange: (field: keyof FormData, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  formData,
  accounts,
  showMoodTracking,
  onFormChange,
  onSubmit,
  onCancel
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-white/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <Star className="text-purple-500" />
          Add New Transaction
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Type</label>
            <select
              value={formData.type}
              onChange={(e) => onFormChange('type', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
            >
              <option value="expense">💸 Expense</option>
              <option value="income">💰 Income</option>
              <option value="transfer">↔️ Transfer</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => onFormChange('amount', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => onFormChange('date', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">From Account</label>
            <select
              value={formData.account}
              onChange={(e) => onFormChange('account', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
            >
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.icon} {account.name} (${account.balance.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {formData.type === 'transfer' && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">To Account</label>
              <select
                value={formData.toAccount || ''}
                onChange={(e) => onFormChange('toAccount', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">Select account</option>
                {accounts.filter(a => a.id !== formData.account).map(account => (
                  <option key={account.id} value={account.id}>
                    {account.icon} {account.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.type !== 'transfer' && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => onFormChange('category', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">Select category</option>
                {(formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          )}

          {showMoodTracking && formData.type === 'expense' && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Mood (Optional)</label>
              <select
                value={formData.mood || ''}
                onChange={(e) => onFormChange('mood', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">Select mood</option>
                {MOODS.map(mood => (
                  <option key={mood.id} value={mood.id}>{mood.label}</option>
                ))}
              </select>
            </div>
          )}

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-semibold mb-3 text-gray-700">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => onFormChange('description', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              placeholder="What was this transaction for?"
            />
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <button
            onClick={onSubmit}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
          >
            Save Transaction
          </button>
          <button
            onClick={onCancel}
            className="px-8 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};