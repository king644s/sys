'use client';

import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, CheckCircle2, Send, Clock3 } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { buttonClasses } from '../components/ui/Button';
import { CONTACT } from '@/lib/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const TOPICS = [
  { id: 'quote', label: 'Request a quote' },
  { id: 'spec', label: 'Spec sheet / IES file' },
  { id: 'brochure', label: 'Brochure' },
  { id: 'visit', label: 'Visit experience centre' },
  { id: 'dealer', label: 'Become a dealer' },
  { id: 'general', label: 'Something else' },
] as const;

const AUDIENCES = [
  'Homeowner',
  'Architect / interior designer',
  'Contractor / electrical consultant',
  'Dealer / distributor',
  'Other',
] as const;

type TopicId = (typeof TOPICS)[number]['id'];

function parseTopic(value: string | null): TopicId {
  return (TOPICS.find((t) => t.id === value)?.id ?? 'quote') as TopicId;
}

export function Contact() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product') ?? '';

  const [topic, setTopic] = useState<TopicId>(() => parseTopic(searchParams.get('topic')));
  const [audience, setAudience] = useState<string>(
    searchParams.get('topic') === 'dealer' ? 'Dealer / distributor' : '',
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState(() =>
    productParam ? `I'm interested in ${productParam}.\n\n` : '',
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isProfessional = audience !== '' && audience !== 'Homeowner';
  const topicLabel = TOPICS.find((t) => t.id === topic)?.label ?? 'Enquiry';

  const composed = useMemo(() => {
    const lines = [
      `Topic: ${topicLabel}`,
      audience ? `I am a: ${audience}` : null,
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Location: ${location}`,
      '',
      message.trim(),
    ].filter((line): line is string => line !== null);
    return lines.join('\n');
  }, [topicLabel, audience, name, company, email, phone, location, message]);

  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Enter your name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email address';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Enter a valid phone number';
    if (!location.trim()) newErrors.location = 'Enter your city or project site';
    if (!message.trim()) newErrors.message = 'Tell us a little about what you need';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mailtoHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    `${topicLabel} — ${name || 'Website enquiry'}`,
  )}&body=${encodeURIComponent(composed)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    // No form backend yet: hand the composed enquiry to the visitor's email app.
    window.location.href = mailtoHref;
    setIsSubmitted(true);
  };

  const fieldError = (key: string) =>
    errors[key] ? (
      <span id={`${key}-error`} role="alert" className="text-[13px] text-danger">
        {errors[key]}
      </span>
    ) : null;

  const inputProps = (key: string) => ({
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
    className: `field ${errors[key] ? '!border-danger' : ''}`,
  });

  return (
    <div className="transition-page-enter">
      <Breadcrumbs />

      <section className="container-page pb-8 pt-4">
        <div className="max-w-2xl">
          <span className="eyebrow">Contact</span>
          <h1 className="heading-1 mt-3">Let&apos;s light your project</h1>
          <p className="lead mt-4">
            Quotes, spec sheets, site visits or a quick question — tell us what you need and our Mumbai
            team will get back to you, usually within one working day.
          </p>
        </div>
      </section>

      <section className="container-page grid grid-cols-1 items-start gap-8 pb-20 lg:grid-cols-12 lg:gap-12">
        {/* Form */}
        <div className="card p-6 md:p-10 lg:col-span-8" id="contact-submission-panel">
          {isSubmitted ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle2 className="h-14 w-14 text-success" />
              <h2 className="heading-2">Almost done</h2>
              <p className="body max-w-md">
                Your email app should have opened with your enquiry ready to send to {CONTACT.email}.
                If it didn&apos;t, send it on WhatsApp instead.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <a
                  href={buildWhatsAppUrl(composed)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses('primary')}
                >
                  Send on WhatsApp
                </a>
                <a href={mailtoHref} className={buttonClasses('secondary')}>
                  Open email again
                </a>
                <button onClick={() => setIsSubmitted(false)} className={buttonClasses('ghost')}>
                  Edit enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
              <fieldset>
                <legend className="field-label mb-3">What can we help with?</legend>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => {
                    const active = topic === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setTopic(t.id)}
                        className={`h-9 rounded-full border px-4 text-sm font-medium transition-colors ${
                          active
                            ? 'border-gold bg-accent-soft text-gold'
                            : 'border-border-mid text-text-dim hover:border-border-high hover:text-cream'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="audience-input" className="field-label">I am a</label>
                  <select
                    id="audience-input"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="field"
                  >
                    <option value="">Select one (optional)</option>
                    {AUDIENCES.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name-input" className="field-label">Name</label>
                  <input
                    id="name-input"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError('name'); }}
                    placeholder="Your full name"
                    {...inputProps('name')}
                  />
                  {fieldError('name')}
                </div>

                {isProfessional ? (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company-input" className="field-label">
                      Company <span className="font-normal text-text-ghost">(optional)</span>
                    </label>
                    <input
                      id="company-input"
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Studio or firm name"
                      className="field"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="location-input" className="field-label">City or project site</label>
                    <input
                      id="location-input"
                      type="text"
                      value={location}
                      onChange={(e) => { setLocation(e.target.value); clearError('location'); }}
                      placeholder="Mumbai"
                      {...inputProps('location')}
                    />
                    {fieldError('location')}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email-input" className="field-label">Email</label>
                  <input
                    id="email-input"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                    placeholder="name@example.com"
                    {...inputProps('email')}
                  />
                  {fieldError('email')}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone-input" className="field-label">Phone / WhatsApp</label>
                  <input
                    id="phone-input"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); clearError('phone'); }}
                    placeholder="+91 98765 43210"
                    {...inputProps('phone')}
                  />
                  {fieldError('phone')}
                </div>

                {isProfessional && (
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label htmlFor="location-input" className="field-label">City or project site</label>
                    <input
                      id="location-input"
                      type="text"
                      value={location}
                      onChange={(e) => { setLocation(e.target.value); clearError('location'); }}
                      placeholder="Mumbai"
                      {...inputProps('location')}
                    />
                    {fieldError('location')}
                  </div>
                )}

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="message-input" className="field-label">Message</label>
                  <textarea
                    id="message-input"
                    rows={5}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); clearError('message'); }}
                    placeholder={
                      isProfessional
                        ? 'Project type, fixture codes and quantities, control system (DALI / phase-cut), timeline…'
                        : 'Which rooms are you lighting? Any fixtures you liked on the site?'
                    }
                    {...inputProps('message')}
                  />
                  {fieldError('message')}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-text-ghost">
                  Sends from your email app to {CONTACT.email}.
                </p>
                <button type="submit" className={buttonClasses('primary', 'lg')}>
                  <Send className="h-4 w-4" />
                  Send enquiry
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact details */}
        <aside className="flex flex-col gap-4 lg:col-span-4">
          <div className="card p-6">
            <h2 className="heading-3">Talk to us directly</h2>
            <ul className="mt-5 flex flex-col gap-5 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-gold">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-text-ghost">Phone / WhatsApp</p>
                  <a href={CONTACT.phoneHref} className="font-medium text-cream hover:text-gold">
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-gold">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-text-ghost">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="font-medium text-cream hover:text-gold">
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-gold">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-text-ghost">Factory and experience centre</p>
                  <p className="font-medium text-cream">{CONTACT.address}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card bg-surface-alt border-transparent p-6">
            <Clock3 className="h-5 w-5 text-gold" />
            <h2 className="heading-3 mt-4">Visit the experience centre</h2>
            <p className="body mt-2">
              See fixtures, colour temperatures and smart controls working in real rooms. Book a visit
              so the right person is there to walk you through.
            </p>
            <button
              type="button"
              onClick={() => {
                setTopic('visit');
                document.getElementById('contact-submission-panel')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`${buttonClasses('secondary', 'md')} mt-5`}
            >
              Book a visit
            </button>
          </div>
        </aside>
      </section>

      <section className="w-full overflow-hidden border-t border-border">
        <iframe
          title="SYSlight experience centre on Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.7812477660514!2d72.82943207580763!3d19.16105044929586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b716a4d6563f%3A0xcf32cb22acb35582!2sSYSlight%20by%20Systems%20Creator!5e0!3m2!1sen!2sin!4v1783199938675!5m2!1sen!2sin"
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-[420px] w-full border-none dark:invert-[0.9] dark:hue-rotate-[190deg]"
        />
      </section>
    </div>
  );
}
