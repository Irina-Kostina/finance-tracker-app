// File: src/components/Header.tsx
import { Wallet, Settings } from 'lucide-react';


interface HeaderProps { showMoodTracking: boolean; onToggleMoodTracking: () => void; }
export default function Header({ showMoodTracking, onToggleMoodTracking }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
    <div className="relative">
    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20"></div>
    <div className="relative bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/50">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
    <Wallet className="text-white" size={32} />
    </div>
    Personal Finance Tracker
    </h1>
    <p className="text-gray-600 font-medium">Take control of your spending and build wealth ✨</p>
    </div>
    </div>
    <div className="flex items-center gap-4">
    <button onClick={onToggleMoodTracking} className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
    showMoodTracking ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-white/50'
    }`}>
    <Settings className="inline mr-2" size={16} />
    Mood Tracking: {showMoodTracking ? 'ON' : 'OFF'}
    </button>
    </div>
    </div>
);
}