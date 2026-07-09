import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Gauge,
  ListChecks,
  SlidersHorizontal,
  TimerReset,
  type LucideIcon,
} from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/mock-exam")({
  head: () => ({
    meta: [
      { title: "Self Test - Mutken" },
      {
        name: "description",
        content: "Create a personalized self test from subject lessons and mastery needs.",
      },
    ],
  }),
  component: MockExamRouteShell,
});

const questionCounts = ["10", "25", "50"];
const durations = ["بدون وقت", "30 دقيقة", "45 دقيقة", "60 دقيقة"];
const difficultyLevels = ["سهل", "متوسط", "صعب", "مختلط"];
const lessonScope = ["فهم الكسور", "ضرب الكسور", "تبسيط الكسور", "مسائل كلامية"];

function MockExamRouteShell() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname === "/mock-exam" ? <MockExamBuilderScreen /> : <Outlet />;
}

function MockExamBuilderScreen() {
  const { dir, lang } = useLanguage();

  return (
    <MobileShell hideNav>
      <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-border">
        <div className="px-4 pt-12 pb-3 flex items-center gap-3">
          <Link to="/" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </Link>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
              {lang === "ar" ? "رياضيات - الصف السادس" : "Math - Grade 6"}
            </p>
            <h1 className="text-lg font-extrabold text-navy">
              {lang === "ar" ? "اختبار ذاتي" : "Self test"}
            </h1>
          </div>
        </div>
      </header>

      <main className="px-5 py-4 space-y-4">
        <section className="rounded-3xl bg-card border border-border p-4 shadow-soft overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
          <div className="flex items-start gap-3 pt-1">
            <div className="h-12 w-12 rounded-2xl bg-warn/20 text-navy flex items-center justify-center shrink-0">
              <FileCheck2 className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "إنشاء الاختبار" : "Exam setup"}
              </p>
              <h2 className="mt-0.5 text-xl font-extrabold leading-tight text-navy">
                {lang === "ar" ? "اختبر جاهزيتك حسب أهدافك" : "Check readiness by your goals"}
              </h2>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                {lang === "ar"
                  ? "اختر النطاق والصعوبة والوقت. بعد الاختبار ستتحدث درجة الإتقان وخطة التعلم تلقائيًا."
                  : "Choose scope, difficulty, and timing. Mastery and the study plan update after the test."}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-card border border-border p-4 shadow-soft space-y-4">
          <FieldHeader
            icon={BookOpenCheck}
            title={lang === "ar" ? "المادة والنطاق" : "Subject and scope"}
            subtitle={lang === "ar" ? "حدد ما يدخل في الاختبار" : "Choose what the test includes"}
          />

          <div className="grid grid-cols-2 gap-2">
            <SelectPill label={lang === "ar" ? "المادة" : "Subject"} value="رياضيات" active />
            <SelectPill label={lang === "ar" ? "الفصل الدراسي" : "Semester"} value="الأول" active />
            <SelectPill label={lang === "ar" ? "الوحدة" : "Unit"} value="الكسور" active />
            <SelectPill label={lang === "ar" ? "النمط" : "Mode"} value="جاهزية النهائي" />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {lang === "ar" ? "الدروس المطلوبة" : "Selected lessons"}
            </p>
            <div className="flex flex-wrap gap-2">
              {lessonScope.map((lesson, index) => (
                <span
                  key={lesson}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    index < 3 ? "bg-navy text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {lesson}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-card border border-border p-4 shadow-soft space-y-4">
          <FieldHeader
            icon={SlidersHorizontal}
            title={lang === "ar" ? "إعدادات الأسئلة" : "Question settings"}
            subtitle={
              lang === "ar" ? "اختر الحجم والصعوبة والوقت" : "Set size, difficulty, and time"
            }
          />

          <OptionGroup
            icon={ListChecks}
            title={lang === "ar" ? "عدد الأسئلة" : "Number of questions"}
            items={questionCounts.map((item) => `${item} سؤال`)}
            activeIndex={1}
          />
          <OptionGroup
            icon={Gauge}
            title={lang === "ar" ? "مستوى الصعوبة" : "Difficulty"}
            items={difficultyLevels}
            activeIndex={3}
          />
          <OptionGroup
            icon={TimerReset}
            title={lang === "ar" ? "الوقت" : "Timing"}
            items={durations}
            activeIndex={2}
          />
        </section>

        <section className="rounded-3xl bg-card border border-border p-4 shadow-soft space-y-3">
          <FieldHeader
            icon={CheckCircle2}
            title={lang === "ar" ? "تخصيص ذكي" : "Smart personalization"}
            subtitle={
              lang === "ar"
                ? "اجعل الاختبار مفيدًا لخطة التعلم"
                : "Make results useful for planning"
            }
          />
          <ToggleRow
            title={lang === "ar" ? "ضمّن أهداف الإتقان الضعيفة" : "Include weak mastery goals"}
            desc={
              lang === "ar"
                ? "يعطي وزنًا أكبر للأهداف الأقل من 70%"
                : "Prioritizes objectives below 70%"
            }
          />
          <ToggleRow
            title={lang === "ar" ? "ضمّن أخطاء سابقة" : "Include previous mistakes"}
            desc={
              lang === "ar"
                ? "يعيد اختبار مفاهيم أخطأت فيها من قبل"
                : "Rechecks concepts missed before"
            }
          />
          <ToggleRow
            title={
              lang === "ar" ? "احفظ الموارد العلاجية بعد النتيجة" : "Save remediation after result"
            }
            desc={
              lang === "ar"
                ? "تظهر داخل نتيجة الاختبار للرجوع إليها"
                : "Keeps recommended resources with the result"
            }
          />
        </section>

        <Link
          to="/mock-exam/take"
          className="w-full rounded-2xl bg-hero text-primary-foreground py-3.5 font-bold shadow-glow flex items-center justify-center gap-2"
        >
          <Clock3 className="h-4 w-4" />
          {lang === "ar" ? "ابدأ الاختبار" : "Start exam"}
        </Link>
      </main>
    </MobileShell>
  );
}

function FieldHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-2xl bg-muted text-navy flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-extrabold text-navy">{title}</h3>
        <p className="text-[11px] text-muted-foreground leading-snug">{subtitle}</p>
      </div>
    </div>
  );
}

function SelectPill({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-3 ${
        active ? "border-blue/40 bg-blue/5" : "border-border bg-muted/40"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-navy">{value}</p>
    </div>
  );
}

function OptionGroup({
  icon: Icon,
  title,
  items,
  activeIndex,
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
  activeIndex: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <p className="text-xs font-bold text-navy">{title}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, index) => (
          <button
            key={item}
            className={`rounded-2xl px-3 py-2.5 text-xs font-bold border ${
              index === activeIndex
                ? "bg-navy text-primary-foreground border-navy shadow-soft"
                : "bg-muted/50 text-foreground border-border"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-muted/50 p-3">
      <div className="min-w-0">
        <p className="text-xs font-bold text-navy">{title}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">{desc}</p>
      </div>
      <span className="relative h-6 w-11 rounded-full bg-mint shrink-0 shadow-inner">
        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-soft" />
      </span>
    </div>
  );
}
