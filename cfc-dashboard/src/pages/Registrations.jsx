import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, Search, X, Trash2, Edit2, Users, Download } from 'lucide-react'

const STATUS_BADGE = { confirmed: 'badge-green', pending: 'badge-amber', cancelled: 'badge-red' }

function RegModal({ reg, events, onClose, onSave }) {
  const [form, setForm] = useState(reg || {
    name: '', email: '', phone: '', college: '',
    event_id: events[0]?.id || '', status: 'confirmed',
  })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>{reg ? 'Edit Registration' : 'Add Registration'}</h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}><X size={16} /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Aarav Sharma" required />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="98XXXXXXXX" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>College / Institution</label>
              <input value={form.college} onChange={e => set('college', e.target.value)} placeholder="IOE Pulchowk" />
            </div>
            <div className="form-group">
              <label>Event</label>
              <select value={form.event_id} onChange={e => set('event_id', e.target.value)}>
                {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{reg ? 'Save Changes' : 'Add Registration'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Registrations() {
  const { registrations, addRegistration, updateRegistration, deleteRegistration, events } = useData()
  const [search, setSearch] = useState('')
  const [filterEvent, setFilterEvent] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [modal, setModal] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const filtered = registrations.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.college?.toLowerCase().includes(search.toLowerCase())
    const matchEvent = filterEvent === 'all' || r.event_id === filterEvent
    const matchStatus = filterStatus === 'all' || r.status === filterStatus
    return matchSearch && matchEvent && matchStatus
  })

  const eventName = (id) => events.find(e => e.id === id)?.title || '—'

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'College', 'Event', 'Status', 'Date']
    const rows = filtered.map(r => [r.name, r.email, r.phone, r.college, eventName(r.event_id), r.status, r.registered_at])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'registrations.csv'; a.click()
  }

  const handleSave = (form) => {
    if (modal === 'new') addRegistration(form)
    else updateRegistration(modal.id, form)
    setModal(null)
  }

  const counts = { confirmed: 0, pending: 0, cancelled: 0 }
  registrations.forEach(r => { if (counts[r.status] !== undefined) counts[r.status]++ })

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Registrations</h1>
          <p>Track all event registrations across CFC</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={exportCSV}><Download size={14} /> Export CSV</button>
          <button className="btn btn-primary" onClick={() => setModal('new')}><Plus size={15} /> Add Registration</button>
        </div>
      </div>

      {/* Summary chips */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Total', value: registrations.length, color: 'var(--text)', bg: 'var(--surface2)' },
          { label: 'Confirmed', value: counts.confirmed, color: 'var(--green)', bg: 'rgba(16,185,129,0.1)' },
          { label: 'Pending', value: counts.pending, color: 'var(--amber)', bg: 'rgba(245,158,11,0.1)' },
          { label: 'Cancelled', value: counts.cancelled, color: 'var(--red)', bg: 'rgba(239,68,68,0.1)' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{ padding: '8px 16px', background: bg, borderRadius: 99, border: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, color: 'var(--muted)', marginRight: 6 }}>{label}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search registrations..." style={{ paddingLeft: 36 }} />
        </div>
        <select value={filterEvent} onChange={e => setFilterEvent(e.target.value)} style={{ width: 200 }}>
          <option value="all">All Events</option>
          {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title.slice(0, 30)}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 140 }}>
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ padding: '50px 20px' }}>
            <Users size={36} />
            <h3>No registrations found</h3>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Participant</th>
                <th>Contact</th>
                <th>College</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: `hsl(${r.name.charCodeAt(0) * 20}, 60%, 25%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
                      }}>{r.name[0]}</div>
                      <span style={{ fontWeight: 500 }}>{r.name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: 12 }}>{r.email}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.phone}</div>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--muted)' }}>{r.college || '—'}</td>
                  <td style={{ fontSize: 12, maxWidth: 180 }}>
                    <span style={{ color: 'var(--accent2)' }}>{eventName(r.event_id)}</span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{r.registered_at}</td>
                  <td><span className={`badge ${STATUS_BADGE[r.status]}`}>{r.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-ghost" onClick={() => setModal(r)} style={{ padding: '4px 8px' }}><Edit2 size={13} /></button>
                      <button className="btn btn-danger" onClick={() => setDeleteConfirm(r.id)} style={{ padding: '4px 8px' }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)' }}>
        Showing {filtered.length} of {registrations.length} registrations
      </div>

      {modal && <RegModal reg={modal === 'new' ? null : modal} events={events} onClose={() => setModal(null)} onSave={handleSave} />}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 380 }}>
            <h2 style={{ fontSize: 17, marginBottom: 10 }}>Remove Registration?</h2>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => { deleteRegistration(deleteConfirm); setDeleteConfirm(null) }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
