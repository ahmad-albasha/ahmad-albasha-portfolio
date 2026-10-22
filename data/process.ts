import type { Localized } from "@/lib/i18n";

/** The four-step "How I Work" process. */
export const processSteps: { title: Localized; description: Localized; duration: Localized }[] = [
  {
    title: { en: "Discuss", ar: "النقاش" },
    description: {
      en: "A free 30-minute call to understand your goals, users and constraints. You leave with clarity, even if we don't work together.",
      ar: "مكالمة مجانية مدتها ٣٠ دقيقة لفهم أهدافك ومستخدميك وقيودك. ستخرج بصورة أوضح حتى لو لم نعمل معاً.",
    },
    duration: { en: "Day 1", ar: "اليوم الأول" },
  },
  {
    title: { en: "Proposal", ar: "العرض" },
    description: {
      en: "A clear written scope, fixed milestones, timeline and price. No vague estimates, no surprises.",
      ar: "نطاق عمل مكتوب بوضوح، ومراحل محددة، وجدول زمني وسعر. لا تقديرات مبهمة ولا مفاجآت.",
    },
    duration: { en: "Within 48h", ar: "خلال ٤٨ ساعة" },
  },
  {
    title: { en: "Build", ar: "البناء" },
    description: {
      en: "Short iterations with a live preview link. You see progress every week and give feedback as we go.",
      ar: "دورات عمل قصيرة مع رابط معاينة مباشر. ترى التقدم كل أسبوع وتشارك ملاحظاتك أولاً بأول.",
    },
    duration: { en: "Weekly updates", ar: "تحديثات أسبوعية" },
  },
  {
    title: { en: "Deliver", ar: "التسليم" },
    description: {
      en: "Launch, handover and documentation — plus support after go-live so your product keeps running smoothly.",
      ar: "الإطلاق والتسليم والتوثيق، مع دعم بعد الإطلاق ليستمر منتجك بالعمل بسلاسة.",
    },
    duration: { en: "Launch & support", ar: "إطلاق ودعم" },
  },
];
