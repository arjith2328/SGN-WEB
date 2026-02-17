import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// ── Asset Imports ──
import gallery1 from './assets/gallery-1.png';
import gallery2 from './assets/gallery-2.png';
import gallery3 from './assets/gallery-3.png';
import gallery4 from './assets/gallery-4.png';
import gallery5 from './assets/gallery-5.png';
import gallery6 from './assets/gallery-6.png';
import gallery7 from './assets/gallery-7.png';
import gallery8 from './assets/gallery-8.png';
import gallery9 from './assets/gallery-9.png';
import gallery10 from './assets/gallery-10.png';
import gallery11 from './assets/gallery-11.png';
import gallery12 from './assets/gallery-12.png';

// ── Animation Variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

// ── Nav Links ──
const navLinks = ['Home', 'About', 'Service', 'Contact'];

// ── Services Data ──
const services = [
  { title: 'IoT & Robotics', location: 'Tamil Nadu', desc: 'Hardware-based installation across TN.', img: gallery1 },
  { title: 'AI-Based Products', location: 'Global', desc: 'Custom Software solutions available worldwide.', img: gallery5 },
  { title: 'Smart Home Automation', location: 'Tamil Nadu', desc: 'Direct installation & consultation across TN.', img: gallery3 },
  { title: 'Sustainable Hydro-ponics', location: 'Tamil Nadu', desc: 'Commercial & home farm setup across TN.', img: gallery2 },
  { title: 'Electronics Component Supply', location: 'Tamil Nadu', desc: 'Wholesale supply & dealer network across TN.', img: gallery12 },
];

// ── Mission / Vision Data ──
const missionPoints = [
  'Engineer intelligent, secure, and sustainable systems for real-world industries',
  'Transform complex industrial operations into data-driven, self-optimizing ecosystems',
  'Leverage AI, IoT, automation, and secure digital infrastructure to deliver precision and resilience',
  'Build scalable, energy-efficient, and economically viable solutions for global markets',
  'Enable long-term operational intelligence rather than short-term technology adoption',
];

