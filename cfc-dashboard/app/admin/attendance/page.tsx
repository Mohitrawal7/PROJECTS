'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { UserCheck, ChevronDown, Check, X, Clock } from 'lucide-react'
import { format } from 'date-fns'

type Status = 'present' | 'absent' | 'excused'

export default function AttendancePage() {
  const [events, setEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [attendance, setAttendance] = useState<Record<string, Status>>({})
  const [registrations, setRegistrations] = useState<any[]>([])
  const [tab, setTab] = useState<'members' | 'participants'>('members')
  const [saving, setSaving] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.from('events').select('*').order('event_date', { ascending: false })
      .then(({ data }) => { setEvents(data || []); if (data && data.length > 0) selectEvent(data[0]) })
  }, [])

  async function selectEvent(ev: any) {
    setSelectedEvent(ev); setLoading(true)
    const [memRes, attRes, regRes] = await Promise.all([
      supabase.from('team_members').select('*').eq('is_active', true).order('name'),
      supabase.from('attendance').select('*').eq('event_id', ev.id),
      supabase.from('registrations').select('*').eq('event_id', ev.id).order('registered_at', { ascending: false }),
    ])
    setMembers(memRes.data || [])
    const attMap: Record<string, Status> = {}
    attRes.data?.forEach((a: any) => { attMap[a.member_id] = a.status })
    setAttendance(attMap)
    setRegistrations(regRes.data || [])
    setLoading(false)
  }

  async function toggleStatus(memberId: string) {
    if (!selectedEvent) return
    setSaving(memberId)
    const current = attendance[memberId] || 'absent'
    const next: Status = current === 'absent' ? 'present' : current === 'present' ? 'excused' : 'absent'
    await supabase.from('attendance').upsert({ event_id: selectedEvent.id, member_id: memberId, status: next }, { onConflict: 'event_id,member_id' })
    setAttendance(prev => ({ ...prev, [memberId]: next }))
    setSaving(null)
  }

  const statusColors: Record<Status, string> = { present: '#10b981', absent: '#ef4444', excused: '#f59e0b' }
  const statusBadge: Record<Status, string> = { present: 'badge-green', absent: 'badge-red', excused: 'badge-yellow' }
  const statusIcon: Record<Status, any> = { present: <Check size={14} />, absent: <X size={14} />, excused: <Clock size={14} /> }

  const presentCount = Object.values(attendance).filter(s => s === 'present').length
  const excusedCount = Object.values(attendance).filter(s => s === 'excused').length
  const absentCount = members.length - presentCount - excusedCount

  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Attendance <span className="text-gradient">Tracker</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Mark member attendance and view participant registrations</p>
      </div>

      {/* Event Selector */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', minWidth: 320 }}>
          <select className="input" value={selectedEvent?.id || ''} onChange={e => { const ev = events.find(ev => ev.id === e.target.value); if (ev) selectEvent(ev) }} style={{ appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}>
            {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title} – {format(new Date(ev.event_date), 'MMM d, yyyy')}</option>)}
          </select>
          <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        </div>
      </div>

      {selectedEvent && (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Total Members', value: members.length, color: '#00d4ff' },
              { label: 'Present', value: presentCount, color: '#10b981' },
              { label: 'Excused', value: excusedCount, color: '#f59e0b' },
              { label: 'Absent', value: absentCount, color: '#ef4444' },
            ].map((s, i) => (
              <div key={i} className="stat-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', background: 'var(--bg-card)', padding: '0.25rem', borderRadius: 10, width: 'fit-content', border: '1px solid var(--border)' }}>
            {(['members', 'participants'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '0.5rem 1.25rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem', background: tab === t ? 'var(--accent)' : 'transparent', color: tab === t ? '#000' : 'var(--text-muted)', transition: 'all 0.2s', textTransform: 'capitalize' }}>{t} {t === 'participants' ? `(${registrations.length})` : `(${members.length})`}</button>
            ))}
          </div>

          {loading ? <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div> : tab === 'members' ? (
            /* MEMBER ATTENDANCE */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {members.map((m: any) => {
                const status: Status = attendance[m.id] || 'absent'
                return (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, transition: 'border-color 0.2s' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: m.is_mentor ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'linear-gradient(135deg, #00d4ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 700, color: '#000', flexShrink: 0 }}>
                      {m.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{m.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.role}{m.is_mentor ? ' · Mentor' : ''}</div>
                    </div>
                    <span className={`badge ${statusBadge[status]}`} style={{ gap: '0.3rem' }}>{statusIcon[status]} {status}</span>
                    <button onClick={() => toggleStatus(m.id)} disabled={saving === m.id} className="btn btn-secondary btn-sm" style={{ minWidth: 100, justifyContent: 'center', borderColor: statusColors[status], color: statusColors[status] }}>
                      {saving === m.id ? '...' : 'Toggle →'}
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            /* PARTICIPANTS / REGISTRATIONS */
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>College</th><th>Status</th><th>Registered</th></tr></thead>
                <tbody>
                  {registrations.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No registrations yet.</td></tr>
                  ) : registrations.map((r: any) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 500 }}>{r.name}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{r.email}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{r.phone || '—'}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{r.college || '—'}</td>
                      <td><span className={`badge ${r.status === 'confirmed' ? 'badge-green' : r.status === 'cancelled' ? 'badge-red' : 'badge-blue'}`}>{r.status}</span></td>
                      <td style={{ color: 'var(--text-muted)' }}>{format(new Date(r.registered_at), 'MMM d, p')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
