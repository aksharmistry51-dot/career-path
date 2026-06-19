import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-2">
        <Rocket className="text-[#6366F1]" size={24} />
        <span className="text-xl font-bold text-[#F8FAFC]">Career Path</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="/login" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
          Login
        </a>
        <a href="/signup" className="bg-[#6366F1] text-white px-4 py-2 rounded-lg hover:bg-[#5558E3] transition-colors font-medium">
          Get Started
        </a>
      </div>
    </motion.nav>
  )
}

export default Navbar