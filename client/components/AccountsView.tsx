// Done
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Account } from '../src/types';
import { formatCurrency } from '../src/utils/utils';

interface AccountsViewProps {
  accounts: Account[];
  onUpdateBalance: (accountId: string, newBalance: number) => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({ accounts, onUpdateBalance }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
        <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <CreditCard className="text-purple-500" />
          Account Management
        </h3>
        
        <div className="space-y-6">
          {accounts.map((account) => (
            <div key={account.id} className="group relative">
              <div className={`absolute -inset-1 bg-gradient-to-r ${account.gradient} rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300`}></div>
              <div className="relative flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-purple-300 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${account.gradient} text-white shadow-lg`}>
                    {account.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-800">{account.name}</h4>
                    <p className="text-gray-500 capitalize font-medium">{account.type} Account</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    ${formatCurrency(account.balance)}
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    className="w-40 px-3 py-2 text-sm border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Update balance"
                    onBlur={(e) => {
                      if (e.target.value) {
                        onUpdateBalance(account.id, parseFloat(e.target.value));
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};