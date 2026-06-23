'use client';

import type { CSSProperties, FormEvent } from 'react';
import { useState } from 'react';
import Modal from '@/components/Modal';

const subjects = ['General Inquiry', 'Reservation', 'Event', 'Feedback'];

const fieldBaseClass =
  'w-full rounded-lg px-4 py-3 text-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c84b31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]';

const fieldStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.9)',
} satisfies CSSProperties;

const labelStyle = {
  color: 'rgba(255,255,255,0.68)',
} satisfies CSSProperties;

export default function ContactForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
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
              style={fieldStyle}
            />
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
              style={fieldStyle}
            />
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
              style={fieldStyle}
            />
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
