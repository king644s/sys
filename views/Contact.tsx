'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
export function Contact() {
  // Forms states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!location.trim()) newErrors.location = "Location is required";
    if (!message.trim()) newErrors.message = "Please enter a message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API transport
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="transition-page-enter">
      <Breadcrumbs />
      <section className="max-w-4xl mx-auto px-6 text-center py-8">
        <h1 className="font-serif text-4xl md:text-6xl text-cream font-light tracking-tight">
          Request Quotation <span className="italic font-serif text-gold font-normal">& Layouts</span>
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left Side: Contact metadata */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Mumbai HQ Location card */}
          <div className="bg-surface border border-border p-8 rounded-sm flex flex-col gap-6">
            <h3 className="font-serif text-xl font-bold text-cream">Factory & Experience Center</h3>
            
            <div className="flex flex-col gap-5 font-sans text-base text-text-dim leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <strong className="text-cream block font-mono text-sm tracking-[0.12em] uppercase mb-1.5">Factory and Experience Studio</strong>
                  <span>Systems Creator, Mumbai, Maharashtra, India.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <strong className="text-cream block font-mono text-sm tracking-[0.12em] uppercase mb-1.5">Phone / WhatsApp</strong>
                  <a href="tel:+919820281588" className="hover:text-gold hover:underline transition-colors">
                    +91 98202 81588
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <strong className="text-cream block font-mono text-sm tracking-[0.12em] uppercase mb-1.5">EMAIL DIRECTORY</strong>
                  <a href="mailto:sales@systemscreator.com" className="hover:text-gold hover:underline transition-colors">
                    sales@systemscreator.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-fidelity request form */}
        <div className="lg:col-span-7 bg-surface border border-border p-8 md:p-10 rounded-sm" id="contact-submission-panel">
          {isSubmitted ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <CheckCircle2 className="w-16 h-16 text-gold animate-pulse-glow mb-2" />
              <h2 className="font-serif text-3xl text-cream font-medium">Transmission Successful</h2>
              <p className="font-sans text-sm text-text-dim max-w-md leading-relaxed mt-1">
                Your layout request has been recorded under reference code <strong className="text-gold font-mono">SYS-REQ-#{Math.floor(Math.random() * 90000) + 10000}</strong>. Our custom calibration desk in Mumbai will connect within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 border border-border-mid text-text-dim hover:text-cream px-6 py-2.5 text-xs font-mono lowercase"
              >
                lodge another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="border-b border-border/50 pb-4">
                <h3 className="font-serif text-2xl font-bold text-cream">Tell Us About Your Project</h3>
              </div>

              {/* Grid block for inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name-input" className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim font-bold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: '' })); }}
                    placeholder="e.g. Ketan Bhadra"
                    className="bg-void border border-border focus:border-gold/50 text-cream rounded-sm px-4 py-3 placeholder:text-text-ghost text-sm focus:outline-none transition-all focus-visible:ring-2 focus-visible:ring-gold"
                  />
                  {errors.name && <span id="name-error" role="alert" className="font-mono text-xs text-red-400 uppercase">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email-input" className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim font-bold">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                    placeholder="architect@firm.in"
                    className="bg-void border border-border focus:border-gold/50 text-cream rounded-sm px-4 py-3 placeholder:text-text-ghost text-sm focus:outline-none transition-all focus-visible:ring-2 focus-visible:ring-gold"
                  />
                  {errors.email && <span id="email-error" role="alert" className="font-mono text-xs text-red-400 uppercase">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone-input" className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim font-bold">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    aria-required="true"
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors(prev => ({ ...prev, phone: '' })); }}
                    placeholder="+91 98202 81588"
                    className="bg-void border border-border focus:border-gold/50 text-cream rounded-sm px-4 py-3 placeholder:text-text-ghost text-sm focus:outline-none transition-all focus-visible:ring-2 focus-visible:ring-gold"
                  />
                  {errors.phone && <span id="phone-error" role="alert" className="font-mono text-xs text-red-400 uppercase">{errors.phone}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="location-input" className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim font-bold">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="location-input"
                    type="text"
                    required
                    aria-required="true"
                    aria-describedby={errors.location ? "location-error" : undefined}
                    value={location}
                    onChange={(e) => { setLocation(e.target.value); if (errors.location) setErrors(prev => ({ ...prev, location: '' })); }}
                    placeholder="City or project site"
                    className="bg-void border border-border focus:border-gold/50 text-cream rounded-sm px-4 py-3 placeholder:text-text-ghost text-sm focus:outline-none transition-all focus-visible:ring-2 focus-visible:ring-gold"
                  />
                  {errors.location && <span id="location-error" role="alert" className="font-mono text-xs text-red-400 uppercase">{errors.location}</span>}
                </div>
              </div>

              {/* Message box */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message-input" className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim font-bold">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message-input"
                  required
                  rows={5}
                  aria-required="true"
                  aria-describedby={errors.message ? "message-error" : undefined}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(prev => ({ ...prev, message: '' })); }}
                  placeholder="Tell us about the project design, spacing details, required dimming adapters (DALI/Phase-cut) etc..."
                  className="bg-void border border-border focus:border-gold/50 text-cream rounded-sm px-4 py-3 placeholder:text-text-ghost text-sm focus:outline-none transition-all resize-none focus-visible:ring-2 focus-visible:ring-gold"
                />
                {errors.message && <span id="message-error" role="alert" className="font-mono text-xs text-red-400 uppercase">{errors.message}</span>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-light text-void-dark font-bold font-mono text-[11px] uppercase tracking-widest py-4 transition-all duration-300 h-12 flex items-center justify-center gap-2 cursor-pointer shadow-card hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-void-dark border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Edge-to-edge Google Map Section */}
      <section className="w-full mt-12 border-t border-border/40 overflow-hidden relative group/map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.7812477660514!2d72.82943207580763!3d19.16105044929586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b716a4d6563f%3A0xcf32cb22acb35582!2sSYSlight%20by%20Systems%20Creator!5e0!3m2!1sen!2sin!4v1783199938675!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-[450px] block border-none dark:invert-[0.9] dark:hue-rotate-[190deg] dark:opacity-95"
        />
        {/* Visual brand overlay borders */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />
      </section>
    </div>
  );
}
