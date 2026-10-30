import type { Localized } from "@/lib/i18n";

/**
 * Degrees, imported from LinkedIn. Newest first. The LT is the one-year top-up that follows the TS
 * in Lebanon's technical-education track.
 */

export interface Education {
  school: Localized;
  degree: Localized;
  /** Short code shown as a badge (BS, LT, TS). */
  abbreviation: string;
  field: Localized;
  /** ISO year-month, formatted per locale when rendered. */
  start: string;
  end: string;
  description?: Localized;
  skills: string[];
}

const rhti: Localized = { en: "Rafik Hariri Technical Institute", ar: "معهد رفيق الحريري الفني" };

export const education: Education[] = [
  {
    school: { en: "Lebanese International University", ar: "الجامعة اللبنانية الدولية" },
    degree: { en: "Bachelor of Science", ar: "بكالوريوس في العلوم" },
    abbreviation: "BS",
    field: { en: "Computer Science", ar: "علوم الحاسوب" },
    start: "2022-03",
    end: "2025-08",
    skills: ["Networking", "Digital Logic", "Cisco Certified", "SQL", "NetAct", "Java"],
  },
  {
    school: rhti,
    degree: { en: "Licence Technique", ar: "الإجازة الفنية" },
    abbreviation: "LT",
    field: { en: "Non-Profit / Public / Organizational Management", ar: "إدارة المنظمات العامة وغير الربحية" },
    start: "2019-10",
    end: "2020-07",
    description: {
      en: "The final stage of vocational education, awarding a degree equivalent to a university licence — one academic year open to Technicien Supérieur (TS) graduates.",
      ar: "مرحلة الإجازة الفنية هي المرحلة النهائية للتعليم المهني، يُمنح فيها الطالب إجازة تعادل الإجازة الجامعية، وهي سنة دراسية واحدة لطلاب الامتياز الفني TS.",
    },
    skills: [
      "Architecture",
      "Architectural Design",
      "Architectural Drawings",
      "Building Technology",
      "Project Management",
      "Program Management",
      "Operations Management",
      "Team Building",
      "Time Management",
    ],
  },
  {
    school: rhti,
    degree: { en: "Technicien Supérieur", ar: "الامتياز الفني" },
    abbreviation: "TS",
    field: { en: "Architectural and Building Sciences / Technology", ar: "علوم وتكنولوجيا العمارة والبناء" },
    start: "2017-10",
    end: "2018-07",
    skills: ["Civil Engineering", "Architectural Drawings", "Building Technology", "AutoCAD"],
  },
];
