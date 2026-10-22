/**
 * Licenses & certifications, imported from LinkedIn. Shown in this order — most relevant first:
 * AI & machine learning, then networking & security, programming, hardware, and general skills.
 *
 * Images live in /public/certificates. To use a sharper copy, replace the file with the same name
 * (or add a PDF and set `file`) — the cards open `file` when set, otherwise the image.
 */

export interface Certification {
  /** Course and issuer names are kept identical in every language. */
  title: string;
  issuer: string;
  /** ISO year-month, formatted per locale when rendered. Omitted when the issue date is unknown. */
  issued?: string;
  skills: string[];
  image?: string;
  /** Full certificate (PDF or large image) opened from the card. */
  file?: string;
  credentialUrl?: string;
}

const codecademy = (id: string) => `https://www.codecademy.com/profiles/ahmad-albasha/certificates/${id}`;
const robotechPost = (id: string) => `https://www.facebook.com/772936182839485/posts/${id}/`;

export const certifications: Certification[] = [
  /* ─────────────── AI & machine learning ─────────────── */
  {
    title: "Machine Learning/AI Engineer Career Path",
    issuer: "Codecademy",
    issued: "2025-08",
    skills: ["Machine Learning", "Algorithms"],
    image: "/certificates/ml-ai-engineer.jpg",
    credentialUrl: codecademy("6f8e0510ca91437a847b53aa9e9aa3f1"),
  },
  {
    title: "Creating AI Applications using Retrieval-Augmented Generation (RAG)",
    issuer: "Codecademy",
    issued: "2025-08",
    skills: ["RAG", "LLM"],
    image: "/certificates/rag-applications.jpg",
    credentialUrl: codecademy("4f6b4f9168964a0ba29cf110f2a4cc28"),
  },
  {
    title: "Finetuning Transformer Models",
    issuer: "Codecademy",
    issued: "2025-09",
    skills: ["Transformers", "Fine-tuning"],
    image: "/certificates/finetuning-transformers.jpg",
    credentialUrl: codecademy("c48eab73789f42f49e97464d5ffdeb06"),
  },
  {
    title: "OpenAI API Coding with Python",
    issuer: "Codecademy",
    issued: "2025-02",
    skills: ["Python", "OpenAI API"],
    image: "/certificates/openai-api-python.jpg",
    credentialUrl: codecademy("6f2d6ce7c2eb4bf4b0bb6b57a1bcb912"),
  },
  {
    title: "Data and Programming Foundations for AI",
    issuer: "Codecademy",
    issued: "2024-11",
    skills: ["Python", "Artificial Intelligence"],
    image: "/certificates/data-programming-ai.jpg",
    credentialUrl: codecademy("5701108f64cd4a02981c161085ccc50e"),
  },
  {
    title: "Intro to Generative AI",
    issuer: "Codecademy",
    issued: "2024-09",
    skills: ["Generative AI"],
    image: "/certificates/intro-generative-ai.jpg",
    credentialUrl: codecademy("28ccb695c353465a8785a036ad32d3b9"),
  },
  {
    title: "Introduction to Artificial Intelligence",
    issuer: "Edraak",
    issued: "2024-10",
    skills: ["Artificial Intelligence", "Machine Learning"],
    image: "/certificates/edraak-intro-ai.jpg",
  },

  /* ─────────────── Networking & security ─────────────── */
  {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    issued: "2024-08",
    skills: ["Networking", "Routing"],
    image: "/certificates/cisco-srwe.jpg",
    credentialUrl: "https://www.credly.com/badges/5d739d2a-fac1-4ed2-8b30-7c806123ab00",
  },
  {
    title: "CyberOps Associate",
    issuer: "Cisco",
    issued: "2024-04",
    skills: ["CyberOps", "Linux"],
    image: "/certificates/cisco-cyberops-associate.jpg",
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    issued: "2024-03",
    skills: ["Networking"],
    image: "/certificates/cisco-intro-networks.jpg",
  },
  {
    title: "Network Security",
    issuer: "Cisco Networking Academy",
    issued: "2025-06",
    skills: ["Network Security"],
    image: "/certificates/cisco-network-security.jpg",
  },
  {
    title: "Cyber Security Attack Techniques",
    issuer: "Edraak",
    issued: "2023-08",
    skills: ["Kali Linux", "SQL Injection"],
    image: "/certificates/edraak-attack-techniques.jpg",
  },
  {
    title: "Protect Systems from Penetrations",
    issuer: "Edraak",
    issued: "2023-06",
    skills: ["Firewalls", "Antivirus"],
    image: "/certificates/edraak-protect-systems.jpg",
  },
  {
    title: "Cyber Security Basics",
    issuer: "Edraak",
    issued: "2023-04",
    skills: ["Cybersecurity", "Security"],
    image: "/certificates/edraak-cyber-security-basics.jpg",
  },
  {
    title: "Introduction to Cyber Security",
    issuer: "Edraak",
    issued: "2023-03",
    skills: ["Cybersecurity", "Cybercrime Investigation"],
    image: "/certificates/edraak-intro-cyber-security.jpg",
  },
  {
    title: "Introduction to Networking",
    issuer: "Edraak",
    issued: "2023-01",
    skills: ["Networking"],
    image: "/certificates/edraak-intro-networking.jpg",
  },

  /* ─────────────── Programming ─────────────── */
  {
    title: "Learn Java",
    issuer: "Codecademy",
    issued: "2024-05",
    skills: ["Java"],
    image: "/certificates/codecademy-learn-java.jpg",
    credentialUrl: codecademy("d3f89367b558583e361640f778191345"),
  },
  {
    title: "Computer Essentials",
    issuer: "Edraak",
    issued: "2023-01",
    skills: ["Computer Fundamentals"],
    image: "/certificates/edraak-computer-essentials.jpg",
  },

  /* ─────────────── Hardware & robotics ─────────────── */
  {
    title: "Internet of Things",
    issuer: "LIU RoboTech Club",
    issued: "2023-02",
    skills: ["IoT", "Robotics"],
    image: "/certificates/liu-robotech-iot.jpg",
    credentialUrl: robotechPost("pfbid0RgWBt37QMBT4zEZLA7vemTXoCeRQ5G3qe7DE37MJaQ6CBPxyFFYndmykHtsh7Ek7l"),
  },
  {
    title: "Raspberry Pi",
    issuer: "LIU RoboTech Club",
    issued: "2023-02",
    skills: ["Raspberry Pi", "Robotics"],
    image: "/certificates/liu-robotech-raspberry-pi.jpg",
    credentialUrl: robotechPost("pfbid0w1EUJBbfr5U41HLbVfzv8Jy9ajNtxtkRD7P1nrT5esUBrFguMPYGGQrxGJgN2FNnl"),
  },
  {
    title: "Arduino Training (Level 2)",
    issuer: "LIU RoboTech Club",
    issued: "2022-11",
    skills: ["Arduino", "Arduino IDE"],
    image: "/certificates/liu-robotech-arduino-2.jpg",
    credentialUrl: robotechPost("pfbid02cGhbJcqk4pdJmbn2TfohphtCgNPQwysUArdDH9QHkh9AqfBnwBBTXaCE6mTxrYvMl"),
  },
  {
    title: "Arduino Training (Level 1)",
    issuer: "LIU RoboTech Club",
    issued: "2022-11",
    skills: ["Arduino", "Arduino IDE"],
    image: "/certificates/liu-robotech-arduino-1.jpg",
    credentialUrl: robotechPost("pfbid0w358Yzvz4EDw9PqKz6DSq8MrfKNVG8k49FVMT8jZYfBrekaiGi5h6UoeX6BGBuZl"),
  },

  /* ─────────────── General skills ─────────────── */
  {
    title: "Critical Thinking",
    issuer: "Edraak",
    issued: "2023-01",
    skills: ["Critical Thinking"],
    image: "/certificates/edraak-critical-thinking.jpg",
  },
  {
    title: "Introduction to Design Thinking",
    issuer: "Edraak",
    skills: ["Design Thinking"],
    image: "/certificates/edraak-design-thinking.jpg",
  },
  {
    title: "Public Speaking Skills",
    issuer: "Edraak",
    issued: "2021-02",
    skills: ["Public Speaking"],
    image: "/certificates/edraak-public-speaking.jpg",
  },
  {
    title: "Introduction to Islamic Art",
    issuer: "Edraak",
    skills: ["Islamic Art"],
    image: "/certificates/edraak-islamic-art.jpg",
  },
  {
    title: "Arab Contemporary City",
    issuer: "Edraak",
    skills: ["Urban Studies"],
    image: "/certificates/edraak-arab-contemporary-city.jpg",
  },
  {
    title: "Introduction to Music Appreciation",
    issuer: "Edraak",
    issued: "2020-01",
    skills: ["Music"],
    image: "/certificates/edraak-music-appreciation.jpg",
  },
  {
    title: "Designing Your Personal Weight Loss Plan",
    issuer: "Edraak",
    issued: "2020-04",
    skills: ["Health & Nutrition"],
    image: "/certificates/edraak-weight-loss-plan.jpg",
  },
];
