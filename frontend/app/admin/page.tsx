'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Star, Image, Bell, Settings,
  LogOut, ChevronRight, TrendingUp, Users, CheckCircle, Clock,
  XCircle, Trash2, Eye, EyeOff, LogIn, type LucideIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';

/* ── Auth helpers ─────────────────────────────────────────── */
function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}
function setToken(t: string) { localStorage.setItem('adminToken', t); }
function removeToken() { localStorage.removeItem('adminToken'); }

/* ── Login Page ───────────────────────────────────────────── */
function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      onLogin(data.token);
      toast.success('Welcome back, Admin!');
    } catch {
      // Demo mode fallback
      if (username === 'admin' && password === 'Admin@12345') {
        onLogin('demo-token');
        toast.success('Welcome back, Admin! (Demo mode)');
      } else {
        toast.error('Invalid credentials. Try admin / Admin@12345 in demo mode.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(145deg, #050a18, #0d1b3e)' }}
    >
      <motion.div
        className="w-full max-w-md p-10 rounded-3xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(10,132,255,0.2)',
          backdropFilter: 'blur(20px)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #0A84FF, #00d4ff)' }}
          >
            <Settings size={28} style={{ color: 'white' }} />
          </div>
          <h1
            className="text-2xl font-black text-white"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Admin Panel
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontFamily: 'var(--font-inter)' }}>
            Dr. Majid&apos;s Clinic Management
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4" suppressHydrationWarning>
          <div>
            <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="form-input"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(10,132,255,0.2)', color: 'white' }}
              required
            />
          </div>
          <div>
            <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input pr-12"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(10,132,255,0.2)', color: 'white' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary justify-center mt-2"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            <LogIn size={16} />
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p
          className="text-center mt-6 text-xs"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}
        >
          Demo: admin / Admin@12345
        </p>
      </motion.div>
    </div>
  );
}

