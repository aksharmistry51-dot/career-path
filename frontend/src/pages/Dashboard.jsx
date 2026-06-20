import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, Star, TrendingUp, CheckSquare, Square } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { api } from '../api'

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
  const [profile, setProfile] = useState(null)
  const [tasks, setTasks] = useState([])
  const [topicProgress, setTopicProgress] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const profileData = await api.getProfile()
      setProfile(profileData)

      let taskData = await api.getTasks()

      if (taskData.length === 0) {
        const defaultTasks = [
          { title: 'Two Sum', topic: 'Arrays', dayNumber: 1 },
          { title: 'Contains Duplicate', topic: 'Arrays', dayNumber: 1 },
          { title: 'Move Zeroes', topic: 'Arrays', dayNumber: 1 },
          { title: 'Best Time to Buy Stock', topic: 'Arrays', dayNumber: 1 },
        ]
        for (const t of defaultTasks) {
          await api.createTask(t.title, t.topic, t.dayNumber)
        }
        taskData = await api.getTasks()
      }

      setTasks(taskData)

      const topicData = await api.getTopicProgress()
      setTopicProgress(topicData)
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const toggleTask = async (id) => {
    try {
      const updated = await api.toggleTask(id)
      setTasks(tasks.map(t => t.id === id ? updated : t))

      if (updated.completed) {
        const updatedProfile = await api.addXp(10)
        setProfile(updatedProfile)
      }

      const topicData = await api.getTopicProgress()
      setTopicProgress(topicData)
    } catch (err) {
      console.error('Failed to toggle task:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <p className="text-[#94A3B8]">Loading your dashboard...</p>
      </div>
    )
  }

  const username = profile?.username || 'Akshar'
  const selectedPath = profile?.selectedPath || 'Career Path'
  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length || 1
  const progress = Math.round((completedTasks / totalTasks) * 100)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
  const xp = profile?.xp || 0
  const level = profile?.level || 1
  const xpForNextLevel = level * 300
  const xpPercent = Math.min(100, Math.round((xp / xpForNextLevel) * 100))
  const currentStreak = profile?.currentStreak || 0
  const bestStreak = profile?.bestStreak || 0

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex">
      <Sidebar active="Dashboard" />

      <main className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-1">{greeting}, {username} 👋</h1>
          <p className="text-[#94A3B8]">{selectedPath}</p>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 bg-[#1E293B] px-4 py-2 rounded-xl border border-white/5">
              <Flame className="text-orange-400" size={18} />
              <span className="text-sm font-medium">{currentStreak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1E293B] px-4 py-2 rounded-xl border border-white/5">
              <Star className="text-yellow-400" size={18} />
              <span className="text-sm font-medium">Level {level}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1E293B] px-4 py-2 rounded-xl border border-white/5">
              <TrendingUp className="text-[#10B981]" size={18} />
              <span className="text-sm font-medium">{progress}% Complete</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  {task.completed
                    ? <CheckSquare className="text-[#10B981]" size={20} />
                    : <Square className="text-[#475569]" size={20} />
                  }
                  <span className={task.completed ? 'line-through text-[#475569]' : 'text-[#F8FAFC]'}>
                    {task.title}
                  </span>
                  {task.completed && (
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

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-[#1E293B] rounded-2xl p-6 border border-white/5">
              <p className="text-[#94A3B8] text-sm mb-3">Streak</p>
              <div className="flex gap-1 mb-3">
                {[...Array(Math.min(currentStreak, 7))].map((_, i) => (
                  <span key={i} className="text-xl">🔥</span>
                ))}
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-2xl font-bold">{currentStreak}</p>
                  <p className="text-[#94A3B8] text-xs">Current</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{bestStreak}</p>
                  <p className="text-[#94A3B8] text-xs">Best</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-[#1E293B] rounded-2xl p-6 border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[#94A3B8] text-sm">XP & Level</p>
                <span className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 px-2 py-1 rounded-full text-xs font-medium">Level {level}</span>
              </div>
              <p className="text-2xl font-bold mb-1">{xp} <span className="text-[#94A3B8] text-sm font-normal">/ {xpForNextLevel} XP</span></p>
              <div className="h-2 bg-[#0F172A] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-6 bg-[#1E293B] rounded-2xl p-6 border border-white/5">
          <p className="text-[#94A3B8] text-sm mb-4">Topic Progress</p>
          {topicProgress.length === 0 ? (
            <p className="text-[#475569] text-sm">Complete tasks to see topic progress.</p>
          ) : (
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
          )}
        </motion.div>

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