import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RiskBadge from '../components/RiskBadge';
import api from '../api/axios';

const s = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  content: { maxWidth: 800, margin: '0 auto', padding: 24 },
  h1: { fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 4 },
  sub: { color: '#64748b', fontSize: 14, marginBottom: 24 },
  section: { background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 },
  sectionHeader: { padding: '14px 20px', borderBottom: '1px solid #e2e8f0', fontWeight: 600, fontSize: 15 },
  sectionBody: { padding: 20 },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  metric: { background: '#f8fafc', borderRadius: 8, padding: 14, border: '1px solid #e2e8f0' },
  metricLabel: { fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 },
  metricVal: { fontSize: 20, fontWeight: 700, color: '#1e293b' },
  riskBox: { borderRadius: 10, padding: 24, textAlign: 'center', marginBottom: 20 },
  comment: { padding: '12px 0', borderBottom: '1px solid #f1f5f9' },
  commentMeta: { fontSize: 11, color: '#94a3b8', marginBottom: 4 },
  commentText: { fontSize: 14, color: '#374151' },
  empty: { color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: 24 },
  bar: { background: '#e2e8f0', borderRadius: 6, height: 8, marginTop: 6 },
  barFill: { height: 8, borderRadius: 6, transition: 'width 0.5s' },
};

const riskColors = {
  HIGH: { bg: '#fff1f2', border: '#fca5a5', text: '#dc2626' },
  MEDIUM: { bg: '#fffbeb', border: '#fcd34d', text: '#d97706' },
  LOW: { bg: '#f0fdf4', border: '#86efac', text: '#16a34a' },
};

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [student, setStudent] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/students/${user.id}`);
        setStudent(res.data);
        const cRes = await api.get(`/comments/${res.data.id}`);
        setComments(cRes.data);
      } catch { }
      finally { setLoading(false); }
    };
    load();
  }, [user.id]);

  if (loading) return (
    <div style={s.page}>
      <Navbar user={user} />
      <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading...</div>
    </div>
  );

  if (!student) return (
    <div style={s.page}>
      <Navbar user={user} />
      <div style={{ maxWidth: 500, margin: '60px auto', background: '#fff', borderRadius: 10, padding: 40, textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>No record found</div>
        <div style={{ color: '#64748b', fontSize: 14 }}>Your academic record hasn't been added yet. Contact your admin.</div>
      </div>
    </div>
  );

  const rc = riskColors[student.riskLevel] || riskColors.LOW;

  return (
    <div style={s.page}>
      <Navbar user={user} />
      <div style={s.content}>
        <h1 style={s.h1}>My Academic Profile</h1>
        <p style={s.sub}>View your performance and risk assessment</p>

        {/* Risk Banner */}
        <div style={{ ...s.riskBox, background: rc.bg, border: `2px solid ${rc.border}` }}>
          <div style={{ fontSize: 13, color: rc.text, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>Academic Risk Level</div>
          <RiskBadge level={student.riskLevel} />
          <div style={{ fontSize: 36, fontWeight: 800, color: rc.text, margin: '12px 0 4px' }}>{student.riskScore?.toFixed(1)}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Risk Score (0 = No Risk, 100 = Very High Risk)</div>
          <div style={s.bar}>
            <div style={{ ...s.barFill, width: `${student.riskScore}%`, background: rc.text }} />
          </div>
        </div>

        {/* Student Info */}
        <div style={s.section}>
          <div style={s.sectionHeader}>👤 Student Information</div>
          <div style={s.sectionBody}>
            <div style={s.grid2}>
              <div style={s.metric}><div style={s.metricLabel}>Name</div><div style={{ fontSize: 16, fontWeight: 600 }}>{student.name}</div></div>
              <div style={s.metric}><div style={s.metricLabel}>Roll Number</div><div style={{ fontSize: 16, fontWeight: 600 }}>{student.rollNumber}</div></div>
            </div>
          </div>
        </div>

        {/* Academic Metrics */}
        <div style={s.section}>
          <div style={s.sectionHeader}>📊 Academic Performance</div>
          <div style={s.sectionBody}>
            <div style={s.grid2}>
              {[
                ['Attendance', `${student.attendance}%`, student.attendance],
                ['Current CGPA', `${student.currCgpa} / 10`, student.currCgpa * 10],
                ['Previous CGPA', `${student.prevCgpa} / 10`, student.prevCgpa * 10],
                ['Recent Test', `${student.recentTest} / 100`, student.recentTest],
                ['Internal Mark', `${student.internalMark} / 100`, student.internalMark],
                ['Project Score', `${student.projectScore} / 100`, student.projectScore],
                ['Project Completion', `${student.project}%`, student.project],
                ['Backlogs', student.backlogs, null],
              ].map(([label, val, pct]) => (
                <div key={label} style={s.metric}>
                  <div style={s.metricLabel}>{label}</div>
                  <div style={s.metricVal}>{val}</div>
                  {pct !== null && pct !== undefined && (
                    <div style={s.bar}>
                      <div style={{
                        ...s.barFill, width: `${Math.min(pct, 100)}%`,
                        background: pct >= 70 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626'
                      }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div style={s.section}>
          <div style={s.sectionHeader}>💬 Mentor Feedback</div>
          <div style={s.sectionBody}>
            {comments.length === 0 && <div style={s.empty}>No feedback yet from your mentor.</div>}
            {comments.map(c => (
              <div key={c.id} style={s.comment}>
                <div style={s.commentMeta}>{c.mentorName} · {new Date(c.createdAt).toLocaleDateString()}</div>
                <div style={s.commentText}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
