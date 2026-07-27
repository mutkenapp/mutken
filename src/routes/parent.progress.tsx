import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileCheck2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { ParentCard, ParentSectionHeader, ParentShell } from "@/components/parent-shell";
import { useLanguage } from "@/lib/language";
import { localize, parentStudent, parentSubjects } from "@/lib/parent-data";

type Period = "week" | "month" | "term";
type SubjectId = (typeof parentSubjects)[number]["id"];

export const Route = createFileRoute("/parent/progress")({
  validateSearch: (search: Record<string, unknown>) => ({
    subject: parentSubjects.some((item) => item.id === search.subject)
      ? (search.subject as SubjectId)
      : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Child Progress — Mutken Parent" },
      { name: "description", content: "Mastery, consistency, weak areas, and exam readiness." },
    ],
  }),
  component: ParentProgressScreen,
});

function ParentProgressScreen() {
  const { lang } = useLanguage();
  const { subject: subjectFromSearch } = Route.useSearch();
  const [period, setPeriod] = useState<Period>("week");
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(subjectFromSearch ?? "math");

  const subject = useMemo(
    () => parentSubjects.find((item) => item.id === selectedSubject) ?? parentSubjects[0],
    [selectedSubject],
  );

  const periodLabels: Record<Period, { ar: string; en: string }> = {
    week: { ar: "هذا الأسبوع", en: "This week" },
    month: { ar: "٣٠ يوماً", en: "30 days" },
    term: { ar: "هذا الفصل", en: "This term" },
  };

  const chartValues =
    period === "week"
      ? [62, 65, 66, 70, 72, 75, 78]
      : period === "month"
        ? [54, 57, 61, 64, 68, 72, 78]
        : [38, 46, 55, 62, 68, 73, 78];

  return (
    <ParentShell
      title={lang === "ar" ? "تقدم عمر" : "Omar's progress"}
      subtitle={
        lang === "ar" ? "الإتقان والاتساق ونقاط التركيز" : "Mastery, consistency, and focus areas"
      }
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
            {(Object.keys(periodLabels) as Period[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPeriod(item)}
                className={`rounded-full px-3 py-2 text-[11px] font-bold transition-colors ${
                  period === item ? "bg-navy text-white" : "text-muted-foreground"
                }`}
              >
                {localize(periodLabels[item], lang)}
              </button>
            ))}
          </div>
          <p className="text-[11px] font-semibold text-muted-foreground">
            {lang === "ar" ? "آخر تحديث: اليوم، ١٠:٤٥ ص" : "Last updated: Today, 10:45 AM"}
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)]">
          <ParentCard className="overflow-hidden p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-muted-foreground">
                  {lang === "ar" ? "الإتقان العام" : "Overall mastery"}
                </p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="font-display text-4xl font-extrabold text-navy">
                    {parentStudent.mastery}%
                  </span>
                  <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[10px] font-bold text-success">
                    <ArrowUpRight className="h-3 w-3" />+{parentStudent.masteryChange}%
                  </span>
                </div>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">
                  {lang === "ar"
                    ? "يُحسب الإتقان من الإجابات والاختبارات والمشاركة، وليس من وقت المشاهدة فقط."
                    : "Mastery reflects answers, exams, and participation—not watch time alone."}
                </p>
              </div>
              <div className="rounded-2xl bg-mint/15 px-3 py-2 text-center">
                <p className="text-[10px] font-bold text-muted-foreground">
                  {lang === "ar" ? "ثقة القياس" : "Measure confidence"}
                </p>
                <p className="mt-0.5 text-sm font-extrabold text-navy">
                  {lang === "ar" ? "جيدة" : "Good"}
                </p>
              </div>
            </div>

            <div className="mt-8 h-52">
              <div className="flex h-[170px] items-end gap-2 sm:gap-3">
                {chartValues.map((value, index) => (
                  <div
                    key={`${value}-${index}`}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <span className="text-[9px] font-bold text-muted-foreground">{value}%</span>
                    <div className="flex h-full w-full items-end rounded-t-xl bg-muted/45">
                      <div
                        className={`w-full rounded-t-xl ${index === chartValues.length - 1 ? "bg-mint-gradient" : "bg-blue/25"}`}
                        style={{ height: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[9px] font-semibold text-muted-foreground">
                <span>{lang === "ar" ? "البداية" : "Start"}</span>
                <span>{localize(periodLabels[period], lang)}</span>
              </div>
            </div>
          </ParentCard>

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-1">
            <ProgressMetric
              icon={Target}
              label={lang === "ar" ? "الدقة" : "Accuracy"}
              value={lang === "ar" ? "٨٢٪" : "82%"}
              change="+4%"
              positive
              note={lang === "ar" ? "١٤٧ من ١٧٩ إجابة" : "147 of 179 answers"}
            />
            <ProgressMetric
              icon={BookOpenCheck}
              label={lang === "ar" ? "الإكمال" : "Completion"}
              value={lang === "ar" ? "٨٦٪" : "86%"}
              change="+9%"
              positive
              note={lang === "ar" ? "١٨ من ٢١ نشاطاً" : "18 of 21 activities"}
            />
            <ProgressMetric
              icon={Clock3}
              label={lang === "ar" ? "وقت الدراسة" : "Study time"}
              value={lang === "ar" ? "٣س ٥د" : "3h 5m"}
              change="+25m"
              positive
              note={lang === "ar" ? "٣٧ دقيقة يومياً" : "37 min daily average"}
            />
            <ProgressMetric
              icon={TrendingUp}
              label={lang === "ar" ? "الاتساق" : "Consistency"}
              value={lang === "ar" ? "٥ أيام" : "5 days"}
              change="+1d"
              positive
              note={lang === "ar" ? "سلسلة حالية: ١٢ يوماً" : "Current streak: 12 days"}
            />
          </div>
        </div>

        <section>
          <ParentSectionHeader
            title={lang === "ar" ? "تقدم المواد" : "Subject progress"}
            description={
              lang === "ar" ? "اختر مادة لعرض التفاصيل" : "Choose a subject to inspect details"
            }
          />
          <div className="grid gap-3 md:grid-cols-3">
            {parentSubjects.map((item) => {
              const active = item.id === selectedSubject;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSubject(item.id)}
                  className={`rounded-3xl border p-4 text-start shadow-soft transition-all ${
                    active ? "border-blue bg-card ring-2 ring-blue/10" : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-xl px-2.5 py-1.5 text-xs font-bold text-navy ${item.soft}`}
                    >
                      {localize(item.name, lang)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success">
                      <ArrowUpRight className="h-3 w-3" />+{item.change}%
                    </span>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-display text-2xl font-extrabold text-navy">
                        {item.mastery}%
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {localize(item.confidence, lang)}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${active ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${item.accent}`}
                      style={{ width: `${item.mastery}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.75fr)]">
          <ParentCard className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div>
                <p className="text-base font-bold text-navy">{localize(subject.name, lang)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {lang === "ar"
                    ? "تفصيل الإتقان حسب أهداف التعلم"
                    : "Mastery by learning objective"}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold text-navy ${subject.soft}`}
              >
                {localize(subject.status, lang)}
              </span>
            </div>
            <div className="divide-y divide-border">
              {getObjectives(subject.id, lang).map((objective) => (
                <div key={objective.name} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold text-navy">{objective.name}</p>
                        {objective.alert && (
                          <CircleAlert className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                        )}
                      </div>
                      <p className="mt-1 text-[10px] text-muted-foreground">{objective.evidence}</p>
                    </div>
                    <div className="text-end">
                      <p className="font-display text-lg font-extrabold text-navy">
                        {objective.value}%
                      </p>
                      <p
                        className={`text-[9px] font-bold ${objective.delta >= 0 ? "text-success" : "text-red-500"}`}
                      >
                        {objective.delta >= 0 ? "+" : ""}
                        {objective.delta}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${objective.value < 60 ? "bg-warn" : objective.value >= 85 ? "bg-success" : "bg-blue"}`}
                      style={{ width: `${objective.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ParentCard>

          <div className="space-y-5">
            <ParentCard className="p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue/10 text-blue">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold text-success">
                  {lang === "ar" ? "يتحسن" : "Improving"}
                </span>
              </div>
              <p className="mt-4 text-xs font-bold text-muted-foreground">
                {lang === "ar" ? "جاهزية الاختبار النهائي" : "Final exam readiness"}
              </p>
              <div className="mt-1 flex items-end gap-2">
                <p className="font-display text-3xl font-extrabold text-navy">76%</p>
                <span className="mb-1 text-[10px] font-bold text-success">+11%</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {lang === "ar"
                  ? "آخر اختبار: ١٩ من ٢٥. تم حفظ مراجعتين للأخطاء."
                  : "Latest mock: 19 of 25. Two mistake reviews were saved."}
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-full bg-navy py-2.5 text-xs font-bold text-white"
              >
                {lang === "ar" ? "عرض نتيجة الاختبار" : "View exam result"}
              </button>
            </ParentCard>

            <div className="rounded-3xl bg-mint-gradient p-5 shadow-mint">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-navy text-mint">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-navy/60">
                    {lang === "ar" ? "ما الذي يمكنك فعله؟" : "What can you do?"}
                  </p>
                  <p className="mt-1 text-sm font-bold leading-relaxed text-navy">
                    {lang === "ar"
                      ? "اسأل عمر عن مثال واحد لضرب الكسور بعد مراجعة اليوم. لا حاجة لزيادة وقت الدراسة."
                      : "Ask Omar for one multiplying-fractions example after today's review. No extra study time is needed."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <ParentSectionHeader title={lang === "ar" ? "إنجازات حديثة" : "Recent achievements"} />
          <div className="grid gap-3 sm:grid-cols-3">
            <Achievement
              icon={Award}
              title={lang === "ar" ? "سلسلة ١٢ يوماً" : "12-day streak"}
              note={lang === "ar" ? "استمرارية ممتازة" : "Excellent consistency"}
            />
            <Achievement
              icon={BrainCircuit}
              title={lang === "ar" ? "إتقان ٨ أهداف" : "8 objectives mastered"}
              note={lang === "ar" ? "هذا الشهر" : "This month"}
            />
            <Achievement
              icon={CheckCircle2}
              title={lang === "ar" ? "دقة فوق ٨٠٪" : "80%+ accuracy"}
              note={lang === "ar" ? "٣ أسابيع متتالية" : "3 weeks in a row"}
            />
          </div>
        </section>
      </div>
    </ParentShell>
  );
}

function ProgressMetric({
  icon: Icon,
  label,
  value,
  change,
  positive,
  note,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
  note: string;
}) {
  return (
    <ParentCard className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue/10 text-blue">
          <Icon className="h-4 w-4" />
        </div>
        <span
          className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${positive ? "text-success" : "text-red-500"}`}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {change}
        </span>
      </div>
      <p className="mt-3 text-[10px] font-semibold text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-display text-xl font-extrabold text-navy">{value}</p>
      <p className="mt-1 text-[9px] leading-snug text-muted-foreground">{note}</p>
    </ParentCard>
  );
}

function getObjectives(subject: SubjectId, lang: "ar" | "en") {
  const localized = {
    math: [
      { ar: "فهم الكسور", en: "Understanding fractions", value: 91, delta: 7, evidence: 12 },
      { ar: "الكسور المتكافئة", en: "Equivalent fractions", value: 84, delta: 9, evidence: 9 },
      { ar: "تبسيط الكسور", en: "Simplifying fractions", value: 76, delta: 5, evidence: 8 },
      {
        ar: "ضرب الكسور",
        en: "Multiplying fractions",
        value: 52,
        delta: -3,
        evidence: 6,
        alert: true,
      },
    ],
    science: [
      { ar: "حالات المادة", en: "States of matter", value: 88, delta: 4, evidence: 10 },
      { ar: "الطاقة الحرارية", en: "Thermal energy", value: 74, delta: 6, evidence: 8 },
      {
        ar: "القوى والحركة",
        en: "Forces and motion",
        value: 48,
        delta: -2,
        evidence: 5,
        alert: true,
      },
      { ar: "الآلات البسيطة", en: "Simple machines", value: 68, delta: 3, evidence: 7 },
    ],
    english: [
      { ar: "فهم المقروء", en: "Reading comprehension", value: 91, delta: 4, evidence: 11 },
      { ar: "القواعد", en: "Grammar", value: 82, delta: 6, evidence: 10 },
      { ar: "المفردات", en: "Vocabulary", value: 86, delta: 5, evidence: 12 },
      { ar: "المحادثة", en: "Speaking", value: 75, delta: 3, evidence: 7 },
    ],
  } as const;

  return localized[subject].map((objective) => ({
    name: objective[lang],
    value: objective.value,
    delta: objective.delta,
    evidence:
      lang === "ar"
        ? `${objective.evidence} أدلة تعلم · آخر نشاط اليوم`
        : `${objective.evidence} learning signals · latest today`,
    alert: "alert" in objective ? objective.alert : false,
  }));
}

function Achievement({
  icon: Icon,
  title,
  note,
}: {
  icon: typeof Award;
  title: string;
  note: string;
}) {
  return (
    <ParentCard className="flex items-center gap-3 p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint-gradient text-navy">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-bold text-navy">{title}</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">{note}</p>
      </div>
    </ParentCard>
  );
}
