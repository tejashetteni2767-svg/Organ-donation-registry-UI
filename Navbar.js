import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <div style={styles.logoMark}>
          <span style={styles.logoHeart}>♥</span>
        </div>
        <div>
          <div style={styles.logoText}>LifeLink</div>
          <div style={styles.logoSub}>Organ Donation Registry</div>
        </div>
      </div>

      <div style={styles.navLinks}>
        <a href="#dashboard" style={styles.navLink}>Dashboard</a>
        <a href="#donors" style={styles.navLink}>Donors</a>
        <a href="#matching" style={styles.navLink}>Matching</a>
        <a href="#transplants" style={styles.navLink}>Transplants</a>
      </div>

      <div style={styles.navRight}>
        <div style={styles.userChip}>
          <div style={styles.userAvatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div style={styles.userName}>{user?.name}</div>
            <div style={styles.userId}>{user?.id}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>Sign Out</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: '72px',
    background: 'rgba(253, 251, 247, 0.92)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(10, 61, 58, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 20px rgba(10,61,58,0.06)',
  },
  logo: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoMark: {
    width: '40px', height: '40px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #0A3D3A 0%, #2AA89A 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoHeart: { fontSize: '18px', color: '#fff' },
  logoText: { fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: '#0A3D3A', lineHeight: 1.1 },
  logoSub: { fontSize: '10px', color: '#718096', letterSpacing: '0.08em', textTransform: 'uppercase' },
  navLinks: { display: 'flex', gap: '32px' },
  navLink: {
    textDecoration: 'none', color: '#4A5568', fontSize: '14px', fontWeight: 500,
    transition: 'color 0.2s', cursor: 'pointer',
  },
  navRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  userChip: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '6px 12px', borderRadius: '100px',
    background: 'rgba(10,61,58,0.05)', border: '1px solid rgba(10,61,58,0.1)',
  },
  userAvatar: {
    width: '30px', height: '30px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #0A3D3A, #2AA89A)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '13px', fontWeight: 600,
  },
  userName: { fontSize: '13px', fontWeight: 500, color: '#1C1C1E' },
  userId: { fontSize: '10px', color: '#718096', fontFamily: "'DM Mono', monospace" },
  logoutBtn: {
    padding: '8px 18px', borderRadius: '8px', border: '1px solid rgba(10,61,58,0.2)',
    background: 'transparent', color: '#0A3D3A', fontSize: '13px', fontWeight: 500,
    cursor: 'pointer', transition: 'all 0.2s',
  },
};
