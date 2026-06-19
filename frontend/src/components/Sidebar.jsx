import { motion } from 'framer-motion'
import { LayoutDashboard, Map, Trophy, User, LogOut, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <Map size={20} />, label: 'My Roadmap', href: '/roadmap' },
  { icon: <Trophy size={20} />, label: 'Achievements', href: '/achievements' },
  { icon: <User size={20} />, label: 'Profile', href: '/profile' },
]

export default function Sidebar({ active }) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-64 bg-[#1E293B] border-r border-white/5 flex flex-col z-40"
    >
      <div className="flex items-center gap-2 px-6 py-6 border-b border-white/5">
        <Rocket className="text-[#6366F1]" size={24} />
        <span className="text-xl font-bold text-[#F8FAFC]">Career Path</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              active === item.label
                ? 'bg-[#6366F1] text-white'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-6 border-t border-white/5">
        <Link
          to="/"
          onClick={() => localStorage.clear()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:text-red-400 hover:bg-red-400/5 transition-all font-medium text-sm"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </motion.aside>
  )
}