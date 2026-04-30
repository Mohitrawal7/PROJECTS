'use client'
import { useState } from 'react'
import { supabase, type Event } from '@/lib/supabase'
import { X, CheckCircle, AlertCircle, Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'

export default function RegisterModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', college: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error: err } = await supabase.from('registrations').insert({
      event_id: event.id, name: form.name, email: form.email,
      phone: form.phone || null, college: form.college || null
    })
    setLoading(false)
    if (err) {
      if (err.code === '23505') setError('You have already registered for this event.')
      else setError(err.message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Register for Event</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Fill in your details to secure your spot</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}><X size={20} /></button>
        </div>

        <div style={{ background: 'var(--bg-card2)', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{event.title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={13} style={{ color: 'var(--accent)' }} />{format(new Date(event.event_date), 'PPP · p')}</div>
            {event.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={13} style={{ color: 'var(--accent2)' }} />{event.location}</div>}
          </div>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle size={48} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Registration Successful!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>You&apos;re registered for <strong>{event.title}</strong>. Check your email for confirmation.</p>
            <button onClick={onClose} className="btn btn-primary">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '0.75rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#ef4444' }}>
                <AlertCircle size={16} />{error}
              </div>
            )}
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="label">Full Name *</label>
                <input className="input" required placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="label">Email Address *</label>
                <input className="input" type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input className="input" placeholder="+977-XXXXXXXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="label">College / Institution</label>
                <input className="input" placeholder="Your college" value={form.college} onChange={e => setForm({ ...form, college: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                {loading ? 'Registering...' : 'Register Now'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
