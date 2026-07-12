'use client';

import { MapPin, Phone, Mail, Heart, Facebook, Instagram, Twitter } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book Appointment', href: '#booking' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#1a3557' }}>
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--primary)' }}
              >
                <div className="relative w-5 h-5">
                  <div style={{ position: 'absolute', width: '14px', height: '4px', background: 'white', borderRadius: '2px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                  <div style={{ position: 'absolute', width: '4px', height: '14px', background: 'white', borderRadius: '2px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                </div>
              </div>
              <div>
                <div className="font-black text-sm" style={{ fontFamily: 'var(--font-poppins)', color: 'white' }}>
                  Dr. Majid&apos;s
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Advanced Physiotherapy Clinic
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-inter)', maxWidth: '260px' }}>
              Restoring movement and relieving pain through expert physiotherapy in Sopore, J&amp;K.
            </p>

            <div className="flex gap-2">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-inter)' }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'white')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-inter)' }}>
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter)', lineHeight: 1.6 }}>
                  Sopore, Baramulla District<br />Jammu &amp; Kashmir — 193201
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }} />
                <a href="tel:+919797152316" className="text-sm" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontFamily: 'var(--font-inter)' }}>
                  +91 97971 52316
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.35)' }} />
                <a href="mailto:majidkirmani@gmail.com" className="text-sm" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontFamily: 'var(--font-inter)' }}>
                  majidkirmani@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '18px 0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
            © {new Date().getFullYear()} Dr. Majid&apos;s Advanced Physiotherapy Clinic
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
            Made with <Heart size={10} style={{ color: '#ff6b8a' }} fill="#ff6b8a" /> in J&amp;K, India
          </p>
        </div>
      </div>
    </footer>
  );
}

