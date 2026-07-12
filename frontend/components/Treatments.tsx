'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, Clock, Search } from 'lucide-react';

const treatments = [
  {
    id: 'back-pain',
    emoji: '🦴',
    title: 'Back Pain',
    category: 'Spine',
    duration: '4–8 weeks',
    sessions: '12–20 sessions',
    tags: ['Most Common', 'High Success Rate'],
    color: '#0A84FF',
    symptoms: ['Dull or sharp pain in lower/upper back', 'Stiffness on waking', 'Pain radiating to legs', 'Limited range of motion', 'Muscle spasms'],
    causes: ['Poor posture', 'Herniated disc', 'Muscle strain', 'Degenerative disc disease', 'Spinal stenosis'],
    treatment: 'Combination of manual therapy, core strengthening exercises, electrotherapy, postural correction, and patient education for long-term management.',
    exercises: ['Cat-Cow Stretch', 'Bird-Dog', 'Pelvic Tilt', 'Child\'s Pose', 'Knee-to-Chest Stretch'],
  },
  {
    id: 'neck-pain',
    emoji: '🔄',
    title: 'Neck Pain',
    category: 'Spine',
    duration: '3–6 weeks',
    sessions: '8–15 sessions',
    tags: ['Desk Workers', 'Common'],
    color: '#00d4ff',
    symptoms: ['Pain and stiffness in neck', 'Headaches', 'Pain radiating to shoulders', 'Numbness in arms', 'Dizziness'],
    causes: ['Forward head posture', 'Cervical spondylosis', 'Muscle tension', 'Herniated disc', 'Whiplash injury'],
    treatment: 'Cervical manual therapy, traction, deep tissue massage, postural training, ergonomic advice, and strengthening of cervical musculature.',
    exercises: ['Chin Tucks', 'Neck Rotations', 'Shoulder Rolls', 'Cervical Retraction', 'Scalene Stretch'],
  },
  {
    id: 'sciatica',
    emoji: '⚡',
    title: 'Sciatica',
    category: 'Nerve',
    duration: '6–12 weeks',
    sessions: '15–25 sessions',
    tags: ['Nerve Pain'],
    color: '#FFB800',
    symptoms: ['Shooting pain from lower back to leg', 'Tingling or numbness in leg', 'Weakness in leg', 'Pain worse when sitting', 'Burning sensation'],
    causes: ['Herniated disc pressing on sciatic nerve', 'Piriformis syndrome', 'Spinal stenosis', 'Degenerative disc disease', 'Spondylolisthesis'],
    treatment: 'Neural mobilisation, lumbar decompression, McKenzie therapy, specific stretches targeting sciatic nerve, core stabilisation, and lifestyle modification.',
    exercises: ['Piriformis Stretch', 'Sciatic Nerve Floss', 'Lumbar Extension', 'Figure-4 Stretch', 'Hamstring Stretch'],
  },
  {
    id: 'frozen-shoulder',
    emoji: '🤕',
    title: 'Frozen Shoulder',
    category: 'Shoulder',
    duration: '12–24 weeks',
    sessions: '20–30 sessions',
    tags: ['Long Treatment', 'Treatable'],
    color: '#ff375f',
    symptoms: ['Gradual increase in shoulder stiffness', 'Severe night pain', 'Inability to raise arm', 'Difficulty reaching behind back', 'Pain with movement'],
    causes: ['Adhesive capsulitis', 'Post-surgery immobility', 'Diabetes', 'Thyroid disorders', 'Rotator cuff injury'],
    treatment: 'Shoulder joint mobilisation, capsular stretching, hydrotherapy, ultrasound therapy, and progressive range-of-motion exercises through each phase of the condition.',
    exercises: ['Pendulum Swings', 'Towel Stretch', 'Cross Body Stretch', 'Finger Walk Exercises', 'Shoulder Pulley'],
  },
  {
    id: 'tennis-elbow',
    emoji: '🎾',
    title: 'Tennis Elbow',
    category: 'Elbow',
    duration: '6–12 weeks',
    sessions: '12–20 sessions',
    tags: ['Overuse Injury'],
    color: '#34c759',
    symptoms: ['Pain on outer elbow', 'Weak grip strength', 'Pain when shaking hands', 'Difficulty opening jars', 'Forearm tenderness'],
    causes: ['Repetitive wrist/forearm movements', 'Overuse of extensor muscles', 'Sports activities', 'Manual labour', 'Poor technique'],
    treatment: 'Shockwave therapy, eccentric exercises, forearm bracing, manual therapy, ultrasound, and equipment/technique modification advice.',
    exercises: ['Wrist Extensor Stretch', 'Eccentric Wrist Curls', 'Forearm Pronation', 'Tyler Twist', 'Ball Squeeze'],
  },
  {
    id: 'knee-pain',
    emoji: '🦵',
    title: 'Knee Pain',
    category: 'Knee',
    duration: '4–10 weeks',
    sessions: '12–20 sessions',
    tags: ['High Success Rate'],
    color: '#bf5af2',
    symptoms: ['Aching or sharp knee pain', 'Swelling around knee', 'Difficulty bending/straightening', 'Clicking or popping sounds', 'Instability when walking'],
    causes: ['Osteoarthritis', 'Patellofemoral syndrome', 'Ligament injury', 'Meniscus tear', 'IT band syndrome'],
    treatment: 'Quadriceps and hip strengthening, knee taping, manual therapy, hydrotherapy, proprioception training, and gait retraining to reduce mechanical stress.',
    exercises: ['Straight Leg Raise', 'Mini Squats', 'Step Ups', 'Terminal Knee Extension', 'Hamstring Curl'],
  },
  {
    id: 'plantar-fasciitis',
    emoji: '👣',
    title: 'Plantar Fasciitis',
    category: 'Foot',
    duration: '6–12 weeks',
    sessions: '10–18 sessions',
    tags: ['Common', 'Treatable'],
    color: '#ff9500',
    symptoms: ['Heel pain first thing in morning', 'Pain after prolonged sitting', 'Sharp pain with each step', 'Tenderness in heel', 'Pain worsens with activity'],
    causes: ['Overuse from prolonged standing/running', 'Tight calf muscles', 'Obesity', 'Flat feet or high arches', 'Improper footwear'],
    treatment: 'Shockwave therapy, stretching programme, custom orthotics, night splints, ultrasound, and footwear modification advice for long-term relief.',
    exercises: ['Plantar Fascia Stretch', 'Calf Stretch', 'Towel Scrunches', 'Marble Pickups', 'Heel Raises'],
  },
  {
    id: 'sports-injuries',
    emoji: '🏆',
    title: 'Sports Injuries',
    category: 'Sport',
    duration: '4–16 weeks',
    sessions: 'Varies by injury',
    tags: ['Athletes', 'Fast Recovery'],
    color: '#30d158',
    symptoms: ['Acute pain at injury site', 'Swelling and bruising', 'Restricted movement', 'Weakness in affected area', 'Difficulty with sport-specific movements'],
    causes: ['Direct trauma', 'Overuse / repetitive strain', 'Insufficient warm-up', 'Muscle imbalances', 'Previous unresolved injuries'],
    treatment: 'PRICE (Protection, Rest, Ice, Compression, Elevation) initially, followed by progressive loading, sport-specific rehabilitation, and return-to-sport testing.',
    exercises: ['Varies by sport and injury type', 'Sport-specific movement patterns', 'Plyometric progression', 'Speed and agility drills', 'Strength testing'],
  },
  {
    id: 'post-surgery-rehab',
    emoji: '❤️‍🩹',
    title: 'Post-Surgery Rehab',
    category: 'Surgical',
    duration: '3–6 months',
    sessions: '20–40 sessions',
    tags: ['Post Operative'],
    color: '#0A84FF',
    symptoms: ['Post-operative pain', 'Swelling', 'Limited joint movement', 'Muscle weakness', 'Fear of movement'],
    causes: ['Total knee/hip replacement', 'ACL reconstruction', 'Rotator cuff repair', 'Spinal fusion', 'Fracture fixation'],
    treatment: 'Phase-based rehabilitation starting with gentle mobilisation and progressing to full functional strengthening, with CPM therapy, manual techniques, and hydrotherapy.',
    exercises: ['Phase 1: Gentle Range of Motion', 'Phase 2: Strengthening Exercises', 'Phase 3: Functional Training', 'Phase 4: Return to Activities', 'Phase 5: Sport/Work Specific'],
  },
];

