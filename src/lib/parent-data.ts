export type LocalText = {
  ar: string;
  en: string;
};

export const parentStudent = {
  name: { ar: "عمر الناصر", en: "Omar Al-Nasser" } satisfies LocalText,
  grade: { ar: "الصف السادس", en: "Grade 6" } satisfies LocalText,
  school: { ar: "التعليم العام المصري", en: "Egyptian public education" } satisfies LocalText,
  id: "MTK-2026-001245",
  mastery: 78,
  masteryChange: 6,
  activeDays: 5,
  studyMinutes: 185,
  activities: 18,
  accuracy: 82,
};

export const parentSubjects = [
  {
    id: "math",
    name: { ar: "الرياضيات", en: "Mathematics" } satisfies LocalText,
    mastery: 78,
    change: 8,
    confidence: { ar: "ثقة جيدة", en: "Good confidence" } satisfies LocalText,
    weak: { ar: "ضرب الكسور", en: "Multiplying fractions" } satisfies LocalText,
    completed: 8,
    accent: "bg-blue",
    soft: "bg-blue/10",
    status: { ar: "يتحسن", en: "Improving" } satisfies LocalText,
  },
  {
    id: "science",
    name: { ar: "العلوم", en: "Science" } satisfies LocalText,
    mastery: 71,
    change: 3,
    confidence: { ar: "تحتاج أدلة أكثر", en: "Needs more evidence" } satisfies LocalText,
    weak: { ar: "القوى والحركة", en: "Forces and motion" } satisfies LocalText,
    completed: 5,
    accent: "bg-warn",
    soft: "bg-warn/15",
    status: { ar: "قيد التطور", en: "Developing" } satisfies LocalText,
  },
  {
    id: "english",
    name: { ar: "اللغة الإنجليزية", en: "English" } satisfies LocalText,
    mastery: 84,
    change: 5,
    confidence: { ar: "ثقة عالية", en: "High confidence" } satisfies LocalText,
    weak: { ar: "لا توجد نقاط حرجة", en: "No critical weakness" } satisfies LocalText,
    completed: 5,
    accent: "bg-success",
    soft: "bg-success/10",
    status: { ar: "جيد جداً", en: "Very good" } satisfies LocalText,
  },
] as const;

export const parentSessions = [
  {
    id: 1,
    day: { ar: "الأربعاء", en: "Wednesday" } satisfies LocalText,
    date: { ar: "٢٩ يوليو", en: "29 July" } satisfies LocalText,
    time: { ar: "٦:٣٠ مساءً", en: "6:30 PM" } satisfies LocalText,
    subject: { ar: "الرياضيات", en: "Mathematics" } satisfies LocalText,
    title: { ar: "مراجعة ضرب الكسور", en: "Multiplying fractions review" } satisfies LocalText,
    teacher: { ar: "أ. أحمد", en: "Mr. Ahmed" } satisfies LocalText,
    status: "upcoming",
  },
  {
    id: 2,
    day: { ar: "الخميس", en: "Thursday" } satisfies LocalText,
    date: { ar: "٣٠ يوليو", en: "30 July" } satisfies LocalText,
    time: { ar: "٥:٠٠ مساءً", en: "5:00 PM" } satisfies LocalText,
    subject: { ar: "العلوم", en: "Science" } satisfies LocalText,
    title: { ar: "تجربة القوى والحركة", en: "Forces and motion lab" } satisfies LocalText,
    teacher: { ar: "أ. سارة", en: "Ms. Sara" } satisfies LocalText,
    status: "upcoming",
  },
  {
    id: 3,
    day: { ar: "الأحد", en: "Sunday" } satisfies LocalText,
    date: { ar: "٢٦ يوليو", en: "26 July" } satisfies LocalText,
    time: { ar: "٤:٠٠ مساءً", en: "4:00 PM" } satisfies LocalText,
    subject: { ar: "اللغة الإنجليزية", en: "English" } satisfies LocalText,
    title: { ar: "تدريب المحادثة", en: "Speaking practice" } satisfies LocalText,
    teacher: { ar: "أ. مريم", en: "Ms. Mariam" } satisfies LocalText,
    status: "attended",
    attendance: 92,
    participation: 4,
  },
  {
    id: 4,
    day: { ar: "الخميس", en: "Thursday" } satisfies LocalText,
    date: { ar: "٢٣ يوليو", en: "23 July" } satisfies LocalText,
    time: { ar: "٦:٣٠ مساءً", en: "6:30 PM" } satisfies LocalText,
    subject: { ar: "الرياضيات", en: "Mathematics" } satisfies LocalText,
    title: { ar: "الكسور المتكافئة", en: "Equivalent fractions" } satisfies LocalText,
    teacher: { ar: "أ. أحمد", en: "Mr. Ahmed" } satisfies LocalText,
    status: "missed",
  },
] as const;

export const parentMessages = [
  {
    id: 1,
    type: "teacher",
    sender: { ar: "أ. أحمد", en: "Mr. Ahmed" } satisfies LocalText,
    title: { ar: "تقدم جيد في الكسور", en: "Good progress in fractions" } satisfies LocalText,
    body: {
      ar: "تحسن عمر بشكل واضح هذا الأسبوع. يحتاج فقط إلى مراجعة قصيرة لضرب الكسور قبل اللقاء القادم.",
      en: "Omar improved clearly this week. He only needs a short multiplying-fractions review before the next session.",
    } satisfies LocalText,
    time: { ar: "منذ ساعتين", en: "2 hours ago" } satisfies LocalText,
    unread: true,
  },
  {
    id: 2,
    type: "learning",
    sender: { ar: "تقرير متقن", en: "Mutken report" } satisfies LocalText,
    title: { ar: "التقرير الأسبوعي جاهز", en: "Weekly report is ready" } satisfies LocalText,
    body: {
      ar: "درس عمر ٥ أيام وأكمل ١٨ نشاطاً. ارتفع الإتقان العام بنسبة ٦٪.",
      en: "Omar studied on 5 days and completed 18 activities. Overall mastery increased by 6%.",
    } satisfies LocalText,
    time: { ar: "أمس", en: "Yesterday" } satisfies LocalText,
    unread: true,
  },
  {
    id: 3,
    type: "account",
    sender: { ar: "الحساب والاشتراك", en: "Account & subscription" } satisfies LocalText,
    title: { ar: "تذكير بالتجديد", en: "Renewal reminder" } satisfies LocalText,
    body: {
      ar: "سيتم تجديد باقة ٣ مواد في ٧ أغسطس ٢٠٢٦ بقيمة ١٬١٥٠ جنيه.",
      en: "Your 3-subject package renews on 7 August 2026 for 1,150 EGP.",
    } satisfies LocalText,
    time: { ar: "٢٥ يوليو", en: "25 July" } satisfies LocalText,
    unread: false,
  },
] as const;

export function localize(text: LocalText, lang: "ar" | "en") {
  return text[lang];
}
