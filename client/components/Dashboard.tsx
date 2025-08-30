// Done
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Sparkles } from 'lucide-react';
import { Account } from '../src/types';
import { formatCurrency, getTotalBalance } from '../src/utils/utils';

interface MonthlyStats {
  income: number;
  expenses: number;
  net: number;
  savingsRate: number;
}

interface DashboardProps {
  accounts: Account[];
  monthlyStats: MonthlyStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ accounts, monthlyStats }) => {
  return (
    <div className="space-y-8">
      {/* Account Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="group relative">
            <div className={`absolute -inset-1 bg-gradient-to-r ${account.gradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300`}></div>
            <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${account.gradient} text-white text-2xl shadow-lg`}>
                    {account.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{account.name}</h3>
                    <p className="text-sm text-gray-500 capitalize font-medium">{account.type}</p>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                ${formatCurrency(account.balance)}
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${account.gradient} animate-pulse`} style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 text-center border border-white/50 hover:scale-105 transition-all duration-300">
            <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl mx-auto mb-4 w-fit">
              <TrendingUp className="text-white" size={32} />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">${formatCurrency(monthlyStats.income)}</div>
            <div className="text-sm text-gray-500 font-medium">Monthly Income</div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 text-center border border-white/50 hover:scale-105 transition-all duration-300">
            <div className="p-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl mx-auto mb-4 w-fit">
              <TrendingDown className="text-white" size={32} />
            </div>
            <div className="text-3xl font-bold text-red-600 mb-1">${formatCurrency(monthlyStats.expenses)}</div>
            <div className="text-sm text-gray-500 font-medium">Monthly Expenses</div>
          </div>
        </div>
        
        <div className="group relative">
          <div className={`absolute -inset-1 bg-gradient-to-r ${monthlyStats.net >= 0 ? 'from-green-400 to-emerald-500' : 'from-red-400 to-pink-500'} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300`}></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 text-center border border-white/50 hover:scale-105 transition-all duration-300">
            <div className={`p-3 bg-gradient-to-r ${monthlyStats.net >= 0 ? 'from-green-400 to-emerald-500' : 'from-red-400 to-pink-500'} rounded-2xl mx-auto mb-4 w-fit`}>
              <DollarSign className="text-white" size={32} />
            </div>
            <div className={`text-3xl font-bold mb-1 ${monthlyStats.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${formatCurrency(Math.abs(monthlyStats.net))}
            </div>
            <div className="text-sm text-gray-500 font-medium">{monthlyStats.net >= 0 ? 'Net Surplus' : 'Net Deficit'}</div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 text-center border border-white/50 hover:scale-105 transition-all duration-300">
            <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl mx-auto mb-4 w-fit">
              <PiggyBank className="text-white" size={32} />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{monthlyStats.savingsRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-500 font-medium">Savings Rate</div>
          </div>
        </div>
      </div>

      {/* Net Worth */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl shadow-2xl p-10 text-white text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="animate-pulse" size={32} />
              <h2 className="text-3xl font-bold">Total Net Worth</h2>
              <Sparkles className="animate-pulse" size={32} />
            </div>
            <div className="text-6xl font-bold mb-4 animate-pulse">
              ${formatCurrency(getTotalBalance(accounts))}
            </div>
            <p className="text-xl text-purple-100 font-medium">Across all accounts</p>
          </div>
        </div>
      </div>
    </div>
  );
};