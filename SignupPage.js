import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BLOOD_TYPES = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];
const ORGANS = ['Heart', 'Kidneys', 'Liver', 'Lungs', 'Pancreas', 'Corneas', 'Skin', 'Bone Marrow'];
const ROLES = ['Donor', 'Healthcare Coordinator', 'Hospital Administrator', 'Transplant Surgeon'];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', phone: '',
    dob: '', bloodType: '', role: '', hospital: '', organs: [],
    agreeTerms: false, agreeConsent: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleOrgan = (organ) => {
    setForm(f => ({
      ...f,
      organs: f.organs.includes(organ) ? f.organs.filter(o => o !== organ) : [...f.organs, organ],
    }));
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.firstName) e.firstName = 'Required';
      if (!form.lastName) e.lastName = 'Required';
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
      if (!form.password || form.password.length < 6) e.password = 'Min 6 characters';
    }
    if (s === 2) {
      if (!form.dob) e.dob = 'Required';
      if (!form.bloodType) e.bloodType = 'Required';
      if (!form.role) e.role = 'Required';
    }
    if (s === 3) {
      if (!form.agreeTerms) e.agreeTerms = 'You must agree to terms';
      if (!form.agreeConsent) e.agreeConsent = 'Consent required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const handleSubmit = () => {
    if (!validateStep(3)) return;
    setLoading(true);
    setTimeout(() => {
      signup({ name: form.firstName + ' ' + form.lastName, email: form.email, ...form });
      navigate('/home');
    }, 1200);
  };

  return (
    <div style={styles.page}>
      {/* Left branding */}
      <div style={styles.left}>
        <div style={styles.leftInner}>
          <div style={styles.logoRow}>
            <div style={styles.logoMark}><span style={{ fontSize: '20px', color: '#fff' }}>♥</span></div>
            <div style={styles.logoText}>LifeLink</div>
          </div>
          <h2 style={styles.tagline}>Join the network.<br /><em>Change a life.</em></h2>
          <p style={styles.leftSub}>Register as a donor, coordinator, or healthcare professional and become part of India's most trusted organ donation ecosystem.</p>

          <div style={styles.stepList}>
            {['Personal Information', 'Medical Profile', 'Consent & Agreement'].map((label, i) => (
              <div key={i} style={styles.stepItem}>
                <div style={{
                  ...styles.stepDot,
                  background: step > i + 1 ? '#2AA89A' : step === i + 1 ? '#C8963E' : 'rgba(255,255,255,0.15)',
                  border: step === i + 1 ? '2px solid #E8B86D' : '2px solid transparent',
                }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <div>
                  <div style={{ ...styles.stepLabel, color: step === i + 1 ? '#F5F0E8' : 'rgba(253,251,247,0.45)' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.orb1} /><div style={styles.orb2} />
      </div>

      {/* Right form */}
      <div style={styles.right}>
        <div style={styles.formCard}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${(step / 3) * 100}%` }} />
          </div>
          <div style={styles.stepBadge}>Step {step} of 3</div>

          {step === 1 && (
            <div style={styles.stepContent}>
              <h2 style={styles.stepHeading}>Personal Information</h2>
              <p style={styles.stepDesc}>Let's start with your basic details.</p>
              <div style={styles.row2}>
                <Field label="First Name" error={errors.firstName}>
                  <input style={inp(errors.firstName)} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Arjun" />
                </Field>
                <Field label="Last Name" error={errors.lastName}>
                  <input style={inp(errors.lastName)} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Sharma" />
                </Field>
              </div>
              <Field label="Email Address" error={errors.email}>
                <input style={inp(errors.email)} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="arjun@hospital.org" />
              </Field>
              <Field label="Password" error={errors.password}>
                <input style={inp(errors.password)} type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 6 characters" />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input style={inp(errors.phone)} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div style={styles.stepContent}>
              <h2 style={styles.stepHeading}>Medical Profile</h2>
              <p style={styles.stepDesc}>Help us match you accurately within our registry.</p>
              <div style={styles.row2}>
                <Field label="Date of Birth" error={errors.dob}>
                  <input style={inp(errors.dob)} type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
                </Field>
                <Field label="Blood Type" error={errors.bloodType}>
                  <select style={inp(errors.bloodType)} value={form.bloodType} onChange={e => set('bloodType', e.target.value)}>
                    <option value="">Select</option>
                    {BLOOD_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Role" error={errors.role}>
                <select style={inp(errors.role)} value={form.role} onChange={e => set('role', e.target.value)}>
                  <option value="">Select your role</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Hospital / Institution" error={errors.hospital}>
                <input style={inp(errors.hospital)} value={form.hospital} onChange={e => set('hospital', e.target.value)} placeholder="Apollo Hospitals, Hyderabad" />
              </Field>
              <div style={styles.field}>
                <label style={styles.label}>Organs Willing to Donate</label>
                <div style={styles.organsGrid}>
                  {ORGANS.map(o => (
                    <button key={o} type="button"
                      onClick={() => toggleOrgan(o)}
                      style={{ ...styles.organChip, ...(form.organs.includes(o) ? styles.organChipActive : {}) }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={styles.stepContent}>
              <h2 style={styles.stepHeading}>Consent & Agreement</h2>
              <p style={styles.stepDesc}>Your informed consent is required to complete registration.</p>

              <div style={styles.summaryCard}>
                <div style={styles.summaryTitle}>Registration Summary</div>
                <div style={styles.summaryRow}><span>Name</span><span>{form.firstName} {form.lastName}</span></div>
                <div style={styles.summaryRow}><span>Blood Type</span><span>{form.bloodType || '—'}</span></div>
                <div style={styles.summaryRow}><span>Role</span><span>{form.role || '—'}</span></div>
                <div style={styles.summaryRow}><span>Organs</span><span>{form.organs.length ? form.organs.join(', ') : 'None selected'}</span></div>
              </div>

              {[
                ['agreeTerms', 'I agree to the LifeLink Terms of Service and Privacy Policy.'],
                ['agreeConsent', 'I voluntarily consent to organ donation and understand I may update my preferences at any time.'],
              ].map(([key, text]) => (
                <div key={key} style={styles.checkRow}>
                  <div
                    onClick={() => set(key, !form[key])}
                    style={{ ...styles.checkbox, ...(form[key] ? styles.checkboxChecked : {}) }}>
                    {form[key] && '✓'}
                  </div>
                  <label style={{ fontSize: '14px', color: '#4A5568', cursor: 'pointer', lineHeight: 1.5 }}
                    onClick={() => set(key, !form[key])}>{text}</label>
                  {errors[key] && <div style={styles.fieldError}>{errors[key]}</div>}
                </div>
              ))}
            </div>
          )}

          <div style={styles.btnRow}>
            {step > 1 && (
              <button onClick={back} style={styles.backBtn}>← Back</button>
            )}
            {step < 3 ? (
              <button onClick={next} style={styles.nextBtn}>Continue →</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} style={{ ...styles.nextBtn, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            )}
          </div>

          <p style={styles.loginRow}>
            Already registered?{' '}
            <Link to="/login" style={styles.loginLink}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '4px' }}>
      <label style={{ fontSize: '12px', fontWeight: 500, color: '#4A5568', letterSpacing: '0.04em' }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: '11px', color: '#DC2626' }}>{error}</span>}
    </div>
  );
}

function inp(err) {
  return {
    padding: '11px 14px', borderRadius: '10px', fontSize: '14px',
    border: `1.5px solid ${err ? 'rgba(220,38,38,0.5)' : 'rgba(10,61,58,0.15)'}`,
    background: '#fff', color: '#1C1C1E', outline: 'none',
    fontFamily: "'DM Sans', sans-serif", width: '100%',
    transition: 'border-color 0.2s',
  };
}

const styles = {
  page: { display: 'flex', minHeight: '100vh' },
  left: {
    width: '380px', background: 'linear-gradient(160deg, #0A3D3A 0%, #0D5249 60%, #1A6B65 100%)',
    display: 'flex', alignItems: 'center', padding: '60px 40px', position: 'relative', overflow: 'hidden',
  },
  leftInner: { position: 'relative', zIndex: 2 },
  logoRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' },
  logoMark: {
    width: '44px', height: '44px', borderRadius: '14px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(42,168,154,0.4))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  logoText: { fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: '#F5F0E8' },
  tagline: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300,
    color: '#F5F0E8', lineHeight: 1.15, marginBottom: '16px',
  },
  leftSub: { fontSize: '14px', color: 'rgba(253,251,247,0.6)', lineHeight: 1.7, marginBottom: '40px' },
  stepList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  stepItem: { display: 'flex', alignItems: 'center', gap: '14px' },
  stepDot: {
    width: '32px', height: '32px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '13px', fontWeight: 600, color: '#fff', flexShrink: 0, transition: 'all 0.3s',
  },
  stepLabel: { fontSize: '14px', fontWeight: 500, transition: 'color 0.3s' },
  orb1: {
    position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(42,168,154,0.12) 0%, transparent 70%)',
    bottom: '-80px', right: '-80px', pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,150,62,0.08) 0%, transparent 70%)',
    top: '-50px', left: '-50px', pointerEvents: 'none',
  },
  right: {
    flex: 1, background: '#FDFBF7', display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '40px',
  },
  formCard: { width: '100%', maxWidth: '500px' },
  progressBar: { height: '3px', background: 'rgba(10,61,58,0.08)', borderRadius: '2px', marginBottom: '20px' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #0A3D3A, #2AA89A)', borderRadius: '2px', transition: 'width 0.4s ease' },
  stepBadge: { fontSize: '11px', color: '#718096', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace", marginBottom: '12px' },
  stepContent: { display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' },
  stepHeading: { fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 400, color: '#0A3D3A' },
  stepDesc: { fontSize: '14px', color: '#718096', marginBottom: '4px' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '12px', fontWeight: 500, color: '#4A5568', letterSpacing: '0.04em' },
  organsGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  organChip: {
    padding: '7px 14px', borderRadius: '100px', fontSize: '13px',
    border: '1.5px solid rgba(10,61,58,0.15)', background: '#fff', color: '#4A5568',
    cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif",
  },
  organChipActive: {
    background: 'rgba(10,61,58,0.06)', borderColor: '#0A3D3A', color: '#0A3D3A', fontWeight: 500,
  },
  summaryCard: {
    padding: '20px', borderRadius: '12px',
    background: 'rgba(10,61,58,0.03)', border: '1px solid rgba(10,61,58,0.1)', marginBottom: '8px',
  },
  summaryTitle: { fontSize: '12px', fontWeight: 600, color: '#0A3D3A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between', fontSize: '14px',
    color: '#4A5568', padding: '6px 0', borderBottom: '1px solid rgba(10,61,58,0.06)',
  },
  checkRow: { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', borderBottom: '1px solid rgba(10,61,58,0.06)' },
  checkbox: {
    width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
    border: '2px solid rgba(10,61,58,0.25)', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: '12px', transition: 'all 0.2s', marginTop: '2px',
  },
  checkboxChecked: { background: '#0A3D3A', border: '2px solid #0A3D3A', color: '#fff' },
  fieldError: { fontSize: '11px', color: '#DC2626', marginTop: '2px' },
  btnRow: { display: 'flex', gap: '12px', marginBottom: '20px' },
  backBtn: {
    padding: '13px 24px', borderRadius: '10px', border: '1.5px solid rgba(10,61,58,0.2)',
    background: 'transparent', color: '#0A3D3A', fontSize: '14px', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  },
  nextBtn: {
    flex: 1, padding: '13px', borderRadius: '10px',
    background: 'linear-gradient(135deg, #0A3D3A 0%, #1A6B65 100%)',
    color: '#fff', border: 'none', fontSize: '15px', fontWeight: 500, cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", transition: 'opacity 0.2s',
  },
  loginRow: { textAlign: 'center', fontSize: '14px', color: '#718096' },
  loginLink: { color: '#2AA89A', textDecoration: 'none', fontWeight: 500 },
};
