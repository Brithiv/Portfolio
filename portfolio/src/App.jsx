import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  Sun, Moon, Github, Linkedin, Mail, Phone, ExternalLink,
  Award, Briefcase, GraduationCap, BarChart2, Database,
  Code2, TrendingUp, FileSpreadsheet, Layout, Menu, X,
  ChevronDown, Globe, MapPin, Star, Zap, Brain,
} from 'lucide-react'

// ─────────────────────────────────────────────
// PORTFOLIO DATA
// ─────────────────────────────────────────────

const skillsData = [
  {
    name: 'Advanced Excel',
    level: 90,
    icon: '📊',
    size: 'large',
    tags: ['Pivot Tables', 'XLOOKUP', 'Power Query', 'VLOOKUP'],
  },
  {
    name: 'Power BI',
    level: 88,
    icon: '📈',
    size: 'tall',
    tags: ['DAX', 'Data Modeling', 'Dashboards'],
  },
  {
    name: 'SQL',
    level: 85,
    icon: '🗃️',
    size: 'small',
    tags: ['Joins', 'Window Functions', 'Subqueries'],
  },
  {
    name: 'Python',
    level: 80,
    icon: '🐍',
    size: 'large',
    tags: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  {
    name: 'Statistics',
    level: 75,
    icon: '📐',
    size: 'small',
    tags: ['A/B Testing', 'Correlation', 'Hypothesis'],
  },
  {
    name: 'Data Visualization',
    level: 87,
    icon: '🎨',
    size: 'tall',
    tags: ['Charts', 'Dashboards', 'Storytelling'],
  },
  {
    name: 'Dev Tools',
    level: 78,
    icon: '🛠️',
    size: 'small',
    tags: ['Git', 'Jupyter', 'MS Office'],
  },
]

const experiences = [
  {
    title: 'Data Analyst Intern',
    company: 'Oxysoft AI Solutions',
    period: 'Dec 2025 – Feb 2026',
    type: 'internship',
    bullets: [
      'Preprocessed 10,000+ social media posts across 9 platforms using Pandas with 98% accuracy',
      'Identified top 3 peak posting times and 5+ high-performing hashtags via EDA',
      'Delivered platform-wise engagement report improving content reach by 60%',
    ],
  },
  {
    title: 'Data Analyst Intern',
    company: 'KultureHire',
    period: 'Sep 2024 – Oct 2024',
    type: 'internship',
    bullets: [
      'Cleaned and analyzed 500+ survey responses using Excel and MySQL',
      'Applied 15+ Excel formulas and SQL queries for Gen Z career preference analysis',
      'Revealed aspirational trends across startups, big tech, and NGOs',
    ],
  },
  {
    title: 'Data Analyst Intern',
    company: 'Accenture North America',
    period: 'Oct 2024',
    type: 'internship',
    bullets: [
      'Cleaned 25,500+ reactions and 1,000+ content posts using Excel via XLOOKUP',
      'Identified top 5 content categories across 16 reaction types and sentiment analysis',
      'Delivered stakeholder presentation enabling data-driven content strategy decisions',
    ],
  },
  {
    title: 'System Work / Data Operator',
    company: 'E Sevai Nagercoil',
    period: 'Jan 2020 – Present',
    type: 'full-time',
    bullets: [
      'Processed 100+ daily government service applications with 98% accuracy rate',
      'Maintained and verified 150,000+ citizen digital records over 6 years',
      'Developed strong expertise in documentation and process optimization',
    ],
  },
  {
    title: 'Quality Inspector',
    company: 'Tube Products of India',
    period: 'Sep 2017 – Aug 2018',
    type: 'full-time',
    bullets: [
      'Reduced defect rate by 12% through systematic production monitoring',
      'Performed root cause analysis and documented quality reports',
      'Supported continuous improvement initiatives and precision measurement',
    ],
  },
]

const projects = [
  {
    title: 'Social Media Analytics',
    company: 'Oxysoft AI',
    description:
      'Analyzed 10,000+ posts across 9 platforms. Identified peak posting times and top hashtags boosting engagement by 40%.',
    tags: ['Python', 'Pandas', 'EDA'],
    metric: 'Engagement by Platform (%)',
    chartType: 'bar',
    data: [
      { name: 'TikTok', value: 89 },
      { name: 'Instagram', value: 72 },
      { name: 'Twitter', value: 58 },
      { name: 'LinkedIn', value: 45 },
      { name: 'Facebook', value: 38 },
    ],
    highlight: '+60% Reach',
    link: '#',
  },
  {
    title: 'Finance Dashboard',
    company: 'Personal Project',
    description:
      'Interactive Power BI dashboard monitoring income, expenses, savings, and net worth with real-time cash flow tracking.',
    tags: ['Power BI', 'DAX', 'Finance'],
    metric: 'Cash Flow ($K)',
    chartType: 'area',
    data: [
      { name: 'Jan', income: 5.2, expenses: 3.8 },
      { name: 'Feb', income: 5.8, expenses: 4.1 },
      { name: 'Mar', income: 6.1, expenses: 3.9 },
      { name: 'Apr', income: 5.9, expenses: 4.3 },
      { name: 'May', income: 6.5, expenses: 4.0 },
      { name: 'Jun', income: 7.2, expenses: 4.5 },
    ],
    highlight: 'Real-Time KPIs',
    link: '#',
  },
  {
    title: 'E-Commerce Sales',
    company: 'Power BI Project',
    description:
      'Identified top 5 best and worst-selling products with regional sales distribution and monthly profit trends.',
    tags: ['Power BI', 'Sales', 'Analytics'],
    metric: 'Monthly Revenue ($K)',
    chartType: 'line',
    data: [
      { name: 'Jan', revenue: 42 },
      { name: 'Feb', revenue: 58 },
      { name: 'Mar', revenue: 51 },
      { name: 'Apr', revenue: 67 },
      { name: 'May', revenue: 75 },
      { name: 'Jun', revenue: 89 },
    ],
    highlight: '+112% Growth',
    link: '#',
  },
  {
    title: 'Pizza Sales Report',
    company: 'MySQL + Power BI',
    description:
      'Executed 15+ MySQL queries analyzing pizza sales. Calculated Revenue, AOV, Total Orders across categories and sizes.',
    tags: ['MySQL', 'Power BI', 'SQL'],
    metric: 'Sales by Category',
    chartType: 'pie',
    data: [
      { name: 'Classic', value: 35 },
      { name: 'Supreme', value: 28 },
      { name: 'Veggie', value: 20 },
      { name: 'Chicken', value: 17 },
    ],
    highlight: '15+ SQL Queries',
    link: '#',
  },
  {
    title: 'Weather Analysis',
    company: 'Python Project',
    description:
      'Statistical analysis identifying weather patterns. "Mainly Clear" (24%) and "Mostly Cloudy" (23.5%) as dominant conditions.',
    tags: ['Python', 'Matplotlib', 'Statistics'],
    metric: 'Condition Distribution (%)',
    chartType: 'bar',
    data: [
      { name: 'Clear', value: 24 },
      { name: 'Cloudy', value: 23.5 },
      { name: 'Overcast', value: 18 },
      { name: 'Rain', value: 22.5 },
      { name: 'Foggy', value: 12 },
    ],
    highlight: 'Statistical EDA',
    link: '#',
  },
  {
    title: 'Pizzabun Sales',
    company: 'Excel Dashboard',
    description:
      'Analyzed 794 orders generating $438K revenue across 6 products over 85 days. Online 52%, Physical 48% split.',
    tags: ['Excel', 'Pivot Tables', 'Dashboard'],
    metric: 'Revenue by Product ($K)',
    chartType: 'bar',
    data: [
      { name: 'Prod A', value: 95 },
      { name: 'Prod B', value: 82 },
      { name: 'Prod C', value: 78 },
      { name: 'Prod D', value: 71 },
      { name: 'Prod E', value: 67 },
      { name: 'Prod F', value: 45 },
    ],
    highlight: '$438K Revenue',
    link: '#',
  },
]

const certifications = [
  {
    name: 'AI-Driven Data Analytics',
    issuer: 'Oxysoft AI Solutions & Research Foundation',
    year: '2026',
  },
  {
    name: 'Data Analytics & Visualization',
    issuer: 'Accenture North America (Forage)',
    year: '2024',
  },
  {
    name: 'Data Analytics Internship',
    issuer: 'KultureHire',
    year: '2024',
  },
  {
    name: 'Data Analysis Certification',
    issuer: 'Microsoft & LinkedIn',
    year: '2024',
  },
  {
    name: 'Advanced Excel',
    issuer: 'Udemy',
    year: '2023',
  },
  {
    name: 'Advanced SQL',
    issuer: 'Udemy',
    year: '2023',
  },
]

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

// ─────────────────────────────────────────────
// SHARED: SECTION TITLE
// ─────────────────────────────────────────────

function SectionTitle({ children, subtitle, dark }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeInUp}
      className="text-center mb-16"
    >
      <h2
        className={`text-4xl md:text-5xl font-display font-bold mb-4 ${
          dark ? 'text-gradient-dark' : 'text-gradient-light'
        }`}
      >
        {children}
      </h2>
      {subtitle && (
        <p className="font-body text-base text-[#0F172A]/55 dark:text-[#F8FAFC]/55 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// HERO: ANIMATED SVG CHART
// ─────────────────────────────────────────────

function HeroChart({ dark }) {
  const accent = dark ? '#06B6D4' : '#2563EB'
  const secondary = dark ? '#8B5CF6' : '#10B981'
  const gridLine = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'

  const path1 = 'M 0 130 C 50 110, 80 70, 120 75 S 180 100, 220 60 S 275 25, 320 45 S 375 30, 400 20'
  const path2 = 'M 0 160 C 60 145, 90 115, 130 120 S 190 148, 230 115 S 285 80, 330 95 S 375 105, 400 90'

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <filter id="hcGlow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hcGlow2">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[36, 72, 108, 144].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={gridLine} strokeWidth="1" />
        ))}
        {[80, 160, 240, 320, 400].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="180" stroke={gridLine} strokeWidth="1" />
        ))}

        {/* Area fill */}
        <motion.path
          d={`${path1} L 400 180 L 0 180 Z`}
          fill="url(#areaFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.8 }}
        />

        {/* Secondary dashed line */}
        <motion.path
          d={path2}
          fill="none"
          stroke={secondary}
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity={0}
          filter="url(#hcGlow2)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ duration: 2.8, ease: 'easeInOut', delay: 1 }}
        />

        {/* Primary line — loops */}
        <motion.path
          d={path1}
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#hcGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2.2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 2.5,
          }}
        />

        {/* Data point dots */}
        {[
          [0, 130], [120, 75], [220, 60], [320, 45], [400, 20],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill={accent}
            filter="url(#hcGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, delay: i * 0.38 + 0.5 }}
          />
        ))}

        {/* Scan line */}
        <motion.line
          x1="0" y1="0" x2="0" y2="180"
          stroke={accent}
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ x: 0 }}
          animate={{ x: 400 }}
          transition={{
            duration: 2.2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 2.5,
          }}
        />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────

