import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        marginLeft: 240,
        flex: 1,
        padding: '28px 32px',
        minHeight: '100vh',
        maxWidth: '100%',
        overflow: 'auto',
      }}>
        <Outlet />
      </main>
    </div>
  )
}
