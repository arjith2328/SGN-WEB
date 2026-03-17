import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Assets
import gallery4 from './assets/gallery-4.png';
import contactHero from './assets/0dcff79c73a67da491af0896b36e228a98cc1ab4.png';
import gallery6 from './assets/gallery-6.png';

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
};

const navLinks = ['Home', 'About', 'Service', 'Contact'];

function Contact() {
    const [openFaq, setOpenFaq] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        serviceInterest: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const heroRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({
                    fullName: '',
                    email: '',
                    serviceInterest: '',
                    message: ''
                });
            } else {
                setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message.' });
            }
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Network error. Please make sure the backend server is running.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const faqs = [
        {
            q: "Is SGN RoboWorks a product company or a service company?",
            a: "SGN RoboWorks is a technology engineering company that builds both proprietary platforms and custom intelligent systems. While some solutions are delivered as products or SaaS platforms, others are engineered end-to-end based on real-world industrial needs. The focus is on long-term operational intelligence, not one-time services."
        },
        {
            q: "What makes SGN RoboWorks different from typical AI or automation startups?",
            a: "Unlike companies that focus only on software or only on hardware, SGN RoboWorks designs complete intelligent ecosystems—combining AI, IoT, automation, security, and system architecture. Every solution is built to be practical, scalable, and deployable in real industrial environments, not just experimental or demo-driven."
        },
        {
            q: "Are SGN RoboWorks solutions only for agriculture-related industries?",
            a: "No. While SGN RoboWorks has strong capabilities in agri-intelligence and food systems through its AgriTech division, the company also works across industrial automation, IoT infrastructure, cybersecurity, data intelligence, and enterprise platforms. Agriculture is one vertical—not the company’s limitation."
        },
        {
            q: "Who can work with SGN RoboWorks—startups or large enterprises?",
            a: "Both. SGN RoboWorks designs modular and scalable systems that support early-stage startups, growing businesses, and enterprise-scale operations. The same core intelligence can be adapted to different sizes, budgets, and levels of operational complexity."
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-[#f5f5f5] min-h-screen overflow-x-hidden">
            {/* ═══════════════════════════════════════ */}
            {/* HERO SECTION                             */}
            {/* ═══════════════════════════════════════ */}
            <section className="relative h-screen overflow-hidden bg-black">
                <div className="absolute inset-0">
                    <img
                        src={contactHero}
                        alt="Contact Hero"
                        className="w-full h-full object-cover object-center md:object-center opacity-80"
                    />
                </div>

                {/* Top Navbar — Glassmorphic Pill */}
                <motion.nav
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    // Switch from absolute to fixed so it follows the user
                    className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 w-[90%] md:w-auto ${isScrolled ? "top-4" : "top-8"
                        }`}
                >
                    <div className={`nav-pill flex items-center justify-center font-medium px-4 md:px-8 py-2 rounded-full transition-all duration-300 w-full md:w-auto ${isScrolled
                        ? "bg-white/90 backdrop-blur-md shadow-md border border-gray-200"
                        : "bg-transparent"
                        }`}>
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="flex items-center gap-4 md:gap-6">
                                {navLinks.map((link) => (
                                    <a
                                        key={link}
                                        href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                        className={`text-[15px] md:text-[17px] tracking-wide transition-colors duration-300 ${isScrolled ? "text-black hover:text-gray-600" : "text-white hover:opacity-70"
                                            } drop-shadow-sm ${link === 'Contact' ? 'flex' : 'hidden md:flex'}`}
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className={`md:hidden absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"}`}
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
                    {/* Mobile menu dropdown */}
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`absolute top-[120%] left-0 right-0 p-6 flex flex-col gap-4 rounded-3xl md:hidden ${isScrolled
                                ? "bg-white/95 backdrop-blur-md shadow-lg border border-gray-200"
                                : "glass-card border border-white/20"
                                }`}
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                    className={`text-lg font-medium transition-colors ${isScrolled ? "text-gray-800 hover:text-black" : "text-white hover:text-gray-300"}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </motion.nav>

                {/* Hero Text */}
                <div className="absolute bottom-24 left-8 md:left-16 z-10 pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="font-[Playfair_Display] text-white text-5xl md:text-9xl font-normal tracking-wider"
                    >
                        CONTACT US
                    </motion.h1>
                </div>
            </section>


            {/* ═══════════════════════════════════════ */}
            {/* CONTACT FORM SECTION                     */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20">
                    {/* Left Side: Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2 className="text-[32px] md:text-[48px] leading-[1.25] font-normal mb-0 text-[#1a1a1a] max-w-[483px]">
                            Questions ? <br />
                            We Got All Answers !
                        </h2>
                        <p className="text-[#666666] text-[14px] md:text-[16px] mt-6 md:mt-[23px] max-w-[496px] font-normal">
                            Fill in the form or contact us. Our team will get back to you shortly.
                        </p>

                        <div className="mt-[145px] space-y-10">
                            <div className="flex items-center gap-0 relative">
                                <div className="text-[#1a1a1a] w-[40px] md:w-[60px] flex justify-start shrink-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="text-[#1a1a1a] text-[16px] md:text-[18px] font-normal flex-1 flex flex-col md:flex-row md:flex-wrap md:gap-2">
                                    <span>+91 9952915707</span>
                                    <span className="hidden md:inline text-gray-400">|</span>
                                    <span>+91 8610284297</span>
                                    <span className="hidden md:inline text-gray-400">|</span>
                                    <span>+91 6381207641</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-0">
                                <div className="text-[#1a1a1a] w-[40px] md:w-[60px] flex justify-start shrink-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <span className="text-[#1a1a1a] text-[15px] md:text-[18px] font-normal break-all">sgnroboworks@gmail.com</span>
                            </div>

                            <div className="flex items-center gap-0">
                                <div className="text-[#1a1a1a] w-[40px] md:w-[60px] flex justify-start shrink-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <span className="text-[#1a1a1a] text-[15px] md:text-[18px] font-normal break-words">Kodungaiyur, Chennai-600051</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="space-y-6"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[14px] font-normal text-[#333333] mb-3">Full name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#e8e8e8] rounded-full px-8 py-5 outline-none transition-all focus:ring-1 focus:ring-black/10 h-[50px]"
                                />
                            </div>
                            <div>
                                <label className="block text-[14px] font-normal text-[#333333] mb-3">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#e8e8e8] rounded-full px-8 py-5 outline-none transition-all focus:ring-1 focus:ring-black/10 h-[50px]"
                                />
                            </div>
                            <div>
                                <label className="block text-[14px] font-normal text-[#333333] mb-3">Service Interested in</label>
                                <input
                                    type="text"
                                    name="serviceInterest"
                                    value={formData.serviceInterest}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#e8e8e8] rounded-full px-8 py-5 outline-none transition-all focus:ring-1 focus:ring-black/10 h-[50px]"
                                />
                            </div>
                            <div>
                                <label className="block text-[14px] font-normal text-[#333333] mb-3">Message</label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#e8e8e8] rounded-[32px] px-8 py-6 outline-none transition-all focus:ring-1 focus:ring-black/10 resize-none h-[100px]"
                                ></textarea>
                            </div>

                            {submitStatus.message && (
                                <div className={`px-4 py-3 rounded-xl text-sm font-medium ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full text-white rounded-full py-4 tracking-widest uppercase transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900'}`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* FAQ SECTION                              */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-normal text-center mb-12 md:mb-16">
                        Frequently Asked Question ( FAQ’s )
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white border border-black-200 rounded-[20px] overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-medium text-gray-800">{faq.q}</span>
                                    <span className={`transform transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-6">
                                                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* REACH US SECTION                         */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-10">
                    <h3 className="text-3xl md:text-4xl font-normal mb-8 md:mb-10 text-gray-800 text-center md:text-left">Reach us on</h3>

                    <div className="flex flex-wrap gap-5 items-center justify-center md:justify-start">
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/company/sgn-roboworks/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg width="40" height="40" viewBox="0 0 256 256">
                                <rect width="256" height="256" fill="#0a66c2" rx="60" />
                                <path fill="#fff" d="M184.7 217.7h29.3a4 4 0 0 0 4-4l.015-61.8c0-32.3-7-57.2-44.7-57.2-14.4-.5-27.9 6.9-35.2 19.2a.3.3 0 0 1-.6-.2V101.7a4 4 0 0 0-4-4h-27.8a4 4 0 0 0-4 4v112a4 4 0 0 0 4 4h29.3a4 4 0 0 0 4-4v-55.4c0-15.7 3-30.8 22.4-30.8 19.1 0 19.4 17.9 19.4 31.8v54.4a4 4 0 0 0 4 4M38 59.6c0 11.9 9.8 21.6 21.6 21.6 11.9 0 21.6-9.8 21.6-21.6C81.3 47.8 71.5 38 59.6 38 47.8 38 38 47.8 38 59.6m7 158.1h29.3a4 4 0 0 0 4-4V101.7a4 4 0 0 0-4-4H45a4 4 0 0 0-4 4v112a4 4 0 0 0 4 4" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/_.s.g.n.robo.works._/reels/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg width="40" height="40" viewBox="0 0 256 256">
                                <defs>
                                    <radialGradient id="ig-grad" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.7 236 0 68 275.7)" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#fd5" /><stop offset=".1" stopColor="#fd5" /><stop offset=".5" stopColor="#ff543e" /><stop offset="1" stopColor="#c837ab" />
                                    </radialGradient>
                                </defs>
                                <rect width="256" height="256" fill="url(#ig-grad)" rx="60" />
                                <path fill="#fff" d="M128 28c-27.2 0-30.6.1-41.2.6-10.6.5-17.9 2.2-24.3 4.6-6.6 2.6-12.2 6-17.7 11.5-5.6 5.6-9 11.1-11.5 17.7-2.5 6.4-4.2 13.6-4.6 24.3-.5 10.7-.6 14.1-.6 41.2s.1 30.6.6 41.2c.5 10.6 2.2 17.9 4.6 24.3 2.6 6.6 6 12.2 11.5 17.7 5.6 5.6 11.1 9 17.7 11.5 6.4 2.5 13.6 4.2 24.3 4.6 10.7.5 14.1.6 41.2.6s30.6-.1 41.2-.6c10.6-.5 17.9-2.2 24.3-4.6 6.6-2.6 12.1-6 17.7-11.5 5.6-5.6 9-11.1 11.5-17.7 2.5-6.4 4.1-13.6 4.6-24.3.5-10.7.6-14.1.6-41.2s-.1-30.6-.6-41.2c-.5-10.6-2.2-17.9-4.6-24.3-2.6-6.6-6-12.2-11.5-17.7-5.6-5.6-11.1-9-17.7-11.5-6.4-2.5-13.6-4.2-24.3-4.6-10.7-.5-14.1-.6-41.2-.6zm-9 18h9c26.7 0 29.9.1 40.4.6 9.8.4 15 2.1 18.6 3.4 4.7 1.8 8 4 11.5 7.5s5.7 6.8 7.5 11.5c1.4 3.5 3 8.8 3.4 18.6.5 10.5.6 13.7.6 40.4s-.1 29.9-.6 40.4c-.4 9.8-2.1 15-3.4 18.6-1.8 4.7-4 8-7.5 11.5s-6.8 5.7-11.5 7.5c-3.5 1.4-8.8 3-18.6 3.4-10.5.5-13.7.6-40.4.6s-29.9-.1-40.4-.6c-9.8-.4-15-2.1-18.6-3.4-4.7-1.8-8-4-11.5-7.5s-5.7-6.8-7.5-11.5c-1.4-3.5-3-8.8-3.4-18.6-.5-10.5-.6-13.7-.6-40.4s.1-29.9.6-40.4c.4-9.8 2.1-15 3.4-18.6 1.8-4.7 4-8 7.5-11.5s6.8-5.7 11.5-7.5c3.5-1.4 8.8-3 18.6-3.4 9.2-.4 12.8-.5 31.4-.6zm62.4 16.6c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm-53.4 14a51.4 51.4 0 1 0 0 102.7 51.4 51.4 0 0 0 0-102.7zm0 18a33.3 33.3 0 1 1 0 66.7 33.3 33.3 0 0 1 0-66.7z" />
                            </svg>
                        </a>

                        {/* X (Twitter) */}
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <svg width="34" height="34" viewBox="0 0 128 128">
                                <path d="M75.9 54.2L122.5 0h-11L71 47.1 38.7 0H1.4l48.9 71.2L1.4 128h11L55.2 78.3 89.3 128h37.3L75.9 54.2zm-15.1 17.6l-5-7.1L16.4 8.3h17l26.8 38.3 5 7.1 41.3 59.2h-17L60.8 71.8z" />
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a href="https://www.facebook.com/sgnroboworks" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg width="40" height="40" viewBox="0 0 128 128">
                                <rect width="118.4" height="118.4" x="4.8" y="4.8" fill="#3d5a98" rx="20" />
                                <path fill="#fff" d="M86.5 123.2V77.3h15.4l2.3-17.9H86.5v-11.4c0-5.2 1.4-8.7 8.9-8.7h9.5v-16a127 127 0 0 0-13.9-1.3c-13.6 0-23 8.3-23 23.6v13.2H52.6v17.9H68v45.8z" />
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a href="https://www.youtube.com/@SGNRoboWorks" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg width="55" height="55" viewBox="0 0 256 180">
                                <path fill="#f00" d="M250.3 28.1a32.2 32.2 0 0 0-22.6-22.7C207.8 0 127.9 0 127.9 0S47.9.2 28 5.6A32.2 32.2 0 0 0 5.4 28.2c-6 35.3-8.3 89.1.2 123a32.2 32.2 0 0 0 22.6 22.7c19.9 5.4 99.9 5.4 99.9 5.4s80 0 99.8-5.4a32.2 32.2 0 0 0 22.7-22.7c6.3-35.3 8.3-89.1-.2-123.1" />
                                <path fill="#fff" d="m102.4 128.1 66.3-38.4-66.3-38.4z" />
                            </svg>
                        </a>
                    </div>


                    <div className="flex flex-col md:flex-row justify-between gap-12 pt-12 border-t border-gray-100">
                        <div>
                            <div className="flex items-center gap-4">
                                <img src={gallery4} alt="SGN Logo" className="w-14 h-14 rounded-full border border-gray-100 p-1" />
                                <div>
                                    <h3 className="font-[Playfair_Display] text-6xl md:text-8xl  tracking-tighter text-black leading-none">S G N</h3>
                                    <p className="font-[Playfair_Display] text-base md:text-xl text-gray-800 tracking-wide mt-1">Roboworks</p>
                                </div>
                            </div>
                            <p className="mt-8 text-gray-400 text-sm font-medium">@ 2026 Roboworks</p>
                        </div>

                        <div>
                            <h5 className="text-lg font-bold mb-6">Quick access</h5>
                            <ul className="space-y-4">
                                <li><a href="/" className="text-black-700 hover:text-gray transition-colors">Home</a></li>
                                <li><a href="/about" className="text-black-700 hover:text-gray transition-colors">About us</a></li>
                                <li><a href="/service" className="text-black-700 hover:text-gray transition-colors">Services</a></li>
                                <li><a href="/contact" className="text-black-700 hover:text-gray transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-gray-400 text-sm">Designed & Developed by</p>
                        <p className="text-gray-600 text-sm font-semibold tracking-[0.15em] mt-1">TECHLON</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
