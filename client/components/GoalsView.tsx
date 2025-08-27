// Done
import React from 'react';
import { PiggyBank } from 'lucide-react';
import { Goal } from './types';
import { formatCurrency } from './utils';

interface GoalsViewProps {
  goals: Goal[];
  onAddToGoal: (goalId: string, amount: number) => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({ goals, onAddToGoal }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
        <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <PiggyBank className="text-purple-500" />
          Financial Goals
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <div key={goal.id} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${goal.gradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300`}></div>
                <div className="relative p-6 border-2 border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm hover:border-purple-300 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg text-gray-800">{goal.name}</h4>
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${goal.gradient} shadow-lg`}></div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-800 mb-1">
                      ${formatCurrency(goal.currentAmount)}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      of ${formatCurrency(goal.targetAmount)} ({percentage.toFixed(0)}%)
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r ${goal.gradient} transition-all duration-700 ease-out`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4 space-y-1">
                    <div className="font-medium">${formatCurrency(remaining)} remaining</div>
                    <div>Deadline: {new Date(goal.deadline).toLocaleDateString()}</div>
                  </div>
                  
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                      placeholder="Add to goal..."
                      onBlur={(e) => {
                        if (e.target.value) {
                          const amount = parseFloat(e.target.value);
                          onAddToGoal(goal.id, amount);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};