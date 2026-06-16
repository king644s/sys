'use client';

import React, { useState, useRef } from 'react';
import { useLightingStore } from '../store/lightingStore';
import { PRODUCTS } from '../data';
import { Mail, Phone, MapPin, CheckCircle2, Upload, Trash2, FileText, Send, Building } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
export function Contact() {
  const { cartEnquiry, removeFromEnquiry } = useLightingStore();
  const enquiredProducts = PRODUCTS.filter(p => cartEnquiry.includes(p.id));

  // Forms states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firmName, setFirmName] = useState('');
  const [projectCity, setProjectCity] = useState('Mumbai');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // File Upload states (Supports Drag & Drop)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Full Name or Lead Architect represents is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please supply a valid professional email address";
    }
    if (!firmName.trim()) newErrors.firm = "Establishment or architectural guild firm is required";
    if (!message.trim()) newErrors.message = "Please list a brief synopsis of your lighting schedule";
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

  // Drag-and-Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArr = Array.from(e.dataTransfer.files);
      setAttachedFiles(prev => [...prev, ...filesArr]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArr = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...filesArr]);
    }
  };

  const triggerFileBrowser = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (idx: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="transition-page-enter">
      <Breadcrumbs />
      <section className="max-w-4xl mx-auto px-6 text-center py-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-3 block">
          05 / secure consultation
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-cream font-light tracking-tight">
          Request Quotation <span className="italic font-serif text-gold font-normal">& Layouts</span>
        </h1>
        <p className="font-sans text-xs md:text-sm text-text-dim max-w-xl mx-auto mt-5 leading-relaxed">
          Need a layout spec sheet, custom photometrics, or sample mockups? Send us your project bounds or DWG vectors. Our layout experts will assemble a complete specification index.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left Side: Contact metadata + Current estimate sheet items list */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Mumbai HQ Location card */}
          <div className="bg-surface border border-border p-8 rounded-[1px] flex flex-col gap-6">
            <h3 className="font-serif text-xl font-bold text-cream">Mumbai Headquarters</h3>
            
            <div className="flex flex-col gap-4 font-sans text-xs text-text-dim leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream block font-mono text-[10px] tracking-wider uppercase mb-1">FACTORY & STUDIO</strong>
                  <span>Systems Creator, Mumbai, Maharashtra, India.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream block font-mono text-[10px] tracking-wider uppercase mb-1">DIRECT TELEPHONE</strong>
                  <span>+91 98200 04966</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream block font-mono text-[10px] tracking-wider uppercase mb-1">EMAIL DIRECTORY</strong>
                  <span>info@syslight.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current quote enquiry tray listing */}
          <div className="bg-surface-alt border border-border p-8 rounded-[1px]">
            <div className="flex justify-between items-baseline mb-4">
              <h3 className="font-serif text-lg font-bold text-cream">Your Request Tray</h3>
              <span className="font-mono text-[9px] text-gold">{enquiredProducts.length} FIXTURES</span>
            </div>

            {enquiredProducts.length > 0 ? (
              <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto pr-2">
                {enquiredProducts.map((p) => (
                  <div key={p.id} className="flex justify-between items-center bg-void border border-border p-3 rounded-[1px]">
                    <div className="flex flex-col min-w-0">
                      <span className="font-sans text-xs font-semibold text-cream truncate">{p.name}</span>
                      <span className="font-mono text-[8px] text-gold-muted leading-tight">{p.shortSpec}</span>
                    </div>
                    <button
                      onClick={() => removeFromEnquiry(p.id)}
                      className="text-text-ghost hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <p className="font-sans text-[10px] text-text-dim text-center mt-3 border-t border-border/40 pt-3">
                  This selection will automatically append to your consultation message.
                </p>
              </div>
            ) : (
              <div className="border border-dashed border-border p-6 text-center flex flex-col items-center gap-2">
                <FileText className="w-6 h-6 text-text-ghost" />
                <span className="font-sans text-xs text-text-dim">Your tray is currently empty.</span>
                <span className="font-sans text-[10px] text-text-ghost leading-normal">
                  Browse collections and add fixtures via the "Add to Estimate" buttons.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: High-fidelity request form */}
        <div className="lg:col-span-7 bg-surface border border-border p-8 md:p-10 rounded-[1px]" id="contact-submission-panel">
          {isSubmitted ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <CheckCircle2 className="w-16 h-16 text-gold animate-pulse-glow mb-2" />
              <h2 className="font-serif text-3xl text-cream font-medium">Transmission Successful</h2>
              <p className="font-sans text-xs text-text-dim max-w-md leading-relaxed mt-1">
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
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-muted block">FORM SECURE</span>
                <h3 className="font-serif text-2xl font-bold text-cream">Consultation & Estimates</h3>
              </div>

              {/* Grid block for inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name-input" className="font-mono text-[9px] uppercase tracking-widest text-text-dim font-bold">
                    Lead Architect Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: '' })); }}
                    placeholder="e.g. Ketan Bhadra"
                    className="bg-void border border-border focus:border-gold/50 text-cream rounded-[1px] px-4 py-3 placeholder:text-text-ghost text-xs focus:outline-none transition-all"
                  />
                  {errors.name && <span className="font-mono text-[9px] text-red-400 uppercase">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email-input" className="font-mono text-[9px] uppercase tracking-widest text-text-dim font-bold">
                    Professional Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                    placeholder="architect@firm.in"
                    className="bg-void border border-border focus:border-gold/50 text-cream rounded-[1px] px-4 py-3 placeholder:text-text-ghost text-xs focus:outline-none transition-all"
                  />
                  {errors.email && <span className="font-mono text-[9px] text-red-400 uppercase">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firm-input" className="font-mono text-[9px] uppercase tracking-widest text-text-dim font-bold">
                    Architectural Firm / Guild <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firm-input"
                    type="text"
                    required
                    value={firmName}
                    onChange={(e) => { setFirmName(e.target.value); if (errors.firm) setErrors(prev => ({ ...prev, firm: '' })); }}
                    placeholder="e.g. Systems Designs India"
                    className="bg-void border border-border focus:border-gold/50 text-cream rounded-[1px] px-4 py-3 placeholder:text-text-ghost text-xs focus:outline-none transition-all"
                  />
                  {errors.firm && <span className="font-mono text-[9px] text-red-400 uppercase">{errors.firm}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="location-select" className="font-mono text-[9px] uppercase tracking-widest text-text-dim font-bold">
                    Project City Location
                  </label>
                  <select
                    id="location-select"
                    value={projectCity}
                    onChange={(e) => setProjectCity(e.target.value)}
                    className="bg-void border border-border focus:border-gold/50 text-cream rounded-[1px] px-4 py-3 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="Mumbai">Mumbai, MH</option>
                    <option value="Pune">Pune, MH</option>
                    <option value="Delhi">Delhi, NCR</option>
                    <option value="Bengaluru">Bengaluru, KA</option>
                    <option value="Alibaug">Alibaug Coastal</option>
                    <option value="International">Outside India</option>
                  </select>
                </div>
              </div>

              {/* Message box */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message-input" className="font-mono text-[9px] uppercase tracking-widest text-text-dim font-bold">
                  Schedule / Requirement Synopsis <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message-input"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(prev => ({ ...prev, message: '' })); }}
                  placeholder="Tell us about the project design, spacing details, required dimming adapters (DALI/Phase-cut) etc..."
                  className="bg-void border border-border focus:border-gold/50 text-cream rounded-[1px] px-4 py-3 placeholder:text-text-ghost text-xs focus:outline-none transition-all resize-none"
                />
                {errors.message && <span className="font-mono text-[9px] text-red-400 uppercase">{errors.message}</span>}
              </div>

              {/* High fidelity Drag-and-Drop file attachment dropzone */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim font-bold">
                  Attach Design CAD / DWG / Layout PDF
                </span>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileBrowser}
                  className={`border border-dashed p-6 text-center cursor-pointer transition-all duration-300 rounded-[1px] flex flex-col items-center gap-2 ${
                    isDragging 
                      ? 'border-gold bg-gold/5 scale-[0.99] shadow-[0_0_15px_rgba(201,169,110,0.1)]' 
                      : 'border-border-mid hover:border-gold/60 bg-void'
                  }`}
                  id="dwg-dropzone"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    className="hidden"
                    accept=".dwg,.dxf,.pdf,.png,.jpg,.jpeg"
                  />
                  <Upload className="w-6 h-6 text-gold-muted animate-pulse" />
                  <span className="font-sans text-xs text-cream">
                    Drag and drop file here, or <span className="text-gold hover:underline">browse computer</span>
                  </span>
                  <span className="font-mono text-[8px] text-text-ghost uppercase tracking-widest">
                    MAX 25MB • DWG, DXF, PDF, IMAGES ACCEPTABLE
                  </span>
                </div>

                {/* Display list of attached files */}
                {attachedFiles.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {attachedFiles.map((f, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-surface-alt border border-border px-3 py-2 text-xs">
                        <div className="flex items-center gap-2 text-cream truncate max-w-xs">
                          <FileText className="w-4 h-4 text-gold shrink-0" />
                          <span className="truncate">{f.name}</span>
                          <span className="text-text-ghost text-[9px] font-mono shrink-0">({(f.size/1024/1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-text-ghost hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-light text-void-dark font-bold font-mono text-[11px] uppercase tracking-widest py-4 transition-all duration-300 h-12 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_24px_rgba(201,169,110,0.12)] hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-void-dark border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>submit layout schematic</span>
                  </>
                )}
              </button>
              
              <div className="flex justify-center items-center gap-2 opacity-50 mt-1">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-text-ghost">
                  🛡️ secure 256-bit automated encryption layer
                </span>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
