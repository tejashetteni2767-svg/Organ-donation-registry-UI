import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const mockDonors = [
  { id: 'D-A4F2B1', name: 'Ravi Kumar', age: 34, blood: 'O+', organs: ['Heart', 'Kidneys'], status: 'Active', hospital: 'Apollo Hospitals', location: 'Hyderabad' },
  { id: 'D-C7E3D2', name: 'Priya Menon', age: 28, blood: 'A+', organs: ['Liver', 'Corneas'], status: 'Pending', hospital: 'AIIMS Delhi', location: 'Delhi' },
  { id: 'D-B9F1A3', name: 'Suresh Nair', age: 45, blood: 'B+', organs: ['Lungs', 'Pancreas'], status: 'Active', hospital: 'Fortis Mumbai', location: 'Mumbai' },
  { id: 'D-E2A5C4', name: 'Aisha Patel', age: 31, blood: 'AB+', organs: ['Kidneys', 'Skin'], status: 'Matched', hospital: 'Manipal Hospital', location: 'Bangalore' },
  { id: 'D-F6D8B5', name: 'Vikram Singh', age: 39, blood: 'O−', organs: ['Heart', 'Liver'], status: 'Active', hospital: 'Max Healthcare', location: 'Delhi' },
];

const mockMatches = [
  { id: 'M-001', donor: 'Ravi Kumar', recipient: 'Ananya Joshi', organ: 'Kidney', compatibility: 96, status: 'Approved', urgency: 'High' },
  { id: 'M-002', donor: 'Priya Menon', recipient: 'Mohan Reddy', organ: 'Cornea', compatibility: 88, status: 'Pending Review', urgency: 'Medium' },
  { id: 'M-003', donor: 'Vikram Singh', recipient: 'Fatima Khan', organ: 'Liver', compatibility: 92, status: 'Scheduled', urgency: 'Critical' },
  { id: 'M-004', donor: 'Aisha Patel', recipient: 'Rajesh Iyer', organ: 'Skin', compatibility: 79, status: 'Under Review', urgency: 'Low' },
];

const mockTransplants = [
  { id: 'T-2401', organ: 'Kidney', donor: 'Ravi Kumar', recipient: 'Ananya Joshi', hospital: 'Apollo Hyderabad', date: '2024-03-12', surgeon: 'Dr. Meera Bose', status: 'Completed' },
  { id: 'T-2402', organ: 'Heart', donor: 'Vikram Singh', recipient: 'Fatima Khan', hospital: 'Max Delhi', date: '2024-03-18', surgeon: 'Dr. Arjun Rao', status: 'Scheduled' },
  { id: 'T-2403', organ: 'Liver', donor: 'Suresh Nair', recipient: 'Deepak Jain', hospital: 'Fortis Mumbai', date: '2024-03-08', surgeon: 'Dr. Sunita Verma', status: 'Completed' },
];

const TAB_ICONS = { dashboard: '⬡', donors: '♥', matching: '⇌', transplants: '✦', documents: '⊡' };

