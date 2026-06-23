'use client';

import type { CSSProperties, FormEvent } from 'react';
import { useState, useCallback } from 'react';
import Modal from '@/components/Modal';

const subjects = ['General Inquiry', 'Reservation', 'Event', 'Feedback'];

const fieldBaseClass =
  'w-full rounded-lg px-4 py-3 text-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c84b31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]';

const fieldStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.9)',
} satisfies CSSProperties;

const fieldErrorStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid #c84b31',
  color: 'rgba(255,255,255,0.9)',
} satisfies CSSProperties;

const labelStyle = {
  color: 'rgba(255,255,255,0.68)',
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
        className="rounded-lg p-6 md:p-8"
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
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
              <p id="contact-name-error" className="mt-1 text-xs" style={{ color: '#c84b31' }}>
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
              <p id="contact-email-error" className="mt-1 text-xs" style={{ color: '#c84b31' }}>
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
              <p id="contact-message-error" className="mt-1 text-xs" style={{ color: '#c84b31' }}>
                {errors.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-full bg-[#c84b31] px-8 py-4 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#a63d27] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c84b31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]"
        >
          Send Message
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="pr-8">
          <p
            className="mb-2 text-sm font-semibold uppercase tracking-[0.14em]"
            style={{ color: '#c84b31' }}
          >
            Message Sent
          </p>
          <h2
            className="text-3xl font-semibold tracking-tighter"
            style={{ color: 'rgba(20,16,12,0.9)' }}
          >
            Thank you for reaching out.
          </h2>
        </div>
        <p
          className="mt-5 text-sm leading-6"
          style={{ color: 'rgba(20,16,12,0.68)' }}
        >
          We received your message and will get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="mt-7 w-full rounded-full bg-[#c84b31] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a63d27] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c84b31] focus-visible:ring-offset-2"
        >
          Close
        </button>
      </Modal>
    </>
  );
}
