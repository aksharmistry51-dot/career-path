import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight, Zap, Map, CheckSquare, TrendingUp, Flame, Star, Trophy } from 'lucide-react'
import Navbar from '../components/Navbar'

// Animated Counter
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 20)
    return () => clearInterval(timer)
  }, [target])
  return <span>{count}{suffix}</span>
}

const features = [
  { icon: <Map size={24} />, title: 'Structured Roadmaps', desc: 'Follow proven step-by-step paths built by industry experts.' },
  { icon: <CheckSquare size={24} />, title: 'Daily Checklist', desc: 'Break your journey into daily tasks. Stay consistent.' },
  { icon: <TrendingUp size={24} />, title: 'Progress Tracking', desc: 'Visualize how far you have come with beautiful charts.' },
  { icon: <Flame size={24} />, title: 'Streak System', desc: 'Build momentum with daily streaks like Duolingo.' },
  { icon: <Star size={24} />, title: 'XP & Levels', desc: 'Earn XP for every task. Level up your career.' },
  { icon: <Trophy size={24} />, title: 'Achievement Badges', desc: 'Unlock badges as you hit milestones on your journey.' },
]

const paths = [
  { emoji: '⭐', title: 'Full Stack Developer', duration: '6 Months', tasks: '120+ Tasks', outcomes: ['React', 'Spring Boot', 'MySQL', 'Deployment'] },
  { emoji: '🔥', title: 'Complete Java Developer', duration: '5 Months', tasks: '100+ Tasks', outcomes: ['Core Java', 'OOP', 'Collections', 'Spring Basics'] },
  { emoji: '🧠', title: 'DSA & Placement Prep', duration: '6 Months', tasks: '150+ Tasks', outcomes: ['150+ Problems', 'Interview Prep', 'Problem Solving'] },
  { emoji: '🐍', title: 'Python Developer', duration: '4 Months', tasks: '90+ Tasks', outcomes: ['Python', 'OOP', 'APIs', 'Flask/Django'] },
]

const coming = ['Data Analyst', 'AI Engineer', 'Cloud Engineer', 'Cybersecurity Analyst', 'Android Developer']

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-block bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 px-4 py-1 rounded-full text-sm font-medium mb-6">
            🚀 Your Career Growth OS
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Turn Goals Into<br />
            <span className="text-[#6366F1]">Daily Progress</span>
          </h1>
          <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Choose a career path, follow structured roadmaps, build consistency, and track your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="flex items-center gap-2 bg-[#6366F1] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#5558E3] transition-all">
              Get Started <ArrowRight size={18} />
            </a>
            <a href="#paths" className="flex items-center gap-2 border border-white/10 text-[#F8FAFC] px-8 py-3 rounded-xl font-semibold hover:bg-white/5 transition-all">
              Explore Paths
            </a>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          {[{ value: 350, suffix: '+', label: 'Learning Tasks' }, { value: 4, suffix: '', label: 'Career Paths' }, { value: 1000, suffix: '+', label: 'Roadmap Milestones' }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#1E293B] rounded-2xl p-8 border border-white/5">
              <div className="text-4xl font-bold text-[#6366F1] mb-2"><Counter target={s.value} suffix={s.suffix} /></div>
              <div className="text-[#94A3B8]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Everything You Need</h2>
          <p className="text-[#94A3B8] text-center mb-12">Built for students who want to stay consistent.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#1E293B] border border-white/5 rounded-2xl p-6 hover:border-[#6366F1]/30 transition-all">
                <div className="text-[#6366F1] mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-[#94A3B8] text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section id="paths" className="py-20 px-4 bg-[#0F172A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Choose Your Path</h2>
          <p className="text-[#94A3B8] text-center mb-12">Structured roadmaps designed for real outcomes.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paths.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#1E293B] border border-white/5 rounded-2xl p-8 hover:border-[#6366F1]/30 transition-all">
                <div className="text-4xl mb-4">{p.emoji}</div>
                <h3 className="text-xl font-bold mb-1">{p.title}</h3>
                <p className="text-[#94A3B8] text-sm mb-4">{p.duration} · {p.tasks}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.outcomes.map((o, j) => (
                    <span key={j} className="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 px-3 py-1 rounded-full text-xs font-medium">{o}</span>
                  ))}
                </div>
                <a href="/signup" className="flex items-center gap-2 bg-[#6366F1] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#5558E3] transition-all w-fit">
                  Start Journey <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Coming Soon</h2>
          <p className="text-[#94A3B8] text-center mb-12">More paths are on the way.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coming.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                className="bg-[#1E293B] border border-white/5 rounded-2xl p-6 opacity-60 relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20 px-2 py-1 rounded-full text-xs font-medium">Coming Soon</div>
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-semibold text-lg">{c}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-[#94A3B8] text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap size={16} className="text-[#6366F1]" />
          <span className="font-semibold text-[#F8FAFC]">Career Path</span>
        </div>
        <p>Built for students who take their growth seriously.</p>
      </footer>
    </div>
  )
}