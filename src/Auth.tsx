import { useState } from 'react'
import { supabase } from './supabaseClient'
import Logo from './Logo'
import './Auth.css'

interface AuthProps {
  onContinueAsGuest: () => void
}

export default function Auth({ onContinueAsGuest }: AuthProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account.')
    }

    setLoading(false)
  }

  function switchMode() {
    setMode(m => m === 'signin' ? 'signup' : 'signin')
    setError(null)
    setMessage(null)
  }

  return (
    <div className="auth-screen">
      <div className="auth-inner">
        <div className="auth-brand">
          <Logo size={32} />
          <span className="auth-wordmark">Sage</span>
        </div>

        <div className="auth-headline">
          <h1>Calm money,<br />thoughtfully tracked.</h1>
          <p>
            {mode === 'signin'
              ? 'Sign in to access your financial overview.'
              : 'Create an account to get started.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-success">{message}</p>}

          <button type="submit" className="auth-btn-primary" disabled={loading}>
            {loading ? 'Loading…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <div className="auth-guest-card">
          <div className="auth-guest-text">
            <span className="auth-guest-title">Try it as a guest</span>
            <span className="auth-guest-sub">No account needed. Your data stays on this device.</span>
          </div>
          <button className="auth-guest-btn" onClick={onContinueAsGuest}>
            Continue as guest →
          </button>
        </div>

        <p className="auth-toggle">
          {mode === 'signin' ? 'New here? ' : 'Already have an account? '}
          <button type="button" onClick={switchMode}>
            {mode === 'signin' ? 'Create an account' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
