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
 * PLACEHOLDER marker. Anything tagged with this is not final and must be confirmed with the
 * client — the page shows it with a visible "placeholder" badge.
 */
export const placeholder = {
  badge: "بيانات مؤقتة — بانتظار تأكيد العميل",
  short: "مؤقت",
};

/** Section 2 — statement + chevrons */
export const discover = {
  label: "مشاريع نيــــان",
  statement: "اكتشف مشاريع نيان… حيث التفاصيل تصنع الفرق.",
  imageAlts: ["غرفة معيشة في أحد مشاريع نيــــان", "واجهة أحد مباني نيــــان", "صالة بارتفاع مزدوج"],
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

/** Section 4 — project specs. PLACEHOLDER: every value below is to be confirmed with the client. */
export const specs = {
  label: "المشروع",
  title: "اسم المشروع", // PLACEHOLDER
  imageAlt: "واجهة المشروع",
  items: [
    { label: "الموقع", value: "حي —، الرياض" }, // PLACEHOLDER
    { label: "نوع الوحدات", value: "فلل / شقق" }, // PLACEHOLDER
    { label: "عدد الوحدات", value: "00" }, // PLACEHOLDER
    { label: "المساحات", value: "000 – 000 م²" }, // PLACEHOLDER
    { label: "عدد الغرف", value: "0 – 0" }, // PLACEHOLDER
    { label: "موعد التسليم", value: "0000" }, // PLACEHOLDER
  ],
};

/** Section 5 — testimonial. PLACEHOLDER: quote and name to be supplied by the client. */
export const testimonial = {
  label: "آراء العملاء",
  quote: "هنا تُعرض شهادة أحد عملاء نيــــان. نص مؤقت إلى أن يزوّدنا العميل بالشهادة الفعلية.", // PLACEHOLDER
  name: "اسم العميل", // PLACEHOLDER
  role: "مالك منزل في أحد مشاريع نيــــان", // PLACEHOLDER
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

/** Section 7 — amenities. PLACEHOLDER: the whole list is to be confirmed with the client. */
export const amenities = {
  label: "المرافق",
  title: "كل ما يحتاجه منزلك",
  items: [
    "مسبح خاص",
    "نادٍ رياضي",
    "مواقف سيارات خاصة",
    "حدائق ومساحات خضراء",
    "نظام منزل ذكي",
    "أمن وحراسة على مدار الساعة",
  ], // PLACEHOLDER
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
  wordmark: "نيــــان",
};
