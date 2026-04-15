import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, Search, X, Edit2, Trash2, Handshake, Mail, Phone, DollarSign } from 'lucide-react'

const TIER_BADGE = { Platinum: 'badge-purple', Gold: 'badge-amber', Silver: 'badge-gray', Bronze: 'badge-red' }
const STATUS_BADGE = { active: 'badge-green', pending: 'badge-amber', inactive: 'badge-gray' }
const TIERS = ['Platinum', 'Gold', 'Silver', 'Bronze']

function SponsorModal({ sponsor, onClose, onSave }) {
  const [form, setForm] = useState(sponsor || {
    name: '', type: 'Gold', amount: '', status: 'pending',
    contact: '', phone: '', notes: '', events: [],
  })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>{sponsor ? 'Edit Sponsor' : 'Add Sponsor'}</h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}><X size={16} /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="NIC Asia Bank" required />
            </div>
            <div className="form-group">
              <label>Tier</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}>
                {TIERS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Amount (NPR)</label>
              <input type="number" value={form.amount} onChange={e => set('amount', Number(e.target.value))} placeholder="500000" required />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact Email</label>
              <input type="email" value={form.contact} onChange={e => set('contact', e.target.value)} placeholder="sponsor@company.com" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="01-XXXXXXX" />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2} placeholder="Any notes about this sponsor..." />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{sponsor ? 'Save Changes' : 'Add Sponsor'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Sponsors() {
  const { sponsors, addSponsor, updateSponsor, deleteSponsor } = useData()
  const [search, setSearch] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [modal, setModal] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const filtered = sponsors.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchTier = filterTier === 'all' || s.type === filterTier
    const matchStatus = filterStatus === 'all' || s.status === filterStatus
    return matchSearch && matchTier && matchStatus
  })

  const totalRevenue = sponsors.filter(s => s.status === 'active').reduce((a, s) => a + s.amount, 0)

  const handleSave = (form) => {
    if (modal === 'new') addSponsor(form)
    else updateSponsor(modal.id, form)
    setModal(null)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Sponsors</h1>
          <p>Manage sponsor relationships and track contributions</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('new')}><Plus size={15} /> Add Sponsor</button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Sponsors', value: sponsors.length, color: 'var(--accent)' },
          { label: 'Active', value: sponsors.filter(s => s.status === 'active').length, color: 'var(--green)' },
          { label: 'Pending', value: sponsors.filter(s => s.status === 'pending').length, color: 'var(--amber)' },
          { label: 'Total Revenue', value: `NPR ${(totalRevenue / 1000).toFixed(0)}k`, color: 'var(--accent2)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="stat-card">
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Syne', color, marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sponsors..." style={{ paddingLeft: 36 }} />
        </div>
        <select value={filterTier} onChange={e => setFilterTier(e.target.value)} style={{ width: 140 }}>
          <option value="all">All Tiers</option>
          {TIERS.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 140 }}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="empty-state card">
          <Handshake size={40} />
          <h3>No sponsors found</h3>
          <p>Add your first sponsor to start tracking</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map(sponsor => (
            <div key={sponsor.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 800, fontFamily: 'Syne',
                    color: 'var(--accent)',
                  }}>{sponsor.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{sponsor.name}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span className={`badge ${TIER_BADGE[sponsor.type] || 'badge-gray'}`}>{sponsor.type}</span>
                      <span className={`badge ${STATUS_BADGE[sponsor.status]}`}>{sponsor.status}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn btn-ghost" onClick={() => setModal(sponsor)} style={{ padding: '5px 8px' }}><Edit2 size={13} /></button>
                  <button className="btn btn-danger" onClick={() => setDeleteConfirm(sponsor.id)} style={{ padding: '5px 8px' }}><Trash2 size={13} /></button>
                </div>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 14px', background: 'var(--surface2)', borderRadius: 8,
              }}>
                <DollarSign size={14} color="var(--green)" />
                <span style={{ fontSize: 13, fontWeight: 700 }}>NPR {sponsor.amount.toLocaleString()}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>Contribution</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {sponsor.contact && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
                    <Mail size={12} /><span>{sponsor.contact}</span>
                  </div>
                )}
                {sponsor.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
                    <Phone size={12} /><span>{sponsor.phone}</span>
                  </div>
                )}
              </div>

              {sponsor.notes && (
                <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: 10 }}>{sponsor.notes}</p>
              )}

              <div style={{ fontSize: 11, color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                Since {sponsor.created_at}
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && <SponsorModal sponsor={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 380 }}>
            <h2 style={{ fontSize: 17, marginBottom: 10 }}>Remove Sponsor?</h2>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>This will delete the sponsor record permanently.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => { deleteSponsor(deleteConfirm); setDeleteConfirm(null) }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
