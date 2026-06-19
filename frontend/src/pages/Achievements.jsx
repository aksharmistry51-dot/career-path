import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'

const achievements = [
  { emoji: '🏆', title: 'First Week', desc: 'Completed your first 7 days', unlocked: true },
  { emoji: '⚡', title: '10 Tasks Done', desc: 'Completed 10 tasks total', unlocked: true },
  { emoji: '🔥', title: '7 Day Streak', desc: 'Maintained a 7 day streak', unlocked: true },
  { emoji: '🧠', title: 'DSA Warrior', desc: 'Solved 50 DSA problems', unlocked: true },
  { emoji: '🚀', title: 'Speed Runner', desc: 'Completed a day in under 1 hour', unlocked: false },
  { emoji: '💎', title: 'Diamond Coder', desc: 'Reached Level 10', unlocked: false },
  { emoji: '🌟', title: 'Perfect Month', desc: 'No missed days in a month', unlocked: false },
  { emoji: '👑', title: 'Path Master', desc: 'Completed an entire career path', unlocked: false },
]

export default function Achievements() {
  const unlocked = achievements.filter(a => a.unlocked).length

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex">
      <Sidebar active="Achievements" />
      <main className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-1">Achievements</h1>
          <p className="text-[#94A3B8] mb-2">{unlocked} of {achievements.length} unlocked</p>
          <div className="h-2 bg-[#1E293B] rounded-full w-64 mb-10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlocked / achievements.length) * 100}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-[#6366F1] rounded-full"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`bg-[#1E293B] rounded-2xl p-6 border text-center transition-all ${
                a.unlocked
                  ? 'border-[#6366F1]/30 shadow-lg shadow-[#6366F1]/5'
                  : 'border-white/5 opacity-50'
              }`}
            >
              <div className={`text-4xl mb-3 ${!a.unlocked ? 'grayscale' : ''}`}>
                {a.unlocked ? a.emoji : '🔒'}
              </div>
              <h3 className="font-bold mb-1">{a.title}</h3>
              <p className="text-[#94A3B8] text-xs">{a.desc}</p>
              {a.unlocked && (
                <span className="inline-block mt-3 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2 py-1 rounded-full text-xs">
                  Unlocked ✓
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}