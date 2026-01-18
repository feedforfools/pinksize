"use client";

import { useState, useEffect, useRef } from "react";

interface ContactButton {
  id: string;
  label: string;
  revealedLabel: string;
  href: string;
  icon: React.ReactNode;
}

export default function Contact() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({});

  const handleReveal = (id: string) => {
    // Clear any existing timer for this button
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
    }

    setRevealed((prev) => ({ ...prev, [id]: true }));

    // Set timer to hide after 5 seconds
    timersRef.current[id] = setTimeout(() => {
      setRevealed((prev) => ({ ...prev, [id]: false }));
      delete timersRef.current[id];
    }, 5000);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  const contactButtons: ContactButton[] = [
    {
      id: "email",
      label: "SCRIVI UNA EMAIL",
      revealedLabel: "info@pinksize.it",
      href: "mailto:info@pinksize.it",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "matteo",
      label: "CHIAMA MATTEO",
      revealedLabel: "+39 349 2372771",
      href: "tel:+393492372771",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      id: "andrea",
      label: "CHIAMA ANDREA",
      revealedLabel: "+39 389 7843610",
      href: "tel:+393897843610",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contatti"
      className="bg-[rgb(var(--color-black-rgb))] text-[rgb(var(--color-white-rgb))] py-[var(--section-padding-y)]"
    >
      <div className="max-w-3xl mx-auto px-[var(--section-padding-x)]">
        <h2 className="text-[length:var(--section-title-size)] md:text-[length:var(--section-title-size-lg)] font-bold text-center mb-[var(--section-title-margin-bottom)] tracking-tight">
          CONTATTI
        </h2>
        <p className="text-center text-[rgb(var(--color-gray-400-rgb))] mb-[var(--space-4)] text-[length:var(--section-subtitle-size)]">
          Info & Booking
        </p>

        {/* Contact Buttons */}
        <div className="flex flex-col items-center gap-[var(--contact-button-stack-gap)] mb-[var(--contact-button-stack-margin-bottom)]">
          {contactButtons.map((button) => (
            <div key={button.id} className="w-full max-w-sm">
              {revealed[button.id] ? (
                <a
                  href={button.href}
                  className="flex items-center justify-center gap-[var(--contact-button-gap)] w-full bg-[rgb(var(--color-red-600-rgb))] text-[rgb(var(--color-white-rgb))] font-bold py-[var(--contact-button-padding-y)] px-[var(--contact-button-padding-x)] transition-all duration-200 ease-out tracking-wider border border-transparent hover:scale-105 hover:drop-shadow-[var(--shadow-glow-red-strong)]"
                >
                  {button.icon}
                  <span>{button.revealedLabel}</span>
                </a>
              ) : (
                <button
                  onClick={() => handleReveal(button.id)}
                  className="flex items-center justify-center gap-[var(--contact-button-gap)] w-full bg-[rgb(var(--color-zinc-900-rgb))] text-[rgb(var(--color-white-rgb))] font-bold py-[var(--contact-button-padding-y)] px-[var(--contact-button-padding-x)] transition-all duration-200 ease-out tracking-wider border border-[rgb(var(--color-zinc-700-rgb))] hover:scale-105 hover:drop-shadow-[var(--shadow-glow-white-strong)] hover:border-[rgb(var(--color-white-rgb))]"
                >
                  {button.icon}
                  <span>{button.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Social Links */}
        <p className="text-center text-[rgb(var(--color-gray-400-rgb))] mb-[var(--space-4)] text-[length:var(--section-subtitle-size)]">
          Seguici su
        </p>
        <div className="flex justify-center gap-[var(--contact-social-gap)]">
          <a
            href="https://www.facebook.com/pinksizefloyd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgb(var(--color-gray-400-rgb))] hover:text-[rgb(var(--color-white-rgb))] transition-colors"
            aria-label="Facebook"
          >
            <svg
              className="w-[var(--contact-social-icon)] h-[var(--contact-social-icon)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/pinksizefloyd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgb(var(--color-gray-400-rgb))] hover:text-[rgb(var(--color-white-rgb))] transition-colors"
            aria-label="Instagram"
          >
            <svg
              className="w-[var(--contact-social-icon)] h-[var(--contact-social-icon)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@pinksizefloyd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgb(var(--color-gray-400-rgb))] hover:text-[rgb(var(--color-white-rgb))] transition-colors"
            aria-label="YouTube"
          >
            <svg
              className="w-[var(--contact-social-icon)] h-[var(--contact-social-icon)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