const visionPoints = [
  'Lead the future of industrial intelligence across food systems, infrastructure, and digital ecosystems',
  'Create autonomous, climate-resilient, and secure operational environments',
  'Redefine how industries adapt, optimize, and scale through intelligent systems',
  'Bridge physical and digital worlds into unified, self-aware infrastructures',
  'Shape a future where technology drives sustainability, trust, and continuous innovation',
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const stickyNavRef = useRef(null);

  // Scroll listener for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // InView hooks
  const welcomeRef = useRef(null);
  const welcomeInView = useInView(welcomeRef, { once: true, margin: '-100px' });
  const aboutCardsRef = useRef(null);
  const aboutCardsInView = useInView(aboutCardsRef, { once: true, margin: '-100px' });
  const companyRef = useRef(null);
  const companyInView = useInView(companyRef, { once: true, margin: '-100px' });
  const mvRef = useRef(null);
  const mvInView = useInView(mvRef, { once: true, margin: '-100px' });
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const limitedRef = useRef(null);
  const limitedInView = useInView(limitedRef, { once: true, margin: '-100px' });
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: '-100px' });
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: '-50px' });

  // Hero parallax
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] overflow-x-hidden">

      {/* ═══════════════════════════════════════ */}
      {/* HERO SECTION — Full Screen Robot Head   */}
      {/* ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img
            src={gallery9}
            alt="SGN Robot"
            className="w-full h-[160vh] object-cover"
          />
        </motion.div>

        {/* Top Navbar — Glassmorphic Pill */}
        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="nav-pill">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
              >
                {link}
              </a>
            ))}
            <span className="text-white text-sm font-semibold tracking-wide">SGN Agritech</span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </motion.nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 left-4 right-4 z-30 glass-card p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <span className="text-white text-lg font-semibold">SGN Agritech</span>
          </motion.div>
        )}

        {/* Bottom-left glass card — SGN RoboWorks */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-24 left-8 md:left-16 z-10 glass-card p-8 md:p-10"
        >
          <h1 className="font-[Playfair_Display] text-white text-6xl md:text-7xl font-bold leading-none">
            SGN
          </h1>
          <p className="font-[Playfair_Display] text-white text-2xl md:text-3xl mt-1">
            RoboWorks
          </p>
          <a href="#contact" className="pill-btn pill-btn-light mt-5 text-white text-sm">
            Contact
          </a>
        </motion.div>

        {/* Bottom-center Explore button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <a
            href="#welcome"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/40 bg-white/15 backdrop-blur-md text-white text-base hover:bg-white/25 transition-all"
          >
            Explore
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5">
              <path d="M8 3v10M4 9l4 4 4-4" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* STICKY NAVBAR (appears after hero)      */}
      {/* ═══════════════════════════════════════ */}
      <div
        ref={stickyNavRef}
        className={`sticky top-0 z-40 flex justify-center py-4 transition-all duration-500 bg-[#f5f5f5] ${scrolled ? 'shadow-sm' : ''}`}
      >
        <div className="nav-pill nav-pill-solid">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#1a1a1a] text-sm font-medium tracking-wide hover:opacity-60 transition-opacity"
            >
              {link}
            </a>
          ))}
          <span className="text-[#1a1a1a] text-sm font-semibold tracking-wide">SGN Agritech</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════ */}
      {/* WELCOME SECTION — "Hola !"              */}
      {/* ═══════════════════════════════════════ */}
      <section id="welcome" className="py-24 md:py-32 bg-white" ref={welcomeRef}>
        <motion.div
          initial="hidden"
          animate={welcomeInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="max-w-4xl mx-auto text-center px-6"
        >
          <motion.h2
            variants={fadeUp}
            className="font-[Playfair_Display] text-5xl md:text-7xl font-bold"
          >
            Hola !
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-[Playfair_Display] text-3xl md:text-5xl mt-4 font-normal leading-tight"
          >
            Welcome to the world of
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-[Playfair_Display] text-3xl md:text-5xl mt-2 tracking-[0.3em] font-normal"
          >
            S G N
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* ABOUT CARDS — Agritech & Roboworks      */}
      {/* ═══════════════════════════════════════ */}
      <section id="about" className="py-16 md:py-24 bg-[#f5f5f5]" ref={aboutCardsRef}>
        <motion.div
          initial="hidden"
          animate={aboutCardsInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="max-w-6xl mx-auto px-6 space-y-12"
        >
          {/* Card 1 — SGN Agritech */}
          <motion.div variants={fadeUp} className="about-card flex-col md:flex-row">
            <div className="md:w-2/5">
              <img src={gallery11} alt="SGN Agritech Aquaponics" className="w-full h-64 md:h-full object-cover" />
            </div>
            <div className="md:w-3/5 p-8 md:p-12 text-center">
              <h3 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold">SGN Agritech</h3>
              <div className="w-40 h-0.5 bg-[#1a1a1a] mx-auto mt-4 mb-6"></div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                SGN Aquaponics is a sustainable way of growing food by combining fish farming and plant cultivation in one shared system. The fish provide natural nutrients through their waste, which feeds the plants, while the plants filter and clean the water that returns to the fish. This creates a balanced, low-waste cycle that uses less water, avoids chemical fertilizers, and produces fresh vegetables and fish in a natural, efficient way.
              </p>
              <button className="pill-btn mt-6 text-sm">explore</button>
            </div>
          </motion.div>

          {/* Card 2 — SGN Roboworks */}
          <motion.div variants={fadeUp} className="about-card flex-col-reverse md:flex-row">
            <div className="md:w-3/5 p-8 md:p-12 text-center">
              <h3 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold">SGN Roboworks</h3>
              <div className="w-40 h-0.5 bg-[#1a1a1a] mx-auto mt-4 mb-6"></div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                SGN Roboworks is the field where robots are designed, built, and programmed to help humans do work more efficiently and safely. It combines engineering, software, and artificial intelligence to create machines that can sense, think, and act in the real world. From factories and hospitals to homes and research labs, roboworks focuses on using robotics to solve problems, improve productivity, and support people in everyday life.
              </p>
              <button className="pill-btn mt-6 text-sm">learn more</button>
            </div>
            <div className="md:w-2/5">
              <img src={gallery10} alt="SGN Roboworks Robotic Arm" className="w-full h-64 md:h-full object-cover" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* COMPANY DESCRIPTION                     */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white" ref={companyRef}>
        <motion.div
          initial="hidden"
          animate={companyInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="max-w-5xl mx-auto text-center px-6"
        >
          <motion.h2
            variants={fadeUp}
            className="font-[Playfair_Display] text-4xl md:text-6xl font-bold"
          >
            SGN Roboworks
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-10 text-gray-600 text-base md:text-lg leading-relaxed max-w-4xl mx-auto"
          >
            SGN RoboWorks is a future-focused technology company engineering intelligent, secure, and sustainable systems for real-world industries. Operating at the intersection of AI, IoT, automation, and secure digital infrastructure, the company transforms complex operational challenges into data-driven, self-optimizing ecosystems, enabling industries to operate with greater efficiency, resilience, and long-term sustainability in an increasingly connected world.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* MISSION & VISION                        */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#f5f5f5]" ref={mvRef}>
        <motion.div
          initial="hidden"
          animate={mvInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10"
        >
          {/* Our Mission */}
          <motion.div variants={fadeUp} className="mv-card">
            <div className="px-8 pt-6 pb-4">
              <span className="inline-block px-8 py-3 rounded-full bg-white text-lg font-[Playfair_Display] font-semibold shadow-sm">
                Our Mission
              </span>
            </div>
            <img src={gallery8} alt="Our Mission" className="w-full h-56 object-cover" />
            <div className="px-8 pt-6 space-y-3">
              {missionPoints.map((point, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed">{point}</p>
              ))}
            </div>
          </motion.div>

          {/* Our Vision */}
          <motion.div variants={fadeUp} className="mv-card">
            <div className="px-8 pt-6 pb-4">
              <span className="inline-block px-8 py-3 rounded-full bg-white text-lg font-[Playfair_Display] font-semibold shadow-sm">
                Our Vision
              </span>
            </div>
            <img src={gallery7} alt="Our Vision" className="w-full h-56 object-cover" />
            <div className="px-8 pt-6 space-y-3">
              {visionPoints.map((point, i) => (
                <p key={i} className="text-sm text-gray-700 leading-relaxed">{point}</p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* SERVICES SECTION                        */}
      {/* ═══════════════════════════════════════ */}
      <section id="service" className="py-24 md:py-32 bg-white" ref={servicesRef}>
        <motion.div
          initial="hidden"
          animate={servicesInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="max-w-6xl mx-auto px-6"
        >
          <motion.h2
            variants={fadeUp}
            className="font-[Playfair_Display] text-4xl md:text-6xl font-bold text-center mb-16"
          >
            The SGN's Services
          </motion.h2>

          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="service-card flex-col md:flex-row"
              >
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold">{service.title}</h3>
                  <p className="text-lg font-medium text-gray-500 mt-1">({service.location})</p>
                  <p className="text-gray-600 mt-4 text-sm md:text-base">{service.desc}</p>
                  <button className="pill-btn mt-6 text-sm">View Service</button>
                </div>
                <div className="w-full md:w-48 h-48 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-40 h-40 md:w-48 md:h-48 object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* "WE ARE NOT LIMITED!" SECTION            */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#f5f5f5]" ref={limitedRef}>
        <motion.div
          initial="hidden"
          animate={limitedInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="max-w-4xl mx-auto text-center px-6"
        >
          <motion.h2
            variants={fadeUp}
            className="font-[Playfair_Display] text-4xl md:text-6xl font-bold small-caps"
          >
            We Are Not Limited !
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-8 text-gray-600 text-base md:text-lg leading-relaxed"
          >
            we are not limited with these services, but we are upgrading ourselves greater with more upcoming new services.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CONTACT / BOOK APPOINTMENTS              */}
      {/* ═══════════════════════════════════════ */}
      <section id="contact" className="py-16 md:py-24 bg-white" ref={contactRef}>
        <motion.div
          initial="hidden"
          animate={contactInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="contact-dark-card relative overflow-hidden">
            {/* Background image */}
            <img
              src={gallery6}
              alt="Contact Background"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-2/5 hidden md:block"></div>
              <div className="md:w-3/5 text-white">
                <h3 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold tracking-wider">
                  BOOK YOUR
                </h3>
                <h3 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold tracking-[0.2em] mt-2">
                  APPOINTMENTS
                </h3>
                <p className="mt-6 text-white/80 text-sm md:text-base leading-relaxed">
                  Our team is just a call away. Whether you need expert guidance, quick support, or a personalized solution, we're here to help you every step of the way. Reach out today and experience professional service designed around your needs.
                </p>
                <a href="#contact" className="pill-btn pill-btn-light mt-8 text-sm text-white">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* FOOTER                                   */}
      {/* ═══════════════════════════════════════ */}
      <footer className="py-16 bg-white border-t border-gray-100" ref={footerRef}>
        <motion.div
          initial="hidden"
          animate={footerInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Left — Brand */}
            <div>
              <div className="flex items-center gap-4">
                <img src={gallery4} alt="SGN Logo" className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-[Playfair_Display] text-3xl font-bold tracking-wider">
                    S G N
                  </h4>
                  <p className="font-[Playfair_Display] text-lg">Roboworks</p>
                </div>
              </div>
              <p className="mt-6 text-gray-500 text-sm">@ 2026 Roboworks</p>
            </div>

            {/* Right — Quick Access */}
            <div>
              <h5 className="text-lg font-bold mb-6">Quick access</h5>
              <ul className="space-y-4">
                <li><a href="#home" className="text-gray-700 hover:text-black transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-700 hover:text-black transition-colors">About us</a></li>
                <li><a href="#service" className="text-gray-700 hover:text-black transition-colors">Services</a></li>
                <li><a href="#contact" className="text-gray-700 hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom credit */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm">Designed & Developed by</p>
            <p className="text-gray-600 text-sm font-semibold tracking-[0.15em] mt-1">TECHLON</p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;
