import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  nav: {
    background: '#1e3a8a',
    color: '#fff',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  brand: { fontWeight: 700, fontSize: 16, letterSpacing: 0.5 },
  right: { display: 'flex', alignItems: 'center', gap: 16 },
  role: {
    background: '#3b82f6',
    borderRadius: 20,
    padding: '3px 12px',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  logout: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.4)',
    color: '#fff',
    padding: '5px 14px',
    borderRadius: 6,
    fontSize: 13,
  },
};

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>🎓 Student Risk System</span>
      <div style={styles.right}>
        <span style={styles.role}>{user?.role}</span>
        <span style={{ fontSize: 13 }}>{user?.name || user?.username}</span>
        <button style={styles.logout} onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
