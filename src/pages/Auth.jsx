import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/shared/Button'

export default function Auth() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    userType: 'sme'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock authentication
    console.log('Form submitted:', formData)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-white to-light-beige flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-vintage-gold rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-3xl">ℕ</span>
            </div>
            <h1 className="text-2xl font-vintage font-bold text-navy-blue">NanoEdge</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 mb-8 border-b border-light-beige">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 font-semibold transition ${isLogin ? 'text-vintage-gold border-b-2 border-vintage-gold' : 'text-muted-taupe'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 font-semibold transition ${!isLogin ? 'text-vintage-gold border-b-2 border-vintage-gold' : 'text-muted-taupe'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-blue mb-2">I am a</label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                  >
                    <option value="sme">SME / Brand</option>
                    <option value="influencer">Influencer</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-navy-blue mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-blue mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-light-beige rounded-lg focus:outline-none focus:border-vintage-gold"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-taupe">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <a href="#" className="text-vintage-gold hover:underline">Forgot password?</a>
              </div>
            )}

            <Button 
              type="submit"
              variant="primary"
              className="w-full"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-light-beige"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-muted-taupe">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 border border-light-beige rounded-lg hover:bg-cream-white transition font-semibold text-navy-blue">
              Google
            </button>
            <button className="py-3 border border-light-beige rounded-lg hover:bg-cream-white transition font-semibold text-navy-blue">
              GitHub
            </button>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-muted-taupe text-sm mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-vintage-gold hover:underline font-semibold"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
