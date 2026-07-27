import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpenCheck,
  CalendarClock,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Flame,
  MessageCircleMore,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { ParentCard, ParentSectionHeader, ParentShell } from "@/components/parent-shell";
import { useLanguage } from "@/lib/language";
import { localize, parentStudent, parentSubjects } from "@/lib/parent-data";
import studentPhoto from "@/assets/student_omar.png.asset.json";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard — Mutken" },
      {
        name: "description",
        content: "A clear, secure view of your child's learning progress in Mutken.",
      },
    ],
  }),
  component: ParentRoute,
});

function ParentRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname === "/parent" || pathname === "/parent/" ? <ParentHomeScreen /> : <Outlet />;
}

function ParentHomeScreen() {
  const { lang, dir } = useLanguage();
  const arrowClass = dir === "rtl" ? "rotate-180" : "";

  const metrics = [
    {
      label: lang === "ar" ? "أيام الدراسة" : "Active days",
      value: lang === "ar" ? "٥ / ٧" : "5 / 7",
      note: lang === "ar" ? "يوم أكثر من الأسبوع الماضي" : "1 more than last week",
      icon: Flame,
      tone: "bg-orange-50 text-orange-600",
    },
    {
      label: lang === "ar" ? "وقت الدراسة" : "Study time",
      value: lang === "ar" ? "٣س ٥د" : "3h 5m",
      note: lang === "ar" ? "+٢٥ دقيقة هذا الأسبوع" : "+25 min this week",
      icon: Clock3,
      tone: "bg-blue/10 text-blue",
    },
    {
      label: lang === "ar" ? "الأنشطة المكتملة" : "Activities done",
      value: lang === "ar" ? "١٨" : "18",
      note: lang === "ar" ? "من أصل ٢١ نشاطاً" : "of 21 activities",
      icon: BookOpenCheck,
      tone: "bg-mint/20 text-navy",
    },
    {
      label: lang === "ar" ? "دقة الإجابات" : "Answer accuracy",
      value: lang === "ar" ? "٨٢٪" : "82%",
      note: lang === "ar" ? "+٤٪ عن الأسبوع الماضي" : "+4% from last week",
      icon: Target,
      tone: "bg-success/10 text-success",
    },
  ];

  return (
    <ParentShell
      title={lang === "ar" ? "مرحباً، ولي أمر عمر" : "Welcome, Omar's parent"}
      subtitle={
        lang === "ar" ? "ملخص التعلم لهذا الأسبوع" : "Your child's learning summary this week"
      }
    >
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-[2rem] bg-hero px-5 py-5 text-primary-foreground shadow-glow sm:px-6 lg:px-7 lg:py-6">
          <div className="absolute -end-16 -top-20 h-64 w-64 rounded-full bg-mint/15 blur-3xl" />
          <div className="absolute -bottom-28 -start-8 h-52 w-52 rounded-full bg-blue/35 blur-3xl" />
          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={studentPhoto.url}
                  alt={localize(parentStudent.name, lang)}
                  className="h-14 w-14 rounded-2xl border-2 border-mint/60 object-cover shadow-lg"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold">{localize(parentStudent.name, lang)}</h2>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-mint">
                      {lang === "ar" ? "على المسار الصحيح" : "On track"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/60">
                    {localize(parentStudent.grade, lang)} · {localize(parentStudent.school, lang)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/55">
                    {lang === "ar" ? "الإتقان العام" : "Overall mastery"}
                  </p>
                  <div className="mt-1 flex items-end gap-2">
                    <span className="font-display text-4xl font-extrabold">
                      {parentStudent.mastery}%
                    </span>
                    <span className="mb-1 inline-flex items-center gap-1 text-xs font-bold text-mint">
                      <TrendingUp className="h-3.5 w-3.5" /> +{parentStudent.masteryChange}%
                    </span>
                  </div>
                </div>
                <div className="min-w-[180px] flex-1 sm:max-w-sm">
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-mint-gradient"
                      style={{ width: "78%" }}
                    />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">
                    {lang === "ar"
                      ? "تحسن مستمر في المواد الثلاث خلال آخر ٤ أسابيع."
                      : "Steady improvement across all three subjects over the last 4 weeks."}
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/parent/progress"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-navy shadow-lg"
            >
              <ChartNoAxesCombined className="h-4 w-4" />
              {lang === "ar" ? "عرض التقرير الكامل" : "View full report"}
              <ChevronRight className={`h-3.5 w-3.5 ${arrowClass}`} />
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {metrics.map(({ label, value, note, icon: Icon, tone }) => (
            <ParentCard key={label} className="p-3.5 sm:p-4">
              <div className={`flex h-9 w-9 items-center justify-center rounded-2xl ${tone}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="mt-3 text-[11px] font-semibold text-muted-foreground">{label}</p>
              <p className="mt-0.5 font-display text-xl font-extrabold text-navy">{value}</p>
              <p className="mt-1 text-[10px] leading-snug text-muted-foreground">{note}</p>
            </ParentCard>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.8fr)]">
          <div className="space-y-6">
            <section>
              <ParentSectionHeader
                title={lang === "ar" ? "نظرة على المواد" : "Subject overview"}
                description={
                  lang === "ar" ? "التغير مقارنة بالأسبوع الماضي" : "Change compared with last week"
                }
                action={
                  <Link to="/parent/progress" className="text-xs font-bold text-blue">
                    {lang === "ar" ? "كل التفاصيل" : "All details"}
                  </Link>
                }
              />
              <div className="grid gap-3 md:grid-cols-3">
                {parentSubjects.map((subject) => (
                  <Link key={subject.id} to="/parent/progress" search={{ subject: subject.id }}>
                    <ParentCard className="h-full p-4 transition-transform hover:-translate-y-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className={`rounded-2xl px-2.5 py-1.5 ${subject.soft}`}>
                          <p className="text-xs font-bold text-navy">
                            {localize(subject.name, lang)}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success">
                          <ArrowUpRight className="h-3 w-3" />+{subject.change}%
                        </span>
                      </div>
                      <div className="mt-4 flex items-end justify-between gap-2">
                        <div>
                          <p className="font-display text-2xl font-extrabold text-navy">
                            {subject.mastery}%
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {lang === "ar" ? "إتقان المادة" : "Subject mastery"}
                          </p>
                        </div>
                        <span className="rounded-full bg-muted px-2 py-1 text-[9px] font-bold text-muted-foreground">
                          {localize(subject.status, lang)}
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${subject.accent}`}
                          style={{ width: `${subject.mastery}%` }}
                        />
                      </div>
                      <p className="mt-3 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                        <span className="font-bold text-navy">
                          {lang === "ar" ? "يحتاج تركيزاً: " : "Needs focus: "}
                        </span>
                        {localize(subject.weak, lang)}
                      </p>
                    </ParentCard>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <ParentSectionHeader
                title={lang === "ar" ? "نشاط هذا الأسبوع" : "This week's activity"}
              />
              <ParentCard className="overflow-hidden p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-navy">
                      {lang === "ar" ? "وقت التعلم اليومي" : "Daily learning time"}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {lang === "ar" ? "الهدف: ٤٥ دقيقة يومياً" : "Goal: 45 minutes per day"}
                    </p>
                  </div>
                  <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold text-success">
                    {lang === "ar" ? "ملتزم" : "Consistent"}
                  </span>
                </div>
                <div className="mt-6 flex h-36 items-end justify-between gap-2 border-b border-border pb-2">
                  {[32, 47, 38, 52, 44, 0, 0].map((height, index) => {
                    const days =
                      lang === "ar"
                        ? ["ح", "ن", "ث", "ر", "خ", "ج", "س"]
                        : ["S", "M", "T", "W", "T", "F", "S"];
                    return (
                      <div
                        key={`${days[index]}-${index}`}
                        className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                      >
                        <span className="text-[9px] font-bold text-muted-foreground">
                          {height ? `${height}m` : "–"}
                        </span>
                        <div className="flex h-24 w-full max-w-10 items-end overflow-hidden rounded-xl bg-muted/70">
                          <div
                            className={`w-full rounded-xl ${height >= 45 ? "bg-mint-gradient" : height ? "bg-blue/45" : "bg-transparent"}`}
                            style={{ height: `${Math.min(height * 1.7, 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">
                          {days[index]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </ParentCard>
            </section>
          </div>

          <div className="space-y-6">
            <section>
              <ParentSectionHeader
                title={lang === "ar" ? "يحتاج انتباهك" : "Needs your attention"}
              />
              <ParentCard className="overflow-hidden">
                <div className="border-b border-border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-warn/15 text-amber-600">
                      <CircleAlert className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-navy">
                          {lang === "ar" ? "مراجعة قصيرة مطلوبة" : "Short review needed"}
                        </p>
                        <span className="rounded-full bg-warn/15 px-2 py-1 text-[9px] font-bold text-amber-700">
                          {lang === "ar" ? "متوسط" : "Medium"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {lang === "ar"
                          ? "واجه عمر صعوبة في ضرب الكسور في محاولتين متتاليتين."
                          : "Omar struggled with multiplying fractions in two consecutive attempts."}
                      </p>
                      <p className="mt-2 text-[11px] font-bold text-blue">
                        {lang === "ar"
                          ? "إجراء مقترح: شجعه على مراجعة ١٠ دقائق"
                          : "Suggested: Encourage a 10-minute review"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue/10 text-blue">
                      <CalendarClock className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-navy">
                        {lang === "ar" ? "لقاء رياضيات غداً" : "Math session tomorrow"}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {lang === "ar"
                          ? "الأربعاء، ٦:٣٠ مساءً مع أ. أحمد"
                          : "Wednesday, 6:30 PM with Mr. Ahmed"}
                      </p>
                      <Link
                        to="/parent/schedule"
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-blue"
                      >
                        {lang === "ar" ? "عرض الموعد" : "View session"}
                        <ChevronRight className={`h-3 w-3 ${arrowClass}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              </ParentCard>
            </section>

            <section>
              <ParentSectionHeader
                title={lang === "ar" ? "آخر تحديث من المعلم" : "Latest teacher update"}
              />
              <ParentCard className="relative overflow-hidden p-4">
                <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy text-mint">
                    <MessageCircleMore className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">
                      {lang === "ar" ? "أ. أحمد" : "Mr. Ahmed"}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {lang === "ar" ? "معلم الرياضيات · منذ ساعتين" : "Math teacher · 2 hours ago"}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {lang === "ar"
                    ? "تحسن عمر بشكل واضح هذا الأسبوع. بعد مراجعة قصيرة لضرب الكسور سيكون جاهزاً للانتقال للدرس التالي."
                    : "Omar improved clearly this week. After a short multiplying-fractions review, he should be ready for the next lesson."}
                </p>
                <Link
                  to="/parent/messages"
                  className="mt-4 inline-flex items-center gap-1 rounded-full bg-navy px-3 py-2 text-[11px] font-bold text-white"
                >
                  {lang === "ar" ? "فتح الرسائل" : "Open messages"}
                  <ChevronRight className={`h-3 w-3 ${arrowClass}`} />
                </Link>
              </ParentCard>
            </section>

            <div className="rounded-3xl bg-mint-gradient p-4 shadow-mint">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-navy text-mint">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-navy/60">
                    {lang === "ar" ? "ملخص متقن" : "Mutken insight"}
                  </p>
                  <p className="mt-1 text-sm font-bold leading-relaxed text-navy">
                    {lang === "ar"
                      ? "عمر ملتزم هذا الأسبوع. التشجيع على الاستمرار أهم من زيادة وقت الدراسة."
                      : "Omar is consistent this week. Encouraging the routine matters more than adding study time."}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-navy/70">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {lang === "ar" ? "لا يوجد إجراء عاجل" : "No urgent action needed"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParentShell>
  );
}
