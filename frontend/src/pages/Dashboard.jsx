import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Star, TrendingUp, CheckSquare, Square } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const initialTasks = [
  { id: 1, title: 'Two Sum', done: true },
  { id: 2, title: 'Contains Duplicate', done: true },
  { id: 3, title: 'Move Zeroes', done: false },
  { id: 4, title: 'Best Time to Buy Stock', done: false },
]

const topicProgress = [
  { topic: 'Arrays', percent: 85 },
  { topic: 'Strings', percent: 60 },
  { topic: 'Linked List', percent: 40 },
  { topic: 'Trees', percent: 20 },
]

function generateHeatmap() {
  const data = []
  for (let i = 0; i < 52 * 7; i++) {
    data.push(Math.floor(Math.random() * 5))
  }
  return data
}

const heatmapData = generateHeatmap()
const heatColors = ['#1E293B', '#312E81', '#4338CA', '#6366F1', '#818CF8']

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks)
  const username = localStorage.getItem('username') || 'Akshar'
  const selectedPath = localStorage.getItem('selectedPath') || 'DSA & Placement Prep'
  const completedTasks = tasks.filter(t => t.done).length
  const totalTasks = tasks.length
  const progress = Math.round((completedTasks / totalTasks) * 100)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex">
      <Sidebar active="Dashboard" />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-1">{greeting}, {username} 👋</h1>
          <p className="text-[#94A3B8]">{selectedPath}</p>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 bg-[#1E293B] px-4 py-2 rounded-xl border border-white/5">
              <Flame className="text-orange-400" size={18} />
              <span className="text-sm font-medium">12 Day Streak</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1E293B] px-4 py-2 rounded-xl border border-white/5">
              <Star className="text-yellow-400" size={18} />
              <span className="text-sm font-medium">Level 5</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1E293B] px-4 py-2 rounded-xl border border-white/5">
              <TrendingUp className="text-[#10B981]" size={18} />
              <span className="text-sm font-medium">{progress}% Complete</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Focus */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-[#1E293B] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[#94A3B8] text-sm mb-1">Today's Focus</p>
                <h2 className="text-2xl font-bold">Arrays</h2>
              </div>
              <div className="bg-[#0F172A] px-3 py-1 rounded-lg text-sm text-[#94A3B8]">
                ⏱ 90 Minutes
              </div>
            </div>
            <div className="space-y-3">
              {tasks.map(task => (
                <motion.div key={task.id} whileHover={{ x: 4 }}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                  {task.done
                    ? <CheckSquare className="text-[#10B981]" size={20} />
                    : <Square className="text-[#475569]" size={20} />
                  }
                  <span className={task.done ? 'line-through text-[#475569]' : 'text-[#F8FAFC]'}>
                    {task.title}
                  </span>
                  {task.done && (
                    <span className="ml-auto text-xs bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded-full border border-[#10B981]/20">
                      Done
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex justify-between text-sm text-[#94A3B8] mb-2">
                <span>Daily Progress</span>
                <span>{completedTasks}/{totalTasks} tasks</span>
              </div>
              <div className="h-2 bg-[#0F172A] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-[#6366F1] rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Streak */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-[#1E293B] rounded-2xl p-6 border border-white/5">
              <p className="text-[#94A3B8] text-sm mb-3">Streak</p>
              <div className="flex gap-1 mb-3">
                {[...Array(7)].map((_, i) => (
                  <span key={i} className="text-xl">🔥</span>
                ))}
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-[#94A3B8] text-xs">Current</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-[#94A3B8] text-xs">Best</p>
                </div>
              </div>
            </motion.div>

            {/* XP */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-[#1E293B] rounded-2xl p-6 border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[#94A3B8] text-sm">XP & Level</p>
                <span className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 px-2 py-1 rounded-full text-xs font-medium">Level 5</span>
              </div>
              <p className="text-2xl font-bold mb-1">1,250 <span className="text-[#94A3B8] text-sm font-normal">/ 1,500 XP</span></p>
              <div className="h-2 bg-[#0F172A] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '83%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Topic Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-6 bg-[#1E293B] rounded-2xl p-6 border border-white/5">
          <p className="text-[#94A3B8] text-sm mb-4">Topic Progress</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicProgress.map((t, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t.topic}</span>
                  <span className="text-[#94A3B8]">{t.percent}%</span>
                </div>
                <div className="h-2 bg-[#0F172A] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${t.percent}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    className="h-full bg-[#6366F1] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Heatmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-6 bg-[#1E293B] rounded-2xl p-6 border border-white/5">
          <p className="text-[#94A3B8] text-sm mb-4">Activity Heatmap</p>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {Array.from({ length: 52 }).map((_, week) => (
              <div key={week} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, day) => (
                  <div
                    key={day}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: heatColors[heatmapData[week * 7 + day]] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}