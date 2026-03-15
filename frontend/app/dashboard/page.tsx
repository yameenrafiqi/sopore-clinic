'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, CheckCircle, XCircle, Dumbbell,
  LogOut, User, LogIn, Eye, EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';

const EXERCISES: Record<string, string[]> = {
  'Back Pain': ['Cat-Cow Stretch', 'Pelvic Tilts', 'Bird-Dog', 'Child\'s Pose'],
  'Neck Pain': ['Chin Tucks', 'Neck Rotations', 'Shoulder Rolls'],
  'Knee Pain': ['Straight Leg Raise', 'Mini Squats', 'Step Ups'],
  'Sciatica': ['Piriformis Stretch', 'Sciatic Nerve Floss', 'Lumbar Extension'],
  default: ['Deep Breathing', 'Gentle Walking', 'Posture Awareness'],
};

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/patient-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      onLogin(data.token);
      toast.success('Welcome back!');
    } catch {
      // Demo mode
      if (email && password) {
        onLogin('patient-demo-token');
        toast.success('Logged in (Demo mode)');
      } else {
        toast.error('Please enter email and password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--bg-primary)' }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card p-10">
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #0A84FF, #00d4ff)' }}
            >
              <User size={28} style={{ color: 'white' }} />
            </div>
            <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
              Patient Portal
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'var(--font-inter)' }}>
              View your appointments and recovery plan
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4" suppressHydrationWarning>
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary justify-center mt-2" style={{ opacity: loading ? 0.7 : 1 }}>
              <LogIn size={16} />
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-sm"
              style={{ color: '#0A84FF', textDecoration: 'none', fontFamily: 'var(--font-inter)' }}
            >
              ← Back to Clinic Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PatientDashboard({ onLogout }: { onLogout: () => void }) {
  // Demo patient data
  const patientName = 'Patient';
  const appointments = [
    { id: 1, date: '2026-03-20', time: '10:00 AM', treatment: 'Back Pain', status: 'confirmed', doctor: 'Dr. Majid' },
    { id: 2, date: '2026-03-25', time: '11:30 AM', treatment: 'Back Pain (Follow-up)', status: 'pending', doctor: 'Dr. Majid' },
    { id: 3, date: '2026-02-15', time: '09:00 AM', treatment: 'Initial Assessment', status: 'completed', doctor: 'Dr. Majid' },
  ];

  const currentTreatment = 'Back Pain';
  const exercises = EXERCISES[currentTreatment] || EXERCISES.default;

  const statusColor: Record<string, string> = {
    confirmed: '#34c759',
    pending: '#FFB800',
    completed: '#0A84FF',
    cancelled: '#ff375f',
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0A84FF, #00d4ff)' }}
          >
            <User size={16} style={{ color: 'white' }} />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>
              {patientName}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Patient Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="btn-outline text-sm py-2 px-4">
            ← Website
          </Link>
          <button onClick={onLogout} className="text-sm px-4 py-2 rounded-xl flex items-center gap-2" style={{ color: '#ff375f', border: '1px solid rgba(255,55,95,0.3)', background: 'rgba(255,55,95,0.08)' }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
            Welcome back, <span style={{ background: 'linear-gradient(135deg, #0A84FF, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {patientName}
            </span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
            Your appointments and recovery programme
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Appointments */}
          <div className="lg:col-span-2">
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2
                className="font-bold text-lg mb-6"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
              >
                Your Appointments
              </h2>
              <div className="flex flex-col gap-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-5 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${statusColor[apt.status]}20` }}
                      >
                        <Calendar size={20} style={{ color: statusColor[apt.status] }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                          {apt.treatment}
                        </p>
                        <p className="text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                          <Calendar size={12} />
                          {apt.date}
                          <Clock size={12} />
                          {apt.time}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{apt.doctor}</p>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium flex-shrink-0"
                      style={{
                        background: `${statusColor[apt.status]}20`,
                        color: statusColor[apt.status],
                        border: `1px solid ${statusColor[apt.status]}40`,
                      }}
                    >
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/#booking"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  <Calendar size={14} />
                  Book New Appointment
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right column - Recovery & exercises */}
          <div className="flex flex-col gap-6">
            {/* Recovery status */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                Recovery Progress
              </h2>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: 'var(--text-secondary)' }}>Overall Recovery</span>
                  <span style={{ color: '#34c759', fontWeight: 600 }}>65%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--glass-bg)', borderRadius: '10px', overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', background: 'linear-gradient(90deg, #0A84FF, #00d4ff)', borderRadius: '10px' }}
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
              <p className="text-xs mt-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                Great progress! Continue with your exercises and attend all sessions.
              </p>
            </motion.div>

            {/* Exercise list */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                <Dumbbell size={18} className="inline mr-2" style={{ color: '#0A84FF' }} />
                Home Exercises
              </h2>
              <div className="flex flex-col gap-2">
                {exercises.map((ex) => (
                  <div
                    key={ex}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }}
                  >
                    <CheckCircle size={15} style={{ color: '#0A84FF', flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                      {ex}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                Perform each exercise 3 sets × 10 reps, twice daily.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = localStorage.getItem('patientToken');
    if (t) setToken(t);
  }, []);

  const handleLogin = (t: string) => {
    setToken(t);
    localStorage.setItem('patientToken', t);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('patientToken');
  };

  if (!mounted) return null;

  return token ? (
    <PatientDashboard onLogout={handleLogout} />
  ) : (
    <LoginForm onLogin={handleLogin} />
  );
}
