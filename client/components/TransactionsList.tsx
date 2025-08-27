// Done
import React from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import { FinanceEntry, Account } from './types';
import { ALL_CATEGORIES, MOODS } from './constants';

interface TransactionsListProps {
  entries: FinanceEntry[];
  accounts: Account[];
  showMoodTracking: boolean;
  onDeleteEntry: (id: number) => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  entries,
  accounts,
  showMoodTracking,
  onDeleteEntry
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
      <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
        <Calendar className="text-purple-500" />
        Recent Transactions
      </h3>
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💳</div>
            <div className="text-xl text-gray-500 font-medium">No transactions yet</div>
            <div className="text-gray-400">Add your first transaction to get started!</div>
          </div>
        ) : (
          entries.map((entry) => {
            const category = ALL_CATEGORIES.find(c => c.id === entry.category);
            const account = accounts.find(a => a.id === entry.account);
            const mood = MOODS.find(m => m.id === entry.mood);
            
            return (
              <div key={entry.id} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${category?.gradient || 'from-gray-400 to-gray-500'} rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300`}></div>
                <div className="relative flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-purple-300 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-6">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category?.gradient || 'from-gray-400 to-gray-500'} shadow-lg`}></div>
                    <div>
                      <div className={`font-bold text-lg ${
                        entry.type === 'income' ? 'text-green-600' : 
                        entry.type === 'expense' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {entry.type === 'income' ? '+' : entry.type === 'expense' ? '-' : '↔'}${entry.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        {entry.type !== 'transfer' && ` - ${category?.label}`}
                      </div>
                      <div className="text-gray-600 font-medium">{entry.description}</div>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          {account?.icon} {account?.name}
                        </span>
                        <span>•</span>
                        <span>{entry.date}</span>
                        {showMoodTracking && mood && (
                          <>
                            <span>•</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${mood.color}`}>
                              {mood.label}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-300 transform hover:scale-110"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};