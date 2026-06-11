import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) navigate('/home');
      else setError('Invalid credentials.');
      setLoading(false);
    }, 900);
  };

  return (
    <div style={styles.page}>
      {/* Left Panel */}
      <div style={styles.left}>
        <div style={styles.leftInner}>
          <div style={styles.badge}>Est. 2024 · Secure Registry</div>
          <h1 style={styles.headline}>
            Every registration<br />
            <em style={styles.italic}>saves a life.</em>
          </h1>
          <p style={styles.subtext}>
            LifeLink connects organ donors, recipients, and healthcare coordinators through a transparent, secure, and life-saving platform.
          </p>
          <div style={styles.statsRow}>
            {[['12,400+', 'Registered Donors'], ['3,200+', 'Successful Matches'], ['98%', 'Platform Uptime']].map(([n, l]) => (
              <div key={l} style={styles.stat}>
                <div style={styles.statNum}>{n}</div>
                <div style={styles.statLabel}>{l}</div>
              </div>
            ))}
          </div>
          <div style={styles.testimonial}>
            <div style={styles.quoteIcon}>"</div>
            <p style={styles.quoteText}>LifeLink made the entire donation process clear, dignified, and seamless for our family.</p>
            <div style={styles.quoteAuthor}>— Dr. Priya Nair, Apollo Hospitals</div>
          </div>
        </div>
        {/* Decorative orbs */}
        <div style={styles.orb1} />
        <div style={styles.orb2} />
      </div>

      {/* Right Panel */}
      <div style={styles.right}>
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <div style={styles.logoMini}>
              <span style={{ fontSize: '18px', color: '#fff' }}>♥</span>
            </div>
            <div>
              <div style={styles.formTitle}>LifeLink</div>
              <div style={styles.formSub}>Organ Donation Registry</div>
            </div>
          </div>

          <h2 style={styles.formHeadline}>Welcome back</h2>
          <p style={styles.formDesc}>Sign in to manage your donor profile and track transplant workflows.</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@hospital.org"
                style={styles.input}
                onFocus={e => e.target.style.borderColor = '#2AA89A'}
                onBlur={e => e.target.style.borderColor = 'rgba(10,61,58,0.15)'}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={styles.input}
                onFocus={e => e.target.style.borderColor = '#2AA89A'}
                onBlur={e => e.target.style.borderColor = 'rgba(10,61,58,0.15)'}
              />
            </div>
            <div style={styles.forgotRow}>
              <span style={styles.forgot}>Forgot password?</span>
            </div>
            <button type="submit" disabled={loading} style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing in...' : 'Sign In to LifeLink'}
            </button>
          </form>

          <div style={styles.divider}><span style={styles.dividerText}>or</span></div>

          <div style={styles.demoRow}>
            <button style={styles.demoBtn} onClick={() => { setEmail('demo@lifelink.org'); setPassword('demo1234'); }}>
              Use Demo Credentials
            </button>
          </div>

          <p style={styles.signupRow}>
            New to LifeLink?{' '}
            <Link to="/signup" style={styles.signupLink}>Create an account →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" },
  left: {
    flex: 1, background: 'linear-gradient(160deg, #0A3D3A 0%, #0D5249 50%, #1A6B65 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '60px', position: 'relative', overflow: 'hidden',
  },
  leftInner: { position: 'relative', zIndex: 2, maxWidth: '480px' },
  badge: {
    display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
    background: 'rgba(42,168,154,0.2)', border: '1px solid rgba(42,168,154,0.4)',
    color: '#7DD8D0', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
    marginBottom: '32px', fontFamily: "'DM Mono', monospace",
  },
  headline: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: '56px', fontWeight: 300,
    color: '#FDFBF7', lineHeight: 1.1, marginBottom: '20px',
  },
  italic: { fontStyle: 'italic', color: '#7DD8D0' },
  subtext: { fontSize: '16px', color: 'rgba(253,251,247,0.65)', lineHeight: 1.7, marginBottom: '40px' },
  statsRow: { display: 'flex', gap: '32px', marginBottom: '48px' },
  stat: {},
  statNum: { fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, color: '#F5F0E8' },
  statLabel: { fontSize: '12px', color: 'rgba(253,251,247,0.5)', marginTop: '2px' },
  testimonial: {
    padding: '24px', borderRadius: '16px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
  },
  quoteIcon: { fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', color: '#2AA89A', lineHeight: 0.8, marginBottom: '8px' },
  quoteText: { color: 'rgba(253,251,247,0.8)', fontSize: '15px', lineHeight: 1.6, marginBottom: '12px' },
  quoteAuthor: { fontSize: '12px', color: 'rgba(253,251,247,0.45)', fontStyle: 'italic' },
  orb1: {
    position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(42,168,154,0.15) 0%, transparent 70%)',
    top: '-100px', right: '-100px', pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,150,62,0.1) 0%, transparent 70%)',
    bottom: '-80px', left: '-80px', pointerEvents: 'none',
  },
  right: {
    width: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#FDFBF7', padding: '40px',
  },
  formCard: { width: '100%', maxWidth: '380px' },
  formHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' },
  logoMini: {
    width: '40px', height: '40px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #0A3D3A 0%, #2AA89A 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  formTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: '#0A3D3A' },
  formSub: { fontSize: '10px', color: '#718096', letterSpacing: '0.08em', textTransform: 'uppercase' },
  formHeadline: { fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 400, color: '#0A3D3A', marginBottom: '8px' },
  formDesc: { fontSize: '14px', color: '#718096', marginBottom: '28px', lineHeight: 1.6 },
  errorBox: {
    padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
    background: 'rgba(220, 38, 38, 0.06)', border: '1px solid rgba(220,38,38,0.2)',
    color: '#DC2626', fontSize: '13px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: 500, color: '#4A5568', letterSpacing: '0.04em' },
  input: {
    padding: '12px 16px', borderRadius: '10px', fontSize: '14px',
    border: '1.5px solid rgba(10,61,58,0.15)', background: '#fff',
    color: '#1C1C1E', outline: 'none', transition: 'border-color 0.2s',
    fontFamily: "'DM Sans', sans-serif",
  },
  forgotRow: { textAlign: 'right', marginTop: '-6px' },
  forgot: { fontSize: '12px', color: '#2AA89A', cursor: 'pointer' },
  btn: {
    padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 500,
    background: 'linear-gradient(135deg, #0A3D3A 0%, #1A6B65 100%)',
    color: '#fff', border: 'none', cursor: 'pointer', marginTop: '4px',
    transition: 'all 0.2s', letterSpacing: '0.02em',
  },
  divider: {
    position: 'relative', textAlign: 'center', margin: '20px 0',
    borderTop: '1px solid rgba(10,61,58,0.1)',
  },
  dividerText: {
    position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
    background: '#FDFBF7', padding: '0 10px', fontSize: '12px', color: '#718096',
  },
  demoRow: { textAlign: 'center', marginBottom: '16px' },
  demoBtn: {
    padding: '10px 20px', borderRadius: '8px', border: '1.5px dashed rgba(10,61,58,0.25)',
    background: 'transparent', color: '#1A6B65', fontSize: '13px', cursor: 'pointer',
    fontFamily: "'DM Mono', monospace",
  },
  signupRow: { textAlign: 'center', fontSize: '14px', color: '#718096', marginTop: '8px' },
  signupLink: { color: '#2AA89A', textDecoration: 'none', fontWeight: 500 },
};
