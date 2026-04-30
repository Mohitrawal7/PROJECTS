'use client'
import { useState, useEffect } from 'react'
import { supabase, type Event, type TeamMember } from '@/lib/supabase'
import { Calendar, MapPin, Users, ChevronRight, Zap, Heart, Globe, Star } from 'lucide-react'
import { format } from 'date-fns'
import RegisterModal from '@/components/public/RegisterModal'
import Link from 'next/link'

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [activeTab, setActiveTab] = useState<'home'|'events'|'team'>('home')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [evRes, tmRes] = await Promise.all([
        supabase.from('events').select('*').order('event_date', { ascending: true }),
        supabase.from('team_members').select('*').eq('is_active', true)
      ])
      if (evRes.data) setEvents(evRes.data)
      if (tmRes.data) setTeam(tmRes.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const upcomingEvents = events.filter(e => new Date(e.event_date) > new Date())
  const mentors = team.filter(m => m.is_mentor)
  const members = team.filter(m => !m.is_mentor)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav className="pub-nav">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.875rem', color: '#000' }}>CFC</div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>CFC <span className="text-gradient">FarWest</span></span>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            {(['home','events','team'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '0.5rem 1rem', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem', background: activeTab === tab ? 'rgba(0,212,255,0.1)' : 'transparent', color: activeTab === tab ? 'var(--accent)' : 'var(--text-muted)', textTransform: 'capitalize', transition: 'all 0.2s' }}>{tab}</button>
            ))}
            <Link href="/admin" className="btn btn-primary btn-sm" style={{ marginLeft: '0.75rem' }}>Admin</Link>
          </div>
        </div>
      </nav>

      {activeTab === 'home' && (
        <>
          <section className="mesh-bg" style={{ padding: '6rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '15%', left: '8%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(0,212,255,0.06)', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(124,58,237,0.06)', filter: 'blur(60px)' }} />
            <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
              <div className="badge badge-blue" style={{ marginBottom: '1.5rem', display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', display: 'inline-block' }} />
                Community For Change · FarWest Nepal
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Building the Future<br /><span className="text-gradient">Together</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 560, margin: '0 auto 2.5rem' }}>
                CFC FarWest is a student-led community dedicated to technology, innovation, and social impact in FarWest Nepal.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveTab('events')} className="btn btn-primary"><Calendar size={16} /> Explore Events</button>
                <button onClick={() => setActiveTab('team')} className="btn btn-secondary"><Users size={16} /> Meet the Team</button>
              </div>
            </div>
          </section>

          <section style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { icon: <Users size={20} />, label: 'Members', value: `${team.length}+`, color: '#00d4ff' },
                { icon: <Calendar size={20} />, label: 'Events', value: `${events.length}+`, color: '#7c3aed' },
                { icon: <Star size={20} />, label: 'Mentors', value: mentors.length, color: '#10b981' },
                { icon: <Globe size={20} />, label: 'Region', value: 'FarWest', color: '#f59e0b' },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ textAlign: 'center' }}>
                  <div style={{ color: s.color, marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {upcomingEvents.length > 0 && (
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Upcoming Events</h2>
                <button onClick={() => setActiveTab('events')} className="btn btn-secondary btn-sm">View all <ChevronRight size={14} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {upcomingEvents.slice(0, 3).map(ev => <EventCard key={ev.id} event={ev} onRegister={() => setSelectedEvent(ev)} />)}
              </div>
            </section>
          )}

          <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {[
                { icon: <Zap size={24} />, title: 'Innovation', desc: 'Fostering creative problem-solving and new technologies to drive change.', color: '#00d4ff' },
                { icon: <Heart size={24} />, title: 'Community', desc: 'Empowering students and young professionals across FarWest Nepal.', color: '#7c3aed' },
                { icon: <Globe size={24} />, title: 'Impact', desc: 'Creating lasting positive change through education, events, and collaboration.', color: '#10b981' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-dim)', lineHeight: 1.65, fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'events' && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h2 className="section-title"><Calendar size={22} /> All Events</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading events...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {events.map(ev => <EventCard key={ev.id} event={ev} onRegister={() => setSelectedEvent(ev)} />)}
            </div>
          )}
        </section>
      )}

      {activeTab === 'team' && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h2 className="section-title"><Users size={22} /> Our Team</h2>
          {mentors.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mentors & Advisors</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                {mentors.map(m => <MemberCard key={m.id} member={m} />)}
              </div>
            </div>
          )}
          <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Core Members</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {members.map(m => <MemberCard key={m.id} member={m} />)}
          </div>
        </section>
      )}

      <footer style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>CFC <span className="text-gradient">FarWest</span></div>
        <p>Community For Change · Building Tomorrow&apos;s Leaders Today</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>© {new Date().getFullYear()} CFC FarWest. All rights reserved.</p>
      </footer>

      {selectedEvent && <RegisterModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  )
}

function EventCard({ event, onRegister }: { event: Event; onRegister: () => void }) {
  const isPast = new Date(event.event_date) < new Date()
  return (
    <div className="card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className={`badge ${isPast ? 'badge-yellow' : event.is_open ? 'badge-green' : 'badge-red'}`}>{isPast ? 'Completed' : event.is_open ? 'Open' : 'Closed'}</span>
        {!isPast && event.max_participants && <span className="badge badge-blue">{event.max_participants} seats</span>}
      </div>
      <h3 style={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.3 }}>{event.title}</h3>
      {event.description && <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', lineHeight: 1.6, flex: 1 }}>{event.description}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={14} style={{ color: 'var(--accent)' }} />{format(new Date(event.event_date), 'PPP · p')}</div>
        {event.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} style={{ color: 'var(--accent2)' }} />{event.location}</div>}
      </div>
      {!isPast && event.is_open && (
        <button onClick={onRegister} className="btn btn-primary" style={{ justifyContent: 'center' }}>Register Now <ChevronRight size={15} /></button>
      )}
      {isPast && <div style={{ padding: '0.625rem', borderRadius: 8, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.15)', fontSize: '0.8rem', color: 'var(--accent-warn)', textAlign: 'center' }}>This event has ended</div>}
    </div>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  const initials = member.name.split(' ').map((n:string) => n[0]).join('').slice(0, 2)
  return (
    <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: member.is_mentor ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'linear-gradient(135deg, #00d4ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#000', flexShrink: 0 }}>{initials}</div>
      <div>
        <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{member.name}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{member.role}</div>
        {member.bio && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{member.bio}</div>}
        {member.is_mentor && <span className="badge badge-yellow" style={{ marginTop: '0.5rem', display: 'inline-flex' }}>Mentor</span>}
      </div>
    </div>
  )
}
