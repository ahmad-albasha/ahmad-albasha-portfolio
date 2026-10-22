import type { Localized } from "@/lib/i18n";

/**
 * Portfolio content. Add, remove or reorder projects here — components read from this file only.
 *
 * Tiers:
 *  - "featured"  → large cards + their own case-study page at /projects/<slug>
 *  - "secondary" → medium cards
 *  - "more"      → compact list
 *
 * Images: drop files into /public/projects and set `image: "/projects/<file>"`.
 * Without an image, an abstract branded placeholder is rendered instead.
 */

export const projectCategories = ["ai", "web", "mobile", "hardware"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export interface ProjectMedia {
  src: string;
  alt: Localized;
  /** Optional explanation shown under the screenshot. */
  caption?: Localized;
}

interface ProjectBase {
  slug: string;
  /** Brand names are kept identical in every language. */
  title: string;
  year: string;
  categories: ProjectCategory[];
  tagline: Localized;
  summary: Localized;
  tags: string[];
  image?: string;
  liveUrl?: string;
  /** Colour of the placeholder artwork when no image is provided. */
  accent: "gold" | "cool";
}

export interface FeaturedProject extends ProjectBase {
  tier: "featured";
  role: Localized;
  problem: Localized;
  solution: Localized;
  result: Localized;
  highlights: Localized<string[]>;
  media: ProjectMedia[];
}

export interface StandardProject extends ProjectBase {
  tier: "secondary" | "more";
}

export type Project = FeaturedProject | StandardProject;

export const projects: Project[] = [
  /* ─────────────── Featured ─────────────── */
  {
    slug: "faqih",
    tier: "featured",
    title: "Faqih",
    year: "2025",
    categories: ["ai", "web"],
    accent: "gold",
    image: "/projects/faqiah-answer.png",
    tagline: {
      en: "An Arabic fiqh assistant that answers only from “Al-Fiqh Al-Islami wa Adillatuh” and cites every source",
      ar: "مساعد فقهي بالعربية يجيب من كتاب «الفقه الإسلامي وأدلته» فقط، ويذكر مصدر كل معلومة",
    },
    summary: {
      en: "A conversational RAG system over the eight volumes of Dr. Wahbah al-Zuhayli’s encyclopaedia: it searches the book, answers in Arabic with numbered citations to the exact volume and page, and refuses clearly when the book has no evidence.",
      ar: "نظام محادثة مبني على تقنية RAG فوق المجلدات الثمانية لموسوعة د. وهبة الزحيلي: يبحث في الكتاب، ويجيب بالعربية مع إحالات مرقّمة إلى المجلد والصفحة، ويعتذر بوضوح حين لا يجد في الكتاب دليلاً كافياً.",
    },
    tags: ["Python", "FastAPI", "RAG", "ChromaDB", "BM25", "Llama 3.3 (Groq)", "React", "PostgreSQL", "Docker", "Arabic NLP"],
    role: { en: "Architecture, AI pipeline, backend & frontend", ar: "المعمارية، خط معالجة الذكاء الاصطناعي، الواجهة الخلفية والأمامية" },
    problem: {
      en: "Reliable fiqh rulings are spread across thousands of pages of classical text, and general chatbots answer religious questions confidently with no source, or with invented ones. For this kind of question, an answer you cannot check is worse than no answer.",
      ar: "الأحكام الفقهية الموثوقة موزّعة على آلاف الصفحات من الكتب، والمساعدات العامة تجيب عن الأسئلة الشرعية بثقة دون مصدر، أو بمصادر مختلَقة. وفي هذا النوع من الأسئلة، الإجابة التي لا يمكن التحقق منها أسوأ من عدم الإجابة.",
    },
    solution: {
      en: "The eight volumes were cleaned and split into 6,235 passages with stable IDs and book / volume / page metadata, then embedded with multilingual-e5 into ChromaDB. Each question is first rewritten into a standalone query using the conversation history, then searched two ways — dense vectors and an Arabic-normalised BM25 index — with query expansion and HyDE, fused by Reciprocal Rank Fusion and re-ranked by a cross-encoder. An evidence gate (score strength, score gap, term coverage and domain check) decides whether the book really answers the question before any LLM is called. Only then does Llama 3.3 write the answer from the selected passages, citing them as [1], [2]… A FastAPI backend adds JWT accounts, saved conversations and rate limiting, and a React RTL interface shows each source card with its excerpt.",
      ar: "نُظّفت المجلدات الثمانية وقُسّمت إلى 6,235 مقطعاً بمعرّفات ثابتة وبيانات الكتاب والمجلد والصفحة، ثم حُوّلت إلى متجهات بنموذج multilingual-e5 وخُزّنت في ChromaDB. يُعاد صياغة كل سؤال أولاً إلى سؤال مستقل مستفيداً من سياق المحادثة، ثم يُبحث عنه بطريقتين — بحث دلالي بالمتجهات وفهرس BM25 يراعي توحيد الكتابة العربية — مع توسيع الاستعلام وتقنية HyDE، وتُدمج النتائج بخوارزمية RRF ويُعاد ترتيبها بنموذج cross-encoder. ثم تقرّر «بوابة الأدلة» (قوة النتيجة، والفجوة بين النتائج، وتغطية مصطلحات السؤال، وتصنيف المجال) هل في الكتاب ما يجيب فعلاً قبل استدعاء أي نموذج لغوي. وبعدها فقط يكتب Llama 3.3 الإجابة من المقاطع المختارة مع إحالات [1]، [2]… وتضيف الواجهة الخلفية FastAPI حسابات بمصادقة JWT وحفظاً للمحادثات وحدّاً لمعدل الطلبات، بينما تعرض واجهة React العربية بطاقة لكل مصدر مع نصه.",
    },
    result: {
      en: "A working, deployable assistant: every answer links back to the volume and page it came from, follow-up questions keep their context, and questions outside the book are declined instead of guessed. The backend is covered by 36 automated tests and ships as a Docker Compose stack (PostgreSQL, FastAPI, Caddy with automatic HTTPS).",
      ar: "مساعد يعمل وجاهز للنشر: كل إجابة مربوطة بالمجلد والصفحة التي أُخذت منها، والأسئلة المتابِعة تحافظ على سياقها، والأسئلة الخارجة عن الكتاب يُعتذر عنها بدل التخمين. وتغطي الواجهة الخلفية 36 اختباراً آلياً، وتُنشر كحزمة Docker Compose (PostgreSQL وFastAPI وCaddy مع HTTPS تلقائي).",
    },
    highlights: {
      en: [
        "Hybrid search: dense vectors + Arabic BM25, fused with RRF",
        "Cross-encoder re-ranking and an evidence gate before generation",
        "Numbered citations with volume, page and the original excerpt",
        "Conversational follow-ups with server-side history",
        "Accounts, saved chats and rate limiting (JWT, PostgreSQL)",
      ],
      ar: [
        "بحث هجين: متجهات دلالية + BM25 عربي، مدموجة بخوارزمية RRF",
        "إعادة ترتيب بنموذج cross-encoder وبوابة أدلة قبل التوليد",
        "إحالات مرقّمة بالمجلد والصفحة مع النص الأصلي",
        "أسئلة متابِعة تحفظ سياق المحادثة على الخادم",
        "حسابات ومحادثات محفوظة وحدّ لمعدل الطلبات (JWT وPostgreSQL)",
      ],
    },
    media: [
      {
        src: "/projects/faqiah-answer.png",
        alt: { en: "Answer about wiping over leather socks, with numbered citations", ar: "إجابة عن المسح على الخفين مع إحالات مرقّمة" },
        caption: {
          en: "A grounded answer: the ruling, the agreed conditions and the duration, each sentence tagged with the passage it came from.",
          ar: "إجابة موثّقة: الحكم والشروط المتفق عليها ومدة المسح، وكل جملة مربوطة برقم المقطع الذي أُخذت منه.",
        },
      },
      {
        src: "/projects/faqiah-sources.png",
        alt: { en: "Follow-up question with an expanded source card", ar: "سؤال متابِع مع بطاقة مصدر مفتوحة" },
        caption: {
          en: "A follow-up (“and its duration for residents and travellers?”) understood from context; opening a source shows the exact excerpt from the book.",
          ar: "سؤال متابِع («وما مدته للمقيم والمسافر؟») يُفهم من سياق المحادثة، وبفتح المصدر يظهر النص الأصلي من الكتاب.",
        },
      },
      {
        src: "/projects/faqiah-refusal.png",
        alt: { en: "Out-of-scope question politely declined", ar: "الاعتذار عن سؤال خارج النطاق" },
        caption: {
          en: "Out-of-scope questions are declined by the evidence gate before any LLM call, instead of being answered from general knowledge.",
          ar: "الأسئلة الخارجة عن الكتاب تُرفض عند «بوابة الأدلة» قبل استدعاء النموذج، بدل الإجابة عنها من معلومات عامة.",
        },
      },
      {
        src: "/projects/faqiah-home.png",
        alt: { en: "Welcome screen with suggested questions", ar: "شاشة الترحيب مع أسئلة مقترحة" },
        caption: {
          en: "The chat home: suggested questions, a sidebar of saved conversations, and a reminder to consult scholars before acting on a ruling.",
          ar: "الشاشة الرئيسية: أسئلة مقترحة، وشريط جانبي للمحادثات المحفوظة، وتنبيه بمراجعة أهل العلم قبل العمل بالحكم.",
        },
      },
      {
        src: "/projects/faqiah-login.png",
        alt: { en: "Sign-in screen", ar: "شاشة تسجيل الدخول" },
        caption: {
          en: "Accounts with JWT authentication, so each user keeps their own conversation history.",
          ar: "حسابات بمصادقة JWT، فيحتفظ كل مستخدم بسجل محادثاته الخاص.",
        },
      },
    ],
  },
  {
    slug: "mikai",
    tier: "featured",
    title: "MIKAI",
    year: "2025",
    categories: ["mobile", "ai"],
    accent: "gold",
    tagline: {
      en: "A luxury salon app with an AI concierge",
      ar: "تطبيق صالون فاخر مع مساعد ذكي",
    },
    summary: {
      en: "Flutter app for a premium salon: bookings, services and loyalty, backed by FastAPI and Firebase, with a GPT-4o assistant that recommends treatments.",
      ar: "تطبيق Flutter لصالون راقٍ: حجوزات وخدمات وبرنامج ولاء، مع واجهة خلفية FastAPI وFirebase ومساعد GPT-4o يقترح العلاجات المناسبة.",
    },
    tags: ["Flutter", "Dart", "FastAPI", "Firebase", "GPT-4o"],
    role: { en: "Product design, mobile app & backend", ar: "تصميم المنتج، تطبيق الجوال والواجهة الخلفية" },
    problem: {
      en: "The salon's clients booked through phone calls and DMs. The experience didn't match the brand, and staff spent hours managing schedules by hand.",
      ar: "كان العملاء يحجزون عبر الاتصال والرسائل، فلم تكن التجربة بمستوى العلامة، وكان الفريق يقضي ساعات في إدارة المواعيد يدوياً.",
    },
    solution: {
      en: "A refined Flutter app with real-time availability, secure payments-ready flows and push notifications. A FastAPI service orchestrates GPT-4o to suggest services from a client's history and preferences.",
      ar: "تطبيق Flutter أنيق مع توفر المواعيد لحظياً، ومسارات جاهزة للدفع الآمن، وإشعارات فورية. وخدمة FastAPI تدير GPT-4o لاقتراح الخدمات بناءً على سجل العميل وتفضيلاته.",
    },
    result: {
      en: "A booking experience that feels as premium as the salon itself, and far less manual scheduling for staff. (Placeholder — add your real metrics.)",
      ar: "تجربة حجز بمستوى فخامة الصالون نفسه، وجهد أقل بكثير في جدولة المواعيد. (نص مؤقت — أضف نتائجك الفعلية.)",
    },
    highlights: {
      en: ["AI treatment recommendations", "Real-time booking & notifications", "Loyalty and client profiles"],
      ar: ["توصيات علاجات بالذكاء الاصطناعي", "حجز وإشعارات لحظية", "برنامج ولاء وملفات للعملاء"],
    },
    media: [],
  },
  {
    slug: "emergencyx",
    tier: "featured",
    title: "EmergencyX",
    year: "2026",
    categories: ["ai"],
    accent: "cool",
    image: "/projects/emergencyx-dashboard.png",
    tagline: {
      en: "Emergency-department triage with an AI admission-risk estimate",
      ar: "نظام فرز لقسم الطوارئ مع تقدير لخطر دخول المستشفى بالذكاء الاصطناعي",
    },
    summary: {
      en: "A Windows desktop application for ED triage nurses: it records each visit step by step and asks a machine-learning model for the probability that the patient will be admitted, as decision support for the clinician.",
      ar: "تطبيق مكتبي لممرضي الفرز في قسم الطوارئ يسجّل كل زيارة خطوة بخطوة، ثم يطلب من نموذج تعلم آلة احتمال أن ينتهي المريض بالدخول إلى المستشفى، كأداة لدعم قرار الطبيب.",
    },
    tags: ["C#", ".NET / WinForms", "SQL Server", "Python", "LightGBM", "scikit-learn", "Machine Learning"],
    role: { en: "Desktop app, database & ML integration", ar: "تطوير التطبيق المكتبي وقاعدة البيانات ودمج نموذج تعلم الآلة" },
    problem: {
      en: "In a crowded emergency department, knowing early which patients are likely to be admitted helps staff plan beds and prioritise care. Triage data is often written on paper or in free text, so it can't feed a predictive model, and outcomes are rarely linked back to what was known at triage.",
      ar: "في قسم طوارئ مزدحم، تساعد معرفة المرضى المرجّح دخولهم مبكراً على تجهيز الأسرّة وترتيب أولويات الرعاية. لكن بيانات الفرز تُكتب غالباً على الورق أو كنص حر فلا يمكن استخدامها في نموذج تنبؤي، ونادراً ما تُربط النتيجة النهائية بما كان معروفاً وقت الفرز.",
    },
    solution: {
      en: "A six-step visit wizard — registration, arrival, chief complaint, triage vitals, medical history and review — stores structured data in SQL Server. Chief complaints are coded from the official NHAMCS list of 837 reasons for visit, and 22 chronic conditions are recorded as yes / no / unknown. A Python bridge converts each visit into the 55 features of a LightGBM model trained on US NHAMCS emergency data (2015–2021, tested on 2022), checks the model files' integrity, and returns a calibrated probability with a Low / Medium / High risk group. Every prediction is saved with its exact input, and the final disposition is recorded separately so predictions can later be compared with real outcomes.",
      ar: "معالج زيارة من ست خطوات — التسجيل، والوصول، والشكوى الرئيسية، والعلامات الحيوية، والتاريخ المرضي، والمراجعة — يحفظ البيانات بشكل منظّم في SQL Server. تُرمَّز الشكوى الرئيسية من القائمة الرسمية لأسباب الزيارة في NHAMCS (837 سبباً)، وتُسجَّل 22 حالة مزمنة بنعم / لا / غير معروف. ويحوّل جسر بلغة Python كل زيارة إلى 55 متغيراً لنموذج LightGBM مدرَّب على بيانات الطوارئ الأمريكية NHAMCS (2015–2021، واختُبر على 2022)، ويتحقق من سلامة ملفات النموذج، ثم يعيد احتمالاً معايَراً مع فئة خطر منخفضة / متوسطة / عالية. تُحفظ كل نتيجة مع مدخلاتها بالضبط، وتُسجَّل نتيجة الزيارة النهائية بشكل منفصل لمقارنة التنبؤات بالنتائج الحقيقية لاحقاً.",
    },
    result: {
      en: "A working end-to-end system, from triage to an AI risk estimate to the recorded outcome, covered by an automated end-to-end test and 39 unit tests. In an external check on 1,267 visits from a Korean ED dataset, which is a very different population, the model kept a ROC-AUC of 0.77. The check also showed that calibration must be redone locally before any real use. The app states on every result screen that it is decision support only.",
      ar: "نظام متكامل يعمل من الفرز إلى تقدير الخطر بالذكاء الاصطناعي ثم تسجيل النتيجة، ويغطيه اختبار آلي شامل و39 اختبار وحدة. وفي تحقق خارجي على 1,267 زيارة من بيانات طوارئ كورية، وهي فئة مختلفة كثيراً عن بيانات التدريب، حافظ النموذج على ROC-AUC بقيمة 0.77. وأظهر التحقق أيضاً أن المعايرة يجب أن تُعاد محلياً قبل أي استخدام فعلي. ويوضّح التطبيق في كل شاشة نتيجة أنه أداة لدعم القرار فقط.",
    },
    highlights: {
      en: [
        "Six-step triage wizard with validated vital signs",
        "AI admission risk with Low / Medium / High groups",
        "55-feature LightGBM model via a Python bridge",
        "Full audit trail and outcome tracking in SQL Server",
        "External validation: ROC-AUC 0.77",
      ],
      ar: [
        "معالج فرز من ست خطوات مع تحقق من العلامات الحيوية",
        "تقدير خطر الدخول بفئات منخفضة / متوسطة / عالية",
        "نموذج LightGBM بـ 55 متغيراً عبر جسر Python",
        "سجل تدقيق كامل وتتبّع للنتائج في SQL Server",
        "تحقق خارجي: ROC-AUC بقيمة 0.77",
      ],
    },
    media: [
      { src: "/projects/emergencyx-ai-risk.png", alt: { en: "AI admission-risk result: 86%, high risk", ar: "نتيجة تقدير خطر الدخول: 86٪، خطر عالٍ" } },
      { src: "/projects/emergencyx-triage.png", alt: { en: "Triage step: acuity and initial vital signs", ar: "خطوة الفرز: درجة الأولوية والعلامات الحيوية" } },
      { src: "/projects/emergencyx-complaint.png", alt: { en: "Chief complaint coded from the NHAMCS reason-for-visit list", ar: "ترميز الشكوى الرئيسية من قائمة أسباب الزيارة في NHAMCS" } },
      { src: "/projects/emergencyx-history.png", alt: { en: "Medical history: chronic conditions as yes / no / unknown", ar: "التاريخ المرضي: الحالات المزمنة بنعم / لا / غير معروف" } },
      { src: "/projects/emergencyx-visit-summary.png", alt: { en: "Visit summary screen", ar: "شاشة ملخص الزيارة" } },
      { src: "/projects/emergencyx-risk-history.png", alt: { en: "AI risk tab with the prediction history", ar: "تبويب خطر الدخول مع سجل التنبؤات" } },
    ],
  },
  {
    slug: "dataforge",
    tier: "featured",
    title: "DataForge",
    year: "2025",
    categories: ["ai", "web"],
    accent: "cool",
    tagline: {
      en: "Turning raw data into model-ready datasets",
      ar: "تحويل البيانات الخام إلى بيانات جاهزة للنماذج",
    },
    summary: {
      en: "Placeholder description — a data tooling platform for cleaning, transforming and preparing datasets for AI workflows.",
      ar: "وصف مؤقت — منصة أدوات بيانات لتنظيف البيانات وتحويلها وتجهيزها لمسارات عمل الذكاء الاصطناعي.",
    },
    tags: ["Python", "Data Engineering", "FastAPI", "React"],
    role: { en: "Placeholder — your role", ar: "نص مؤقت — دورك في المشروع" },
    problem: {
      en: "Placeholder — describe the problem DataForge solves and who had it.",
      ar: "نص مؤقت — صف المشكلة التي يحلها DataForge ومن كان يعاني منها.",
    },
    solution: {
      en: "Placeholder — describe the architecture and the key decisions you made.",
      ar: "نص مؤقت — صف المعمارية وأهم القرارات التي اتخذتها.",
    },
    result: {
      en: "Placeholder — describe the outcome, ideally with a number.",
      ar: "نص مؤقت — صف النتيجة، ويُفضّل أن تكون برقم.",
    },
    highlights: {
      en: ["Placeholder highlight", "Placeholder highlight", "Placeholder highlight"],
      ar: ["ميزة مؤقتة", "ميزة مؤقتة", "ميزة مؤقتة"],
    },
    media: [],
  },
  {
    slug: "edunation-magazine",
    tier: "featured",
    title: "EduNation Magazine",
    year: "2024",
    categories: ["web"],
    accent: "cool",
    liveUrl: "https://edunationmagazine.com",
    image: "/projects/edunation-home.png",
    tagline: {
      en: "The digital home of EduNation, the student club magazine at LIU",
      ar: "المنصة الرقمية لمجلة EduNation، مجلة النادي الطلابي في جامعة LIU",
    },
    summary: {
      en: "A bilingual Arabic/English magazine website I designed and built for the EduNation university club at LIU — written, edited and designed by students of the School of Education.",
      ar: "موقع مجلة ثنائي اللغة (عربي/إنجليزي) صممته وطوّرته لنادي EduNation الجامعي في جامعة LIU، يكتبه ويحرّره ويصمّمه طلاب كلية التربية.",
    },
    tags: ["WordPress", "Web Design", "UI/UX", "RTL / Arabic", "Responsive", "SEO"],
    role: { en: "Design & development of the website", ar: "تصميم الموقع وتطويره" },
    problem: {
      en: "The EduNation club at LIU publishes a student magazine with themed issues, but it had no home online to gather its issues, articles and writers in one place readers could browse and share.",
      ar: "ينشر نادي EduNation في جامعة LIU مجلة طلابية بأعداد ذات ثيمات، لكن لم يكن لها مكان على الإنترنت يجمع الأعداد والمقالات والكتّاب في مكان واحد يسهل تصفحه ومشاركته.",
    },
    solution: {
      en: "An editorial website built around issues: each issue has its own cover page and theme, articles carry their writer, issue and reading time, and the layout works natively in Arabic (RTL) and English. Pages for the team, the magazine and contributor submissions complete it, with an easy workflow for the club to publish new issues.",
      ar: "موقع تحريري مبني حول الأعداد: لكل عدد صفحة غلاف وثيمة خاصة، ولكل مقال كاتبه وعدده ومدة قراءته، مع تصميم يعمل بالعربية (من اليمين لليسار) والإنجليزية بشكل طبيعي. وتكتمل المنصة بصفحات للفريق وللتعريف بالمجلة ولاستقبال مشاركات الكتّاب، مع سير عمل سهل لنشر الأعداد الجديدة.",
    },
    result: {
      en: "Five issues and their articles are now published online — from “LIU” and “Palestine” to “Mental Health” and the latest issue, giving the club's writers a real audience beyond campus.",
      ar: "أصبحت خمسة أعداد بمقالاتها منشورة على الإنترنت — من «LIU» و«فلسطين» إلى «الصحة النفسية» وصولاً إلى العدد الأحدث — مما منح كتّاب النادي جمهوراً حقيقياً خارج الحرم الجامعي.",
    },
    highlights: {
      en: ["Designed for the EduNation university club at LIU", "Issue-based editorial structure", "Bilingual Arabic / English with full RTL", "Writer profiles, team and contribute pages"],
      ar: ["صُمّم لنادي EduNation الجامعي في جامعة LIU", "هيكل تحريري مبني على الأعداد", "ثنائي اللغة عربي / إنجليزي مع دعم كامل للاتجاه من اليمين لليسار", "صفحات للكتّاب والفريق والمشاركة"],
    },
    media: [
      { src: "/projects/edunation-issue.png", alt: { en: "Issue 05 cover page", ar: "صفحة غلاف العدد الخامس" } },
      { src: "/projects/edunation-articles.png", alt: { en: "Articles from the latest issue on the homepage", ar: "مقالات العدد الأحدث في الصفحة الرئيسية" } },
      { src: "/projects/edunation-issues.png", alt: { en: "Archive of all five issues", ar: "أرشيف الأعداد الخمسة" } },
      { src: "/projects/edunation-article.png", alt: { en: "Article page", ar: "صفحة مقال" } },
    ],
  },
  {
    slug: "mikeandkals",
    tier: "featured",
    title: "Mike & Kals",
    year: "2026",
    categories: ["web"],
    accent: "gold",
    liveUrl: "https://mikeandkals.com",
    image: "/projects/mikeandkals-home.png",
    tagline: {
      en: "A luxury website for Mike & Kals, a ladies' hair and beauty salon in Dubai",
      ar: "موقع فاخر لصالون Mike & Kals للشعر والتجميل النسائي في دبي",
    },
    summary: {
      en: "A dark, editorial website for a premium Dubai salon that presents its eleven service disciplines, its founder and its philosophy — and turns visitors into bookings and WhatsApp conversations.",
      ar: "موقع تحريري بطابع داكن لصالون راقٍ في دبي، يعرض أقسام خدماته الأحد عشر ومؤسسه وفلسفته، ويحوّل الزوار إلى حجوزات ومحادثات واتساب.",
    },
    tags: ["Web Design", "UI/UX", "Animation", "Bilingual EN / AR", "Responsive", "SEO"],
    role: { en: "Design & development of the website", ar: "تصميم الموقع وتطويره" },
    problem: {
      en: "Mike & Kals is a high-end salon in Dubai Studio City led by a hair artist with 18+ years of experience, but its online presence was a social feed and a phone number. Clients couldn't explore the full range of services, understand pricing, or get a feel for the brand before booking.",
      ar: "Mike & Kals صالون راقٍ في دبي ستوديو سيتي يقوده فنان شعر بخبرة تتجاوز 18 عاماً، لكن حضوره الرقمي كان مقتصراً على حسابات التواصل الاجتماعي ورقم هاتف، فلم تكن العميلات قادرات على استكشاف الخدمات كاملة أو فهم الأسعار أو الإحساس بهوية العلامة قبل الحجز.",
    },
    solution: {
      en: "A cinematic single-page experience with a black-and-gold identity and serif typography. Services are presented as eleven “chapters” — from cuts and colour to extensions, microblading and bridal — each opening into its own detail view with a direct booking button. A “Meet Mike” story, team section, an EN/عربي FAQ that answers the real questions clients ask, and a location section with map, parking info and one-tap WhatsApp complete it.",
      ar: "تجربة سينمائية في صفحة واحدة بهوية سوداء وذهبية وخطوط كلاسيكية أنيقة. تُعرض الخدمات على شكل أحد عشر «فصلاً» — من القص والصبغات إلى الوصلات والميكروبليدنج وتجهيز العرائس — يفتح كل منها نافذة تفاصيل خاصة مع زر حجز مباشر. وتكتمل التجربة بقسم «تعرّفي على مايك» وقسم الفريق، وأسئلة شائعة بالعربية والإنجليزية تجيب عن أسئلة العميلات الحقيقية، وقسم للموقع مع خريطة ومعلومات المواقف وتواصل فوري عبر واتساب.",
    },
    result: {
      en: "The salon now has a digital home that matches the experience inside it: clients can browse every service, get their questions answered in Arabic or English, and reach the team on WhatsApp in one tap.",
      ar: "أصبح للصالون واجهة رقمية بمستوى التجربة التي يقدّمها داخله: تتصفح العميلة كل الخدمات، وتجد إجابات أسئلتها بالعربية أو الإنجليزية، وتتواصل مع الفريق عبر واتساب بلمسة واحدة.",
    },
    highlights: {
      en: ["Black-and-gold luxury identity with editorial typography", "Eleven service “chapters” with detail views and booking", "Bilingual EN / عربي FAQ toggle", "One-tap WhatsApp, call and Google Maps location"],
      ar: ["هوية فاخرة بالأسود والذهبي مع خطوط تحريرية", "أحد عشر «فصلاً» للخدمات مع صفحات تفاصيل وحجز", "أسئلة شائعة بالعربية والإنجليزية مع زر تبديل", "تواصل فوري عبر واتساب والاتصال وموقع على خرائط Google"],
    },
    media: [
      { src: "/projects/mikeandkals-services.png", alt: { en: "The eleven service chapters", ar: "فصول الخدمات الأحد عشر" } },
      { src: "/projects/mikeandkals-faq.png", alt: { en: "Bilingual FAQ section", ar: "قسم الأسئلة الشائعة ثنائي اللغة" } },
      { src: "/projects/mikeandkals-location.png", alt: { en: "Location and contact section", ar: "قسم الموقع والتواصل" } },
    ],
  },

  /* ─────────────── Secondary ─────────────── */
  {
    slug: "events-invitation",
    tier: "secondary",
    title: "Events Invitation",
    year: "2024",
    categories: ["web", "mobile"],
    accent: "gold",
    tagline: { en: "Digital invitations & RSVPs", ar: "دعوات رقمية وتأكيد الحضور" },
    summary: {
      en: "Placeholder — elegant digital invitations with RSVP tracking for weddings and private events.",
      ar: "نص مؤقت — دعوات رقمية أنيقة مع تتبع تأكيد الحضور لحفلات الزفاف والمناسبات الخاصة.",
    },
    tags: ["Web App", "Responsive", "RSVP"],
  },

  /* ─────────────── More work ─────────────── */
  {
    slug: "modern-laptop-stand",
    tier: "more",
    title: "Modern Laptop Stand",
    year: "2023",
    categories: ["hardware"],
    accent: "cool",
    tagline: { en: "Robotics · motorised ergonomic stand", ar: "روبوتات · حامل حاسوب ذكي بمحركات" },
    summary: {
      en: "Placeholder — a motorised laptop stand with adjustable height and angle.",
      ar: "نص مؤقت — حامل حاسوب بمحركات قابل لتعديل الارتفاع والزاوية.",
    },
    tags: ["Arduino", "C++", "3D Printing"],
  },
  {
    slug: "modern-plants-environment",
    tier: "more",
    title: "Modern Plants Environment",
    year: "2023",
    categories: ["hardware"],
    accent: "gold",
    tagline: { en: "Robotics · smart plant care system", ar: "روبوتات · نظام ذكي للعناية بالنباتات" },
    summary: {
      en: "Placeholder — sensors and automation that monitor soil, light and humidity and water plants automatically.",
      ar: "نص مؤقت — حساسات وأتمتة تراقب التربة والإضاءة والرطوبة وتسقي النباتات تلقائياً.",
    },
    tags: ["Arduino", "Sensors", "IoT"],
  },
];

export const featuredProjects = projects.filter((p): p is FeaturedProject => p.tier === "featured");

export function getFeaturedProject(slug: string) {
  return featuredProjects.find((p) => p.slug === slug);
}
