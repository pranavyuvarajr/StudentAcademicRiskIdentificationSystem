import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RiskBadge from '../components/RiskBadge';
import api from '../api/axios';

const s = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  content: { maxWidth: 1100, margin: '0 auto', padding: 24 },
  h1: { fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 4 },
  sub: { color: '#64748b', fontSize: 14, marginBottom: 24 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' },
  section: { background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 },
  sectionHeader: { padding: '14px 20px', borderBottom: '1px solid #e2e8f0', fontWeight: 600, fontSize: 15 },
  sectionBody: { padding: 16 },
  row: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' },
  rowActive: { background: '#eff6ff', borderRadius: 8, padding: '12px 10px' },
  name: { fontWeight: 600, fontSize: 14, flex: 1 },
  score: { fontSize: 13, color: '#64748b' },
  detailCard: { background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 80 },
  metricRow: { display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14 },
  metricLabel: { color: '#64748b' },
  metricVal: { fontWeight: 600 },
  textArea: { resize: 'vertical', minHeight: 80, marginBottom: 10 },
  btn: { padding: '8px 18px', background: '#2563eb', color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 600 },
  comment: { padding: '10px 0', borderBottom: '1px solid #f1f5f9' },
  commentMeta: { fontSize: 11, color: '#94a3b8', marginBottom: 4 },
  commentText: { fontSize: 13, color: '#374151' },
  empty: { color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: 24 },
  toast: { background: '#dcfce7', border: '1px solid #86efac', color: '#16a34a', padding: '8px 14px', borderRadius: 6, marginBottom: 12, fontSize: 13 },
};

export default function MentorDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [msg, setMsg] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    api.get(`/students/mentor/${user.id}`)
      .then(r => setStudents(r.data))
      .catch(() => {});
  }, [user.id]);

  const selectStudent = async (st) => {
    setSelected(st);
    setNewComment('');
    setMsg('');
    const res = await api.get(`/comments/${st.id}`);
    setComments(res.data);
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    await api.post('/comments', { studentId: selected.id, mentorId: user.id, text: newComment });
    setMsg('Comment added');
    setNewComment('');
    const res = await api.get(`/comments/${selected.id}`);
    setComments(res.data);
    setTimeout(() => setMsg(''), 3000);
  };

  const filtered = filter === 'ALL' ? students : students.filter(s => s.riskLevel === filter);

  return (
    <div style={s.page}>
      <Navbar user={user} />
      <div style={s.content}>
        <h1 style={s.h1}>Mentor Dashboard</h1>
        <p style={s.sub}>Monitor and guide your assigned students</p>

        <div style={s.grid}>
          <div>
            <div style={s.section}>
              <div style={{ ...s.sectionHeader, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>My Students ({filtered.length})</span>
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 12 }}
                >
                  <option value="ALL">All</option>
                  <option value="HIGH">High Risk</option>
                  <option value="MEDIUM">Medium Risk</option>
                  <option value="LOW">Low Risk</option>
                </select>
              </div>
              <div style={s.sectionBody}>
                {filtered.length === 0 && <div style={s.empty}>No students assigned yet.</div>}
                {filtered.map(st => (
                  <div
                    key={st.id}
                    style={{ ...s.row, ...(selected?.id === st.id ? s.rowActive : {}) }}
                    onClick={() => selectStudent(st)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={s.name}>{st.name}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{st.rollNumber}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <RiskBadge level={st.riskLevel} />
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>Score: {st.riskScore?.toFixed(1)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {selected ? (
              <div style={s.detailCard}>
                <div style={s.sectionHeader}>
                  {selected.name}
                  <div style={{ marginTop: 4 }}><RiskBadge level={selected.riskLevel} /></div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ marginBottom: 14 }}>
                    {[
                      ['Attendance', `${selected.attendance}%`],
                      ['Curr CGPA', selected.currCgpa],
                      ['Prev CGPA', selected.prevCgpa],
                      ['Recent Test', `${selected.recentTest}/100`],
                      ['Internal Mark', `${selected.internalMark}/100`],
                      ['Project Score', `${selected.projectScore}/100`],
                      ['Backlogs', selected.backlogs],
                      ['Risk Score', selected.riskScore?.toFixed(2)],
                    ].map(([label, val]) => (
                      <div key={label} style={s.metricRow}>
                        <span style={s.metricLabel}>{label}</span>
                        <span style={s.metricVal}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Add Comment</div>
                  {msg && <div style={s.toast}>✅ {msg}</div>}
                  <textarea
                    style={{ ...s.textArea, width: '100%', padding: 8, border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}
                    placeholder="Write feedback or notes..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                  />
                  <button style={s.btn} onClick={addComment}>Add Comment</button>

                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Previous Comments</div>
                    {comments.length === 0 && <div style={{ color: '#94a3b8', fontSize: 13 }}>No comments yet.</div>}
                    {comments.map(c => (
                      <div key={c.id} style={s.comment}>
                        <div style={s.commentMeta}>{c.mentorName} · {new Date(c.createdAt).toLocaleDateString()}</div>
                        <div style={s.commentText}>{c.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ ...s.detailCard, padding: 40, textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>👈</div>
                <div>Select a student to view details</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
