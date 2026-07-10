import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useT, useLanguage } from "@/lib/language";
import { lessonVideos } from "@/lib/videos";
import {
  Calculator,
  FlaskConical,
  BookOpen,
  Languages,
  Globe,
  ChevronRight,
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Circle,
  Lock,
  Coins,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";
import { resourcePointRules } from "@/lib/points";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Review & Test — Mutken" },
      { name: "description", content: "Browse learning resources by grade and subject." },
    ],
  }),
  component: LibraryScreen,
});

type Lesson = { title: string; duration: string };
type Unit = { name: string; lessons: Lesson[] };
type Semester = { name: string; units: Unit[] };
type Subject = {
  id: string;
  name: string;
  icon: LucideIcon;
  tint: string;
  semesters: Semester[];
};

const GRADES = ["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"];

const SUBJECTS: Subject[] = [
  {
    id: "math",
    name: "Math",
    icon: Calculator,
    tint: "from-blue to-mint",
    semesters: [
      {
        name: "Semester 1",
        units: [
          {
            name: "Unit 1: Numbers",
            lessons: [
              { title: "Place Value", duration: "6 min" },
              { title: "Rounding", duration: "8 min" },
              { title: "Estimation", duration: "5 min" },
            ],
          },
          {
            name: "Unit 2: Fractions",
            lessons: [
              { title: "Intro to Fractions", duration: "7 min" },
              { title: "Multiplying Fractions", duration: "9 min" },
              { title: "Dividing Fractions", duration: "10 min" },
            ],
          },
        ],
      },
      {
        name: "Semester 2",
        units: [
          {
            name: "Unit 3: Geometry",
            lessons: [
              { title: "Angles", duration: "6 min" },
              { title: "Triangles", duration: "8 min" },
            ],
          },
          {
            name: "Unit 4: Data",
            lessons: [
              { title: "Reading Charts", duration: "5 min" },
              { title: "Mean & Median", duration: "7 min" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "science",
    name: "Science",
    icon: FlaskConical,
    tint: "from-mint to-blue",
    semesters: [
      {
        name: "Semester 1",
        units: [
          {
            name: "Unit 1: Living Things",
            lessons: [
              { title: "Cells", duration: "6 min" },
              { title: "Plants", duration: "7 min" },
            ],
          },
          { name: "Unit 2: Matter", lessons: [{ title: "States of Matter", duration: "8 min" }] },
        ],
      },
      {
        name: "Semester 2",
        units: [
          { name: "Unit 3: Energy", lessons: [{ title: "Forms of Energy", duration: "6 min" }] },
        ],
      },
    ],
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    tint: "from-warn to-blue",
    semesters: [
      {
        name: "Semester 1",
        units: [
          {
            name: "Unit 1: Grammar",
            lessons: [
              { title: "Nouns & Verbs", duration: "5 min" },
              { title: "Adjectives", duration: "6 min" },
            ],
          },
        ],
      },
      {
        name: "Semester 2",
        units: [{ name: "Unit 2: Reading", lessons: [{ title: "Main Idea", duration: "7 min" }] }],
      },
    ],
  },
  {
    id: "arabic",
    name: "Arabic",
    icon: Languages,
    tint: "from-blue to-mint",
    semesters: [
      {
        name: "Semester 1",
        units: [
          { name: "الوحدة ١: القراءة", lessons: [{ title: "نص القراءة", duration: "6 min" }] },
        ],
      },
      {
        name: "Semester 2",
        units: [
          { name: "الوحدة ٢: النحو", lessons: [{ title: "المبتدأ والخبر", duration: "7 min" }] },
        ],
      },
    ],
  },
  {
    id: "social",
    name: "Social Studies",
    icon: Globe,
    tint: "from-mint to-warn",
    semesters: [
      {
        name: "Semester 1",
        units: [{ name: "Unit 1: Geography", lessons: [{ title: "Maps", duration: "5 min" }] }],
      },
    ],
  },
];

function countLessons(subject: Subject) {
  let units = 0;
  let lessons = 0;
  for (const s of subject.semesters) {
    units += s.units.length;
    for (const u of s.units) lessons += u.lessons.length;
  }
  return { semesters: subject.semesters.length, units, lessons };
}

function LibraryScreen() {
  const t = useT();
  const { dir, lang } = useLanguage();
  const [grade, setGrade] = useState("Grade 6");
  const [subjectId, setSubjectId] = useState<string>("all");
  const [selected, setSelected] = useState<Subject | null>(null);
  const [pointsOpen, setPointsOpen] = useState(false);

  const visibleSubjects =
    subjectId === "all" ? SUBJECTS : SUBJECTS.filter((s) => s.id === subjectId);

  if (selected) {
    return <SubjectLessons subject={selected} onBack={() => setSelected(null)} dir={dir} />;
  }

  return (
    <MobileShell>
      <header className="px-5 pt-14 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{t("library.title")}</h1>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {t("library.subtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPointsOpen(true)}
            className="h-10 w-10 rounded-2xl bg-mint/20 text-navy flex items-center justify-center shadow-soft border border-mint/30 flex-shrink-0"
            aria-label={lang === "ar" ? "نقاط الموارد" : "Resource points"}
          >
            <Coins className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="px-5 space-y-4">
        <section className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "راجع" : "Review"}
              </p>
              <h2 className="text-base font-extrabold text-navy">
                {lang === "ar" ? "تصفّح المواد والدروس" : "Browse subjects and lessons"}
              </h2>
            </div>
            <BookOpen className="h-5 w-5 text-navy" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Grade
              </span>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="mt-1 w-full rounded-2xl bg-muted/60 border border-border px-3 py-2 text-xs font-semibold outline-none"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Subject
              </span>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="mt-1 w-full rounded-2xl bg-muted/60 border border-border px-3 py-2 text-xs font-semibold outline-none"
              >
                <option value="all">All subjects</option>
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
            {visibleSubjects.map((s) => {
              const c = countLessons(s);
              return (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className="w-[112px] shrink-0 snap-start text-start rounded-2xl bg-muted/40 border border-border p-2 min-h-[76px]"
                >
                  <div className="flex flex-col gap-1.5">
                    <div
                      className={`h-8 w-8 rounded-xl bg-gradient-to-br ${s.tint} text-primary-foreground flex items-center justify-center flex-shrink-0`}
                    >
                      <s.icon className="h-3.5 w-3.5" />
                    </div>
                    <p className="font-bold text-xs leading-tight line-clamp-2">{s.name}</p>
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-1 leading-tight">
                    {c.units} units · {c.lessons} lessons
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="border-t border-border pt-4">
          <MockExamBuilderCard lang={lang} />
        </div>
      </div>

      <ResourcePointsDialog open={pointsOpen} onClose={() => setPointsOpen(false)} lang={lang} />
    </MobileShell>
  );
}

function SubjectLessons({
  subject,
  onBack,
  dir,
}: {
  subject: Subject;
  onBack: () => void;
  dir: "rtl" | "ltr";
}) {
  const [semester, setSemester] = useState<string>("all");
  const [unit, setUnit] = useState<string>("all");
  const [openLesson, setOpenLesson] = useState<{ unit: string; title: string } | null>(null);
  const { lang } = useLanguage();

  const semesters = subject.semesters;
  const activeSemesters =
    semester === "all" ? semesters : semesters.filter((s) => s.name === semester);
  const allUnits = activeSemesters.flatMap((s) => s.units);
  const visibleSemesters = activeSemesters
    .map((s) => ({
      ...s,
      units: unit === "all" ? s.units : s.units.filter((u) => u.name === unit),
    }))
    .filter((s) => s.units.length > 0);
  const hasAny = visibleSemesters.some((s) => s.units.length > 0);

  if (openLesson) {
    return (
      <LessonVideos
        subject={subject}
        lesson={openLesson}
        onBack={() => setOpenLesson(null)}
        dir={dir}
      />
    );
  }

  return (
    <MobileShell>
      <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-border">
        <div className="px-4 pt-12 pb-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </button>
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${subject.tint} text-primary-foreground flex items-center justify-center`}
            >
              <subject.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Subject</p>
              <p className="font-semibold text-sm">{subject.name}</p>
            </div>
          </div>
        </div>
        <div className="px-4 pb-3 grid grid-cols-2 gap-2">
          <select
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              setUnit("all");
            }}
            className="w-full rounded-xl bg-card border border-border px-3 py-2 text-xs shadow-soft outline-none"
          >
            <option value="all">All semesters</option>
            {semesters.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full rounded-xl bg-card border border-border px-3 py-2 text-xs shadow-soft outline-none"
          >
            <option value="all">All units</option>
            {allUnits.map((u) => (
              <option key={u.name} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="px-5 py-4 space-y-6">
        {visibleSemesters.map((s) => (
          <section key={s.name}>
            <h2 className="text-lg font-bold px-1 mb-3">{s.name}</h2>
            <div className="space-y-4">
              {s.units.map((u) => (
                <div key={u.name}>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">
                    {u.name}
                  </p>
                  <div className="space-y-2">
                    {u.lessons.map((l) => (
                      <button
                        key={l.title}
                        onClick={() => setOpenLesson({ unit: u.name, title: l.title })}
                        className="w-full text-left rounded-2xl bg-card border border-border p-3 shadow-soft flex items-center gap-3"
                      >
                        <div className="h-10 w-10 rounded-xl bg-hero text-primary-foreground flex items-center justify-center">
                          <PlayCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{l.title}</p>
                          <p className="text-[11px] text-muted-foreground">{l.duration}</p>
                          <p className="text-[10px] font-semibold text-navy mt-0.5">
                            {lang === "ar" ? "+٢٠ نقطة مورد" : "+20 resource pts"}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        {!hasAny && (
          <p className="text-center text-sm text-muted-foreground py-8">No lessons found.</p>
        )}

        <div className="border-t border-border pt-4">
          <MockExamBuilderCard lang={lang} />
        </div>
      </div>
    </MobileShell>
  );
}

function ResourcePointsDialog({
  open,
  onClose,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  lang: "ar" | "en";
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6 pt-20">
      <button
        type="button"
        className="absolute inset-0 bg-navy/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label={lang === "ar" ? "إغلاق" : "Close"}
      />
      <div className="relative w-full max-w-[408px] rounded-3xl bg-card border border-border p-4 shadow-glow overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
        <div className="flex items-start justify-between gap-3 pt-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {lang === "ar" ? "نقاط الموارد" : "Resource points"}
            </p>
            <h2 className="mt-0.5 text-lg font-extrabold text-navy">
              {lang === "ar"
                ? "شاهد وتدرّب لتفتح لوحة التفوق"
                : "Watch and practice to unlock the leaderboard"}
            </h2>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-mint/20 text-navy flex items-center justify-center shrink-0">
            <Coins className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {resourcePointRules.map((rule) => (
            <div key={rule.label.en} className="rounded-2xl bg-muted/60 p-3">
              <p className="text-[11px] text-muted-foreground leading-tight">{rule.label[lang]}</p>
              <p className="mt-1 text-sm font-bold text-navy">{rule.points}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-full bg-hero text-primary-foreground py-2.5 text-sm font-semibold shadow-glow"
        >
          {lang === "ar" ? "تم" : "Done"}
        </button>
      </div>
    </div>
  );
}

const selfExamAttempts = [
  {
    title: { ar: "اختبار الكسور", en: "Fractions self test" },
    date: { ar: "آخر محاولة: اليوم", en: "Last attempt: today" },
    score: { ar: "١٨ / ٢٥ صحيح", en: "18 / 25 correct" },
    readiness: "72%",
    weak: { ar: "مسائل الكسور", en: "Fraction word problems" },
    videoId: "word-problems",
  },
  {
    title: { ar: "مراجعة الأعداد", en: "Numbers review" },
    date: { ar: "آخر محاولة: أمس", en: "Last attempt: yesterday" },
    score: { ar: "٢١ / ٢٥ صحيح", en: "21 / 25 correct" },
    readiness: "84%",
    weak: { ar: "التقريب والتقدير", en: "Rounding and estimation" },
    videoId: "intro-fractions",
  },
];

function MockExamBuilderCard({ lang }: { lang: "ar" | "en" }) {
  return (
    <div className="rounded-3xl bg-card border border-border p-4 shadow-soft overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
      <div className="flex items-start justify-between gap-3 pt-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {lang === "ar" ? "اختبار ذاتي" : "Self test"}
          </p>
          <h2 className="mt-0.5 text-lg font-extrabold text-navy">
            {lang === "ar" ? "قِس جاهزيتك للامتحان المدرسي" : "Measure school-exam readiness"}
          </h2>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">
            {lang === "ar"
              ? "راجع محاولاتك السابقة، افتح المحتوى العلاجي، أو أنشئ اختبارًا جديدًا."
              : "Review previous attempts, open remediation, or create a new exam."}
          </p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-warn/20 text-navy flex items-center justify-center flex-shrink-0">
          <FileCheck2 className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {selfExamAttempts.map((attempt) => (
          <div key={attempt.title.en} className="rounded-2xl bg-muted/50 border border-border p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-navy">{attempt.title[lang]}</p>
                <p className="text-[11px] text-muted-foreground">{attempt.date[lang]}</p>
              </div>
              <div className="text-end flex-shrink-0">
                <p className="text-lg font-extrabold text-navy leading-none">{attempt.readiness}</p>
                <p className="text-[10px] text-muted-foreground">
                  {lang === "ar" ? "جاهزية" : "ready"}
                </p>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-xl bg-card px-2.5 py-2">
                <p className="text-muted-foreground">{lang === "ar" ? "النتيجة" : "Score"}</p>
                <p className="font-bold text-navy">{attempt.score[lang]}</p>
              </div>
              <div className="rounded-xl bg-card px-2.5 py-2">
                <p className="text-muted-foreground">{lang === "ar" ? "يحتاج مراجعة" : "Review"}</p>
                <p className="font-bold text-navy truncate">{attempt.weak[lang]}</p>
              </div>
            </div>

            <Link
              to="/video/$id"
              params={{ id: attempt.videoId }}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-card border border-border px-3 py-2 text-xs font-bold text-navy"
            >
              <BookOpen className="h-3.5 w-3.5" />
              {lang === "ar" ? "عرض المحتوى العلاجي المقترح" : "View recommended remediation"}
            </Link>
          </div>
        ))}
      </div>

      <Link
        to="/mock-exam"
        className="mt-3 block w-full rounded-full bg-hero text-primary-foreground py-2.5 text-center text-sm font-semibold shadow-glow"
      >
        {lang === "ar" ? "إنشاء اختبار ذاتي جديد" : "Create new self test"}
      </Link>
    </div>
  );
}

function LessonVideos({
  subject,
  lesson,
  onBack,
  dir,
}: {
  subject: Subject;
  lesson: { unit: string; title: string };
  onBack: () => void;
  dir: "rtl" | "ltr";
}) {
  const t = useT();
  const { lang } = useLanguage();

  return (
    <MobileShell>
      <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-border">
        <div className="px-4 pt-12 pb-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </button>
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${subject.tint} text-primary-foreground flex items-center justify-center flex-shrink-0`}
            >
              <subject.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider truncate">
                {subject.name} · {lesson.unit}
              </p>
              <p className="font-semibold text-sm truncate">{lesson.title}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-semibold">{lesson.title}</h3>
          <span className="text-xs text-muted-foreground">
            {lessonVideos.length} {lang === "ar" ? "فيديوهات" : "videos"}
          </span>
        </div>
        <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
          {lessonVideos.map((v, i) => {
            const locked = v.status === "locked";
            const done = v.status === "done";
            const inProgress = v.status === "progress";
            const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
            const row = (
              <div
                className={`flex items-center gap-3 px-3 py-2.5 ${locked ? "opacity-60" : ""} ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="relative h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <img
                    src={thumb}
                    alt={v.title[lang]}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {locked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Lock className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[14px] leading-tight line-clamp-1">
                    {v.title[lang]}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">
                    {v.duration[lang]} · {v.questions.length}{" "}
                    {lang === "ar" ? "أسئلة" : "questions"}
                  </p>
                  <p className="text-[10px] font-semibold text-navy mt-0.5">
                    {done
                      ? lang === "ar"
                        ? "+٣٠ نقطة مكتسبة"
                        : "+30 pts earned"
                      : locked
                        ? lang === "ar"
                          ? "+٤٥ بعد الفتح"
                          : "+45 after unlock"
                        : lang === "ar"
                          ? "+٤٥ نقطة ممكنة"
                          : "+45 pts available"}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5">
                  {done && <CheckCircle2 className="h-4 w-4 text-success" />}
                  {inProgress && (
                    <span className="text-[10px] font-semibold text-blue whitespace-nowrap">
                      {t("common.inProgress")}
                    </span>
                  )}
                  {v.status === "todo" && <Circle className="h-4 w-4 text-muted-foreground" />}
                  <ChevronRight
                    className={`h-4 w-4 text-muted-foreground ${dir === "rtl" ? "rotate-180" : ""}`}
                  />
                </div>
              </div>
            );
            return locked ? (
              <div key={v.id}>{row}</div>
            ) : (
              <Link key={v.id} to="/video/$id" params={{ id: v.id }} className="block">
                {row}
              </Link>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}
