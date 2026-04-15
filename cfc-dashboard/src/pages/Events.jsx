import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, Search, Edit2, Trash2, Users, MapPin, Calendar, X } from 'lucide-react'

const STATUS_BADGE = { upcoming: 'badge-purple', completed: 'badge-green', cancelled: 'badge-red' }
const TYPES = ['Hackathon', 'Workshop', 'Summit', 'Bootcamp', 'Meetup', 'Conference', 'Webinar']

function EventModal({ event, onClose, onSave }) {
  const [form, setForm] = useState(event || {
    title: '', type: 'Workshop', date: '', location: '',
    capacity: '', description: '', status: 'upcoming', registered: 0,
  })

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const handleSubmit = (e) => { e.preventDefault(); onSave(form) }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>{event ? 'Edit Event' : 'New Event'}</h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Tech for Good Hackathon" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input type="number" value={form.capacity} onChange={e => set('capacity', Number(e.target.value))} placeholder="200" required />
            </div>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Kathmandu Innovation Hub" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Brief description of the event..." />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{event ? 'Save Changes' : 'Create Event'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Events() {
  const { events, addEvent, updateEvent, deleteEvent } = useData()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState(null) // null | 'new' | event object
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || e.status === filter
    return matchSearch && matchFilter
  })

  const handleSave = (form) => {
    if (modal === 'new') addEvent(form)
    else updateEvent(modal.id, form)
    setModal(null)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Events</h1>
          <p>Manage all CFC events and track registrations</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('new')}>
          <Plus size={15} /> New Event
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." style={{ paddingLeft: 36 }} />
        </div>
        {['all', 'upcoming', 'completed', 'cancelled'].map(f => (
          <button
            key={f}
            className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter(f)}
            style={{ textTransform: 'capitalize', padding: '7px 14px' }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state card">
          <Calendar size={40} />
          <h3>No events found</h3>
          <p>Create your first event to get started</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {filtered.map(event => {
            const fillPct = Math.round((event.registered / event.capacity) * 100)
            return (
              <div key={event.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                      <span className={`badge ${STATUS_BADGE[event.status]}`}>{event.status}</span>
                      <span className="badge badge-gray">{event.type}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{event.title}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginLeft: 10 }}>
                    <button className="btn btn-ghost" onClick={() => setModal(event)} style={{ padding: '5px 8px' }}><Edit2 size={13} /></button>
                    <button className="btn btn-danger" onClick={() => setDeleteConfirm(event.id)} style={{ padding: '5px 8px' }}><Trash2 size={13} /></button>
                  </div>
                </div>

                {event.description && (
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{event.description}</p>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
                    <Calendar size={12} /><span>{event.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
                    <MapPin size={12} /><span>{event.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
                    <Users size={12} /><span>{event.registered} / {event.capacity} registered</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>
                    <span>Capacity</span><span style={{ color: fillPct >= 100 ? 'var(--green)' : 'var(--text)' }}>{fillPct}%</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--border)', borderRadius: 3 }}>
                    <div style={{
                      height: '100%', borderRadius: 3,
                      width: `${Math.min(fillPct, 100)}%`,
                      background: fillPct >= 100 ? 'var(--green)' : fillPct >= 80 ? 'var(--amber)' : 'var(--accent)',
                      transition: 'width 0.3s',
                    }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <EventModal
          event={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 380 }}>
            <h2 style={{ fontSize: 17, marginBottom: 10 }}>Delete Event?</h2>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>This will permanently remove the event and cannot be undone.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => { deleteEvent(deleteConfirm); setDeleteConfirm(null) }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
