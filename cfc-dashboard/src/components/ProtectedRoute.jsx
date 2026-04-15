import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px',
          fontFamily: 'Syne', fontWeight: 800, fontSize: 18, color: 'white',
        }}>C</div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>Loading...</div>
      </div>
    </div>
  )
  return user ? children : <Navigate to="/login" replace />
}
