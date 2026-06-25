'use client';

import type { ChangeEvent, CSSProperties, FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from '@/components/Modal';

const timeSlots = [
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
];

const partySizes = ['1', '2', '3', '4', '5', '6', '7', '8'];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
  specialRequests: string;
};

type FieldName = keyof FormState;
type FormErrors = Partial<Record<FieldName, string>>;

const initialForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  partySize: '',
  specialRequests: '',
};

const fieldBaseClass =
  'w-full rounded-lg px-4 py-3 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]';

const fieldStyle = {
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: 'rgba(255,255,255,0.9)',
} satisfies CSSProperties;

const labelStyle = {
  color: 'rgba(255,255,255,0.65)',
} satisfies CSSProperties;

function getTodayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatReservationDate(value: string) {
  if (!value) {
    return '';
  }

  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

export default function ReservationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [today] = useState(getTodayIso);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<FormState | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const confirmationMessage = useMemo(() => {
    if (!confirmation) {
      return '';
    }

    const guestLabel = Number(confirmation.partySize) === 1 ? 'guest' : 'guests';

    return `Thank you, ${confirmation.fullName}! Your reservation request for ${formatReservationDate(
      confirmation.date,
    )} at ${confirmation.time} for ${confirmation.partySize} ${guestLabel} has been received. We'll confirm via email within 2 hours.`;
  }, [confirmation]);

  const validate = (nextForm: FormState) => {
    const nextErrors: FormErrors = {};
    const currentToday = today || getTodayIso();

    if (!nextForm.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!nextForm.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextForm.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!nextForm.phone.trim()) {
      nextErrors.phone = 'Please enter your phone number.';
    }

    if (!nextForm.date) {
      nextErrors.date = 'Please choose a reservation date.';
    } else if (nextForm.date < currentToday) {
      nextErrors.date = 'Please choose today or a future date.';
    }

    if (!nextForm.time) {
      nextErrors.time = 'Please choose a reservation time.';
    }

    if (!nextForm.partySize) {
      nextErrors.partySize = 'Please choose your party size.';
    }

    return nextErrors;
  };

  const updateField = (
    field: FieldName,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    timeoutRef.current = window.setTimeout(() => {
      setConfirmation(form);
      setIsLoading(false);
      setIsModalOpen(true);
    }, 650);
  };

  const renderError = (field: FieldName) => {
    if (!errors[field]) {
      return null;
    }

    return (
      <p
        id={`${field}-error`}
        className="mt-1.5 text-sm"
        style={{ color: '#ffb4a8' }}
      >
        {errors[field]}
      </p>
    );
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="rounded-xl p-6 md:p-8"
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,168,83,0.1)',
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="text-sm font-semibold" style={labelStyle}>
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(event) => updateField('fullName', event)}
              className={`${fieldBaseClass} mt-2`}
              style={fieldStyle}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {renderError('fullName')}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-semibold" style={labelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(event) => updateField('email', event)}
              className={`${fieldBaseClass} mt-2`}
              style={fieldStyle}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {renderError('email')}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-semibold" style={labelStyle}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(event) => updateField('phone', event)}
              className={`${fieldBaseClass} mt-2`}
              style={fieldStyle}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {renderError('phone')}
          </div>

          <div>
            <label htmlFor="date" className="text-sm font-semibold" style={labelStyle}>
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              min={today || undefined}
              value={form.date}
              onChange={(event) => updateField('date', event)}
              className={`${fieldBaseClass} mt-2`}
              style={{ ...fieldStyle, colorScheme: 'dark' }}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? 'date-error' : undefined}
            />
            {renderError('date')}
          </div>

          <div>
            <label htmlFor="time" className="text-sm font-semibold" style={labelStyle}>
              Time
            </label>
            <select
              id="time"
              name="time"
              required
              value={form.time}
              onChange={(event) => updateField('time', event)}
              className={`${fieldBaseClass} mt-2`}
              style={fieldStyle}
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? 'time-error' : undefined}
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {renderError('time')}
          </div>

          <div>
            <label htmlFor="partySize" className="text-sm font-semibold" style={labelStyle}>
              Party Size
            </label>
            <select
              id="partySize"
              name="partySize"
              required
              value={form.partySize}
              onChange={(event) => updateField('partySize', event)}
              className={`${fieldBaseClass} mt-2`}
              style={fieldStyle}
              aria-invalid={Boolean(errors.partySize)}
              aria-describedby={errors.partySize ? 'partySize-error' : undefined}
            >
              <option value="">Select guests</option>
              {partySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {renderError('partySize')}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="specialRequests" className="text-sm font-semibold" style={labelStyle}>
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={5}
            value={form.specialRequests}
            onChange={(event) => updateField('specialRequests', event)}
            className={`${fieldBaseClass} mt-2 resize-none`}
            style={fieldStyle}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#d4a853] px-8 py-4 text-sm font-semibold tracking-tight text-[#3d2c1a] transition-all duration-300 hover:bg-[#e8c882] hover:shadow-lg hover:shadow-[#d4a853]/20 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]"
        >
          {isLoading ? (
            <>
              <span
                className="h-4 w-4 animate-spin rounded-full border-2"
                style={{
                  borderColor: 'rgba(61,44,26,0.25)',
                  borderTopColor: '#3d2c1a',
                }}
                aria-hidden="true"
              />
              Sending Request
            </>
          ) : (
            <>
              Reserve Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="pr-8">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: '#d4a853' }}
          >
            Reservation Request Received
          </p>
          <h2
            className="font-display text-3xl font-semibold tracking-tight"
            style={{ color: 'rgba(20,16,12,0.9)' }}
          >
            Thank you.
          </h2>
        </div>
        <p
          className="mt-5 text-sm leading-relaxed"
          style={{ color: 'rgba(20,16,12,0.68)' }}
        >
          {confirmationMessage}
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
