import { Star } from 'lucide-react'
import { Account, FormData as TxFormData } from '../types'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MOODS } from '../constants'

interface Props {
  accounts: Account[]
  formData: TxFormData
  showMoodTracking: boolean
  onChange: (field: keyof TxFormData, value: string) => void
  onSave: () => void
  onCancel: () => void
}

export default function AddTransactionForm({
  accounts,
  formData,
  showMoodTracking,
  onChange,
  onSave,
  onCancel
}: Props) {
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
              onChange={(e) => onChange('type', e.target.value)}
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
              onChange={(e) => onChange('amount', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => onChange('date', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">From Account</label>
            <select
              value={formData.account}
              onChange={(e) => onChange('account', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.icon} {a.name} (${a.balance.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {formData.type === 'transfer' && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">To Account</label>
              <select
                value={formData.toAccount || ''}
                onChange={(e) => onChange('toAccount', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">Select account</option>
                {accounts
                  .filter((a) => a.id !== formData.account)
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.icon} {a.name}
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
                onChange={(e) => onChange('category', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">Select category</option>
                {(formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showMoodTracking && formData.type === 'expense' && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Mood (Optional)</label>
              <select
                value={formData.mood || ''}
                onChange={(e) => onChange('mood', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">Select mood</option>
                {MOODS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-semibold mb-3 text-gray-700">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => onChange('description', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              placeholder="What was this transaction for?"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onSave}
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
  )
}