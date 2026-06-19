import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import { User, Flame, Star, TrendingUp, Trophy } from 'lucide-react'

export default function Profile() {
  const username = localStorage.getItem('username') || 'Akshar'
  const selectedPath = localStorage.getItem('selectedPath') || 'DSA & Placement Prep'

  const stats = [
    { icon: <Flame className="text-orange-400" size={20} />, label: 'Current Streak', value: '12 Days' },
    { icon: <Flame className="text-red-400" size={20} />, label: 'Best Streak', value: '15 Days' },
    { icon: <Star className="text-yellow-400" size={20} />, label: 'Current Level', value: 'Level 5' },
    { icon: <TrendingUp className="text-[#10B981]" size={20} />, label: 'XP Earned', value: '1,250 XP' },
    { icon: <TrendingUp className="text-[#6366F1]" size={20} />, label: 'Progress', value: '68%' },
    { icon: <Trophy className="text-yellow-400" size={20} />, label: 'Achievements', value: '4 Unlocked' },
  ]

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex">
      <Sidebar active="Profile" />
      <main className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-8">Profile</h1>

          {/* Avatar Card */}
          <div className="bg-[#1E293B] rounded-2xl p-8 border border-white/5 mb-6 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#6366F1]/20 border-2 border-[#6366F1] flex items-center justify-center">
              <User size={36} className="text-[#6366F1]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{username}</h2>
              <p className="text-[#94A3B8] mt-1">{selectedPath}</p>
              <span className="inline-block mt-2 bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 px-3 py-1 rounded-full text-xs font-medium">
                Level 5 · 1,250 XP
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1E293B] rounded-2xl p-6 border border-white/5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center">
                  {s.icon}
                </div>
                <div>
                  <p className="text-[#94A3B8] text-xs">{s.label}</p>
                  <p className="font-bold text-lg">{s.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#94A3B8]">Overall Progress</span>
              <span className="font-medium">68%</span>
            </div>
            <div className="h-3 bg-[#0F172A] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}