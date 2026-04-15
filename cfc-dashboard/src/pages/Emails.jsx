import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, X, Edit2, Trash2, Mail, Copy, Check, Eye } from 'lucide-react'

const CATEGORIES = ['Registration', 'Reminder', 'Sponsorship', 'Post-Event', 'Announcement', 'Other']

function TemplateModal({ template, onClose, onSave }) {
  const [form, setForm] = useState(template || {
    name: '', subject: '', category: 'Registration', body: '',
  })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 640 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>{template ? 'Edit Template' : 'New Template'}</h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}><X size={16} /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="form-row">
            <div className="form-group">
              <label>Template Name</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Registration Confirmation" required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Subject Line</label>
            <input value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="You're registered! 🎉 — {{event_name}}" required />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              value={form.body}
              onChange={e => set('body', e.target.value)}
              rows={10}
              placeholder="Use {{variable_name}} for dynamic content..."
              style={{ fontFamily: 'monospace', fontSize: 12, lineHeight: 1.7 }}
            />
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
              Available variables: {'{{first_name}}'}, {'{{event_name}}'}, {'{{event_date}}'}, {'{{event_location}}'}, {'{{reg_id}}'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{template ? 'Save Changes' : 'Create Template'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function PreviewModal({ template, onClose }) {
  const preview = (str) => str
    ?.replace(/\{\{first_name\}\}/g, 'Aarav')
    ?.replace(/\{\{event_name\}\}/g, 'Tech for Good Hackathon 2025')
    ?.replace(/\{\{event_date\}\}/g, 'March 15, 2025')
    ?.replace(/\{\{event_time\}\}/g, '9:00 AM')
    ?.replace(/\{\{event_location\}\}/g, 'Kathmandu Innovation Hub')
    ?.replace(/\{\{reg_id\}\}/g, 'REG-2025-0042')
    ?.replace(/\{\{company_name\}\}/g, 'NIC Asia Bank')
    ?.replace(/\{\{contact_name\}\}/g, 'Mr. Rajesh Sharma')
    ?.replace(/\{\{tier\}\}/g, 'Gold')
    ?.replace(/\{\{year\}\}/g, '2025')
    ?.replace(/\{\{your_name\}\}/g, 'CFC Admin')
    ?.replace(/\{\{resources_link\}\}/g, 'https://cfc.org/resources')

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>{template.name}</h2>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>Preview with sample data</p>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 6 }}><X size={16} /></button>
        </div>
        <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: 20, border: '1px solid var(--border)' }}>
          <div style={{ marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>SUBJECT</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{preview(template.subject)}</div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
            {preview(template.body)}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button className="btn btn-ghost" onClick={handleCopy} style={{ padding: '5px 8px' }}>
      {copied ? <Check size={13} color="var(--green)" /> : <Copy size={13} />}
    </button>
  )
}

const CATEGORY_COLORS = {
  Registration: 'badge-green',
  Reminder: 'badge-amber',
  Sponsorship: 'badge-purple',
  'Post-Event': 'badge-gray',
  Announcement: 'badge-red',
  Other: 'badge-gray',
}

export default function Emails() {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useData()
  const [modal, setModal] = useState(null)
  const [preview, setPreview] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [filterCat, setFilterCat] = useState('all')

  const filtered = templates.filter(t => filterCat === 'all' || t.category === filterCat)

  const handleSave = (form) => {
    if (modal === 'new') addTemplate(form)
    else updateTemplate(modal.id, form)
    setModal(null)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Email Templates</h1>
          <p>Manage reusable communication templates for all events</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('new')}><Plus size={15} /> New Template</button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            className={`btn ${filterCat === cat ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilterCat(cat)}
            style={{ padding: '6px 14px', fontSize: 12 }}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state card">
          <Mail size={40} />
          <h3>No templates yet</h3>
          <p>Create your first email template</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
          {filtered.map(t => (
            <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(99,102,241,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Mail size={16} color="var(--accent)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
                    <span className={`badge ${CATEGORY_COLORS[t.category] || 'badge-gray'}`} style={{ marginTop: 3 }}>{t.category}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn btn-ghost" onClick={() => setPreview(t)} style={{ padding: '5px 8px' }}><Eye size={13} /></button>
                  <CopyButton text={`Subject: ${t.subject}\n\n${t.body}`} />
                  <button className="btn btn-ghost" onClick={() => setModal(t)} style={{ padding: '5px 8px' }}><Edit2 size={13} /></button>
                  <button className="btn btn-danger" onClick={() => setDeleteConfirm(t.id)} style={{ padding: '5px 8px' }}><Trash2 size={13} /></button>
                </div>
              </div>

              <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</div>
                <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.subject}</div>
              </div>

              <div style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.6 }}>
                {t.body?.split('\n')[0]}
              </div>

              <div style={{ fontSize: 11, color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                Last updated: {t.last_updated}
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && <TemplateModal template={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      {preview && <PreviewModal template={preview} onClose={() => setPreview(null)} />}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 380 }}>
            <h2 style={{ fontSize: 17, marginBottom: 10 }}>Delete Template?</h2>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>This template will be permanently removed.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => { deleteTemplate(deleteConfirm); setDeleteConfirm(null) }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
