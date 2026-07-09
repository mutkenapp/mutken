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
  TimerReset,
  Gauge,
  SlidersHorizontal,
  BookMarked,
  type LucideIcon,
} from "lucide-react";
import { resourcePointRules } from "@/lib/points";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Mutken" },
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

  const visibleSubjects =
    subjectId === "all" ? SUBJECTS : SUBJECTS.filter((s) => s.id === subjectId);

  if (selected) {
    return <SubjectLessons subject={selected} onBack={() => setSelected(null)} dir={dir} />;
  }

  return (
    <MobileShell>
      <header className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold">{t("library.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("library.subtitle")}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Grade
            </span>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-1 w-full rounded-2xl bg-card border border-border px-3 py-2.5 text-sm shadow-soft outline-none"
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Subject
            </span>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="mt-1 w-full rounded-2xl bg-card border border-border px-3 py-2.5 text-sm shadow-soft outline-none"
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
      </header>

      <div className="px-5 space-y-4">
        <MockExamBuilderCard lang={lang} />

        <div className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "نقاط الموارد" : "Resource points"}
              </p>
              <p className="font-semibold mt-0.5">
                {lang === "ar"
                  ? "شاهد وتدرّب لتفتح لوحة التفوق"
                  : "Watch and practice to unlock the leaderboard"}
              </p>
            </div>
            <Coins className="h-5 w-5 text-navy" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {resourcePointRules.map((rule) => (
              <div key={rule.label.en} className="rounded-2xl bg-muted/60 p-3">
                <p className="text-[11px] text-muted-foreground leading-tight">
                  {rule.label[lang]}
                </p>
                <p className="mt-1 text-sm font-bold text-navy">{rule.points}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {visibleSubjects.map((s) => {
            const c = countLessons(s);
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="text-left rounded-2xl bg-card border border-border p-4 shadow-soft"
              >
                <div
                  className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${s.tint} text-primary-foreground flex items-center justify-center mb-3`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-sm">{s.name}</p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {c.semesters} semesters · {c.units} units · {c.lessons} lessons
                </p>
              </button>
            );
          })}
        </div>
      </div>
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
        <div className="rounded-2xl bg-card border border-border p-4 shadow-soft overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
          <div className="flex items-start gap-3 pt-1">
            <div className="h-10 w-10 rounded-2xl bg-warn/20 text-navy flex items-center justify-center flex-shrink-0">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "اختبار على هذا النطاق" : "Exam for this scope"}
              </p>
              <h3 className="text-sm font-extrabold text-navy leading-tight">
                {lang === "ar"
                  ? "أنشئ اختبارًا من الوحدات والدروس المحددة"
                  : "Create an exam from selected units and lessons"}
              </h3>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                {lang === "ar"
                  ? "النتيجة ستحدث الإتقان وتربط كل خطأ بمورد علاجي محفوظ."
                  : "The result updates mastery and links each mistake to saved remediation."}
              </p>
            </div>
          </div>
        </div>

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
      </div>
    </MobileShell>
  );
}

function MockExamBuilderCard({ lang }: { lang: "ar" | "en" }) {
  return (
    <div className="rounded-3xl bg-card border border-border p-4 shadow-soft overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
      <div className="flex items-start justify-between gap-3 pt-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {lang === "ar" ? "منشئ الاختبار التجريبي" : "Mock exam builder"}
          </p>
          <h2 className="mt-0.5 text-lg font-extrabold text-navy">
            {lang === "ar" ? "اختبر جاهزيتك للامتحان النهائي" : "Build a final-exam readiness test"}
          </h2>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">
            {lang === "ar"
              ? "اختر عدد الأسئلة، الوقت، الصعوبة، والوحدات أو الدروس. النتيجة تحدث الإتقان وخطة التعلم."
              : "Choose questions, timing, difficulty, and chapters or lessons. Results update mastery and the study plan."}
          </p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-warn/20 text-navy flex items-center justify-center flex-shrink-0">
          <FileCheck2 className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <ExamOption
          icon={FileCheck2}
          label={lang === "ar" ? "عدد الأسئلة" : "Questions"}
          value={lang === "ar" ? "٢٥ سؤال" : "25 questions"}
        />
        <ExamOption
          icon={TimerReset}
          label={lang === "ar" ? "الوقت" : "Timing"}
          value={lang === "ar" ? "بوقت أو بدون" : "Timed or untimed"}
        />
        <ExamOption
          icon={Gauge}
          label={lang === "ar" ? "الصعوبة" : "Difficulty"}
          value={lang === "ar" ? "سهل / متوسط / صعب" : "Easy / Medium / Hard"}
        />
        <ExamOption
          icon={SlidersHorizontal}
          label={lang === "ar" ? "النطاق" : "Scope"}
          value={lang === "ar" ? "فصول ودروس محددة" : "Chapters and lessons"}
        />
      </div>

      <div className="mt-3 rounded-2xl bg-blue/5 border border-blue/10 p-3 flex items-start gap-3">
        <BookMarked className="h-4 w-4 text-navy mt-0.5 flex-shrink-0" />
        <p className="text-[11px] leading-snug text-muted-foreground">
          {lang === "ar"
            ? "بعد ظهور النتيجة، تحفظ الموارد العلاجية الخاصة بالأسئلة الخاطئة داخل نتيجة الاختبار نفسها."
            : "After results, remedial resources for missed answers are saved inside the exam result."}
        </p>
      </div>

      <button className="mt-3 w-full rounded-full bg-hero text-primary-foreground py-2.5 text-sm font-semibold shadow-glow">
        {lang === "ar" ? "إنشاء اختبار تجريبي" : "Create mock exam"}
      </button>
    </div>
  );
}

function ExamOption({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-muted/60 p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-navy flex-shrink-0" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="mt-1 text-xs font-bold text-navy leading-snug">{value}</p>
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
