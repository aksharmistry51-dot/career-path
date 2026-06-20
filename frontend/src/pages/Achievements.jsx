import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import { api } from '../api'

const allAchievements = [
  { name: 'First Week', emoji: '🏆', desc: 'Completed your first 7 days' },
  { name: '10 Tasks Done', emoji: '⚡', desc: 'Completed 10 tasks total' },
  { name: '7 Day Streak', emoji: '🔥', desc: 'Maintained a 7 day streak' },
  { name: 'DSA Warrior', emoji: '🧠', desc: 'Solved 50 DSA problems' },
  { name: 'Speed Runner', emoji: '🚀', desc: 'Completed a day in under 1 hour' },
  { name: 'Diamond Coder', emoji: '💎', desc: 'Reached Level 10' },
  { name: 'Perfect Month', emoji: '🌟', desc: 'No missed days in a month' },
  { name: 'Path Master', emoji: '👑', desc: 'Completed an entire career path' },
]

export default function Achievements() {
  const [unlockedNames, setUnlockedNames] = useState([])
  const [loading, setLoading] = useState(true)

  const loadAchievements = async () => {
    try {
      const data = await api.getAchievements()
      setUnlockedNames(data.map(a => a.achievementName))
    } catch (err) {
      console.error('Failed to load achievements:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAchievements()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <p className="text-[#94A3B8]">Loading achievements...</p>
      </div>
    )
  }

  const achievements = allAchievements.map(a => ({
    ...a,
    unlocked: unlockedNames.includes(a.name)
  }))
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex">
      <Sidebar active="Achievements" />
      <main className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-1">Achievements</h1>
          <p className="text-[#94A3B8] mb-2">{unlockedCount} of {achievements.length} unlocked</p>
          <div className="h-2 bg-[#1E293B] rounded-full w-64 mb-10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
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
              <h3 className="font-bold mb-1">{a.name}</h3>
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