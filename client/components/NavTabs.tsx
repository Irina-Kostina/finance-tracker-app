import { CreditCard, Calendar, Target, PiggyBank, BarChart3, Eye } from 'lucide-react'
import { ViewType } from '../types'

interface Props {
  currentView: ViewType
  onChange: (view: ViewType) => void
}

const TABS: Array<{ id: ViewType; label: string; icon: any; gradient: string }> = [
  { id: 'dashboard', label: 'Dashboard', icon: Eye, gradient: 'from-blue-500 to-indigo-500' },
  { id: 'accounts', label: 'Accounts', icon: CreditCard, gradient: 'from-green-500 to-emerald-500' },
  { id: 'transactions', label: 'Transactions', icon: Calendar, gradient: 'from-purple-500 to-violet-500' },
  { id: 'budget', label: 'Budget', icon: Target, gradient: 'from-orange-500 to-red-500' },
  { id: 'goals', label: 'Goals', icon: PiggyBank, gradient: 'from-pink-500 to-rose-500' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, gradient: 'from-cyan-500 to-blue-500' }
]

export default function NavTabs({ currentView, onChange }: Props) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/50">
        <div className="flex">
          {TABS.map(({ id, label, icon: Icon, gradient }) => (
            <button
              key={id}
              onClick={() => onChange(id)}
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
  )
}