import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, X, Edit2, Trash2, FileText, Send, CheckCircle, Clock, XCircle } from 'lucide-react'

const STATUS_CONFIG = {
  draft: { badge: 'badge-gray', icon: FileText, label: 'Draft' },
  sent: { badge: 'badge-amber', icon: Send, label: 'Sent' },
  accepted: { badge: 'badge-green', icon: CheckCircle, label: 'Accepted' },
  rejected: { badge: 'badge-red', icon: XCircle, label: 'Rejected' },
}

function ProposalModal({ proposal, sponsors, onClose, onSave }) {
  const [form, setForm] = useState(proposal || {
    sponsor_id: sponsors[0]?.id || '',
    title: '', amount: '', status: 'draft', notes: '',
  })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>{proposal ? 'Edit Proposal' : 'New Proposal'}</h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}><X size={16} /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="form-group">
            <label>Proposal Title</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Hackathon 2025 Platinum Sponsorship" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Sponsor</label>
              <select value={form.sponsor_id} onChange={e => set('sponsor_id', e.target.value)}>
                {sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Amount (NPR)</label>
              <input type="number" value={form.amount} onChange={e => set('amount', Number(e.target.value))} placeholder="500000" required />
            </div>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)}>
              {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} placeholder="Proposal notes, terms, inclusions..." />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{proposal ? 'Save Changes' : 'Create Proposal'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Proposals() {
  const { proposals, addProposal, updateProposal, deleteProposal, sponsors } = useData()
  const [modal, setModal] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = proposals.filter(p => filterStatus === 'all' || p.status === filterStatus)
  const sponsorName = (id) => sponsors.find(s => s.id === id)?.name || '—'
  const totalValue = proposals.filter(p => p.status === 'accepted').reduce((a, p) => a + p.amount, 0)

  const handleSave = (form) => {
    if (modal === 'new') addProposal(form)
    else updateProposal(modal.id, form)
    setModal(null)
  }

  const quickStatus = (id, status) => {
    updateProposal(id, {
      status,
      sent_at: status === 'sent' ? new Date().toISOString().split('T')[0] : undefined,
      responded_at: ['accepted', 'rejected'].includes(status) ? new Date().toISOString().split('T')[0] : undefined,
    })
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Proposals</h1>
          <p>Track sponsorship proposals and their status</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('new')}><Plus size={15} /> New Proposal</button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {Object.entries(STATUS_CONFIG).map(([status, { badge, label }]) => {
          const count = proposals.filter(p => p.status === status).length
          const total = proposals.filter(p => p.status === status).reduce((a, p) => a + p.amount, 0)
          return (
            <div key={status} className="stat-card" onClick={() => setFilterStatus(filterStatus === status ? 'all' : status)}
              style={{ cursor: 'pointer', borderColor: filterStatus === status ? 'var(--accent)' : 'var(--border)' }}>
              <div style={{ marginBottom: 6 }}><span className={`badge ${badge}`}>{label}</span></div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Syne', marginBottom: 2 }}>{count}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>NPR {(total / 1000).toFixed(0)}k</div>
            </div>
          )
        })}
      </div>

      {/* Pipeline view */}
      {filtered.length === 0 ? (
        <div className="empty-state card">
          <FileText size={40} />
          <h3>No proposals</h3>
          <p>Create your first sponsorship proposal</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(p => {
            const cfg = STATUS_CONFIG[p.status]
            const Icon = cfg.icon
            return (
              <div key={p.id} className="card" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color="var(--accent)" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{p.title}</span>
                    <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
                    <span>🏢 {sponsorName(p.sponsor_id)}</span>
                    <span>💰 NPR {p.amount?.toLocaleString() || '—'}</span>
                    {p.sent_at && <span>📤 Sent: {p.sent_at}</span>}
                    {p.responded_at && <span>✅ Responded: {p.responded_at}</span>}
                  </div>
                  {p.notes && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, fontStyle: 'italic' }}>{p.notes}</div>}
                </div>

                {/* Quick actions */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>
                  {p.status === 'draft' && (
                    <button className="btn btn-ghost" onClick={() => quickStatus(p.id, 'sent')} style={{ fontSize: 12, padding: '5px 10px' }}>
                      <Send size={12} /> Mark Sent
                    </button>
                  )}
                  {p.status === 'sent' && (
                    <>
                      <button className="btn btn-ghost" onClick={() => quickStatus(p.id, 'accepted')} style={{ fontSize: 12, padding: '5px 10px', color: 'var(--green)', borderColor: 'rgba(16,185,129,0.3)' }}>
                        <CheckCircle size={12} /> Accept
                      </button>
                      <button className="btn btn-danger" onClick={() => quickStatus(p.id, 'rejected')} style={{ fontSize: 12, padding: '5px 10px' }}>
                        <XCircle size={12} /> Reject
                      </button>
                    </>
                  )}
                  <button className="btn btn-ghost" onClick={() => setModal(p)} style={{ padding: '5px 8px' }}><Edit2 size={13} /></button>
                  <button className="btn btn-danger" onClick={() => setDeleteConfirm(p.id)} style={{ padding: '5px 8px' }}><Trash2 size={13} /></button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && <ProposalModal proposal={modal === 'new' ? null : modal} sponsors={sponsors} onClose={() => setModal(null)} onSave={handleSave} />}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 380 }}>
            <h2 style={{ fontSize: 17, marginBottom: 10 }}>Delete Proposal?</h2>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>This cannot be undone.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => { deleteProposal(deleteConfirm); setDeleteConfirm(null) }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
