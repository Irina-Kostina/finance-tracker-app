// Done ++
import React from 'react';
import { BarChart3, Sparkles } from 'lucide-react';
import { PeriodType, FinanceEntry } from '../src/types';
import { EXPENSE_CATEGORIES, MOODS } from '../src/constants';
import { formatCurrency } from '../src/utils/utils';

interface AnalyticsViewProps {
  selectedPeriod: PeriodType;
  categorySpending: Record<string, number>;
  entries: FinanceEntry[];
  showMoodTracking: boolean;
  onPeriodChange: (period: PeriodType) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  selectedPeriod,
  categorySpending,
  entries,
  showMoodTracking,
  onPeriodChange
}) => {
  const periods = [
    { id: 'week' as PeriodType, label: 'Week', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'month' as PeriodType, label: 'Month', gradient: 'from-green-500 to-emerald-500' },
    { id: 'quarter' as PeriodType, label: 'Quarter', gradient: 'from-purple-500 to-violet-500' },
    { id: 'year' as PeriodType, label: 'Year', gradient: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Period Selector */}
      <div className="flex justify-center">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/50">
          {periods.map(({ id, label, gradient }) => (
            <button
              key={id}
              onClick={() => onPeriodChange(id)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold ${
                selectedPeriod === id 
                  ? `bg-gradient-to-r ${gradient} text-white shadow-lg` 
                  : 'text-gray-600 hover:bg-white/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Spending */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
        <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <BarChart3 className="text-purple-500" />
          Spending by Category ({selectedPeriod})
        </h3>
        
        <div className="space-y-4">
          {Object.entries(categorySpending)
            .sort(([,a], [,b]) => b - a)
            .map(([categoryId, amount]) => {
              const category = EXPENSE_CATEGORIES.find(c => c.id === categoryId);
              const totalSpending = Object.values(categorySpending).reduce((sum, val) => sum + val, 0);
              const percentage = totalSpending > 0 ? (amount / totalSpending) * 100 : 0;
              
              return (
                <div key={categoryId} className="group relative">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${category?.gradient} rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300`}></div>
                  <div className="relative flex items-center justify-between p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category?.gradient} shadow-lg`}></div>
                      <span className="font-bold text-lg text-gray-800">{category?.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl text-gray-800">
                        ${formatCurrency(amount)}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        
        {Object.keys(categorySpending).length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <div className="text-xl text-gray-500 font-medium">No spending data for this period</div>
          </div>
        )}
      </div>

      {/* Mood Tracking Analytics */}
      {showMoodTracking && (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
          <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="text-purple-500" />
            Spending by Mood
          </h3>
          
          <div className="space-y-4">
            {MOODS.map((mood) => {
              const moodEntries = entries.filter(e => e.mood === mood.id && e.type === 'expense');
              const totalSpent = moodEntries.reduce((sum, e) => sum + e.amount, 0);
              const avgSpending = moodEntries.length > 0 ? totalSpent / moodEntries.length : 0;
              
              if (moodEntries.length === 0) return null;
              
              return (
                <div key={mood.id} className="group relative">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${mood.gradient} rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300`}></div>
                  <div className="relative flex items-center justify-between p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${mood.color}`}>
                        {mood.label}
                      </span>
                      <span className="text-sm text-gray-600 font-medium">{moodEntries.length} transactions</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl text-gray-800">
                        ${formatCurrency(totalSpent)}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        avg: ${formatCurrency(avgSpending)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};