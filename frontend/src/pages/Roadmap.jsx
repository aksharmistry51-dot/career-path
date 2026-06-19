import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import { CheckCircle, Circle, Lock } from 'lucide-react'

const roadmap = [
  {
    month: 'Month 1',
    title: 'Foundations',
    status: 'completed',
    topics: [
      { name: 'Arrays & Strings', done: true },
      { name: 'Time & Space Complexity', done: true },
      { name: 'Basic Sorting', done: true },
    ]
  },
  {
    month: 'Month 2',
    title: 'Core DSA',
    status: 'active',
    topics: [
      { name: 'Linked Lists', done: true },
      { name: 'Stacks & Queues', done: false },
      { name: 'Binary Search', done: false },
    ]
  },
  {
    month: 'Month 3',
    title: 'Advanced DSA',
    status: 'locked',
    topics: [
      { name: 'Trees & Graphs', done: false },
      { name: 'Dynamic Programming', done: false },
      { name: 'Backtracking', done: false },
    ]
  },
  {
    month: 'Month 4',
    title: 'System Design Basics',
    status: 'locked',
    topics: [
      { name: 'OOP Concepts', done: false },
      { name: 'Design Patterns', done: false },
      { name: 'Database Basics', done: false },
    ]
  },
  {
    month: 'Month 5',
    title: 'Interview Preparation',
    status: 'locked',
    topics: [
      { name: '150+ Practice Problems', done: false },
      { name: 'Mock Interviews', done: false },
      { name: 'Resume Building', done: false },
    ]
  },
  {
    month: 'Month 6',
    title: 'Final Projects',
    status: 'locked',
    topics: [
      { name: 'Capstone Project', done: false },
      { name: 'GitHub Portfolio', done: false },
      { name: 'Job Applications', done: false },
    ]
  },
]

const statusColors = {
  completed: '#10B981',
  active: '#6366F1',
  locked: '#475569',
}

export default function Roadmap() {
  const selectedPath = localStorage.getItem('selectedPath') || 'DSA & Placement Prep'

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex">
      <Sidebar active="My Roadmap" />
      <main className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-1">My Roadmap</h1>
          <p className="text-[#94A3B8] mb-10">{selectedPath}</p>
        </motion.div>

        <div className="relative">
          {roadmap.map((item, i) => (
            <div key={i} className="relative flex gap-8 mb-8">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 flex-shrink-0"
                  style={{
                    backgroundColor: statusColors[item.status] + '20',
                    borderColor: statusColors[item.status],
                    color: statusColors[item.status]
                  }}
                >
                  {item.status === 'completed' ? '✓' : item.status === 'active' ? '▶' : '🔒'}
                </motion.div>
                {i < roadmap.length - 1 && (
                  <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: i === 0 ? '#10B981' : '#1E293B', minHeight: '60px' }} />
                )}
              </div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex-1 bg-[#1E293B] rounded-2xl p-6 border mb-4 ${
                  item.status === 'active'
                    ? 'border-[#6366F1]/50 shadow-lg shadow-[#6366F1]/10'
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block"
                      style={{ backgroundColor: statusColors[item.status] + '20', color: statusColors[item.status] }}>
                      {item.month}
                    </span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  {item.status === 'active' && (
                    <span className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 px-3 py-1 rounded-full text-xs font-medium">
                      In Progress
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {item.topics.map((topic, j) => (
                    <div key={j} className="flex items-center gap-3">
                      {item.status === 'locked'
                        ? <Lock size={16} className="text-[#475569]" />
                        : topic.done
                          ? <CheckCircle size={16} className="text-[#10B981]" />
                          : <Circle size={16} className="text-[#475569]" />
                      }
                      <span className={`text-sm ${item.status === 'locked' ? 'text-[#475569]' : topic.done ? 'text-[#94A3B8] line-through' : 'text-[#F8FAFC]'}`}>
                        {topic.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}