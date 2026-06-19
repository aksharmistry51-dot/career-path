import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const paths = [
  { emoji: '⭐', title: 'Full Stack Developer', duration: '6 Months', tasks: '120+ Tasks', outcomes: ['React', 'Spring Boot', 'MySQL', 'Deployment'] },
  { emoji: '🔥', title: 'Complete Java Developer', duration: '5 Months', tasks: '100+ Tasks', outcomes: ['Core Java', 'OOP', 'Collections', 'Spring Basics'] },
  { emoji: '🧠', title: 'DSA & Placement Prep', duration: '6 Months', tasks: '150+ Tasks', outcomes: ['150+ Problems', 'Interview Prep', 'Problem Solving'] },
  { emoji: '🐍', title: 'Python Developer', duration: '4 Months', tasks: '90+ Tasks', outcomes: ['Python', 'OOP', 'APIs', 'Flask/Django'] },
]

export default function GoalSelection() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const handleContinue = () => {
    if (!selected) return
    localStorage.setItem('selectedPath', selected)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Rocket className="text-[#6366F1]" size={28} />
          <span className="text-2xl font-bold text-[#F8FAFC]">Career Path</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#F8FAFC] mb-2">
          Choose Your Career Path
        </h2>
        <p className="text-[#94A3B8] text-center mb-10">
          Select one path to begin. You can change it later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {paths.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelected(p.title)}
              className={`cursor-pointer bg-[#1E293B] border rounded-2xl p-6 transition-all ${
                selected === p.title
                  ? 'border-[#6366F1] shadow-lg shadow-[#6366F1]/20'
                  : 'border-white/5 hover:border-[#6366F1]/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{p.emoji}</div>
                {selected === p.title && (
                  <div className="w-6 h-6 rounded-full bg-[#6366F1] flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">{p.title}</h3>
              <p className="text-[#94A3B8] text-sm mb-4">{p.duration} · {p.tasks}</p>
              <div className="flex flex-wrap gap-2">
                {p.outcomes.map((o, j) => (
                  <span key={j} className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 px-3 py-1 rounded-full text-xs font-medium">
                    {o}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={!selected}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
              selected
                ? 'bg-[#6366F1] text-white hover:bg-[#5558E3]'
                : 'bg-[#1E293B] text-[#475569] cursor-not-allowed border border-white/5'
            }`}
          >
            Continue <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}