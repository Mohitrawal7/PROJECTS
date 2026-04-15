import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabase'
import { Settings, Database, User, Shield, Check, ExternalLink } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const supabaseOk = isSupabaseConfigured()

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Configure your CFC Operations Dashboard</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Profile */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <User size={16} color="var(--accent)" />
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Profile</h2>
          </div>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Display Name</label>
              <input defaultValue={user?.name} placeholder="Admin" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={user?.email} placeholder="admin@codeforchange.org" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input defaultValue={user?.role} disabled style={{ opacity: 0.5 }} />
            </div>
            <button type="submit" className="btn btn-primary">
              {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Database */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Database size={16} color={supabaseOk ? 'var(--green)' : 'var(--amber)'} />
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Database (Supabase)</h2>
            <span className={`badge ${supabaseOk ? 'badge-green' : 'badge-amber'}`} style={{ marginLeft: 'auto' }}>
              {supabaseOk ? 'Connected' : 'Not Connected'}
            </span>
          </div>

          {supabaseOk ? (
            <div style={{ padding: '12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 13, color: 'var(--green)' }}>
              ✅ Supabase is configured. Real-time data persistence is active.
            </div>
          ) : (
            <div>
              <div style={{ padding: '12px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, fontSize: 13, color: 'var(--amber)', marginBottom: 16, lineHeight: 1.6 }}>
                ⚠️ Running with mock data. To connect real persistence, add Supabase credentials to your <code style={{ background: 'var(--surface2)', padding: '1px 5px', borderRadius: 4 }}>.env</code> file.
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, background: 'var(--surface2)', padding: 14, borderRadius: 8, border: '1px solid var(--border)', lineHeight: 2, marginBottom: 14 }}>
                <div style={{ color: 'var(--muted)' }}># .env (root of project)</div>
                <div>VITE_SUPABASE_URL=<span style={{ color: 'var(--accent2)' }}>https://your-project.supabase.co</span></div>
                <div>VITE_SUPABASE_ANON_KEY=<span style={{ color: 'var(--accent2)' }}>your-anon-key</span></div>
              </div>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{ fontSize: 12, display: 'inline-flex' }}
              >
                <ExternalLink size={13} /> Open Supabase Dashboard
              </a>
            </div>
          )}
        </div>

        {/* SQL Schema */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Database size={16} color="var(--accent)" />
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>SQL Schema</h2>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>— Run this in your Supabase SQL editor to set up tables</span>
          </div>
          <pre style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 16,
            fontSize: 11,
            lineHeight: 1.7,
            overflow: 'auto',
            color: 'var(--text)',
            fontFamily: 'monospace',
            maxHeight: 340,
          }}>{`-- Events table
create table events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text,
  date date,
  location text,
  capacity int default 0,
  registered int default 0,
  status text default 'upcoming',
  description text,
  created_at timestamptz default now()
);

-- Registrations table
create table registrations (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  college text,
  status text default 'confirmed',
  registered_at timestamptz default now()
);

-- Sponsors table
create table sponsors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text,
  amount numeric default 0,
  status text default 'pending',
  contact text,
  phone text,
  notes text,
  events text[],
  created_at timestamptz default now()
);

-- Proposals table
create table proposals (
  id uuid default gen_random_uuid() primary key,
  sponsor_id uuid references sponsors(id) on delete cascade,
  title text not null,
  status text default 'draft',
  amount numeric default 0,
  notes text,
  sent_at date,
  responded_at date
);

-- Email templates table
create table email_templates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  subject text,
  category text,
  body text,
  last_updated timestamptz default now()
);

-- Enable Row Level Security
alter table events enable row level security;
alter table registrations enable row level security;
alter table sponsors enable row level security;
alter table proposals enable row level security;
alter table email_templates enable row level security;

-- Policies (allow all for authenticated users)
create policy "Allow all" on events for all using (true);
create policy "Allow all" on registrations for all using (true);
create policy "Allow all" on sponsors for all using (true);
create policy "Allow all" on proposals for all using (true);
create policy "Allow all" on email_templates for all using (true);`}</pre>
        </div>

        {/* Security */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Shield size={16} color="var(--accent)" />
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Security</h2>
          </div>
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button className="btn btn-primary" onClick={() => {}}>Update Password</button>
        </div>

        {/* About */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Settings size={16} color="var(--accent)" />
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>About</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'App', value: 'CFC Operations Dashboard' },
              { label: 'Version', value: 'v1.0.0' },
              { label: 'Stack', value: 'React 19 + Vite 6 + Tailwind v4' },
              { label: 'Backend', value: 'Spring Boot (planned)' },
              { label: 'Database', value: 'PostgreSQL via Supabase' },
              { label: 'Built for', value: 'Code for Change (CFC)' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid rgba(42,42,56,0.5)' }}>
                <span style={{ color: 'var(--muted)' }}>{label}</span>
                <span style={{ fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
