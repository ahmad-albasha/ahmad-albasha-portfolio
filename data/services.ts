import type { Localized } from "@/lib/i18n";

/** Services shown on the home page (title + benefit) and in full on /services. */

export type ServiceIcon = "ai" | "web" | "mobile" | "custom";

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: Localized;
  /** One line about what the client gains — shown on the home page card. */
  benefit: Localized;
  description: Localized;
  deliverables: Localized<string[]>;
  idealFor: Localized;
  timeline: Localized;
  stack: string[];
}

export const services: Service[] = [
  {
    id: "ai-systems",
    icon: "ai",
    title: { en: "AI Systems", ar: "أنظمة الذكاء الاصطناعي" },
    benefit: {
      en: "Automate the repetitive work and give your team answers grounded in your own data.",
      ar: "أتمتة الأعمال المتكررة وإجابات دقيقة لفريقك مستندة إلى بياناتك أنت.",
    },
    description: {
      en: "Custom assistants, RAG knowledge bases, document processing and predictive models — built to be accurate, measurable and safe to put in front of customers.",
      ar: "مساعدات مخصصة، وقواعد معرفة بتقنية RAG، ومعالجة مستندات، ونماذج تنبؤية — مبنية لتكون دقيقة وقابلة للقياس وآمنة أمام عملائك.",
    },
    deliverables: {
      en: ["AI chat assistants & copilots", "RAG over your documents (Arabic & English)", "Workflow automation with LLMs", "Machine-learning prediction models", "Evaluation & monitoring setup"],
      ar: ["مساعدات محادثة ذكية", "أنظمة RAG على مستنداتك (عربي وإنجليزي)", "أتمتة سير العمل بالنماذج اللغوية", "نماذج تنبؤ بتعلم الآلة", "إعداد التقييم والمراقبة"],
    },
    idealFor: {
      en: "Teams sitting on documents, tickets or data they can't use efficiently.",
      ar: "الفرق التي تملك مستندات أو بيانات لا تستفيد منها بكفاءة.",
    },
    timeline: { en: "3–8 weeks", ar: "٣–٨ أسابيع" },
    stack: ["Python", "OpenAI", "LangChain", "FastAPI", "Vector DBs"],
  },
  {
    id: "web-development",
    icon: "web",
    title: { en: "Web Development", ar: "تطوير المواقع" },
    benefit: {
      en: "A fast, credible website that ranks, loads instantly and turns visitors into leads.",
      ar: "موقع سريع وموثوق يتصدر نتائج البحث ويحوّل الزوار إلى عملاء.",
    },
    description: {
      en: "Marketing sites, web apps and dashboards built with Next.js — bilingual and RTL-ready, SEO-optimised and easy for your team to update.",
      ar: "مواقع تعريفية وتطبيقات ويب ولوحات تحكم بتقنية Next.js — ثنائية اللغة وتدعم الاتجاه من اليمين لليسار، ومحسّنة لمحركات البحث وسهلة التحديث.",
    },
    deliverables: {
      en: ["Company & landing websites", "Web applications & dashboards", "Arabic / English with real RTL", "SEO, analytics & performance", "CMS or editable content"],
      ar: ["مواقع الشركات وصفحات الهبوط", "تطبيقات ويب ولوحات تحكم", "عربي وإنجليزي مع دعم كامل للاتجاه", "تحسين البحث والتحليلات والأداء", "نظام إدارة محتوى أو محتوى قابل للتعديل"],
    },
    idealFor: {
      en: "Businesses whose website doesn't yet reflect the quality of their work.",
      ar: "الأعمال التي لا يعكس موقعها جودة ما تقدمه بعد.",
    },
    timeline: { en: "2–6 weeks", ar: "٢–٦ أسابيع" },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    id: "mobile-apps",
    icon: "mobile",
    title: { en: "Mobile Apps", ar: "تطبيقات الجوال" },
    benefit: {
      en: "One codebase, a polished app on both iOS and Android, and a faster launch.",
      ar: "قاعدة كود واحدة وتطبيق متقن على iOS وAndroid وإطلاق أسرع.",
    },
    description: {
      en: "Cross-platform apps in Flutter with real backends: authentication, payments-ready flows, notifications and AI features where they add value.",
      ar: "تطبيقات متعددة المنصات بـ Flutter مع واجهات خلفية حقيقية: تسجيل دخول، ومسارات دفع، وإشعارات، وميزات ذكاء اصطناعي حيث تضيف قيمة.",
    },
    deliverables: {
      en: ["iOS & Android apps (Flutter)", "Backend & admin panel", "Bookings, payments & notifications", "App Store & Play Store release", "Post-launch support"],
      ar: ["تطبيقات iOS وAndroid بـ Flutter", "واجهة خلفية ولوحة إدارة", "حجوزات ومدفوعات وإشعارات", "النشر على المتاجر", "دعم بعد الإطلاق"],
    },
    idealFor: {
      en: "Founders and brands launching a product or digitising a service.",
      ar: "المؤسسون والعلامات التجارية التي تطلق منتجاً أو تحوّل خدمة إلى رقمية.",
    },
    timeline: { en: "6–12 weeks", ar: "٦–١٢ أسبوعاً" },
    stack: ["Flutter", "Dart", "Firebase", "FastAPI"],
  },
  {
    id: "custom-software",
    icon: "custom",
    title: { en: "Custom Software", ar: "برمجيات مخصصة" },
    benefit: {
      en: "Software shaped around how your business actually works — not the other way around.",
      ar: "برمجيات مصممة حول طريقة عمل مؤسستك فعلاً، لا العكس.",
    },
    description: {
      en: "Internal tools, integrations, desktop apps and hardware prototypes — from a one-off automation to a complete system.",
      ar: "أدوات داخلية، وتكاملات بين الأنظمة، وتطبيقات مكتبية، ونماذج عتاد أولية — من أتمتة بسيطة إلى نظام متكامل.",
    },
    deliverables: {
      en: ["Internal tools & admin systems", "API integrations", "Desktop applications", "IoT & robotics prototypes", "Technical consulting"],
      ar: ["أدوات وأنظمة إدارة داخلية", "تكامل الأنظمة عبر API", "تطبيقات مكتبية", "نماذج إنترنت الأشياء والروبوتات", "استشارات تقنية"],
    },
    idealFor: {
      en: "Teams outgrowing spreadsheets or stitching tools together by hand.",
      ar: "الفرق التي تجاوزت جداول البيانات أو تربط أدواتها يدوياً.",
    },
    timeline: { en: "Scoped per project", ar: "تُحدد حسب المشروع" },
    stack: ["Python", "TypeScript", "PostgreSQL", "Arduino"],
  },
];
