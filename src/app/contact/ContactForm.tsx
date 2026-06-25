'use client';

import type { CSSProperties, FormEvent } from 'react';
import { useState, useCallback } from 'react';
import Modal from '@/components/Modal';

const subjects = ['General Inquiry', 'Reservation', 'Event', 'Feedback'];

const fieldBaseClass =
  'w-full rounded-lg px-4 py-3 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]';

const fieldStyle = {
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: 'rgba(255,255,255,0.9)',
} satisfies CSSProperties;

const fieldErrorStyle = {
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid #c84b31',
  color: 'rgba(255,255,255,0.9)',
} satisfies CSSProperties;

const labelStyle = {
  color: 'rgba(255,255,255,0.65)',
} satisfies CSSProperties;

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validateForm(data: {
  name: string;
  email: string;
  message: string;
}): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

export default function ContactForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const validationErrors = validateForm({
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        message: String(formData.get('message') || ''),
      });

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
      setIsModalOpen(true);
      event.currentTarget.reset();
    },
    [],
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-xl p-6 md:p-8"
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,168,83,0.1)',
        }}
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="contact-name" className="text-sm font-semibold" style={labelStyle}>
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className={`${fieldBaseClass} mt-2`}
              style={errors.name ? fieldErrorStyle : fieldStyle}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              onChange={() => errors.name && setErrors((prev) => ({ ...prev, name: undefined }))}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1.5 text-xs" style={{ color: '#ffb4a8' }}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="text-sm font-semibold" style={labelStyle}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className={`${fieldBaseClass} mt-2`}
              style={errors.email ? fieldErrorStyle : fieldStyle}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              onChange={() => errors.email && setErrors((prev) => ({ ...prev, email: undefined }))}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1.5 text-xs" style={{ color: '#ffb4a8' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-subject" className="text-sm font-semibold" style={labelStyle}>
              Subject
            </label>
            <select
              id="contact-subject"
              name="subject"
              required
              defaultValue=""
              className={`${fieldBaseClass} mt-2`}
              style={fieldStyle}
            >
              <option value="" disabled>
                Select a subject
              </option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="text-sm font-semibold" style={labelStyle}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              className={`${fieldBaseClass} mt-2 resize-none`}
              style={errors.message ? fieldErrorStyle : fieldStyle}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              onChange={() =>
                errors.message && setErrors((prev) => ({ ...prev, message: undefined }))
              }
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1.5 text-xs" style={{ color: '#ffb4a8' }}>
                {errors.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#d4a853] px-8 py-4 text-sm font-semibold tracking-tight text-[#3d2c1a] transition-all duration-300 hover:bg-[#e8c882] hover:shadow-lg hover:shadow-[#d4a853]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]"
        >
          Send Message
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13" />
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="pr-8">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: '#d4a853' }}
          >
            Message Sent
          </p>
          <h2
            className="font-display text-3xl font-semibold tracking-tight"
            style={{ color: 'rgba(20,16,12,0.9)' }}
          >
            Thank you for reaching out.
          </h2>
        </div>
        <p
          className="mt-5 text-sm leading-relaxed"
          style={{ color: 'rgba(20,16,12,0.68)' }}
        >
          We received your message and will get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="mt-7 w-full rounded-full bg-[#d4a853] px-6 py-3 text-sm font-semibold text-[#3d2c1a] transition-all duration-300 hover:bg-[#e8c882] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2"
        >
          Close
        </button>
      </Modal>
    </>
  );
}
