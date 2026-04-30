'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, DollarSign, TrendingUp, TrendingDown, X, Filter } from 'lucide-react'
import { format } from 'date-fns'

const emptyForm = { type: 'income', category: '', description: '', amount: '', party_name: '', date: new Date().toISOString().slice(0, 10), event_id: '' }

const INCOME_CATS = ['Sponsorship', 'Ticket Sales', 'Donation', 'Grant', 'Membership Fee', 'Other']
const EXPENSE_CATS = ['Venue', 'Catering', 'Equipment', 'Marketing', 'Printing', 'Transport', 'Honorarium', 'Miscellaneous']

export default function FinancesPage() {
  const [finances, setFinances] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<any>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')

  async function load() {
    const [finRes, evRes] = await Promise.all([
      supabase.from('finances').select('*, events(title)').order('date', { ascending: false }),
      supabase.from('events').select('id, title').order('event_date', { ascending: false })
    ])
    setFinances(finRes.data || [])
    setEvents(evRes.data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    await supabase.from('finances').insert({ type: form.type, category: form.category, description: form.description, amount: Number(form.amount), party_name: form.party_name || null, date: form.date, event_id: form.event_id || null, currency: 'NPR' })
    setSaving(false); setShowModal(false); setForm(emptyForm); load()
  }

  async function deleteRecord(id: string) {
    if (!confirm('Delete this record?')) return
    await supabase.from('finances').delete().eq('id', id); load()
  }

  const filtered = filterType === 'all' ? finances : finances.filter(f => f.type === filterType)
  const totalIncome = finances.filter(f => f.type === 'income').reduce((s, f) => s + Number(f.amount), 0)
  const totalExpense = finances.filter(f => f.type === 'expense').reduce((s, f) => s + Number(f.amount), 0)
  const balance = totalIncome - totalExpense

  const cats = form.type === 'income' ? INCOME_CATS : EXPENSE_CATS

  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Finances <span className="text-gradient">& Treasury</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Track sponsors, income, and expenses</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary"><Plus size={16} /> Add Record</button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="stat-card" style={{ borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <TrendingUp size={18} style={{ color: '#10b981' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Income</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>NPR {totalIncome.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{finances.filter(f => f.type === 'income').length} transactions</div>
        </div>
        <div className="stat-card" style={{ borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <TrendingDown size={18} style={{ color: '#ef4444' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Expenses</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>NPR {totalExpense.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{finances.filter(f => f.type === 'expense').length} transactions</div>
        </div>
        <div className="stat-card" style={{ borderColor: balance >= 0 ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', background: balance >= 0 ? 'rgba(16,185,129,0.03)' : 'rgba(239,68,68,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <DollarSign size={18} style={{ color: balance >= 0 ? '#10b981' : '#ef4444' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net Balance</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: balance >= 0 ? '#10b981' : '#ef4444' }}>NPR {balance.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{balance >= 0 ? 'Surplus' : 'Deficit'}</div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Filter size={16} style={{ color: 'var(--text-muted)', alignSelf: 'center' }} />
        {(['all', 'income', 'expense'] as const).map(f => (
          <button key={f} onClick={() => setFilterType(f)} style={{ padding: '0.4rem 1rem', borderRadius: 6, border: '1px solid', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, textTransform: 'capitalize', transition: 'all 0.2s', borderColor: filterType === f ? 'var(--accent)' : 'var(--border)', background: filterType === f ? 'rgba(0,212,255,0.08)' : 'transparent', color: filterType === f ? 'var(--accent)' : 'var(--text-muted)' }}>{f}</button>
        ))}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Description</th><th>Category</th><th>Party / Source</th><th>Event</th><th>Type</th><th>Amount</th><th>Date</th><th></th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No records found.</td></tr>
            ) : filtered.map((f: any) => (
              <tr key={f.id}>
                <td style={{ fontWeight: 500 }}>{f.description}</td>
                <td><span className="badge badge-blue">{f.category}</span></td>
                <td style={{ color: 'var(--text-muted)' }}>{f.party_name || '—'}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{f.events?.title || '—'}</td>
                <td><span className={`badge ${f.type === 'income' ? 'badge-green' : 'badge-red'}`}>{f.type}</span></td>
                <td style={{ fontWeight: 700, color: f.type === 'income' ? '#10b981' : '#ef4444', fontFamily: 'Space Mono, monospace' }}>{f.type === 'income' ? '+' : '-'} {f.currency} {Number(f.amount).toLocaleString()}</td>
                <td style={{ color: 'var(--text-muted)' }}>{format(new Date(f.date), 'MMM d, yyyy')}</td>
                <td><button onClick={() => deleteRecord(f.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0.6 }} title="Delete"><X size={15} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: 700 }}>Add Financial Record</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="label">Type *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {(['income', 'expense'] as const).map(t => (
                    <button type="button" key={t} onClick={() => setForm({ ...form, type: t, category: '' })} style={{ padding: '0.625rem', borderRadius: 8, border: `1px solid ${form.type === t ? (t === 'income' ? '#10b981' : '#ef4444') : 'var(--border)'}`, background: form.type === t ? (t === 'income' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)') : 'transparent', color: form.type === t ? (t === 'income' ? '#10b981' : '#ef4444') : 'var(--text-muted)', cursor: 'pointer', fontWeight: 500, textTransform: 'capitalize', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      {t === 'income' ? <TrendingUp size={15} /> : <TrendingDown size={15} />} {t}
                    </button>
                  ))}
                </div>
              </div>
              <div><label className="label">Category *</label>
                <select className="input" required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select category</option>
                  {cats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="label">Description *</label><input className="input" required placeholder="Brief description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label className="label">Amount (NPR) *</label><input className="input" type="number" min="1" step="0.01" required placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></div>
                <div><label className="label">Date *</label><input className="input" type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
              </div>
              <div><label className="label">{form.type === 'income' ? 'Sponsor / Donor Name' : 'Vendor / Payee'}</label><input className="input" placeholder="Party name" value={form.party_name} onChange={e => setForm({ ...form, party_name: e.target.value })} /></div>
              <div><label className="label">Related Event (optional)</label>
                <select className="input" value={form.event_id} onChange={e => setForm({ ...form, event_id: e.target.value })}>
                  <option value="">— Not event-specific —</option>
                  {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>{saving ? 'Saving...' : 'Add Record'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
