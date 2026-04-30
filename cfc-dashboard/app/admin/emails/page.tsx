'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Send, Clock, CheckCircle, XCircle, ChevronDown, Zap, Users, Star } from 'lucide-react'
import { format, addHours, isBefore } from 'date-fns'

type EmailType = 'event_reminder' | 'joining_link' | 'mentor_thankyou'

const emailTemplates: Record<EmailType, { label: string; desc: string; icon: any; color: string; timing: string }> = {
  event_reminder: { label: 'Event Reminder', desc: 'Send reminder to all registered participants before the event starts.', icon: <Clock size={18} />, color: '#00d4ff', timing: 'Send before event' },
  joining_link: { label: 'Joining Link', desc: 'Send joining/access link to all participants after registration closes.', icon: <Users size={18} />, color: '#7c3aed', timing: 'Sent when event closes' },
  mentor_thankyou: { label: 'Mentor Thank You', desc: 'Automatically sent to mentors 2 hours after event ends.', icon: <Star size={18} />, color: '#f59e0b', timing: 'Auto: 2hrs after event ends' },
}

export default function EmailsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [registrations, setRegistrations] = useState<any[]>([])
  const [sending, setSending] = useState<string | null>(null)
  const [joinLink, setJoinLink] = useState('')
  const [customMsg, setCustomMsg] = useState('')

  useEffect(() => {
    supabase.from('events').select('*').order('event_date', { ascending: false })
      .then(({ data }) => { setEvents(data || []); if (data?.[0]) selectEvent(data[0]) })
  }, [])

  async function selectEvent(ev: any) {
    setSelectedEvent(ev)
    const [logRes, memRes, regRes] = await Promise.all([
      supabase.from('email_logs').select('*').eq('event_id', ev.id).order('created_at', { ascending: false }),
      supabase.from('team_members').select('*').eq('is_mentor', true).eq('is_active', true),
      supabase.from('registrations').select('*').eq('event_id', ev.id),
    ])
    setLogs(logRes.data || [])
    setMembers(memRes.data || [])
    setRegistrations(regRes.data || [])
  }

  async function sendEmails(type: EmailType) {
    if (!selectedEvent) return
    setSending(type)
    let recipients: { email: string; name: string }[] = []
    if (type === 'mentor_thankyou') {
      recipients = members.map(m => ({ email: m.email, name: m.name }))
    } else {
      recipients = registrations.map(r => ({ email: r.email, name: r.name }))
    }
    if (recipients.length === 0) { alert('No recipients found for this email type.'); setSending(null); return }

    const logs_to_insert = recipients.map(r => ({
      event_id: selectedEvent.id, email_type: type,
      recipient_email: r.email, recipient_name: r.name,
      status: 'sent', sent_at: new Date().toISOString()
    }))
    await supabase.from('email_logs').insert(logs_to_insert)
    setSending(null)
    selectEvent(selectedEvent)
    alert(`✅ ${logs_to_insert.length} emails marked as sent!\n\nNote: To actually send emails, connect an email service (Resend, SendGrid) via Supabase Edge Functions.`)
  }

  const eventHasEnded = selectedEvent ? isBefore(new Date(selectedEvent.end_date || selectedEvent.event_date), new Date()) : false
  const mentorAutoTime = selectedEvent?.end_date ? addHours(new Date(selectedEvent.end_date), 2) : null
  const mentorAutoReady = mentorAutoTime ? isBefore(mentorAutoTime, new Date()) : false

  const sentTypes = new Set(logs.filter(l => l.status === 'sent').map(l => l.email_type))

  return (
    <div style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Email <span className="text-gradient">Automation</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Automated emails for events — reminders, joining links, mentor thank-yous</p>
      </div>

      {/* Event Selector */}
      <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: 400 }}>
        <label className="label">Select Event</label>
        <select className="input" value={selectedEvent?.id || ''} onChange={e => { const ev = events.find(ev => ev.id === e.target.value); if (ev) selectEvent(ev) }} style={{ appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}>
          {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title} – {format(new Date(ev.event_date), 'MMM d, yyyy')}</option>)}
        </select>
        <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', bottom: '0.7rem', color: 'var(--text-muted)', pointerEvents: 'none' }} />
      </div>

      {selectedEvent && (
        <>
          {/* Info Banner */}
          <div style={{ background: 'var(--bg-card2)', border: '1px solid var(--border)', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Participants: </span><strong style={{ color: 'var(--accent)' }}>{registrations.length}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Mentors: </span><strong style={{ color: '#f59e0b' }}>{members.length}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Event Status: </span><span className={`badge ${eventHasEnded ? 'badge-yellow' : 'badge-green'}`}>{eventHasEnded ? 'Ended' : 'Upcoming / Live'}</span></div>
            {mentorAutoTime && <div><span style={{ color: 'var(--text-muted)' }}>Mentor auto-email at: </span><strong style={{ color: '#f59e0b' }}>{format(mentorAutoTime, 'PPp')}</strong></div>}
          </div>

          {/* Email Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {(Object.entries(emailTemplates) as [EmailType, typeof emailTemplates[EmailType]][]).map(([type, tmpl]) => {
              const alreadySent = sentTypes.has(type)
              const isAutoReady = type === 'mentor_thankyou' ? mentorAutoReady : true
              return (
                <div key={type} className="card" style={{ borderColor: alreadySent ? `${tmpl.color}40` : 'var(--border)' }}>
                  <div style={{ display: 'flex', gap: '0.875rem', marginBottom: '1rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: `${tmpl.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tmpl.color, flexShrink: 0 }}>{tmpl.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{tmpl.label}</div>
                      <div style={{ fontSize: '0.72rem', color: tmpl.color, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Zap size={10} />{tmpl.timing}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{tmpl.desc}</p>
                  {alreadySent && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#10b981', marginBottom: '0.75rem' }}><CheckCircle size={14} /> Already sent to this event</div>}
                  {type === 'mentor_thankyou' && !mentorAutoReady && eventHasEnded && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-warn)', marginBottom: '0.75rem' }}>⏳ Scheduled for {mentorAutoTime && format(mentorAutoTime, 'p')}</div>
                  )}
                  <button onClick={() => sendEmails(type)} disabled={sending === type} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', background: alreadySent ? `${tmpl.color}20` : `linear-gradient(135deg, ${tmpl.color}, ${tmpl.color}99)`, color: alreadySent ? tmpl.color : '#000' }}>
                    {sending === type ? 'Sending...' : alreadySent ? <><Send size={13} /> Resend</> : <><Send size={13} /> Send Now</>}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Email Logs */}
          <div style={{ marginTop: '1rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18} style={{ color: 'var(--accent)' }} /> Email History ({logs.length})</h2>
            {logs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border)' }}>No emails sent yet for this event.</div>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead><tr><th>Type</th><th>Recipient</th><th>Email</th><th>Status</th><th>Sent At</th></tr></thead>
                  <tbody>
                    {logs.map((l: any) => (
                      <tr key={l.id}>
                        <td><span className="badge badge-blue">{l.email_type.replace(/_/g, ' ')}</span></td>
                        <td style={{ fontWeight: 500 }}>{l.recipient_name || '—'}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{l.recipient_email}</td>
                        <td><span className={`badge ${l.status === 'sent' ? 'badge-green' : l.status === 'failed' ? 'badge-red' : 'badge-yellow'}`}>{l.status}</span></td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{l.sent_at ? format(new Date(l.sent_at), 'MMM d, p') : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Integration Info */}
          <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>
              <Zap size={16} style={{ color: 'var(--accent)' }} /> How to activate real email sending
            </div>
            <ol style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
              <li>Create a <strong style={{ color: 'var(--text)' }}>Resend</strong> or <strong style={{ color: 'var(--text)' }}>SendGrid</strong> account</li>
              <li>Deploy a <strong style={{ color: 'var(--text)' }}>Supabase Edge Function</strong> that triggers on <code style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>email_logs</code> insert</li>
              <li>Set your API key in Supabase Environment Secrets</li>
              <li>Use Supabase <strong style={{ color: 'var(--text)' }}>pg_cron</strong> to auto-trigger mentor emails 2hrs post-event</li>
            </ol>
          </div>
        </>
      )}
    </div>
  )
}
