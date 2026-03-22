import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RiskBadge from '../components/RiskBadge';
import api from '../api/axios';

const c = {
  page:       { minHeight: '100vh', background: '#f0f2f5' },
  wrap:       { maxWidth: 1200, margin: '0 auto', padding: 24 },
  h1:         { fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 2 },
  sub:        { color: '#64748b', fontSize: 14, marginBottom: 24 },
  tabs:       { display: 'flex', gap: 4, background: '#e2e8f0', borderRadius: 8, padding: 4, width: 'fit-content', marginBottom: 24 },
  tab:        { padding: '8px 22px', borderRadius: 6, fontSize: 14, fontWeight: 500, background: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer' },
  tabOn:      { padding: '8px 22px', borderRadius: 6, fontSize: 14, fontWeight: 700, background: '#fff', color: '#1e3a8a', border: 'none', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  stats:      { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 },
  statCard:   { background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  statN:      { fontSize: 30, fontWeight: 700, marginBottom: 2 },
  statL:      { fontSize: 13, color: '#64748b' },
  box:        { background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 },
  boxHead:    { padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  boxTitle:   { fontWeight: 600, fontSize: 15 },
  boxBody:    { padding: 20 },
  btn:        { padding: '9px 20px', background: '#2563eb', color: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' },
  btnGreen:   { padding: '9px 20px', background: '#16a34a', color: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' },
  btnRed:     { padding: '6px 12px', background: '#fee2e2', color: '#dc2626', borderRadius: 6, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' },
  btnGray:    { padding: '9px 20px', background: '#f1f5f9', color: '#374151', borderRadius: 6, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer' },
  label:      { display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 5 },
  select:     { width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 13 },
  toast:      { background: '#dcfce7', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: 6, marginBottom: 14, fontSize: 13 },
  err:        { background: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626', padding: '10px 16px', borderRadius: 6, marginBottom: 14, fontSize: 13 },
  info:       { background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '10px 16px', borderRadius: 6, marginBottom: 14, fontSize: 13 },
  warn:       { background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e', padding: '10px 16px', borderRadius: 6, marginBottom: 14, fontSize: 13 },
  mGrid:      { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 14 },
  mCard:      { border: '1px solid #e2e8f0', borderRadius: 10, padding: 18, background: '#fafafa' },
  mName:      { fontWeight: 700, fontSize: 15, marginBottom: 2, color: '#1e293b' },
  mUser:      { fontSize: 12, color: '#64748b', fontFamily: 'monospace', marginBottom: 2 },
  mDept:      { fontSize: 12, color: '#2563eb', marginBottom: 10 },
  mBadge:     { background: '#dbeafe', color: '#1d4ed8', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 },
  overlay:    { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 },
  modal:      { background: '#fff', borderRadius: 12, padding: 28, width: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' },
  modalTitle: { fontWeight: 700, fontSize: 17, marginBottom: 16, color: '#1e293b' },
  modalFoot:  { display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 },
  field:      { marginBottom: 14 },
  row2:       { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  uploadBox:  { border: '2px dashed #cbd5e1', borderRadius: 8, padding: 28, textAlign: 'center', cursor: 'pointer', background: '#f8fafc', marginBottom: 14 },
  codeBox:    { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 14, marginTop: 16, fontSize: 12 },
  empty:      { textAlign: 'center', color: '#94a3b8', padding: '36px 0', fontSize: 14 },
};

const EMPTY_MENTOR = { username: '', password: '', name: '', department: '' };

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [tab,        setTab]        = useState('students');
  const [students,   setStudents]   = useState([]);
  const [mentors,    setMentors]    = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [msg,        setMsg]        = useState('');
  const [errMsg,     setErrMsg]     = useState('');

  const [csvFile,      setCsvFile]      = useState(null);
  const [csvMentorId,  setCsvMentorId]  = useState('');

  const [addOpen,    setAddOpen]    = useState(false);
  const [newMentor,  setNewMentor]  = useState(EMPTY_MENTOR);
  const [addErr,     setAddErr]     = useState('');
  const [addBusy,    setAddBusy]    = useState(false);

  const [delMentor,  setDelMentor]  = useState(null);
  const [delStudent, setDelStudent] = useState(null);

  const flash = (ok, text) => {
    if (ok) { setMsg(text); setErrMsg(''); setTimeout(() => setMsg(''), 4500); }
    else     { setErrMsg(text); setMsg(''); setTimeout(() => setErrMsg(''), 6000); }
  };

  const load = async () => {
    try {
      const [sRes, mRes] = await Promise.all([
        api.get('/students'),
        api.get('/users/mentors'),
      ]);
      setStudents(Array.isArray(sRes.data) ? sRes.data : []);
      setMentors(Array.isArray(mRes.data)  ? mRes.data  : []);
    } catch { flash(false, 'Could not load data from server'); }
  };

  useEffect(() => { load(); }, []); // eslint-disable-line

  const mentorLabel = (id) => {
    if (!id) return '—';
    const m = mentors.find(x => String(x.id) === String(id));
    return m ? (m.name || m.username) : '—';
  };

  const studentCount = (mid) =>
    students.filter(s => String(s.mentorId) === String(mid)).length;

  /* ── assign mentor ─────────────────────────────────────────── */
  const assignMentor = async (studentId, mentorId) => {
    try {
      await api.put(`/students/${studentId}/assign-mentor/${mentorId}`);
      flash(true, 'Mentor assigned');
      load();
    } catch { flash(false, 'Failed to assign mentor'); }
  };

  /* ── upload CSV ─────────────────────────────────────────────── */
  const uploadCSV = async () => {
    if (!csvFile)     { flash(false, 'Select a CSV file first');      return; }
    if (!csvMentorId) { flash(false, 'Select a mentor to assign to'); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append('file', csvFile);
    fd.append('mentorId', csvMentorId);
    try {
      const res  = await api.post('/students/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { created = 0, updated = 0, untouched = 0, total = 0 } = res.data;
      const parts = [];
      if (created   > 0) parts.push(`${created} added`);
      if (updated   > 0) parts.push(`${updated} updated`);
      if (untouched > 0) parts.push(`${untouched} untouched`);
      flash(true, `Upload complete — ${parts.join(' · ')} · ${total} total in system`);
      setCsvFile(null);
      load();
    } catch { flash(false, 'Upload failed — check CSV format'); }
    finally  { setLoading(false); }
  };

  /* ── delete student ─────────────────────────────────────────── */
  const confirmDeleteStudent = async () => {
    if (!delStudent) return;
    try {
      await api.delete(`/students/${delStudent.id}`);
      flash(true, `Student "${delStudent.name}" removed`);
      setDelStudent(null);
      load();
    } catch (e) {
      flash(false, e.response?.data?.message || 'Could not delete student');
      setDelStudent(null);
    }
  };

  /* ── add mentor ─────────────────────────────────────────────── */
  const openAddMentor = () => { setNewMentor(EMPTY_MENTOR); setAddErr(''); setAddOpen(true); };

  const submitAddMentor = async () => {
    if (!newMentor.name.trim())     { setAddErr('Full name is required');  return; }
    if (!newMentor.username.trim()) { setAddErr('Username is required');   return; }
    if (!newMentor.password.trim()) { setAddErr('Password is required');   return; }
    setAddBusy(true); setAddErr('');
    try {
      const res = await api.post('/users/mentors', newMentor);
      if (res.data.success === false) { setAddErr(res.data.message || 'Failed'); return; }
      flash(true, `Mentor "${newMentor.name}" added (ID: ${res.data.id})`);
      setAddOpen(false);
      load();
    } catch (e) {
      setAddErr(e.response?.data?.message || e.message || 'Failed to add mentor');
    } finally { setAddBusy(false); }
  };

  /* ── delete mentor ──────────────────────────────────────────── */
  const confirmDeleteMentor = async () => {
    if (!delMentor) return;
    try {
      await api.delete(`/users/mentors/${delMentor.id}`);
      flash(true, `Mentor "${delMentor.name || delMentor.username}" removed`);
      setDelMentor(null);
      load();
    } catch (e) {
      flash(false, e.response?.data?.message || 'Could not delete mentor');
      setDelMentor(null);
    }
  };

  const total = students.length;
  const high  = students.filter(s => s.riskLevel === 'HIGH').length;
  const low   = students.filter(s => s.riskLevel === 'LOW').length;

  return (
    <div style={c.page}>
      <Navbar user={user} />

      <div style={c.wrap}>
        <h1 style={c.h1}>Admin Dashboard</h1>
        <p style={c.sub}>Manage students, mentors and assignments</p>

        <div style={c.tabs}>
          {[['students','👥 Students'], ['mentors','👨‍🏫 Mentors'], ['upload','📤 Upload CSV']].map(([key, lbl]) => (
            <button key={key} style={tab === key ? c.tabOn : c.tab} onClick={() => setTab(key)}>{lbl}</button>
          ))}
        </div>

        {msg    && <div style={c.toast}>✅ {msg}</div>}
        {errMsg && <div style={c.err}>❌ {errMsg}</div>}

        {/* ══ STUDENTS ══════════════════════════════════════════════ */}
        {tab === 'students' && (
          <>
            <div style={c.stats}>
              <div style={c.statCard}><div style={{ ...c.statN, color: '#2563eb' }}>{total}</div><div style={c.statL}>Total Students</div></div>
              <div style={c.statCard}><div style={{ ...c.statN, color: '#dc2626' }}>{high}</div><div style={c.statL}>High Risk</div></div>
              <div style={c.statCard}><div style={{ ...c.statN, color: '#16a34a' }}>{low}</div><div style={c.statL}>Low Risk</div></div>
            </div>

            <div style={c.box}>
              <div style={c.boxHead}>
                <span style={c.boxTitle}>All Students ({total})</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th><th>Roll No</th><th>Attendance</th>
                      <th>CGPA</th><th>Backlogs</th><th>Risk Score</th>
                      <th>Level</th><th>Mentor</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {total === 0 && (
                      <tr><td colSpan={9} style={c.empty}>No students yet — upload a CSV to get started.</td></tr>
                    )}
                    {students.map(st => (
                      <tr key={st.id}>
                        <td style={{ fontWeight: 500 }}>{st.name}</td>
                        <td style={{ color: '#64748b', fontFamily: 'monospace' }}>{st.rollNumber}</td>
                        <td>{st.attendance}%</td>
                        <td>{st.currCgpa}</td>
                        <td>{st.backlogs}</td>
                        <td style={{ fontWeight: 700 }}>{(st.riskScore || 0).toFixed(1)}</td>
                        <td><RiskBadge level={st.riskLevel} /></td>
                        <td>
                          <select
                            style={{ padding: '5px 8px', borderRadius: 5, border: '1px solid #e2e8f0', fontSize: 13, minWidth: 120 }}
                            value={st.mentorId || ''}
                            onChange={e => assignMentor(st.id, e.target.value)}
                          >
                            <option value="">Unassigned</option>
                            {mentors.map(m => (
                              <option key={m.id} value={m.id}>{m.name || m.username}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button style={c.btnRed} onClick={() => setDelStudent(st)}>
                            🗑 Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ══ MENTORS ═══════════════════════════════════════════════ */}
        {tab === 'mentors' && (
          <div style={c.box}>
            <div style={c.boxHead}>
              <span style={c.boxTitle}>Mentors ({mentors.length})</span>
              <button style={c.btn} onClick={openAddMentor}>+ Add Mentor</button>
            </div>
            <div style={c.boxBody}>
              {mentors.length === 0 && (
                <div style={c.empty}>No mentors yet. Click "Add Mentor" to create one.</div>
              )}
              <div style={c.mGrid}>
                {mentors.map(m => {
                  const sc = studentCount(m.id);
                  return (
                    <div key={m.id} style={c.mCard}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={c.mName}>{m.name || m.username}</div>
                          <div style={c.mUser}>@{m.username}</div>
                          {m.department && <div style={c.mDept}>🏛 {m.department}</div>}
                        </div>
                        <span style={{ ...c.mBadge, marginLeft: 8 }}>ID: {m.id}</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#374151', marginBottom: 12 }}>
                        <strong style={{ color: '#2563eb' }}>{sc}</strong> student{sc !== 1 ? 's' : ''} assigned
                      </div>
                      <button style={c.btnRed} onClick={() => setDelMentor(m)}>🗑 Remove</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══ UPLOAD ════════════════════════════════════════════════ */}
        {tab === 'upload' && (
          <div style={c.box}>
            <div style={c.boxHead}>
              <span style={c.boxTitle}>Upload Student CSV</span>
            </div>
            <div style={c.boxBody}>

              {/* <div style={c.info}>
                ℹ️ <strong>New students</strong> (roll number not in system) — created and assigned to the selected mentor. Login auto-created (username = password = roll number).
              </div>

              <div style={c.warn}>
                🔒 <strong>Existing students</strong> (roll number already in system) — only academic marks are updated and risk score recalculated. Mentor, login and comments are <strong>never changed</strong>.
              </div>

              <div style={{ ...c.info, background: '#f0fdf4', border: '1px solid #86efac', color: '#166534' }}>
                ✅ <strong>Students NOT in this CSV</strong> — completely untouched. No data loss, ever.
              </div> */}

              <div
                style={c.uploadBox}
                onClick={() => document.getElementById('csvInput').click()}
              >
                {csvFile
                  ? <span>📄 {csvFile.name}</span>
                  : <span style={{ color: '#94a3b8' }}>📂 Click to select CSV file</span>
                }
                <input id="csvInput" type="file" accept=".csv" hidden
                  onChange={e => setCsvFile(e.target.files[0])} />
              </div>

              <div style={c.field}>
                <label style={c.label}>Assign all students to mentor</label>
                <select style={c.select} value={csvMentorId} onChange={e => setCsvMentorId(e.target.value)}>
                  <option value="">-- Select Mentor --</option>
                  {mentors.map(m => (
                    <option key={m.id} value={m.id}>{m.name || m.username}{m.department ? ` (${m.department})` : ''}</option>
                  ))}
                </select>
              </div>

              <button style={c.btn} onClick={uploadCSV} disabled={loading}>
                {loading ? 'Uploading…' : '⬆ Upload'}
              </button>

              <div style={c.codeBox}>
                <div style={{ fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', fontSize: 11 }}>
                  CSV column order (row 1 = header, ignored)
                </div>
                <code style={{ color: '#374151', display: 'block', marginBottom: 6 }}>
                  name, rollNumber, attendance, prevCgpa, currCgpa, recentTest, internalMark, project, projectScore, backlogs
                </code>
                <div style={{ color: '#94a3b8' }}>
                  e.g. <code>Arjun Kumar,21CS001,85.5,7.8,8.1,72,75,90,82,0</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ══ ADD MENTOR MODAL ══════════════════════════════════════════ */}
      {addOpen && (
        <div style={c.overlay} onClick={() => setAddOpen(false)}>
          <div style={c.modal} onClick={e => e.stopPropagation()}>
            <div style={c.modalTitle}>Add New Mentor</div>
            {addErr && <div style={{ ...c.err, marginBottom: 14 }}>❌ {addErr}</div>}
            <div style={c.field}>
              <label style={c.label}>Full Name *</label>
              <input type="text" placeholder="e.g. Dr. Ramesh Kumar" autoFocus
                value={newMentor.name}
                onChange={e => setNewMentor({ ...newMentor, name: e.target.value })} />
            </div>
            <div style={c.field}>
              <label style={c.label}>Department (optional)</label>
              <input type="text" placeholder="e.g. Computer Science"
                value={newMentor.department}
                onChange={e => setNewMentor({ ...newMentor, department: e.target.value })} />
            </div>
            <div style={c.row2}>
              <div style={c.field}>
                <label style={c.label}>Username *</label>
                <input type="text" placeholder="e.g. mentor3"
                  value={newMentor.username}
                  onChange={e => setNewMentor({ ...newMentor, username: e.target.value })} />
              </div>
              <div style={c.field}>
                <label style={c.label}>Password *</label>
                <input type="password" placeholder="Set password"
                  value={newMentor.password}
                  onChange={e => setNewMentor({ ...newMentor, password: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && submitAddMentor()} />
              </div>
            </div>
            <div style={c.modalFoot}>
              <button style={c.btnGray} onClick={() => setAddOpen(false)}>Cancel</button>
              <button style={c.btnGreen} onClick={submitAddMentor} disabled={addBusy}>
                {addBusy ? 'Adding…' : '✓ Add Mentor'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ DELETE STUDENT MODAL ══════════════════════════════════════ */}
      {delStudent && (
        <div style={c.overlay} onClick={() => setDelStudent(null)}>
          <div style={c.modal} onClick={e => e.stopPropagation()}>
            <div style={c.modalTitle}>Remove Student?</div>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
              You are about to permanently remove <strong>{delStudent.name}</strong> ({delStudent.rollNumber}).
            </p>
            <div style={c.warn}>
              ⚠️ This will also delete their <strong>login account</strong> and all <strong>mentor comments</strong> for this student.
              This cannot be undone.
            </div>
            <div style={c.modalFoot}>
              <button style={c.btnGray} onClick={() => setDelStudent(null)}>Cancel</button>
              <button style={{ ...c.btn, background: '#dc2626' }} onClick={confirmDeleteStudent}>
                🗑 Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ DELETE MENTOR MODAL ═══════════════════════════════════════ */}
      {delMentor && (
        <div style={c.overlay} onClick={() => setDelMentor(null)}>
          <div style={c.modal} onClick={e => e.stopPropagation()}>
            <div style={c.modalTitle}>Remove Mentor?</div>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
              You are about to remove <strong>{delMentor.name || delMentor.username}</strong>
              {delMentor.department ? ` (${delMentor.department})` : ''}.
            </p>
            {studentCount(delMentor.id) > 0 && (
              <div style={c.err}>
                ❌ <strong>{studentCount(delMentor.id)}</strong> student(s) are still assigned to this mentor.
                Please reassign them first from the Students tab.
              </div>
            )}
            <div style={c.modalFoot}>
              <button style={c.btnGray} onClick={() => setDelMentor(null)}>Cancel</button>
              <button style={{ ...c.btn, background: '#dc2626' }} onClick={confirmDeleteMentor}>
                🗑 Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
