'use client'
import { useEffect, useState } from 'react'
import { supabase, type TeamMember } from '@/lib/supabase'
import { Plus, Edit2, X, UserCheck, Star } from 'lucide-react'

const emptyForm = { name: '', role: '', email: '', phone: '', bio: '', is_mentor: false, is_active: true }

export default function MembersPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editMember, setEditMember] = useState<TeamMember | null>(null)
  const [form, setForm] = useState<any>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'mentor' | 'member'>('all')

  async function load() {
    const { data } = await supabase.from('team_members').select('*').order('is_mentor', { ascending: true }).order('name')
    setMembers(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openNew() { setEditMember(null); setForm(emptyForm); setShowModal(true) }
  function openEdit(m: TeamMember) { setEditMember(m); setForm({ name: m.name, role: m.role, email: m.email, phone: m.phone || '', bio: m.bio || '', is_mentor: m.is_mentor, is_active: m.is_active }); setShowModal(true) }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    const payload = { name: form.name, role: form.role, email: form.email, phone: form.phone || null, bio: form.bio || null, is_mentor: form.is_mentor, is_active: form.is_active }
    if (editMember) {
      await supabase.from('team_members').update(payload).eq('id', editMember.id)
    } else {
      await supabase.from('team_members').insert(payload)
    }
    setSaving(false); setShowModal(false); load()
  }

  async function toggleActive(m: TeamMember) {
    await supabase.from('team_members').update({ is_active: !m.is_active }).eq('id', m.id)
    load()
  }

  async function deleteMember(id: string) {
    if (!confirm('Remove this member?')) return
    await supabase.from('team_members').delete().eq('id', id); load()
  }

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase())
    const matchRole = filterRole === 'all' || (filterRole === 'mentor' ? m.is_mentor : !m.is_mentor)
    return matchSearch && matchRole
  })

  const mentorCount = members.filter(m => m.is_mentor).length
  const activeCount = members.filter(m => m.is_active).length

  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Members <span className="text-gradient">Directory</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{activeCount} active · {mentorCount} mentors · {members.length} total</p>
        </div>
        <button onClick={openNew} className="btn btn-primary"><Plus size={16} /> Add Member</button>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input className="input" placeholder="Search by name, email, role..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 340 }} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['all', 'member', 'mentor'] as const).map(f => (
            <button key={f} onClick={() => setFilterRole(f)} style={{ padding: '0.4rem 1rem', borderRadius: 6, border: '1px solid', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, textTransform: 'capitalize', transition: 'all 0.2s', borderColor: filterRole === f ? 'var(--accent)' : 'var(--border)', background: filterRole === f ? 'rgba(0,212,255,0.08)' : 'transparent', color: filterRole === f ? 'var(--accent)' : 'var(--text-muted)' }}>{f}</button>
          ))}
        </div>
      </div>

      {loading ? <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {filtered.map(m => {
            const initials = m.name.split(' ').map(n => n[0]).join('').slice(0, 2)
            return (
              <div key={m.id} className="card" style={{ opacity: m.is_active ? 1 : 0.5 }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: m.is_mentor ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'linear-gradient(135deg, #00d4ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem', color: '#000', flexShrink: 0 }}>{initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontWeight: 700 }}>{m.name}</div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button onClick={() => openEdit(m)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}><Edit2 size={13} /></button>
                        <button onClick={() => deleteMember(m.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}><X size={13} /></button>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '0.35rem' }}>{m.role}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{m.email}</div>
                    {m.bio && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{m.bio.slice(0, 80)}{m.bio.length > 80 ? '...' : ''}</div>}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      {m.is_mentor && <span className="badge badge-yellow"><Star size={10} /> Mentor</span>}
                      <span className={`badge ${m.is_active ? 'badge-green' : 'badge-red'}`}>{m.is_active ? 'Active' : 'Inactive'}</span>
                      <button onClick={() => toggleActive(m)} className="btn btn-sm" style={{ marginLeft: 'auto', padding: '0.25rem 0.6rem', fontSize: '0.7rem', background: 'var(--bg-card2)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 6, cursor: 'pointer' }}>
                        {m.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No members found.</div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: 700 }}>{editMember ? 'Edit Member' : 'Add Member'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}><label className="label">Full Name *</label><input className="input" required placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="label">Role / Position *</label><input className="input" required placeholder="e.g. President" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></div>
                <div><label className="label">Email *</label><input className="input" type="email" required placeholder="name@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              </div>
              <div><label className="label">Phone</label><input className="input" placeholder="+977-XXXXXXXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              <div><label className="label">Bio</label><textarea className="input" rows={3} placeholder="Brief bio..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} style={{ resize: 'vertical' }} /></div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
                  <input type="checkbox" checked={form.is_mentor} onChange={e => setForm({ ...form, is_mentor: e.target.checked })} style={{ accentColor: '#f59e0b', width: 15, height: 15 }} /> Is Mentor
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} style={{ accentColor: 'var(--accent)', width: 15, height: 15 }} /> Active Member
                </label>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>{saving ? 'Saving...' : editMember ? 'Update' : 'Add Member'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
