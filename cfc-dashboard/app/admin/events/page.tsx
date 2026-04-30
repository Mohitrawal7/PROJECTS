'use client'
import { useEffect, useState } from 'react'
import { supabase, type Event } from '@/lib/supabase'
import { Plus, Calendar, Edit2, Trash2, ToggleLeft, ToggleRight, MapPin, Users, X } from 'lucide-react'
import { format } from 'date-fns'

const emptyForm = { title: '', description: '', event_date: '', end_date: '', location: '', max_participants: '', is_open: true }

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editEvent, setEditEvent] = useState<Event | null>(null)
  const [form, setForm] = useState<any>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [regCounts, setRegCounts] = useState<Record<string, number>>({})

  async function load() {
    const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false })
    setEvents(data || [])
    // Fetch registration counts
    if (data && data.length > 0) {
      const ids = data.map(e => e.id)
      const { data: regs } = await supabase.from('registrations').select('event_id').in('event_id', ids)
      const counts: Record<string, number> = {}
      regs?.forEach((r: any) => { counts[r.event_id] = (counts[r.event_id] || 0) + 1 })
      setRegCounts(counts)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openNew() { setEditEvent(null); setForm(emptyForm); setShowModal(true) }
  function openEdit(ev: Event) {
    setEditEvent(ev)
    setForm({ title: ev.title, description: ev.description || '', event_date: ev.event_date?.slice(0, 16) || '', end_date: ev.end_date?.slice(0, 16) || '', location: ev.location || '', max_participants: ev.max_participants || '', is_open: ev.is_open })
    setShowModal(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    const payload = { title: form.title, description: form.description, event_date: form.event_date, end_date: form.end_date || null, location: form.location, max_participants: form.max_participants ? Number(form.max_participants) : null, is_open: form.is_open }
    if (editEvent) {
      await supabase.from('events').update(payload).eq('id', editEvent.id)
    } else {
      await supabase.from('events').insert(payload)
    }
    setSaving(false); setShowModal(false); load()
  }

  async function toggleOpen(ev: Event) {
    await supabase.from('events').update({ is_open: !ev.is_open }).eq('id', ev.id)
    load()
  }

  async function deleteEvent(id: string) {
    if (!confirm('Delete this event? This will also remove all registrations and attendance records.')) return
    await supabase.from('events').delete().eq('id', id)
    load()
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Events <span className="text-gradient">Management</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{events.length} total events</p>
        </div>
        <button onClick={openNew} className="btn btn-primary"><Plus size={16} /> New Event</button>
      </div>

      {loading ? <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
          {events.map(ev => {
            const isPast = new Date(ev.event_date) < new Date()
            return (
              <div key={ev.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className={`badge ${isPast ? 'badge-yellow' : ev.is_open ? 'badge-green' : 'badge-red'}`}>{isPast ? 'Past' : ev.is_open ? 'Open' : 'Closed'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEdit(ev)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }} title="Edit"><Edit2 size={15} /></button>
                    <button onClick={() => deleteEvent(ev.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }} title="Delete"><Trash2 size={15} /></button>
                  </div>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{ev.title}</h3>
                {ev.description && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.875rem', lineHeight: 1.5 }}>{ev.description.slice(0, 100)}{ev.description.length > 100 ? '...' : ''}</p>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={13} style={{ color: 'var(--accent)' }} />{format(new Date(ev.event_date), 'PPP · p')}</div>
                  {ev.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={13} style={{ color: 'var(--accent2)' }} />{ev.location}</div>}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={13} style={{ color: '#10b981' }} />{regCounts[ev.id] || 0} registered{ev.max_participants ? ` / ${ev.max_participants}` : ''}</div>
                </div>
                <button onClick={() => toggleOpen(ev)} className={`btn btn-sm ${ev.is_open ? 'btn-danger' : 'btn-success'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  {ev.is_open ? <><ToggleRight size={15} /> Close Registrations</> : <><ToggleLeft size={15} /> Open Registrations</>}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: 700 }}>{editEvent ? 'Edit Event' : 'New Event'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label className="label">Event Title *</label><input className="input" required placeholder="Annual Tech Fest" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div><label className="label">Description</label><textarea className="input" rows={3} placeholder="Describe the event..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: 'vertical' }} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label className="label">Start Date & Time *</label><input className="input" type="datetime-local" required value={form.event_date} onChange={e => setForm({ ...form, event_date: e.target.value })} /></div>
                <div><label className="label">End Date & Time</label><input className="input" type="datetime-local" value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} /></div>
              </div>
              <div><label className="label">Location</label><input className="input" placeholder="Venue name" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
              <div><label className="label">Max Participants</label><input className="input" type="number" min="1" placeholder="Leave blank for unlimited" value={form.max_participants} onChange={e => setForm({ ...form, max_participants: e.target.value })} /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="checkbox" id="is_open" checked={form.is_open} onChange={e => setForm({ ...form, is_open: e.target.checked })} style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
                <label htmlFor="is_open" style={{ fontSize: '0.875rem', color: 'var(--text-dim)', cursor: 'pointer' }}>Open for registrations</label>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>{saving ? 'Saving...' : editEvent ? 'Update Event' : 'Create Event'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