const categories = ['All', 'Spine', 'Shoulder', 'Knee', 'Elbow', 'Nerve', 'Foot', 'Sport', 'Surgical'];

export default function Treatments() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const filtered = treatments.filter((t) => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch =
      search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background: 'rgba(10,132,255,0.1)', border: '1px solid rgba(10,132,255,0.2)' }}
            >
              <ChevronRight size={14} style={{ color: '#0A84FF' }} />
              <span style={{ color: '#0A84FF', fontSize: '13px', fontWeight: 600 }}>
                Expert Treatment Plans
              </span>
            </div>
            <h2
              className="section-title mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
            >
              Treatments We{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0A84FF, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Specialise In
              </span>
            </h2>
            <p className="section-subtitle mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Comprehensive, evidence-based physiotherapy for a wide range of conditions.
              Expand any card for full treatment details.
            </p>
          </motion.div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search treatments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input w-full sm:w-72 max-w-full"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? '#0A84FF' : 'var(--glass-bg)',
                  color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${activeCategory === cat ? '#0A84FF' : 'var(--border)'}`,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Treatments grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((treatment, i) => (
            <motion.div
              key={treatment.id}
              className="glass-card p-6 flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() =>
                setExpanded(expanded === treatment.id ? null : treatment.id)
              }
              layout
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{treatment.emoji}</span>
                  <div>
                    <h3
                      className="font-bold"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
                    >
                      {treatment.title}
                    </h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: `${treatment.color}20`,
                        color: treatment.color,
                        fontFamily: 'var(--font-inter)',
                      }}
                    >
                      {treatment.category}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expanded === treatment.id ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                </motion.div>
              </div>

              {/* Duration & sessions */}
              <div className="flex gap-3 mb-4">
                <div
                  className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                >
                  <Clock size={11} />
                  {treatment.duration}
                </div>
                <div
                  className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                >
                  {treatment.sessions}
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {treatment.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: `${treatment.color}15`,
                      color: treatment.color,
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expanded content */}
              <motion.div
                initial={false}
                animate={{ height: expanded === treatment.id ? 'auto' : 0, opacity: expanded === treatment.id ? 1 : 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  className="pt-4"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  {/* Symptoms */}
                  <div className="mb-4">
                    <h5
                      className="text-sm font-semibold mb-2"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
                    >
                      Common Symptoms
                    </h5>
                    <ul className="grid grid-cols-1 gap-1">
                      {treatment.symptoms.slice(0, 3).map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-2 text-xs"
                          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: treatment.color }}
                          />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment */}
                  <div className="mb-4">
                    <h5
                      className="text-sm font-semibold mb-2"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}
                    >
                      Treatment Approach
                    </h5>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                    >
                      {treatment.treatment}
                    </p>
                  </div>

                  <button
                    className="btn-primary w-full justify-center text-sm py-3 mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              No treatments found. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
