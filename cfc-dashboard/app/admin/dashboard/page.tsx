'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Calendar, Users, DollarSign, Mail, UserCheck, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

export default function DashboardPage() {
  const [stats, setStats] = useState({ events: 0, members: 0, registrations: 0, emailsSent: 0, income: 0, expenses: 0 })
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [recentRegs, setRecentRegs] = useState<any[]>([])
  const [recentFinances, setRecentFinances] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [evRes, tmRes, regRes, emailRes, finRes, upRes, regRecentRes, finRecentRes] = await Promise.all([
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('team_members').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('registrations').select('id', { count: 'exact', head: true }),
        supabase.from('email_logs').select('id', { count: 'exact', head: true }).eq('status', 'sent'),
        supabase.from('finances').select('type, amount'),
        supabase.from('events').select('*').gte('event_date', new Date().toISOString()).order('event_date').limit(3),
        supabase.from('registrations').select('*, events(title)').order('registered_at', { ascending: false }).limit(5),
        supabase.from('finances').select('*').order('created_at', { ascending: false }).limit(5),
      ])
      const income = finRes.data?.filter(f => f.type === 'income').reduce((s: number, f: any) => s + Number(f.amount), 0) || 0
      const expenses = finRes.data?.filter(f => f.type === 'expense').reduce((s: number, f: any) => s + Number(f.amount), 0) || 0
      setStats({ events: evRes.count || 0, members: tmRes.count || 0, registrations: regRes.count || 0, emailsSent: emailRes.count || 0, income, expenses })
      setUpcomingEvents(upRes.data || [])
      setRecentRegs(regRecentRes.data || [])
      setRecentFinances(finRecentRes.data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><div style={{ color: 'var(--text-muted)' }}>Loading dashboard...</div></div>

  const balance = stats.income - stats.expenses

  return (
    <div style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Dashboard <span className="text-gradient">Overview</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Welcome back, Admin · {format(new Date(), 'PPPP')}</p>
      </div>

      {/* STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Events', value: stats.events, icon: <Calendar size={20} />, color: '#00d4ff', href: '/admin/events' },
          { label: 'Active Members', value: stats.members, icon: <Users size={20} />, color: '#7c3aed', href: '/admin/members' },
          { label: 'Registrations', value: stats.registrations, icon: <UserCheck size={20} />, color: '#10b981', href: '/admin/attendance' },
          { label: 'Emails Sent', value: stats.emailsSent, icon: <Mail size={20} />, color: '#f59e0b', href: '/admin/emails' },
        ].map((s, i) => (
          <Link href={s.href} key={i} style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer', transition: 'border-color 0.2s', borderColor: 'var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
                <TrendingUp size={14} style={{ color: '#10b981' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* FINANCE SUMMARY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="stat-card" style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <DollarSign size={16} style={{ color: '#10b981' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Income</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981' }}>NPR {stats.income.toLocaleString()}</div>
        </div>
        <div className="stat-card" style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <DollarSign size={16} style={{ color: '#ef4444' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Expenses</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ef4444' }}>NPR {stats.expenses.toLocaleString()}</div>
        </div>
        <div className="stat-card" style={{ background: balance >= 0 ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)', borderColor: balance >= 0 ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {balance >= 0 ? <CheckCircle size={16} style={{ color: '#10b981' }} /> : <AlertCircle size={16} style={{ color: '#ef4444' }} />}
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net Balance</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: balance >= 0 ? '#10b981' : '#ef4444' }}>NPR {balance.toLocaleString()}</div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Upcoming Events */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Upcoming Events</h2>
            <Link href="/admin/events" style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none' }}>Manage →</Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No upcoming events.</p>
          ) : upcomingEvents.map((ev: any) => (
            <div key={ev.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid rgba(30,45,69,0.5)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(0,212,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{format(new Date(ev.event_date), 'd')}</span>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{format(new Date(ev.event_date), 'MMM')}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{format(new Date(ev.event_date), 'p')} · {ev.location || 'TBD'}</div>
              </div>
              <span className={`badge ${ev.is_open ? 'badge-green' : 'badge-red'}`}>{ev.is_open ? 'Open' : 'Closed'}</span>
            </div>
          ))}
        </div>

        {/* Recent Registrations */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Recent Registrations</h2>
            <Link href="/admin/attendance" style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none' }}>View all →</Link>
          </div>
          {recentRegs.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No registrations yet.</p>
          ) : recentRegs.map((r: any) => (
            <div key={r.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.625rem 0', borderBottom: '1px solid rgba(30,45,69,0.5)' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#000', flexShrink: 0 }}>
                {r.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{r.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.events?.title || 'Unknown event'}</div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{format(new Date(r.registered_at), 'MMM d')}</span>
            </div>
          ))}
        </div>

        {/* Recent Finances */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Recent Transactions</h2>
            <Link href="/admin/finances" style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none' }}>Manage finances →</Link>
          </div>
          {recentFinances.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No financial records yet.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Description</th><th>Category</th><th>Type</th><th>Amount</th><th>Date</th></tr></thead>
                <tbody>
                  {recentFinances.map((f: any) => (
                    <tr key={f.id}>
                      <td>{f.description}</td>
                      <td><span className="badge badge-blue">{f.category}</span></td>
                      <td><span className={`badge ${f.type === 'income' ? 'badge-green' : 'badge-red'}`}>{f.type}</span></td>
                      <td style={{ fontWeight: 600, color: f.type === 'income' ? '#10b981' : '#ef4444' }}>{f.type === 'income' ? '+' : '-'} {f.currency} {Number(f.amount).toLocaleString()}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{format(new Date(f.date), 'MMM d, yyyy')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
