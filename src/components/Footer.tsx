"use client";

import { motion } from "framer-motion";
import { metadata } from "@/data/metadata";

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Footer() {
  const { contact, author } = metadata;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="w-full bg-zinc-950/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-start gap-10">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-zinc-900">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-3 text-lg md:text-xl text-zinc-200 hover:text-white transition-colors  pb-1"
          >
            <MailIcon />
            {contact.email}
          </a>
          <div className="flex items-center gap-5 text-zinc-400">
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="hover:text-white transition-colors"
            >
              <MailIcon />
            </a>
            <a
              href={contact.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              <LinkedinIcon />
            </a>
            <a
              href={contact.github}
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
