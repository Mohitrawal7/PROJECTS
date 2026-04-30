'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Users, DollarSign, Mail, UserCheck, LogOut, Menu, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { href: '/admin/events', icon: <Calendar size={18} />, label: 'Events' },
  { href: '/admin/attendance', icon: <UserCheck size={18} />, label: 'Attendance' },
  { href: '/admin/finances', icon: <DollarSign size={18} />, label: 'Finances' },
  { href: '/admin/emails', icon: <Mail size={18} />, label: 'Email Automation' },
  { href: '/admin/members', icon: <Users size={18} />, label: 'Members' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', position: 'fixed', top: 16, left: 16, zIndex: 200, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.5rem', color: 'var(--text)', cursor: 'pointer' }} className="mob-toggle">
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside style={{ width: 240, background: 'var(--bg-card)', borderRight: '1px solid var(--border)', height: '100vh', position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.875rem', color: '#000', flexShrink: 0 }}>CFC</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>CFC <span className="text-gradient">FarWest</span></div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.5rem 0.875rem', marginBottom: '0.25rem' }}>Navigation</div>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={`sidebar-link ${pathname === item.href || pathname.startsWith(item.href + '/') ? 'active' : ''}`}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid var(--border)' }}>
          <Link href="/" target="_blank" className="sidebar-link" style={{ marginBottom: '0.25rem' }}>
            <Calendar size={18} /> View Public Site
          </Link>
          <button onClick={handleLogout} className="sidebar-link" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#ef4444' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  )
}
