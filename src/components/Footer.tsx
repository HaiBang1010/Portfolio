"use client";

import { Mail, Linkedin, Github } from "lucide-react";
import { metadata } from "@/data/metadata";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const { contact } = metadata;

  return (
    <footer id="contact" className="w-full bg-zinc-950/60">
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-start gap-10">
        <Separator className="bg-border" />
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <Button asChild variant="link" className="px-0 h-auto text-lg md:text-xl">
            <a href={`mailto:${contact.email}`}>
              <Mail />
              {contact.email}
            </a>
          </Button>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" aria-label="Email">
              <a href={`mailto:${contact.email}`}>
                <Mail />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                <Linkedin />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
              <a href={contact.github} target="_blank" rel="noreferrer">
                <Github />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
