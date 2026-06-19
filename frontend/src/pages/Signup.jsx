import { useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [form, setForm] = useState({ username: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.username || !form.password || !form.confirm) {
      setError('All fields are required.'); return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.'); return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.'); return
    }
    // Save username to localStorage temporarily
    localStorage.setItem('username', form.username)
    navigate('/goal-selection')
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Rocket className="text-[#6366F1]" size={28} />
          <span className="text-2xl font-bold text-[#F8FAFC]">Career Path</span>
        </div>

        {/* Card */}
        <div className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Create Account</h2>
          <p className="text-[#94A3B8] text-sm mb-6">Start your career journey today.</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#94A3B8] mb-1 block">Username</label>
              <input
                type="text"
                placeholder="e.g. abc123"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-[#F8FAFC] placeholder-[#475569] focus:outline-none focus:border-[#6366F1] transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-[#94A3B8] mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-[#F8FAFC] placeholder-[#475569] focus:outline-none focus:border-[#6366F1] transition-colors pr-12"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3.5 text-[#475569] hover:text-[#94A3B8]">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#94A3B8] mb-1 block">Confirm Password</label>
              <input
                type="password"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-[#F8FAFC] placeholder-[#475569] focus:outline-none focus:border-[#6366F1] transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#6366F1] text-white py-3 rounded-xl font-semibold hover:bg-[#5558E3] transition-colors mt-2"
            >
              Create Account
            </motion.button>
          </form>

          <p className="text-center text-[#94A3B8] text-sm mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-[#6366F1] hover:underline font-medium">Login</a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}