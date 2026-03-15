import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach JWT token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const adminToken = localStorage.getItem('adminToken');
    const patientToken = localStorage.getItem('patientToken');
    const token = adminToken || patientToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('patientToken');
      }
    }
    return Promise.reject(error);
  },
);

/* ── Bookings ─────────────────────────────────────────────── */
export const createBooking = (data: {
  name: string;
  phone: string;
  email?: string;
  treatment: string;
  date: string;
  time: string;
  message?: string;
}) => api.post('/bookings', data);

export const getBookings = () => api.get('/bookings');

export const updateBookingStatus = (id: string, status: string) =>
  api.patch(`/bookings/${id}`, { status });

/* ── Reviews ──────────────────────────────────────────────── */
export const getReviews = () => api.get('/reviews');

export const createReview = (data: {
  name: string;
  rating: number;
  review: string;
  treatment?: string;
}) => api.post('/reviews', data);

export const deleteReview = (id: string) => api.delete(`/reviews/${id}`);

/* ── Announcements ────────────────────────────────────────── */
export const getAnnouncements = () => api.get('/announcements');

export const createAnnouncement = (data: { title: string; content: string }) =>
  api.post('/announcements', data);

/* ── Gallery ──────────────────────────────────────────────── */
export const getGallery = (category?: string) =>
  api.get('/gallery', { params: category ? { category } : {} });

/* ── Treatments ───────────────────────────────────────────── */
export const getTreatments = () => api.get('/treatments');
export const getTreatment = (id: string) => api.get(`/treatments/${id}`);

/* ── Auth ─────────────────────────────────────────────────── */
export const adminLogin = (username: string, password: string) =>
  api.post('/auth/login', { username, password });

export const patientLogin = (email: string, password: string) =>
  api.post('/auth/patient-login', { email, password });

export default api;
