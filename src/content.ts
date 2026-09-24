// All Arabic copy for the landing page lives here.
// Components never hard-code text — import from this file.

export const brand = {
  name: "نيــــان", // keep the kashida — it is part of the brand
  logoAlt: "شعار نيــــان",
  whatsapp: "https://wa.me/966561291512",
};

export const nav = {
  links: [
    { label: "المشروع", href: "#project" },
    { label: "المرافق", href: "#amenities" },
    { label: "الخدمات", href: "#services" },
    { label: "تواصل معنا", href: "#contact" },
  ],
  cta: "احجز استشارة",
  homeLabel: "نيــــان — الصفحة الرئيسية",
};

export const loader = {
  label: "جارٍ التحميل",
};

/** Section 1 — the scroll film */
export const film = {
  label: "جولة في مشاريع نيــــان",
  headline: "لكل منزل قصة.",
  subline: "نساعدك في كتابتها.",
  cta: "احجز استشارة",
  scrollHint: "اسحب للأسفل",
  statements: [
    "نهتم بتفاصيل مسكنك",
    "أكثر من 20 عامًا من الخبرة في سوق العقارات",
    "حيث التفاصيل تصنع الفرق.",
  ],
};

/**
 * PLACEHOLDER / MOCK marker. Anything tagged `// MOCK` below is sample data for the pitch and must
 * be confirmed with the client. Set `showBadges: true` to mark those blocks on the page again.
 */
export const placeholder = {
  showBadges: false,
  badge: "بيانات مؤقتة — بانتظار تأكيد العميل",
  short: "مؤقت",
};

/** Section 2 — statement + chevrons */
export const discover = {
  label: "مشاريع نيــــان",
  statement: "اكتشف مشاريع نيان… حيث التفاصيل تصنع الفرق.",
};

/** Section 3 — three points */
export const pointsSection = {
  label: "لماذا نيــــان",
};

export const points = [
  {
    title: "أكثر من 20 عامًا من الخبرة",
    body: "أكثر من عقدين من الخبرة العملية في سوق العقارات.",
  },
  {
    title: "الشفافية",
    body: "نلتزم بالوضوح والمصداقية في جميع مراحل العمل.",
  },
  {
    title: "ما بعد البيع",
    body: "نقدّم إدارة وخدمات بعد البيع للحفاظ على قيمة العقار.",
  },
];

/** "مشاريعنا" — real projects from nayan.sa (names + statuses come from the manifest, as on the site). */
export const projectsSection = {
  label: "أعمالنا",
  title: "مشاريعنا",
  viewProject: "عرض المشروع على nayan.sa",
  newTab: "(يفتح في نافذة جديدة)",
  allProjects: "كل المشاريع",
  allProjectsUrl: "https://nayan.sa/ar/properties",
};

/**
 * Section 4 — project specs, featuring Nayan 32 (currently under construction on nayan.sa).
 * Values marked "from nayan.sa" are as the site lists them; `// MOCK` values are to be confirmed.
 */
export const specs = {
  label: "مشروع قيد الإنشاء",
  title: "نيــــان 32", // from nayan.sa
  photo: "nayan-32-01.webp", // real photo, /public/assets/nayan
  items: [
    { label: "الموقع", value: "حي النرجس، الرياض" }, // MOCK — the nayan.sa listing mentions النرجس next to this project
    { label: "الحالة", value: "قيد الإنشاء" }, // from nayan.sa
    { label: "المساحات", value: "130 – 160 م²" }, // from nayan.sa
    { label: "عدد الغرف", value: "3 – 4 غرف" }, // MOCK
    { label: "عدد الوحدات", value: "12 وحدة سكنية" }, // MOCK
    { label: "موعد التسليم", value: "الربع الرابع 2026" }, // MOCK
  ],
};

/** Section 5 — testimonial. MOCK: quote, name and role to be replaced by a real client testimonial. */
export const testimonial = {
  label: "آراء العملاء",
  quote:
    "من أول زيارة حتى استلام المفتاح، كان فريق نيــــان واضحًا معنا في كل خطوة. التفاصيل التي وعدونا بها وجدناها في بيتنا، وما زالوا معنا بعد السكن.", // MOCK
  name: "أبو فيصل", // MOCK
  role: "مالك وحدة في نيــــان تاون هاوس 22", // MOCK
};

/** Section 6 — services (dark) */
export const servicesSection = {
  label: "الخدمات",
  title: "كيف نساعدك",
};

export const services = [
  "التطوير والتنفيذ",
  "تصميم وتنفيذ المشاريع المخصصة",
  "إدارة العقارات وخدمات ما بعد البيع",
  "الاستشارات الاستثمارية العقارية",
];

/** Section 7 — amenities. The first four are listed on every project page on nayan.sa; the last two are MOCK. */
export const amenities = {
  label: "المرافق",
  title: "كل ما يحتاجه منزلك",
  items: [
    "أمن", // from nayan.sa
    "مواقف سيارات", // from nayan.sa
    "مصعد", // from nayan.sa
    "صالة رياضية", // from nayan.sa
    "حدائق ومساحات خضراء", // MOCK
    "نظام منزل ذكي", // MOCK
  ],
};

/** Section 8 — CTA */
export const cta = {
  headline: "هل أنت مستعد لاكتشاف منزل أحلامك مع نيــــان؟",
  button: "تواصل عبر واتساب",
};

/** Section 9 — footer */
export const footer = {
  contactTitle: "تواصل معنا",
  linksTitle: "روابط",
  emailLabel: "البريد الإلكتروني",
  phoneLabel: "الهاتف",
  addressLabel: "العنوان",
  email: "admin@nayan.sa",
  phone: "+966 56 129 1512",
  phoneHref: "tel:+966561291512",
  address: "حي الملقا، الرياض 13525، المملكة العربية السعودية",
  whatsappLabel: "واتساب",
  backToTop: "العودة للأعلى",
  rights: "جميع الحقوق محفوظة.",
};