export default function HomePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadModal, setUploadModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div style={styles.app}>
      <Navbar />

      {notification && (
        <div style={styles.notification}>{notification}</div>
      )}

      <div style={styles.layout}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarLabel}>Navigation</div>
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'donors', label: 'Donor Registry' },
              { key: 'matching', label: 'Donor Matching' },
              { key: 'transplants', label: 'Transplants' },
              { key: 'documents', label: 'Documents' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{ ...styles.sidebarBtn, ...(activeTab === key ? styles.sidebarBtnActive : {}) }}>
                <span style={styles.sidebarIcon}>{TAB_ICONS[key]}</span>
                {label}
                {activeTab === key && <div style={styles.sidebarIndicator} />}
              </button>
            ))}
          </div>

          <div style={styles.sidebarSection}>
            <div style={styles.sidebarLabel}>My Profile</div>
            <div style={styles.profileCard}>
              <div style={styles.profileAvatar}>{user?.name?.[0]?.toUpperCase()}</div>
              <div style={styles.profileName}>{user?.name}</div>
              <div style={styles.profileId}>{user?.id}</div>
              <div style={styles.profileBadge}>Active Donor</div>
            </div>
          </div>

          <div style={styles.alertCard}>
            <div style={styles.alertDot} />
            <div>
              <div style={styles.alertTitle}>1 Match Pending</div>
              <div style={styles.alertSub}>Review required</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          {activeTab === 'dashboard' && <DashboardTab notify={notify} setUploadModal={setUploadModal} />}
          {activeTab === 'donors' && <DonorsTab donors={mockDonors} notify={notify} />}
          {activeTab === 'matching' && <MatchingTab matches={mockMatches} notify={notify} />}
          {activeTab === 'transplants' && <TransplantsTab transplants={mockTransplants} />}
          {activeTab === 'documents' && <DocumentsTab notify={notify} />}
        </main>
      </div>

      {uploadModal && <UploadModal onClose={() => setUploadModal(false)} onUpload={() => { setUploadModal(false); notify('✓ Consent form uploaded successfully'); }} />}
    </div>
  );
}

