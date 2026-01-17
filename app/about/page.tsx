"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="w-full min-h-screen bg-white overflow-hidden">
            {/* --- HERO SECTION --- */}
            <section className="relative w-full h-[50vh] md:h-[60vh] bg-[url('/herobg.png')] bg-cover bg-center flex flex-col items-center">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1E5AA8CC] to-[#0C2342F0] opacity-90" />

                <div className="relative w-full z-10 pt-6 px-4 md:px-16">
                    <Header />
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        About Crown-Haven
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white text-lg md:text-xl max-w-2xl opacity-90"
                    >
                        Redefining real estate with trust, transparency, and technology.
                    </motion.p>
                </div>
            </section>

            {/* --- COMPANY INFO --- */}
            <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--heading-color)]">
                            Who We Are
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Crown-Haven is a premier real estate platform dedicated to simplifying the property journey for buyers, sellers, and renters. We bridge the gap between people and places, ensuring a seamless experience rooted in integrity and excellence.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our mission is to empower individuals to make informed real estate decisions through our comprehensive database of verified listings and expert allied services.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-6"
                    >
                        {[
                            { title: "Our Mission", desc: "To provide a trusted platform that revolutionizes how people buy, sell, and rent properties." },
                            { title: "Our Vision", desc: "To be the leading real estate ecosystem known for innovation and customer satisfaction." },
                            { title: "Our Values", desc: "Integrity, Transparency, Customer-Centricity, and Innovation." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[var(--foundation-neutral-4)] p-6 rounded-lg border-l-4 border-[var(--primary-color)]">
                                <h3 className="text-xl font-bold text-[var(--heading-color)] mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="bg-[var(--foundation-primary)] py-20 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--heading-color)] mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Have questions or want to partner with us? We'd love to hear from you. Reach out to our team directly.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Email */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center space-y-4"
                        >
                            <div className="w-12 h-12 bg-[var(--primary-color)] bg-opacity-10 rounded-full flex items-center justify-center text-[var(--primary-color)]">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-bold text-xl text-[var(--heading-color)]">Email Us</h3>
                            <p className="text-gray-500">For general inquiries and support</p>
                            <a href="mailto:info@crownhaven.com" className="font-semibold text-[var(--primary-color)] hover:underline">
                                info@crownhaven.com
                            </a>
                        </motion.div>

                        {/* Phone */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center space-y-4"
                        >
                            <div className="w-12 h-12 bg-[var(--primary-color)] bg-opacity-10 rounded-full flex items-center justify-center text-[var(--primary-color)]">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-bold text-xl text-[var(--heading-color)]">Call Us</h3>
                            <p className="text-gray-500">Mon-Fri from 8am to 5pm</p>
                            <a href="tel:+234800000000" className="font-semibold text-[var(--primary-color)] hover:underline">
                                +234 800 000 000
                            </a>
                        </motion.div>

                        {/* Address */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center space-y-4"
                        >
                            <div className="w-12 h-12 bg-[var(--primary-color)] bg-opacity-10 rounded-full flex items-center justify-center text-[var(--primary-color)]">
                                <MapPin size={24} />
                            </div>
                            <h3 className="font-bold text-xl text-[var(--heading-color)]">Visit Us</h3>
                            <p className="text-gray-500">Come say hello at our office</p>
                            <p className="font-semibold text-[var(--heading-color)]">
                                123 Estate Road, VI, Lagos
                            </p>
                        </motion.div>
                    </div>

                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-bold text-[var(--heading-color)] mb-6">Become a Partner</h3>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Are you an agent, developer, or service provider? Join our network and reach thousands of potential clients.
                        </p>
                        <a
                            href="mailto:partners@crownhaven.com?subject=Partnership Inquiry"
                            className="inline-block bg-[var(--secondary-color)] text-white font-bold py-4 px-8 rounded-md hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Join Our Network
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