/* ── Stat card ────────────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: string | number; icon: LucideIcon; color: string;
}) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <TrendingUp size={16} style={{ color: '#34c759' }} />
      </div>
      <div
        className="text-3xl font-black mb-1"
        style={{
          fontFamily: 'var(--font-poppins)',
          background: `linear-gradient(135deg, ${color}, white)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
      </div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
        {label}
      </p>
    </div>
  );
}

/* ── Main Dashboard ───────────────────────────────────────── */
function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    // Seed announcements from localStorage while waiting for backend
    try {
      const local = JSON.parse(localStorage.getItem('clinic_announcements') || '[]');
      if (local.length > 0) setAnnouncements(local);
    } catch { /* ignore */ }

    // Fetch data
    Promise.all([
      fetch(`${BACKEND_URL}/bookings`, { headers: authHeaders }).then((r) => r.json()).catch(() => []),
      fetch(`${BACKEND_URL}/reviews`, { headers: authHeaders }).then((r) => r.json()).catch(() => []),
      fetch(`${BACKEND_URL}/announcements`, { headers: authHeaders }).then((r) => r.json()).catch(() => []),
    ]).then(([b, r, a]) => {
      if (Array.isArray(b)) setBookings(b);
      if (Array.isArray(r)) setReviews(r);
      // Only override localStorage data if backend returned real results
      if (Array.isArray(a) && a.length > 0) {
        setAnnouncements(a);
        localStorage.setItem('clinic_announcements', JSON.stringify(a));
      }
    });
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await fetch(`${BACKEND_URL}/bookings/${id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status }),
      });
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
      toast.success(`Booking ${status}`);
    } catch {
      toast.error('Failed to update booking');
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      await fetch(`${BACKEND_URL}/reviews/${id}`, { method: 'DELETE', headers: authHeaders });
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.success('Review deleted');
    } catch {
      toast.error('Failed to delete review');
    }
  };

  const LS_KEY = 'clinic_announcements';

  const addAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error('Please fill in all fields');
      return;
    }
    const entry = { ...newAnnouncement, _id: Date.now().toString(), createdAt: new Date().toISOString() };
    try {
      const res = await fetch(`${BACKEND_URL}/announcements`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newAnnouncement),
      });
      if (!res.ok) throw new Error('backend error');
      const data = await res.json();
      const updated = [data, ...announcements];
      setAnnouncements(updated);
      localStorage.setItem(LS_KEY, JSON.stringify(updated));
    } catch {
      // Demo mode — persist to localStorage
      const updated = [entry, ...announcements];
      setAnnouncements(updated);
      localStorage.setItem(LS_KEY, JSON.stringify(updated));
    }
    setNewAnnouncement({ title: '', content: '' });
    toast.success('Announcement published! Visible on the main page.');
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    try {
      await fetch(`${BACKEND_URL}/announcements/${id}`, { method: 'DELETE', headers: authHeaders });
    } catch { /* demo mode — continue anyway */ }
    const updated = announcements.filter((a: any) => a._id !== id);
    setAnnouncements(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    toast.success('Announcement deleted');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'gallery', label: 'Gallery', icon: Image },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="p-6 flex items-center gap-3"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0A84FF, #00d4ff)' }}
        >
          <Settings size={18} style={{ color: 'white' }} />
        </div>
        <div>
          <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>
            Admin Panel
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Dr. Majid&apos;s Clinic</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setMobileSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === id ? 'active' : ''}`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
        <button
          onClick={onLogout}
          className="admin-nav-item w-full text-red-400 hover:bg-red-900"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Desktop sidebar */}
      <div
        className="hidden lg:flex w-64 flex-col border-r"
        style={{
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border)',
          minHeight: '100vh',
        }}
      >
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileSidebarOpen(false)} />
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-64"
              style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)' }}
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {sidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
          style={{
            background: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setMobileSidebarOpen(true)}
              style={{ color: 'var(--text-primary)' }}
            >
              <LayoutDashboard size={20} />
            </button>
            <h2
              className="font-bold text-lg"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
            >
              {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>
          <button onClick={onLogout} className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
            <LogOut size={14} />
            Logout
          </button>
        </div>

        <div className="p-6">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Bookings" value={bookings.length || '—'} icon={Calendar} color="#0A84FF" />
                <StatCard label="Pending Bookings" value={bookings.filter((b) => b.status === 'pending').length || '—'} icon={Clock} color="#FFB800" />
                <StatCard label="Reviews" value={reviews.length || '—'} icon={Star} color="#ff9500" />
                <StatCard label="Active Announcements" value={announcements.length || '—'} icon={Bell} color="#34c759" />
              </div>

              <div className="glass-card p-6">
                <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                  Recent Bookings
                </h3>
                {bookings.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                    No bookings yet. Connect MongoDB to see live data.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          {['Name', 'Treatment', 'Date', 'Status'].map((h) => (
                            <th key={h} className="text-left py-3 px-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 10).map((b: any) => (
                          <tr key={b._id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="py-3 px-3" style={{ color: 'var(--text-primary)' }}>{b.name}</td>
                            <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>{b.treatment}</td>
                            <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>{b.date}</td>
                            <td className="py-3 px-3">
                              <span
                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{
                                  background: b.status === 'confirmed' ? 'rgba(52,199,89,0.15)' : b.status === 'rejected' ? 'rgba(255,55,95,0.15)' : 'rgba(255,184,0,0.15)',
                                  color: b.status === 'confirmed' ? '#34c759' : b.status === 'rejected' ? '#ff375f' : '#FFB800',
                                }}
                              >
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bookings */}
          {activeTab === 'bookings' && (
            <div className="glass-card p-6">
              <h3 className="font-bold mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                Manage Bookings
              </h3>
              {bookings.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No bookings found. Connect MongoDB to see live booking data.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {bookings.map((b: any) => (
                    <div
                      key={b._id}
                      className="p-5 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                          {b.name}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {b.phone} · {b.email}
                        </p>
                        <p className="text-sm" style={{ color: '#0A84FF' }}>
                          {b.treatment} — {b.date} at {b.time}
                        </p>
                        {b.message && (
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{b.message}</p>
                        )}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {b.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(b._id, 'confirmed')}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                              style={{ background: 'rgba(52,199,89,0.15)', color: '#34c759', border: '1px solid rgba(52,199,89,0.3)' }}
                            >
                              <CheckCircle size={13} /> Confirm
                            </button>
                            <button
                              onClick={() => updateBookingStatus(b._id, 'rejected')}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                              style={{ background: 'rgba(255,55,95,0.15)', color: '#ff375f', border: '1px solid rgba(255,55,95,0.3)' }}
                            >
                              <XCircle size={13} /> Reject
                            </button>
                          </>
                        )}
                        <span
                          className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            background: b.status === 'confirmed' ? 'rgba(52,199,89,0.15)' : b.status === 'rejected' ? 'rgba(255,55,95,0.15)' : 'rgba(255,184,0,0.15)',
                            color: b.status === 'confirmed' ? '#34c759' : b.status === 'rejected' ? '#ff375f' : '#FFB800',
                          }}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div className="glass-card p-6">
              <h3 className="font-bold mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                Manage Reviews
              </h3>
              {reviews.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No reviews found. Connect MongoDB to see review data.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {reviews.map((r: any) => (
                    <div
                      key={r._id}
                      className="p-5 rounded-xl flex justify-between items-start gap-4"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}
                    >
                      <div>
                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                        <div className="flex gap-0.5 my-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} style={{ color: i < r.rating ? '#FFB800' : '#d1d5db' }}>★</span>
                          ))}
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{r.review}</p>
                      </div>
                      <button
                        onClick={() => deleteReview(r._id)}
                        className="text-red-400 p-2 rounded-lg hover:bg-red-900/20 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Announcements */}
          {activeTab === 'announcements' && (
            <div className="flex flex-col gap-6">
              {/* Add announcement */}
              <div className="glass-card p-6">
                <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                  Publish New Announcement
                </h3>
                <form onSubmit={addAnnouncement} className="flex flex-col gap-4" suppressHydrationWarning>
                  <div>
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      placeholder="e.g. 🎉 New Equipment Available"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Content</label>
                    <textarea
                      rows={2}
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                      placeholder="Announcement message..."
                      className="form-input resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary self-start">
                    Publish Announcement
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="glass-card p-6">
                <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                  Active Announcements
                </h3>
                {announcements.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No announcements yet.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {announcements.map((a: any) => (
                      <div
                        key={a._id || a.title}
                        className="p-4 rounded-xl flex justify-between items-start gap-4"
                        style={{ background: 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.2)' }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{a.title}</p>
                          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{a.content}</p>
                          {a.createdAt && (
                            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                              {new Date(a.createdAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteAnnouncement(a._id)}
                          className="flex-shrink-0 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                          style={{ color: '#ff375f' }}
                          title="Delete announcement"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Gallery placeholder */}
          {activeTab === 'gallery' && (
            <div className="glass-card p-10 text-center">
              <Image size={48} className="mx-auto mb-4" style={{ color: '#0A84FF' }} />
              <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                Gallery Management
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                Connect Cloudinary and MongoDB to enable image upload and management.
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                Configure CLOUDINARY_* variables in your backend .env file.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page export ──────────────────────────────────────────── */
export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setToken(getToken());
  }, []);

  const handleLogin = (t: string) => {
    setToken(t);
    localStorage.setItem('adminToken', t);
  };

  const handleLogout = () => {
    setToken(null);
    removeToken();
    toast.success('Logged out');
  };

  if (!mounted) return null;

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}