/* ── Dashboard Tab ─────────────────────────────────── */
function DashboardTab({ notify, setUploadModal }) {
  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Dashboard Overview</h1>
          <p style={styles.pageSubtitle}>Real-time insights across the LifeLink network</p>
        </div>
        <button onClick={() => setUploadModal(true)} style={styles.primaryBtn}>
          + Upload Consent Form
        </button>
      </div>

      <div style={styles.statsGrid}>
        {[
          { label: 'Registered Donors', value: '12,482', delta: '+124 this month', color: '#0A3D3A', bg: 'rgba(10,61,58,0.05)' },
          { label: 'Active Matches', value: '348', delta: '+18 pending review', color: '#1A6B65', bg: 'rgba(26,107,101,0.05)' },
          { label: 'Completed Transplants', value: '3,291', delta: '98.2% success rate', color: '#C8963E', bg: 'rgba(200,150,62,0.05)' },
          { label: 'Avg. Wait Time', value: '14 days', delta: '↓ 3 days vs last quarter', color: '#2AA89A', bg: 'rgba(42,168,154,0.05)' },
        ].map(({ label, value, delta, color, bg }) => (
          <div key={label} style={{ ...styles.statCard, background: bg, borderColor: `${color}22` }}>
            <div style={styles.statLabel}>{label}</div>
            <div style={{ ...styles.statValue, color }}>{value}</div>
            <div style={styles.statDelta}>{delta}</div>
          </div>
        ))}
      </div>

      <div style={styles.dashGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Recent Activity</h3>
            <span style={styles.cardBadge}>Live</span>
          </div>
          {[
            { time: '2 min ago', event: 'New donor registered', detail: 'Rahul Sharma · O+', icon: '♥', color: '#0A3D3A' },
            { time: '14 min ago', event: 'Match approved', detail: 'M-003 · Liver · Critical', icon: '✓', color: '#1A6B65' },
            { time: '1 hr ago', event: 'Transplant scheduled', detail: 'T-2402 · Max Delhi', icon: '⊡', color: '#C8963E' },
            { time: '3 hr ago', event: 'Consent form uploaded', detail: 'Aisha Patel · Kidneys', icon: '↑', color: '#2AA89A' },
            { time: '5 hr ago', event: 'Status updated', detail: 'D-A4F2B1 · Active', icon: '◎', color: '#718096' },
          ].map((item, i) => (
            <div key={i} style={styles.activityRow}>
              <div style={{ ...styles.activityIcon, background: `${item.color}15`, color: item.color }}>{item.icon}</div>
              <div style={styles.activityInfo}>
                <div style={styles.activityEvent}>{item.event}</div>
                <div style={styles.activityDetail}>{item.detail}</div>
              </div>
              <div style={styles.activityTime}>{item.time}</div>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Organ Distribution</h3>
          </div>
          {[
            { organ: 'Kidneys', count: 4820, max: 5000, color: '#0A3D3A' },
            { organ: 'Liver', count: 3210, max: 5000, color: '#1A6B65' },
            { organ: 'Heart', count: 1840, max: 5000, color: '#C8963E' },
            { organ: 'Lungs', count: 1120, max: 5000, color: '#2AA89A' },
            { organ: 'Corneas', count: 2960, max: 5000, color: '#718096' },
            { organ: 'Pancreas', count: 680, max: 5000, color: '#9CA3AF' },
          ].map(({ organ, count, max, color }) => (
            <div key={organ} style={styles.barRow}>
              <div style={styles.barLabel}>{organ}</div>
              <div style={styles.barTrack}>
                <div style={{ ...styles.barFill, width: `${(count / max) * 100}%`, background: color }} />
              </div>
              <div style={styles.barCount}>{count.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Donors Tab ─────────────────────────────────────── */
function DonorsTab({ donors, notify }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = donors.filter(d =>
    (filter === 'All' || d.status === filter) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.blood.includes(search))
  );

  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Donor Registry</h1>
          <p style={styles.pageSubtitle}>{donors.length} registered donors across India</p>
        </div>
        <button onClick={() => notify('✓ New donor form opened')} style={styles.primaryBtn}>+ Add Donor</button>
      </div>

      <div style={styles.filterRow}>
        <input
          placeholder="Search by name or blood type..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <div style={styles.filterBtns}>
          {['All', 'Active', 'Pending', 'Matched'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              {['Donor ID', 'Name', 'Age', 'Blood Type', 'Organs', 'Hospital', 'Status', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={d.id} style={{ ...styles.tr, background: i % 2 === 0 ? '#fff' : 'rgba(10,61,58,0.015)' }}>
                <td style={styles.td}><span style={styles.mono}>{d.id}</span></td>
                <td style={styles.td}><span style={styles.tdName}>{d.name}</span></td>
                <td style={styles.td}>{d.age}</td>
                <td style={styles.td}><span style={styles.bloodBadge}>{d.blood}</span></td>
                <td style={styles.td}>
                  <div style={styles.organTags}>
                    {d.organs.map(o => <span key={o} style={styles.organTag}>{o}</span>)}
                  </div>
                </td>
                <td style={styles.td}><span style={styles.tdGray}>{d.hospital}</span></td>
                <td style={styles.td}><StatusBadge status={d.status} /></td>
                <td style={styles.td}>
                  <button onClick={() => notify(`✓ Viewing profile for ${d.name}`)} style={styles.actionBtn}>View</button>
                  <button onClick={() => notify(`✓ Editing ${d.name}`)} style={styles.actionBtnSecondary}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Matching Tab ───────────────────────────────────── */
function MatchingTab({ matches, notify }) {
  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Donor–Recipient Matching</h1>
          <p style={styles.pageSubtitle}>AI-assisted compatibility matching engine</p>
        </div>
        <button onClick={() => notify('Running compatibility analysis...')} style={styles.primaryBtn}>Run Match Analysis</button>
      </div>

      <div style={styles.matchesGrid}>
        {matches.map(m => (
          <div key={m.id} style={styles.matchCard}>
            <div style={styles.matchHeader}>
              <span style={styles.matchId}>{m.id}</span>
              <StatusBadge status={m.status} />
            </div>
            <div style={styles.matchOrgan}>{m.organ}</div>
            <div style={styles.matchParties}>
              <div style={styles.matchParty}>
                <div style={styles.partyLabel}>Donor</div>
                <div style={styles.partyName}>{m.donor}</div>
              </div>
              <div style={styles.matchArrow}>⇌</div>
              <div style={styles.matchParty}>
                <div style={styles.partyLabel}>Recipient</div>
                <div style={styles.partyName}>{m.recipient}</div>
              </div>
            </div>
            <div style={styles.compatRow}>
              <div style={styles.compatLabel}>Compatibility Score</div>
              <div style={styles.compatScore}>{m.compatibility}%</div>
            </div>
            <div style={styles.compatBar}>
              <div style={{ ...styles.compatFill, width: `${m.compatibility}%`, background: m.compatibility >= 90 ? '#1A6B65' : m.compatibility >= 80 ? '#C8963E' : '#718096' }} />
            </div>
            <div style={styles.urgencyRow}>
              <span style={{ ...styles.urgencyBadge, ...urgencyStyle(m.urgency) }}>⚡ {m.urgency} Urgency</span>
            </div>
            <div style={styles.matchActions}>
              <button onClick={() => notify(`✓ Match ${m.id} approved`)} style={styles.approveBtn}>Approve</button>
              <button onClick={() => notify(`Reviewing match ${m.id}...`)} style={styles.reviewBtn}>Review</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Transplants Tab ────────────────────────────────── */
function TransplantsTab({ transplants }) {
  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Transplant Workflows</h1>
          <p style={styles.pageSubtitle}>Track and coordinate all transplant procedures</p>
        </div>
      </div>

      <div style={styles.transplantList}>
        {transplants.map(t => (
          <div key={t.id} style={styles.transplantCard}>
            <div style={styles.transplantLeft}>
              <div style={styles.transplantOrganBadge}>{t.organ}</div>
              <div style={styles.transplantId}>{t.id}</div>
            </div>
            <div style={styles.transplantCenter}>
              <div style={styles.transplantRoute}>{t.donor} → {t.recipient}</div>
              <div style={styles.transplantMeta}>{t.hospital} · {t.surgeon}</div>
            </div>
            <div style={styles.transplantRight}>
              <StatusBadge status={t.status} />
              <div style={styles.transplantDate}>{t.date}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}><h3 style={styles.cardTitle}>Workflow Stages</h3></div>
        <div style={styles.timeline}>
          {[
            { stage: 'Donor Registration', desc: 'Organ donor enrolls and provides consent', complete: true },
            { stage: 'Medical Evaluation', desc: 'Health screening and organ viability assessment', complete: true },
            { stage: 'Recipient Matching', desc: 'AI compatibility analysis and match proposal', complete: true },
            { stage: 'Approval Process', desc: 'Medical board review and ethics clearance', complete: false },
            { stage: 'Surgery Coordination', desc: 'Operating theatre booking and team assembly', complete: false },
            { stage: 'Post-Operative Care', desc: 'Recovery monitoring and follow-up protocols', complete: false },
          ].map((item, i) => (
            <div key={i} style={styles.timelineRow}>
              <div style={{ ...styles.timelineDot, background: item.complete ? '#1A6B65' : 'rgba(10,61,58,0.1)', border: item.complete ? 'none' : '2px solid rgba(10,61,58,0.2)' }}>
                {item.complete ? '✓' : ''}
              </div>
              <div style={styles.timelineContent}>
                <div style={{ ...styles.timelineStage, color: item.complete ? '#0A3D3A' : '#718096' }}>{item.stage}</div>
                <div style={styles.timelineDesc}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Documents Tab ──────────────────────────────────── */
function DocumentsTab({ notify }) {
  const docs = [
    { name: 'Consent Form — Ravi Kumar', type: 'PDF', size: '142 KB', date: '2024-03-01', status: 'Verified' },
    { name: 'Medical History — Priya Menon', type: 'PDF', size: '384 KB', date: '2024-02-28', status: 'Verified' },
    { name: 'Transplant Authorization — T-2401', type: 'PDF', size: '218 KB', date: '2024-03-10', status: 'Pending' },
    { name: 'Blood Test Report — Suresh Nair', type: 'PDF', size: '96 KB', date: '2024-03-05', status: 'Verified' },
    { name: 'Ethics Board Clearance — T-2402', type: 'PDF', size: '176 KB', date: '2024-03-12', status: 'Under Review' },
  ];

  return (
    <div style={styles.tabContent}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Document Management</h1>
          <p style={styles.pageSubtitle}>Consent forms, medical records, and authorizations</p>
        </div>
        <button onClick={() => notify('✓ Upload dialog opened')} style={styles.primaryBtn}>+ Upload Document</button>
      </div>

      <div style={styles.uploadZone} onClick={() => notify('✓ File picker opened')}>
        <div style={styles.uploadIcon}>↑</div>
        <div style={styles.uploadText}>Drop files here or click to upload</div>
        <div style={styles.uploadSub}>Supports PDF, DOCX, PNG · Max 10MB per file</div>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              {['Document Name', 'Type', 'Size', 'Upload Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((d, i) => (
              <tr key={i} style={{ ...styles.tr, background: i % 2 === 0 ? '#fff' : 'rgba(10,61,58,0.015)' }}>
                <td style={styles.td}><span style={styles.tdName}>⊡ {d.name}</span></td>
                <td style={styles.td}><span style={styles.mono}>{d.type}</span></td>
                <td style={styles.td}>{d.size}</td>
                <td style={styles.td}>{d.date}</td>
                <td style={styles.td}><StatusBadge status={d.status} /></td>
                <td style={styles.td}>
                  <button onClick={() => notify(`Downloading ${d.name}...`)} style={styles.actionBtn}>Download</button>
                  <button onClick={() => notify(`Viewing ${d.name}...`)} style={styles.actionBtnSecondary}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Upload Modal ───────────────────────────────────── */
function UploadModal({ onClose, onUpload }) {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Upload Consent Form</h3>
          <button onClick={onClose} style={styles.modalClose}>✕</button>
        </div>
        <div style={styles.modalUploadZone}>
          <div style={styles.modalUploadIcon}>⊡</div>
          <div style={styles.modalUploadText}>Select or drag consent form</div>
          <div style={styles.modalUploadSub}>PDF format preferred · Max 10MB</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
          <input style={{ ...styles.input, border: '1.5px solid rgba(10,61,58,0.15)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px' }} placeholder="Donor name" />
          <input style={{ ...styles.input, border: '1.5px solid rgba(10,61,58,0.15)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px' }} placeholder="Donor ID (e.g. D-A4F2B1)" />
        </div>
        <button onClick={onUpload} style={{ ...styles.primaryBtn, width: '100%', marginTop: '16px', textAlign: 'center' }}>Upload Document</button>
      </div>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────── */
function StatusBadge({ status }) {
  const colors = {
    Active: { bg: 'rgba(26,107,101,0.1)', color: '#1A6B65' },
    Pending: { bg: 'rgba(200,150,62,0.12)', color: '#A67530' },
    Matched: { bg: 'rgba(10,61,58,0.08)', color: '#0A3D3A' },
    Completed: { bg: 'rgba(26,107,101,0.1)', color: '#1A6B65' },
    Scheduled: { bg: 'rgba(42,168,154,0.1)', color: '#1A8A7E' },
    Approved: { bg: 'rgba(26,107,101,0.1)', color: '#1A6B65' },
    'Pending Review': { bg: 'rgba(200,150,62,0.12)', color: '#A67530' },
    'Under Review': { bg: 'rgba(113,128,150,0.1)', color: '#4A5568' },
    Verified: { bg: 'rgba(26,107,101,0.1)', color: '#1A6B65' },
  };
  const c = colors[status] || { bg: 'rgba(10,61,58,0.06)', color: '#718096' };
  return (
    <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 500, background: c.bg, color: c.color, whiteSpace: 'nowrap' }}>
      {status}
    </span>
  );
}

function urgencyStyle(u) {
  const map = {
    Critical: { background: 'rgba(220,38,38,0.08)', color: '#DC2626' },
    High: { background: 'rgba(200,150,62,0.1)', color: '#A67530' },
    Medium: { background: 'rgba(42,168,154,0.1)', color: '#1A8A7E' },
    Low: { background: 'rgba(113,128,150,0.1)', color: '#718096' },
  };
  return map[u] || {};
}

const styles = {
  app: { minHeight: '100vh', background: '#F5F0E8', fontFamily: "'DM Sans', sans-serif" },
  notification: {
    position: 'fixed', top: '84px', right: '24px', zIndex: 999,
    padding: '12px 20px', borderRadius: '10px', background: '#0A3D3A', color: '#fff',
    fontSize: '14px', boxShadow: '0 8px 24px rgba(10,61,58,0.25)',
    animation: 'fadeIn 0.3s ease',
  },
  layout: { display: 'flex', minHeight: 'calc(100vh - 72px)' },
  sidebar: {
    width: '240px', background: '#fff', borderRight: '1px solid rgba(10,61,58,0.08)',
    padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px',
  },
  sidebarSection: { marginBottom: '8px' },
  sidebarLabel: { fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 8px', marginBottom: '6px', fontFamily: "'DM Mono', monospace" },
  sidebarBtn: {
    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
    padding: '10px 12px', borderRadius: '10px', border: 'none', background: 'transparent',
    color: '#4A5568', fontSize: '14px', fontWeight: 400, cursor: 'pointer',
    transition: 'all 0.18s', position: 'relative', fontFamily: "'DM Sans', sans-serif",
    textAlign: 'left',
  },
  sidebarBtnActive: { background: 'rgba(10,61,58,0.07)', color: '#0A3D3A', fontWeight: 500 },
  sidebarIcon: { fontSize: '14px', width: '16px', textAlign: 'center' },
  sidebarIndicator: {
    position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
    width: '3px', height: '20px', borderRadius: '2px', background: '#0A3D3A',
  },
  profileCard: {
    padding: '16px', borderRadius: '12px', background: 'rgba(10,61,58,0.04)',
    border: '1px solid rgba(10,61,58,0.08)', textAlign: 'center', marginTop: '8px',
  },
  profileAvatar: {
    width: '44px', height: '44px', borderRadius: '50%', margin: '0 auto 8px',
    background: 'linear-gradient(135deg, #0A3D3A, #2AA89A)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 600,
  },
  profileName: { fontSize: '14px', fontWeight: 500, color: '#1C1C1E', marginBottom: '2px' },
  profileId: { fontSize: '11px', color: '#718096', fontFamily: "'DM Mono', monospace", marginBottom: '8px' },
  profileBadge: { display: 'inline-block', padding: '3px 10px', borderRadius: '100px', background: 'rgba(26,107,101,0.1)', color: '#1A6B65', fontSize: '11px', fontWeight: 500 },
  alertCard: {
    display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
    borderRadius: '10px', background: 'rgba(200,150,62,0.07)', border: '1px solid rgba(200,150,62,0.2)', marginTop: 'auto',
  },
  alertDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#C8963E', flexShrink: 0 },
  alertTitle: { fontSize: '13px', fontWeight: 500, color: '#A67530' },
  alertSub: { fontSize: '11px', color: '#C8963E' },
  main: { flex: 1, overflow: 'auto', padding: '32px' },
  tabContent: { maxWidth: '960px' },
  pageHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' },
  pageTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 400, color: '#0A3D3A', marginBottom: '4px' },
  pageSubtitle: { fontSize: '14px', color: '#718096' },
  primaryBtn: {
    padding: '12px 22px', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, #0A3D3A 0%, #1A6B65 100%)',
    color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
  },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard: {
    padding: '20px', borderRadius: '14px', border: '1px solid',
    transition: 'transform 0.2s',
  },
  statLabel: { fontSize: '12px', color: '#718096', marginBottom: '8px', fontWeight: 500 },
  statValue: { fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, marginBottom: '4px' },
  statDelta: { fontSize: '12px', color: '#9CA3AF' },
  dashGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  card: {
    background: '#fff', borderRadius: '16px', padding: '24px',
    border: '1px solid rgba(10,61,58,0.08)', boxShadow: '0 2px 12px rgba(10,61,58,0.04)',
  },
  cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: '#0A3D3A' },
  cardBadge: { padding: '3px 10px', borderRadius: '100px', background: 'rgba(26,107,101,0.1)', color: '#1A6B65', fontSize: '11px', fontWeight: 500 },
  activityRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(10,61,58,0.05)' },
  activityIcon: { width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 },
  activityInfo: { flex: 1 },
  activityEvent: { fontSize: '13px', fontWeight: 500, color: '#1C1C1E' },
  activityDetail: { fontSize: '12px', color: '#718096' },
  activityTime: { fontSize: '11px', color: '#9CA3AF', whiteSpace: 'nowrap' },
  barRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  barLabel: { width: '72px', fontSize: '13px', color: '#4A5568', textAlign: 'right' },
  barTrack: { flex: 1, height: '8px', background: 'rgba(10,61,58,0.06)', borderRadius: '4px', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: '4px', transition: 'width 0.6s ease' },
  barCount: { width: '48px', fontSize: '12px', color: '#718096', fontFamily: "'DM Mono', monospace" },
  filterRow: { display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' },
  searchInput: {
    flex: 1, padding: '10px 16px', borderRadius: '10px', fontSize: '14px',
    border: '1.5px solid rgba(10,61,58,0.12)', background: '#fff', outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
  },
  filterBtns: { display: 'flex', gap: '6px' },
  filterBtn: {
    padding: '8px 16px', borderRadius: '8px', border: '1.5px solid rgba(10,61,58,0.12)',
    background: '#fff', color: '#4A5568', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
  },
  filterBtnActive: { background: '#0A3D3A', color: '#fff', borderColor: '#0A3D3A' },
  tableCard: {
    background: '#fff', borderRadius: '16px', overflow: 'hidden',
    border: '1px solid rgba(10,61,58,0.08)', boxShadow: '0 2px 12px rgba(10,61,58,0.04)',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHead: { background: 'rgba(10,61,58,0.03)' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#718096', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid rgba(10,61,58,0.08)' },
  tr: { transition: 'background 0.15s' },
  td: { padding: '14px 16px', fontSize: '13px', color: '#4A5568', borderBottom: '1px solid rgba(10,61,58,0.05)' },
  tdName: { fontWeight: 500, color: '#1C1C1E' },
  tdGray: { color: '#718096', fontSize: '12px' },
  mono: { fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#4A5568' },
  bloodBadge: {
    padding: '3px 8px', borderRadius: '6px', background: 'rgba(200,150,62,0.1)',
    color: '#A67530', fontSize: '12px', fontWeight: 600, fontFamily: "'DM Mono', monospace",
  },
  organTags: { display: 'flex', flexWrap: 'wrap', gap: '4px' },
  organTag: { padding: '2px 8px', borderRadius: '4px', background: 'rgba(10,61,58,0.06)', color: '#0A3D3A', fontSize: '11px' },
  actionBtn: {
    padding: '5px 12px', borderRadius: '6px', border: 'none',
    background: 'rgba(10,61,58,0.07)', color: '#0A3D3A', fontSize: '12px', cursor: 'pointer', marginRight: '4px',
    fontFamily: "'DM Sans', sans-serif",
  },
  actionBtnSecondary: {
    padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(10,61,58,0.15)',
    background: 'transparent', color: '#4A5568', fontSize: '12px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  },
  matchesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' },
  matchCard: {
    background: '#fff', borderRadius: '16px', padding: '22px',
    border: '1px solid rgba(10,61,58,0.08)', boxShadow: '0 2px 12px rgba(10,61,58,0.04)',
  },
  matchHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  matchId: { fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#718096' },
  matchOrgan: { fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, color: '#0A3D3A', marginBottom: '14px' },
  matchParties: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  matchParty: { flex: 1 },
  partyLabel: { fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' },
  partyName: { fontSize: '14px', fontWeight: 500, color: '#1C1C1E' },
  matchArrow: { fontSize: '20px', color: '#2AA89A' },
  compatRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' },
  compatLabel: { fontSize: '12px', color: '#718096' },
  compatScore: { fontSize: '14px', fontWeight: 600, color: '#1A6B65' },
  compatBar: { height: '6px', background: 'rgba(10,61,58,0.06)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' },
  compatFill: { height: '100%', borderRadius: '3px', transition: 'width 0.6s ease' },
  urgencyRow: { marginBottom: '14px' },
  urgencyBadge: { padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 500 },
  matchActions: { display: 'flex', gap: '8px' },
  approveBtn: {
    flex: 1, padding: '9px', borderRadius: '8px', border: 'none',
    background: 'linear-gradient(135deg, #0A3D3A, #1A6B65)', color: '#fff',
    fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
  },
  reviewBtn: {
    flex: 1, padding: '9px', borderRadius: '8px', border: '1.5px solid rgba(10,61,58,0.15)',
    background: 'transparent', color: '#0A3D3A', fontSize: '13px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  },
  transplantList: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' },
  transplantCard: {
    display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 24px',
    background: '#fff', borderRadius: '14px', border: '1px solid rgba(10,61,58,0.08)',
    boxShadow: '0 2px 8px rgba(10,61,58,0.04)',
  },
  transplantLeft: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '80px' },
  transplantOrganBadge: {
    padding: '6px 12px', borderRadius: '8px', background: 'rgba(10,61,58,0.06)',
    color: '#0A3D3A', fontSize: '13px', fontWeight: 600,
  },
  transplantId: { fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#9CA3AF' },
  transplantCenter: { flex: 1 },
  transplantRoute: { fontSize: '15px', fontWeight: 500, color: '#1C1C1E', marginBottom: '4px' },
  transplantMeta: { fontSize: '13px', color: '#718096' },
  transplantRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' },
  transplantDate: { fontSize: '12px', color: '#9CA3AF', fontFamily: "'DM Mono', monospace" },
  timeline: { display: 'flex', flexDirection: 'column', gap: '0' },
  timelineRow: { display: 'flex', gap: '16px', paddingBottom: '20px', position: 'relative' },
  timelineDot: {
    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '12px', color: '#fff', marginTop: '2px',
  },
  timelineContent: { flex: 1, paddingBottom: '12px', borderBottom: '1px solid rgba(10,61,58,0.06)' },
  timelineStage: { fontSize: '14px', fontWeight: 500, marginBottom: '3px' },
  timelineDesc: { fontSize: '13px', color: '#9CA3AF' },
  uploadZone: {
    border: '2px dashed rgba(10,61,58,0.18)', borderRadius: '14px', padding: '40px',
    textAlign: 'center', marginBottom: '24px', background: '#fff', cursor: 'pointer',
    transition: 'all 0.2s',
  },
  uploadIcon: { fontSize: '28px', color: '#2AA89A', marginBottom: '8px' },
  uploadText: { fontSize: '15px', fontWeight: 500, color: '#0A3D3A', marginBottom: '4px' },
  uploadSub: { fontSize: '13px', color: '#718096' },
  modalOverlay: {
    position: 'fixed', inset: 0, background: 'rgba(10,61,58,0.25)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
  },
  modal: {
    background: '#FDFBF7', borderRadius: '20px', padding: '32px', width: '440px',
    boxShadow: '0 24px 64px rgba(10,61,58,0.18)',
  },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  modalTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#0A3D3A' },
  modalClose: { background: 'none', border: 'none', fontSize: '16px', color: '#718096', cursor: 'pointer' },
  modalUploadZone: {
    border: '2px dashed rgba(10,61,58,0.2)', borderRadius: '12px', padding: '32px',
    textAlign: 'center', background: 'rgba(10,61,58,0.02)', cursor: 'pointer', marginBottom: '4px',
  },
  modalUploadIcon: { fontSize: '28px', color: '#2AA89A', marginBottom: '8px' },
  modalUploadText: { fontSize: '14px', fontWeight: 500, color: '#0A3D3A' },
  modalUploadSub: { fontSize: '12px', color: '#718096', marginTop: '4px' },
  input: { outline: 'none', width: '100%', fontFamily: "'DM Sans', sans-serif" },
};
