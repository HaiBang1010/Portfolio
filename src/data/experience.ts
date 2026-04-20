export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  stack?: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "ky-luc",
    role: "Business Analyst Intern",
    company: "Ky Luc Company",
    period: "Nov 2024 — Feb 2025",
    type: "Internship",
    summary:
      "Bridged business stakeholders and engineering to transform legacy offline workflows into a modern web-based platform.",
    highlights: [
      "Analyzed business requirements and designed system architecture to facilitate the transition from offline processes to an online web-based platform.",
      "Authored comprehensive System Requirement Specification (SRS) documents, Activity Diagrams, and Sequence Diagrams to support the development team.",
      "Collaborated closely with the Web Development team to ensure the final product met client requirements and business goals.",
    ],
    stack: ["SRS", "UML", "Activity Diagram", "Sequence Diagram", "Figma"],
  },
  {
    id: "teky-academy",
    role: "STEM Instructor / Coding Mentor",
    company: "Teky Academy",
    period: "Sep 2024 — Feb 2026",
    type: "Part-time",
    summary:
      "Mentored young learners in programming and STEM, translating complex engineering concepts into intuitive, hands-on lessons.",
    highlights: [
      "Instructed and mentored students in programming fundamentals using Python, Web Development (HTML/CSS/JS, Django), Games (Unity, Tynker), and Robotics.",
      "Translated complex technical concepts into easy-to-understand lessons, sharpening communication and presentation skills.",
      "Managed classroom activities and tracked student progress to ensure a high-quality learning experience.",
    ],
    stack: ["Python", "HTML/CSS/JS", "Django", "Unity", "Tynker", "Robotics"],
  },
];
