import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const s = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  },
  card: {
    background: '#fff', borderRadius: 12, padding: 40, width: 400,
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  },
  logo:  { textAlign: 'center', marginBottom: 24 },
  icon:  { fontSize: 44, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: 700, color: '#1e3a8a' },
  sub:   { fontSize: 13, color: '#64748b', textAlign: 'center', marginBottom: 28 },
  label: { display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#374151' },
  field: { marginBottom: 16 },
  btn:   { width: '100%', padding: 11, background: '#2563eb', color: '#fff', fontSize: 15, fontWeight: 600, borderRadius: 8, marginTop: 6, border: 'none', cursor: 'pointer' },
  err:   { background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: 6, fontSize: 13, marginBottom: 14, border: '1px solid #fca5a5' },
  hints: { marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 },
  hint:  { background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#0369a1' },
  hintTitle: { fontWeight: 700, marginBottom: 4 },
  row:   { display: 'flex', justifyContent: 'space-between' },
  mono:  { fontFamily: 'monospace', background: '#e0f2fe', borderRadius: 4, padding: '1px 5px' },
};

export default function Login() {
  const [form, setForm]   = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy]   = useState(false);
  const navigate          = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      const res  = await api.post('/auth/login', form);
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      if      (user.role === 'ADMIN')   navigate('/admin');
      else if (user.role === 'MENTOR')  navigate('/mentor');
      else                              navigate('/student');
    } catch {
      setError('Invalid username or password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>
          <div style={s.icon}>🎓</div>
          <div style={s.title}>Student Risk System</div>
        </div>
        <p style={s.sub}>Sign in to your account</p>

        {error && <div style={s.err}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={s.field}>
            <label style={s.label}>Username</label>
            <input
              type="text" placeholder="Enter username" required
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              type="password" placeholder="Enter password" required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" style={s.btn} disabled={busy}>
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* <div style={s.hints}>
          <div style={s.hint}>
            <div style={s.hintTitle}>🔑 Admin</div>
            <div style={s.row}><span>admin</span><span style={s.mono}>admin123</span></div>
          </div>
          <div style={s.hint}>
            <div style={s.hintTitle}>👨‍🏫 Mentor</div>
            <div style={s.row}><span>mentor1</span><span style={s.mono}>mentor123</span></div>
          </div>
          <div style={s.hint}>
            <div style={s.hintTitle}>🎓 Student</div>
            <div style={{ fontSize: 11, color: '#0369a1', lineHeight: 1.6 }}>
              Username = <strong>Roll Number</strong><br />
              Password = <strong>Roll Number</strong> (default, set on CSV upload)
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
