// Done
import React from 'react';
import { Target } from 'lucide-react';
import { Budget } from '../src/types';
import { EXPENSE_CATEGORIES } from '../src/constants';
import { formatCurrency } from '../src/utils/utils';

interface BudgetViewProps {
  budgets: Budget[];
}

export const BudgetView: React.FC<BudgetViewProps> = ({ budgets }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
        <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <Target className="text-purple-500" />
          Budget Tracking
        </h3>
        
        <div className="space-y-6">
          {budgets.map((budget) => {
            const category = EXPENSE_CATEGORIES.find(c => c.id === budget.categoryId);
            const percentage = (budget.spent / budget.limit) * 100;
            const isOverBudget = budget.spent > budget.limit;
            
            return (
              <div key={budget.categoryId} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${category?.gradient} rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300`}></div>
                <div className="relative p-6 border-2 border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm hover:border-purple-300 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category?.gradient} shadow-lg`}></div>
                      <span className="font-bold text-lg text-gray-800">{category?.label}</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-xl ${isOverBudget ? 'text-red-600' : 'text-gray-800'}`}>
                        ${formatCurrency(budget.spent)} / ${formatCurrency(budget.limit)}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {percentage.toFixed(0)}% used
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-4 rounded-full transition-all duration-700 ease-out ${
                        isOverBudget 
                          ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                          : `bg-gradient-to-r ${category?.gradient}`
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  
                  {isOverBudget && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-xl">
                      <div className="text-sm text-red-700 font-bold flex items-center gap-2">
                        Over budget by ${formatCurrency(budget.spent - budget.limit)}!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};