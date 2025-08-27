// Done
import { Category } from './types';

export const MOODS = [
  { id: 'happy', label: '😊 Happy', color: 'bg-yellow-100 text-yellow-800', gradient: 'from-yellow-400 to-orange-400' },
  { id: 'content', label: '😌 Content', color: 'bg-green-100 text-green-800', gradient: 'from-green-400 to-emerald-400' },
  { id: 'neutral', label: '😐 Neutral', color: 'bg-gray-100 text-gray-800', gradient: 'from-gray-400 to-slate-400' },
  { id: 'stressed', label: '😰 Stressed', color: 'bg-orange-100 text-orange-800', gradient: 'from-orange-400 to-red-400' },
  { id: 'impulse', label: '⚡ Impulse', color: 'bg-red-100 text-red-800', gradient: 'from-red-400 to-pink-400' }
];

export const EXPENSE_CATEGORIES: Category[] = [
  { id: 'food', label: '🍕 Food & Dining', color: 'bg-orange-500', gradient: 'from-orange-400 to-red-400', type: 'expense' },
  { id: 'shopping', label: '🛍️ Shopping', color: 'bg-pink-500', gradient: 'from-pink-400 to-rose-400', type: 'expense' },
  { id: 'transport', label: '🚗 Transportation', color: 'bg-blue-500', gradient: 'from-blue-400 to-cyan-400', type: 'expense' },
  { id: 'entertainment', label: '🎬 Entertainment', color: 'bg-purple-500', gradient: 'from-purple-400 to-violet-400', type: 'expense' },
  { id: 'health', label: '🏥 Healthcare', color: 'bg-green-500', gradient: 'from-green-400 to-emerald-400', type: 'expense' },
  { id: 'utilities', label: '⚡ Utilities', color: 'bg-yellow-500', gradient: 'from-yellow-400 to-amber-400', type: 'expense' },
  { id: 'rent', label: '🏠 Rent/Mortgage', color: 'bg-gray-500', gradient: 'from-gray-400 to-slate-400', type: 'expense' },
  { id: 'insurance', label: '🛡️ Insurance', color: 'bg-cyan-500', gradient: 'from-cyan-400 to-teal-400', type: 'expense' },
  { id: 'education', label: '📚 Education', color: 'bg-indigo-500', gradient: 'from-indigo-400 to-purple-400', type: 'expense' },
  { id: 'other', label: '📦 Other', color: 'bg-slate-500', gradient: 'from-slate-400 to-gray-400', type: 'expense' }
];

export const INCOME_CATEGORIES: Category[] = [
  { id: 'salary', label: '💰 Salary', color: 'bg-emerald-500', gradient: 'from-emerald-400 to-green-500', type: 'income' },
  { id: 'freelance', label: '💻 Freelance', color: 'bg-cyan-500', gradient: 'from-cyan-400 to-blue-400', type: 'income' },
  { id: 'investment', label: '📈 Investment Returns', color: 'bg-lime-500', gradient: 'from-lime-400 to-green-400', type: 'income' },
  { id: 'bonus', label: '🎁 Bonus', color: 'bg-yellow-500', gradient: 'from-yellow-400 to-orange-400', type: 'income' },
  { id: 'rental', label: '🏠 Rental Income', color: 'bg-teal-500', gradient: 'from-teal-400 to-cyan-400', type: 'income' },
  { id: 'business', label: '🏢 Business', color: 'bg-violet-500', gradient: 'from-violet-400 to-purple-400', type: 'income' },
  { id: 'other-income', label: '💵 Other Income', color: 'bg-rose-500', gradient: 'from-rose-400 to-pink-400', type: 'income' }
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];