function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact']
  const accent = dark ? '#06B6D4' : '#2563EB'

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-[#FAFAFC]/80 dark:bg-[#0B0F19]/80 border-b border-black/5 dark:border-white/5 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          className="font-display font-extrabold text-xl tracking-tight"
        >
          <span style={{ color: accent }}>BK</span>
          <span className="text-[#0F172A] dark:text-[#F8FAFC]">.</span>
          <span className="text-[#0F172A]/30 dark:text-[#F8FAFC]/30 font-normal text-sm ml-1">
            Data Analyst
          </span>
        </motion.a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm text-[#0F172A]/60 dark:text-[#F8FAFC]/60 hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors duration-200 relative group"
            >
              {link}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: accent }}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <motion.button
            onClick={() => setDark(!dark)}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle theme"
            className={`relative flex items-center w-14 h-7 rounded-full p-0.5 transition-colors duration-500 border ${
              dark
                ? 'bg-[#06B6D4]/15 border-[#06B6D4]/35'
                : 'bg-[#2563EB]/10 border-[#2563EB]/25'
            }`}
          >
            <motion.div
              animate={{ x: dark ? 28 : 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className={`w-5 h-5 rounded-full flex items-center justify-center shadow-sm ${
                dark ? 'bg-[#06B6D4]' : 'bg-[#2563EB]'
              }`}
            >
              {dark ? (
                <Moon size={10} className="text-white" />
              ) : (
                <Sun size={10} className="text-white" />
              )}
            </motion.div>
          </motion.button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1 text-[#0F172A] dark:text-[#F8FAFC]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#FAFAFC]/95 dark:bg-[#111827]/95 backdrop-blur-xl border-t border-black/5 dark:border-white/5"
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 font-body text-sm text-[#0F172A]/70 dark:text-[#F8FAFC]/70 hover:bg-black/3 dark:hover:bg-white/3 transition-colors"
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────

function Hero({ dark }) {
  const accent = dark ? '#06B6D4' : '#2563EB'
  const secondary = dark ? '#8B5CF6' : '#10B981'

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.08]"
          style={{ background: accent }}
        />
        <div
          className="absolute -bottom-32 -right-24 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.08]"
          style={{ background: secondary }}
        />
        {/* Grid dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(${dark ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* — Left: text — */}
        <div>
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body mb-7 border"
            style={{
              borderColor: `${accent}28`,
              background: `${accent}08`,
              color: accent,
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse-glow"
              style={{ background: accent }}
            />
            Open to Data Analyst Roles
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] mb-6"
          >
            Uncovering the{' '}
            <span
              className={dark ? 'text-gradient-dark' : 'text-gradient-light'}
            >
              Stories
            </span>{' '}
            Hidden in Your Data.
          </motion.h1>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="font-body text-lg text-[#0F172A]/55 dark:text-[#F8FAFC]/55 mb-9 max-w-lg leading-relaxed"
          >
            Hi, I'm{' '}
            <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              Biruthivin BK
            </span>
            . A Data Analyst with 7+ years of professional experience in process
            documentation and quality management — now translating raw data into
            compelling, actionable insights.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-xl font-body font-medium text-white text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              style={{
                background: accent,
                boxShadow: `0 8px 24px ${accent}35`,
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-xl font-body font-medium text-sm transition-all duration-300 hover:scale-[1.03] border"
              style={{
                borderColor: `${accent}35`,
                color: accent,
              }}
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex gap-8"
          >
            {[
              { v: '7+', l: 'Yrs Experience' },
              { v: '26K+', l: 'Apps Processed' },
              { v: '150K+', l: 'Records Managed' },
            ].map((s) => (
              <div key={s.l}>
                <div
                  className="font-display font-bold text-2xl"
                  style={{ color: accent }}
                >
                  {s.v}
                </div>
                <div className="font-body text-xs text-[#0F172A]/45 dark:text-[#F8FAFC]/45 mt-0.5">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* — Right: animated chart card — */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Main chart card */}
          <div
            className={`relative rounded-2xl overflow-hidden p-6 ${
              dark
                ? 'bg-[#111827] border border-slate-800/80'
                : 'bg-white border border-gray-100 shadow-card-light'
            }`}
          >
            {/* Subtle inner glow */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 20% 20%, ${accent}, transparent 70%)`,
              }}
            />

            {/* Card title row */}
            <div className="relative flex items-center justify-between mb-4">
              <div>
                <div className="font-display font-semibold text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                  Analytics Overview
                </div>
                <div className="font-body text-xs text-[#0F172A]/40 dark:text-[#F8FAFC]/40 mt-0.5">
                  Live engagement metrics
                </div>
              </div>
              <div className="flex gap-1.5">
                {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-52">
              <HeroChart dark={dark} />
            </div>

            {/* Legend */}
            <div className="relative flex gap-5 mt-3">
              {[
                { c: accent, l: 'Engagement' },
                { c: secondary, l: 'Reach', dashed: true },
              ].map(({ c, l, dashed }) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-0.5 rounded-full"
                    style={{
                      background: dashed
                        ? `repeating-linear-gradient(90deg, ${c} 0, ${c} 4px, transparent 4px, transparent 8px)`
                        : c,
                    }}
                  />
                  <span className="font-body text-xs text-[#0F172A]/45 dark:text-[#F8FAFC]/45">
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-4 px-3 py-2 rounded-xl text-xs font-body font-semibold text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${accent}, ${secondary})` }}
          >
            ↑ 40% Engagement
          </motion.div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl text-xs font-body font-semibold text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${secondary}, ${accent})` }}
          >
            ✓ 98% Accuracy
          </motion.div>

          {/* Side stat card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className={`absolute -right-8 top-1/2 -translate-y-1/2 px-4 py-3 rounded-xl text-center hidden lg:block ${
              dark
                ? 'bg-[#111827] border border-slate-800'
                : 'bg-white shadow-card-light border border-gray-100'
            }`}
          >
            <div
              className="font-display font-bold text-xl"
              style={{ color: secondary }}
            >
              6+
            </div>
            <div className="font-body text-xs text-[#0F172A]/45 dark:text-[#F8FAFC]/45 mt-0.5">
              Projects
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-body text-xs text-[#0F172A]/30 dark:text-[#F8FAFC]/30">
          scroll
        </span>
        <ChevronDown
          size={18}
          className="text-[#0F172A]/25 dark:text-[#F8FAFC]/25"
        />
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SKILLS — BENTO GRID
// ─────────────────────────────────────────────

function SkillCard({ skill, dark, accent }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{
        y: -4,
        boxShadow: `0 24px 48px ${accent}22`,
      }}
      className={`relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between cursor-default group transition-shadow duration-300 ${
        dark
          ? 'bg-[#111827] border border-slate-800/80'
          : 'bg-white border border-gray-100 shadow-card-light'
      }`}
      style={{
        gridColumn: skill.size === 'large' ? 'span 2' : 'span 1',
        gridRow: skill.size === 'tall' ? 'span 2' : 'span 1',
        minHeight: skill.size === 'small' ? '130px' : '155px',
      }}
    >
      {/* Corner glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${accent}14, transparent 65%)`,
        }}
      />

      <div className="relative z-10">
        <div className="text-2xl mb-2.5">{skill.icon}</div>
        <div className="font-display font-semibold text-sm text-[#0F172A] dark:text-[#F8FAFC] mb-2">
          {skill.name}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-1.5 bg-[#0F172A]/08 dark:bg-white/08 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${accent}, ${accent}bb)` }}
            />
          </div>
          <span
            className="font-mono text-xs font-medium tabular-nums"
            style={{ color: accent }}
          >
            {skill.level}%
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {skill.tags.slice(0, skill.size === 'large' ? 4 : 2).map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md text-[11px] font-body font-medium"
            style={{ background: `${accent}14`, color: accent }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function Skills({ dark }) {
  const colors = dark
    ? ['#06B6D4', '#8B5CF6', '#06B6D4', '#8B5CF6', '#06B6D4', '#8B5CF6', '#06B6D4']
    : ['#2563EB', '#10B981', '#2563EB', '#10B981', '#2563EB', '#10B981', '#2563EB']

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          dark={dark}
          subtitle="A comprehensive toolkit for transforming raw data into compelling business intelligence."
        >
          Skills & Expertise
        </SectionTitle>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {skillsData.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              dark={dark}
              accent={colors[i % colors.length]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EXPERIENCE — TIMELINE
// ─────────────────────────────────────────────

function ExperienceCard({ exp, dark, accent }) {
  const isIntern = exp.type === 'internship'
  return (
    <motion.div variants={fadeInUp} className="relative pl-12 md:pl-20">
      {/* Timeline dot */}
      <div
        className="absolute left-2.5 md:left-[26px] w-4 h-4 rounded-full border-2 border-[#FAFAFC] dark:border-[#0B0F19]"
        style={{
          background: accent,
          top: '1.4rem',
          boxShadow: `0 0 0 3px ${accent}30`,
        }}
      />

      <motion.div
        whileHover={{ y: -2 }}
        className={`rounded-2xl p-6 transition-shadow duration-300 ${
          dark
            ? 'bg-[#111827] border border-slate-800/80'
            : 'bg-white border border-gray-100 shadow-card-light'
        }`}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-display font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              {exp.title}
            </h3>
            <div className="font-body text-sm font-medium mt-0.5" style={{ color: accent }}>
              {exp.company}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-body font-medium"
              style={{ background: `${accent}14`, color: accent }}
            >
              {isIntern ? 'Internship' : 'Full-time'}
            </span>
            <span className="font-mono text-xs text-[#0F172A]/40 dark:text-[#F8FAFC]/40">
              {exp.period}
            </span>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2">
          {exp.bullets.map((b, i) => (
            <li
              key={i}
              className="font-body text-sm text-[#0F172A]/65 dark:text-[#F8FAFC]/65 flex items-start gap-2.5 leading-relaxed"
            >
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: accent }}
              />
              {b}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

function Experience({ dark }) {
  const accentCycle = dark
    ? ['#06B6D4', '#8B5CF6', '#06B6D4', '#8B5CF6', '#06B6D4']
    : ['#2563EB', '#10B981', '#2563EB', '#10B981', '#2563EB']

  return (
    <section
      id="experience"
      className={`py-24 px-6 ${dark ? 'bg-[#111827]/40' : 'bg-[#F4F6FA]'}`}
    >
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          dark={dark}
          subtitle="From quality management to cutting-edge data analytics — a purposeful evolution."
        >
          Experience
        </SectionTitle>

        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute left-4 md:left-8 top-0 bottom-0 w-px ${
              dark ? 'bg-slate-700/80' : 'bg-gray-200'
            }`}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="space-y-6"
          >
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={i}
                exp={exp}
                dark={dark}
                accent={accentCycle[i % accentCycle.length]}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// PROJECT CHART
// ─────────────────────────────────────────────

function ProjectChart({ project, dark, accent, secondary }) {
  const grid = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'
  const tick = dark ? 'rgba(248,250,252,0.45)' : 'rgba(15,23,42,0.45)'
  const tt = {
    backgroundColor: dark ? '#1e293b' : '#fff',
    border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
    borderRadius: '8px',
    fontSize: '11px',
    color: dark ? '#F8FAFC' : '#0F172A',
    padding: '4px 8px',
  }
  const PIE_COLORS = [accent, secondary, '#F59E0B', '#EF4444']

  if (project.chartType === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={project.data} margin={{ top: 4, right: 4, bottom: 4, left: -22 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 9, fill: tick }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: tick }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={tt} cursor={{ fill: `${accent}12` }} />
          <Bar dataKey="value" fill={accent} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (project.chartType === 'area') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={project.data} margin={{ top: 4, right: 4, bottom: 4, left: -22 }}>
          <defs>
            <linearGradient id={`ga-${accent}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={accent} stopOpacity={0.35} />
              <stop offset="95%" stopColor={accent} stopOpacity={0} />
            </linearGradient>
            <linearGradient id={`gb-${secondary}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={secondary} stopOpacity={0.35} />
              <stop offset="95%" stopColor={secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 9, fill: tick }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: tick }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={tt} />
          <Area
            type="monotone"
            dataKey="income"
            stroke={accent}
            fill={`url(#ga-${accent})`}
            strokeWidth={1.5}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke={secondary}
            fill={`url(#gb-${secondary})`}
            strokeWidth={1.5}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  if (project.chartType === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={project.data} margin={{ top: 4, right: 4, bottom: 4, left: -22 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 9, fill: tick }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: tick }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={tt} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={accent}
            strokeWidth={2}
            dot={{ fill: accent, r: 2.5, strokeWidth: 0 }}
            activeDot={{ r: 4, fill: accent }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (project.chartType === 'pie') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={project.data}
            cx="50%"
            cy="50%"
            innerRadius="38%"
            outerRadius="68%"
            paddingAngle={3}
            dataKey="value"
          >
            {project.data.map((_, idx) => (
              <Cell
                key={idx}
                fill={PIE_COLORS[idx % PIE_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip contentStyle={tt} />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return null
}

// ─────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────

function ProjectCard({ project, dark, accent, secondary }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5, boxShadow: `0 28px 56px ${accent}1c` }}
      className={`rounded-2xl overflow-hidden group transition-shadow duration-300 flex flex-col ${
        dark
          ? 'bg-[#111827] border border-slate-800/80'
          : 'bg-white border border-gray-100 shadow-card-light'
      }`}
    >
      {/* Chart area */}
      <div
        className={`relative p-4 pt-3 ${
          dark ? 'bg-[#0B0F19]/60' : 'bg-[#F8FAFC]'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="font-body text-[10px] text-[#0F172A]/40 dark:text-[#F8FAFC]/40 uppercase tracking-wide">
            {project.metric}
          </div>
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-body font-semibold text-white"
            style={{ background: accent }}
          >
            {project.highlight}
          </span>
        </div>
        <div className="h-28">
          <ProjectChart
            project={project}
            dark={dark}
            accent={accent}
            secondary={secondary}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-display font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-sm">
            {project.title}
          </h3>
          <a
            href={project.link}
            className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
            style={{ color: accent }}
            aria-label="Open project"
          >
            <ExternalLink size={13} />
          </a>
        </div>
        <div className="font-body text-xs font-medium mb-2.5" style={{ color: accent }}>
          {project.company}
        </div>
        <p className="font-body text-sm text-[#0F172A]/58 dark:text-[#F8FAFC]/58 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-[11px] font-body font-medium"
              style={{ background: `${accent}14`, color: accent }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function Projects({ dark }) {
  const accentPairs = dark
    ? [['#06B6D4', '#8B5CF6'], ['#8B5CF6', '#06B6D4'], ['#06B6D4', '#8B5CF6'],
       ['#8B5CF6', '#06B6D4'], ['#06B6D4', '#8B5CF6'], ['#8B5CF6', '#06B6D4']]
    : [['#2563EB', '#10B981'], ['#10B981', '#2563EB'], ['#2563EB', '#10B981'],
       ['#10B981', '#2563EB'], ['#2563EB', '#10B981'], ['#10B981', '#2563EB']]

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          dark={dark}
          subtitle="Real-world analytics projects spanning social media, finance, e-commerce, and more."
        >
          Projects
        </SectionTitle>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              dark={dark}
              accent={accentPairs[i][0]}
              secondary={accentPairs[i][1]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────

function Certifications({ dark }) {
  const accentCycle = dark
    ? ['#06B6D4', '#8B5CF6', '#06B6D4', '#8B5CF6', '#06B6D4', '#8B5CF6']
    : ['#2563EB', '#10B981', '#2563EB', '#10B981', '#2563EB', '#10B981']

  return (
    <section
      id="certifications"
      className={`py-24 px-6 ${dark ? 'bg-[#111827]/40' : 'bg-[#F4F6FA]'}`}
    >
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          dark={dark}
          subtitle="Continuous learning through industry-recognized certifications."
        >
          Certifications
        </SectionTitle>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-4"
        >
          {certifications.map((cert, i) => {
            const accent = accentCycle[i]
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                className={`flex items-center gap-4 p-5 rounded-2xl transition-shadow duration-300 ${
                  dark
                    ? 'bg-[#111827] border border-slate-800/80'
                    : 'bg-white border border-gray-100 shadow-card-light'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${accent}16` }}
                >
                  <Award size={19} style={{ color: accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-medium text-[#0F172A] dark:text-[#F8FAFC] text-sm truncate">
                    {cert.name}
                  </div>
                  <div className="font-body text-xs text-[#0F172A]/45 dark:text-[#F8FAFC]/45 mt-0.5 truncate">
                    {cert.issuer}
                  </div>
                </div>
                <span
                  className="font-mono text-xs font-semibold flex-shrink-0"
                  style={{ color: accent }}
                >
                  {cert.year}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────

function Contact({ dark }) {
  const accent = dark ? '#06B6D4' : '#2563EB'
  const secondary = dark ? '#8B5CF6' : '#10B981'

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'bkbrithivin@gmail.com',
      href: 'mailto:bkbrithivin@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8056343964',
      href: 'tel:+918056343964',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'biruthivin-data-analyst',
      href: 'https://linkedin.com/in/biruthivin-data-analyst',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Brithiv',
      href: 'https://github.com/Brithiv',
    },
  ]
  const accents = [accent, secondary, accent, secondary]

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionTitle dark={dark}>Let's Connect</SectionTitle>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-body text-[#0F172A]/55 dark:text-[#F8FAFC]/55 mb-10 leading-relaxed"
        >
          Ready to transform your data into actionable insights? Let's discuss
          how I can add measurable value to your team.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-4 mb-8"
        >
          {contacts.map((c, i) => {
            const a = accents[i]
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ y: -2, boxShadow: `0 16px 32px ${a}1c` }}
                className={`flex items-center gap-3.5 p-4 rounded-2xl transition-shadow duration-300 ${
                  dark
                    ? 'bg-[#111827] border border-slate-800/80'
                    : 'bg-white border border-gray-100 shadow-card-light'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${a}16` }}
                >
                  <c.icon size={18} style={{ color: a }} />
                </div>
                <div className="min-w-0">
                  <div className="font-body text-xs text-[#0F172A]/40 dark:text-[#F8FAFC]/40">
                    {c.label}
                  </div>
                  <div className="font-body text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] truncate">
                    {c.value}
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-1.5 font-body text-sm text-[#0F172A]/35 dark:text-[#F8FAFC]/35"
        >
          <MapPin size={13} />
          Nagercoil, Tamil Nadu, India
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

function Footer({ dark }) {
  const accent = dark ? '#06B6D4' : '#2563EB'
  return (
    <footer
      className={`border-t py-8 px-6 ${
        dark ? 'border-slate-800/60' : 'border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-body text-sm text-[#0F172A]/35 dark:text-[#F8FAFC]/35">
          © 2026 Biruthivin BK · All rights reserved.
        </div>
        <div className="flex items-center gap-1.5 font-body text-sm text-[#0F172A]/35 dark:text-[#F8FAFC]/35">
          Crafted with
          <span style={{ color: accent }}>♥</span>
          & data
        </div>
        <a
          href="https://biruthivin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-body text-sm transition-colors hover:opacity-80"
          style={{ color: accent }}
        >
          <Globe size={13} />
          Biruthivin.com
        </a>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [dark])

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0B0F19] transition-colors duration-500">
      <Navbar dark={dark} setDark={setDark} />
      <Hero dark={dark} />
      <Skills dark={dark} />
      <Experience dark={dark} />
      <Projects dark={dark} />
      <Certifications dark={dark} />
      <Contact dark={dark} />
      <Footer dark={dark} />
    </div>
  )
}
