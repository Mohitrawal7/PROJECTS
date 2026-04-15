import { useData } from '../context/DataContext'
import { mockAnalytics } from '../lib/mockData'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { Calendar, Users, Handshake, TrendingUp, ArrowUpRight, Clock, CheckCircle } from 'lucide-react'

const COLORS = ['#6366f1', '#a78bfa', '#10b981', '#f59e0b', '#ef4444']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px' }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 13, color: p.color || 'var(--text)', fontWeight: 600 }}>
          {typeof p.value === 'number' && p.value > 1000
            ? `NPR ${(p.value / 1000).toFixed(0)}k`
            : p.value}
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { events, registrations, sponsors, proposals } = useData()

  const totalRegistrations = registrations.length
  const confirmedRegs = registrations.filter(r => r.status === 'confirmed').length
  const activeSponsors = sponsors.filter(s => s.status === 'active').length
  const sponsorRevenue = sponsors.filter(s => s.status === 'active').reduce((a, s) => a + s.amount, 0)
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length

  const stats = [
    { label: 'Upcoming Events', value: upcomingEvents, icon: Calendar, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', change: '+2 this month' },
    { label: 'Total Registrations', value: totalRegistrations, icon: Users, color: '#10b981', bg: 'rgba(16,185,129,0.1)', change: `${confirmedRegs} confirmed` },
    { label: 'Active Sponsors', value: activeSponsors, icon: Handshake, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', change: `${proposals.length} proposals` },
    { label: 'Sponsor Revenue', value: `NPR ${(sponsorRevenue / 1000).toFixed(0)}k`, icon: TrendingUp, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', change: 'This cycle' },
  ]

  const recentEvents = [...events].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back — here's what's happening at CFC</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 99, padding: '5px 12px', fontSize: 12, color: 'var(--green)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite' }} />
            Live
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map(({ label, value, icon: Icon, color, bg, change }) => (
          <div key={label} className="stat-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
              </div>
              <ArrowUpRight size={14} color="var(--muted)" />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Syne', letterSpacing: '-0.02em', marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 11, color, fontWeight: 500 }}>{change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="card">
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700 }}>Monthly Registrations</h3>
              <p style={{ fontSize: 12, color: 'var(--muted)' }}>Last 6 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={mockAnalytics.monthly_registrations}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fill="url(#grad1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>Sponsor Revenue</h3>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>NPR — Last 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockAnalytics.sponsor_revenue} barSize={24}>
              <XAxis dataKey="month" tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        {/* Recent Events */}
        <div className="card">
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>Recent Events</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentEvents.map(event => {
              const fill = Math.round((event.registered / event.capacity) * 100)
              return (
                <div key={event.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', background: 'var(--surface2)', borderRadius: 10,
                  border: '1px solid var(--border)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: 'rgba(99,102,241,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {event.status === 'upcoming' ? <Clock size={16} color="var(--accent)" /> : <CheckCircle size={16} color="var(--green)" />}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{event.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{event.date} · {event.location}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{event.registered}/{event.capacity}</div>
                    <div style={{ width: 80, height: 4, background: 'var(--border)', borderRadius: 2 }}>
                      <div style={{ width: `${fill}%`, height: '100%', background: fill > 90 ? 'var(--green)' : 'var(--accent)', borderRadius: 2 }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Event Types */}
        <div className="card">
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>Event Types</h3>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>All time</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={mockAnalytics.event_types} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" paddingAngle={3}>
                {mockAnalytics.event_types.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {mockAnalytics.event_types.map(({ name, value }, i) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{name}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
