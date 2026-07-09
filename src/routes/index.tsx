import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useT, useLanguage } from "@/lib/language";
import { SUBJECTS, useActiveSubject, type SubjectData, type SubjectId } from "@/lib/active-subject";
import { lessonVideos } from "@/lib/videos";
import mutkenLogo from "@/assets/logo.png.asset.json";
import studentPhoto from "@/assets/student_omar.png.asset.json";
import egyptFlag from "@/assets/flag-egypt.png.asset.json";
import { DailyAchievementsCard } from "@/components/daily-achievements-card";
import {
  currentWeeklyPoints,
  leaderboardProgress,
  leaderboardUnlockPoints,
  pointsRemaining,
} from "@/lib/points";
import {
  Bell,
  CheckCircle2,
  Video,
  Target,
  Clock3,
  CalendarDays,
  FileCheck2,
  TimerReset,
  BookMarked,
} from "lucide-react";

const sessionMissions: Record<
  SubjectId,
  {
    date: { ar: string; en: string };
    time: { ar: string; en: string };
  }
> = {
  math: {
    date: { ar: "الأربعاء - ٨/٧/٢٠٢٦", en: "Wed, 08/07/2026" },
    time: { ar: "٦:٣٠ مساءً", en: "6:30 PM" },
  },
  science: {
    date: { ar: "الخميس - ٩/٧/٢٠٢٦", en: "Thu, 09/07/2026" },
    time: { ar: "٥:٠٠ مساءً", en: "5:00 PM" },
  },
  english: {
    date: { ar: "الجمعة - ١٠/٧/٢٠٢٦", en: "Fri, 10/07/2026" },
    time: { ar: "٤:٠٠ مساءً", en: "4:00 PM" },
  },
  arabic: {
    date: { ar: "الثلاثاء - ٧/٧/٢٠٢٦", en: "Tue, 07/07/2026" },
    time: { ar: "٥:٣٠ مساءً", en: "5:30 PM" },
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Mutken" },
      { name: "description", content: "Your personalized daily study plan and mission dashboard." },
    ],
  }),
  component: TodayScreen,
});

function TodayScreen() {
  const t = useT();
  const { lang, dir } = useLanguage();
  const { activeId, setActiveId, active } = useActiveSubject();
  const leaderboardPercentLabel = lang === "ar" ? "٨٥" : leaderboardProgress;
  const weeklyPointsLabel = lang === "ar" ? "٨٥" : currentWeeklyPoints;
  const unlockPointsLabel = lang === "ar" ? "١٠٠" : leaderboardUnlockPoints;
  const pointsRemainingLabel = lang === "ar" ? "١٥" : pointsRemaining;
  const sessionMission = sessionMissions[active.id];

  return (
    <MobileShell>
      {/* Header */}
      <header className="px-5 pt-14 pb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <img src={mutkenLogo.url} alt="Mutken" className="h-12 w-auto" />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            aria-label={lang === "ar" ? "الدولة: مصر" : "Country: Egypt"}
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center overflow-hidden"
          >
            <img src={egyptFlag.url} alt="Egypt" className="h-full w-full object-cover" />
          </div>
          <button
            className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-mint" />
          </button>
          <Link to="/profile" aria-label={lang === "ar" ? "الملف الشخصي" : "My Profile"}>
            <img
              src={studentPhoto.url}
              alt="Omar"
              className="h-10 w-10 rounded-full object-cover border border-border"
            />
          </Link>
        </div>
      </header>

      {/* Subject Tabs */}
      <div className="pb-2">
        <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar px-5 pb-2 pt-1 snap-x">
          {SUBJECTS.map((s) => (
            <SubjectTab
              key={s.id}
              subject={s}
              active={s.id === activeId}
              label={t(s.labelKey)}
              onClick={() => setActiveId(s.id)}
            />
          ))}
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* Hero: Assistant teacher greeting */}
        <div className="relative overflow-hidden rounded-lg bg-hero text-primary-foreground p-4 shadow-glow">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-mint/20 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-blue/30 blur-3xl" />
          <div className="relative flex items-start gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={active.teacherPhoto}
                alt={t(active.teacherNameKey)}
                className="h-16 w-16 rounded-2xl object-cover border-2 border-mint/60 shadow-glow"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold leading-snug">{t("hero.greeting")}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-primary-foreground/90">
                {t(`hero.msg.${active.id}`)}
              </p>
              <p className="mt-2 text-[10px] font-semibold text-mint">
                {t(active.teacherNameKey)} - {t("today.assistantTeacher")}
              </p>
            </div>
          </div>
        </div>

        {/* Meeting + Weekly progress — 2 columns */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Meeting (compact) */}
          <div className="relative rounded-lg bg-card border border-border p-2.5 shadow-soft flex flex-col justify-between min-h-[142px] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
            <div className="pt-1">
              <div className="flex items-center justify-between gap-1.5">
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {t("today.nextMeeting")}
                </p>
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-mint/20 text-navy whitespace-nowrap">
                  {t(active.meetingInKey)}
                </span>
              </div>
              <p className="mt-1 text-[12.5px] font-extrabold leading-tight line-clamp-2">
                {t(active.meetingTitleKey)}
              </p>
              <div className="mt-1.5 flex items-center gap-1.5 min-w-0">
                <img
                  src={active.teacherPhoto}
                  alt={t(active.teacherNameKey)}
                  className="h-5 w-5 rounded-full object-cover border border-border"
                />
                <p className="text-[10.5px] text-blue font-semibold truncate">
                  {t(active.teacherNameKey)}
                </p>
              </div>
              <div className="mt-1.5 rounded-xl bg-blue/5 border border-blue/10 px-2 py-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-6 w-6 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="h-3 w-3 text-navy" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-navy leading-tight truncate">
                      {sessionMission.date[lang]}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[8.5px] font-semibold text-muted-foreground leading-tight">
                      <Clock3 className="h-2.5 w-2.5 flex-shrink-0" />
                      <span className="truncate">{sessionMission.time[lang]}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/live"
              className="mt-1.5 inline-flex items-center justify-center gap-1 text-[10.5px] font-semibold text-primary-foreground bg-hero rounded-full px-2 py-1.5 shadow-glow"
            >
              <Video className="h-3 w-3" />
              {t("today.goLive")}
            </Link>
          </div>

          {/* Weekly progress (compact) */}
          <div className="relative rounded-lg bg-card border border-border p-2.5 shadow-soft flex flex-col justify-between min-h-[142px] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
            <div className="pt-1">
              <div className="flex items-center justify-between gap-1.5">
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {lang === "ar" ? "تقدمك نحو لوحة التفوق" : "Leaderboard progress"}
                </p>
                <div className="h-6 w-6 rounded-full bg-mint/20 border border-mint/20 flex items-center justify-center flex-shrink-0">
                  <Target className="h-3.5 w-3.5 text-navy" />
                </div>
              </div>
              <div className="mt-1.5 flex items-end justify-between gap-2">
                <div>
                  <p className="text-[24px] font-extrabold text-navy leading-none">
                    {leaderboardPercentLabel}%
                  </p>
                  <p className="mt-0.5 text-[9px] font-semibold text-muted-foreground whitespace-nowrap">
                    {lang === "ar"
                      ? `${weeklyPointsLabel} / ${unlockPointsLabel} نقطة`
                      : `${weeklyPointsLabel} / ${unlockPointsLabel} pts`}
                  </p>
                </div>
                <p className="text-[9px] font-semibold text-muted-foreground leading-tight text-end">
                  {lang === "ar" ? "٣ أيام متبقية" : "3 days left"}
                </p>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-mint-gradient rounded-full transition-all"
                  style={{ width: `${leaderboardProgress}%` }}
                />
              </div>
            </div>
            <div className="mt-1.5 rounded-xl bg-blue/5 border border-blue/10 px-2 py-1.5">
              <p className="text-[10px] font-bold text-navy leading-tight">
                {lang === "ar"
                  ? `تبقى ${pointsRemainingLabel} نقطة للتفعيل`
                  : `${pointsRemainingLabel} pts left to unlock`}
              </p>
              <p className="mt-0.5 text-[8.5px] text-muted-foreground leading-tight">
                {lang === "ar" ? "أكمل درسًا: +٤٥ نقطة" : "Complete one lesson: +45 pts"}
              </p>
            </div>
          </div>
        </div>

        <DailyAchievementsCard />

        {/* Mock exam readiness */}
        <div className="rounded-lg bg-card border border-border p-4 shadow-soft overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
          <div className="flex items-start gap-3 pt-1">
            <div className="h-11 w-11 rounded-2xl bg-warn/20 text-navy flex items-center justify-center flex-shrink-0">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "اختبار تجريبي موصى به" : "Recommended mock exam"}
              </p>
              <h3 className="mt-0.5 text-[15px] font-extrabold leading-tight text-navy">
                {lang === "ar"
                  ? "اختبر جاهزيتك قبل امتحان الرياضيات"
                  : "Check your readiness before the Math exam"}
              </h3>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                {lang === "ar"
                  ? "النظام سيحدث الإتقان والخطة حسب الإجابات، ويحفظ علاجًا خاصًا للأسئلة الخاطئة."
                  : "Results update mastery and the plan, with saved remediation for missed questions."}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <ExamMetric
              icon={FileCheck2}
              label={lang === "ar" ? "٢٥ سؤال" : "25 questions"}
              sub={lang === "ar" ? "مختلط" : "Mixed"}
            />
            <ExamMetric
              icon={TimerReset}
              label={lang === "ar" ? "٤٥ دقيقة" : "45 min"}
              sub={lang === "ar" ? "بوقت" : "Timed"}
            />
            <ExamMetric
              icon={BookMarked}
              label={lang === "ar" ? "وحدتان" : "2 units"}
              sub={lang === "ar" ? "كسور" : "Fractions"}
            />
          </div>

          <div className="mt-3 rounded-2xl bg-muted/70 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold text-navy">
                  {lang === "ar" ? "جاهزيتك المتوقعة" : "Expected readiness"}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {lang === "ar"
                    ? "سيركز العلاج على مسائل الكسور والمقامات المختلفة"
                    : "Remediation will focus on word problems and denominators"}
                </p>
              </div>
              <p className="text-2xl font-extrabold text-navy">72%</p>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-card overflow-hidden">
              <div className="h-full rounded-full bg-mint-gradient" style={{ width: "72%" }} />
            </div>
          </div>

          <button className="mt-3 w-full rounded-full bg-hero text-primary-foreground py-2.5 text-sm font-semibold shadow-glow">
            {lang === "ar" ? "ابدأ اختبار الجاهزية" : "Start readiness exam"}
          </button>
        </div>

        {/* Today's Tasks — Timeline */}
        <div className="rounded-lg bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">
              {t(active.labelKey)} · {t("today.todaysTasks")}
            </h3>
            <span className="text-xs text-muted-foreground">
              {lessonVideos.length} {lang === "ar" ? "فيديوهات" : "videos"}
            </span>
          </div>
          <div className="space-y-0">
            {lessonVideos.map((v, i) => {
              const done = v.status === "done";
              const inProgress = v.status === "progress";
              const locked = v.status === "locked";
              const last = i === lessonVideos.length - 1;

              const circleClass = done
                ? "bg-success text-white"
                : inProgress
                  ? "bg-blue text-white"
                  : "bg-muted text-muted-foreground";

              const cardClass = inProgress ? "bg-blue/5 border-blue/10" : "bg-card border-border";

              const thumb = v.thumbnail ? (
                <img src={v.thumbnail} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <Video className="h-5 w-5 text-muted-foreground" />
                </div>
              );

              const statusBadge = done ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : inProgress ? (
                <span className="rounded-full bg-blue/10 px-2 py-1 text-[10px] font-bold text-blue whitespace-nowrap">
                  {t("common.inProgress")}
                </span>
              ) : v.status === "todo" ? (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/25" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/25" />
              );

              const rowContent = (
                <div className="flex min-h-[78px] items-stretch" dir={dir}>
                  <div className="w-[86px] flex-shrink-0 overflow-hidden">{thumb}</div>
                  <div className="flex min-w-0 flex-1 items-center px-3 py-2">
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold leading-tight line-clamp-1 text-navy">
                        {v.title[lang]}
                      </p>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">
                        {v.duration[lang]} · {v.questions.length}{" "}
                        {lang === "ar" ? "أسئلة" : "questions"}
                      </p>
                      <p className="mt-0.5 text-[10px] font-bold text-navy">
                        {done
                          ? lang === "ar"
                            ? "+٣٠ نقطة مكتسبة"
                            : "+30 pts earned"
                          : lang === "ar"
                            ? "+٤٥ نقطة ممكنة"
                            : "+45 pts available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-[70px] flex-shrink-0 items-center justify-center px-2 py-2">
                    {statusBadge}
                  </div>
                </div>
              );

              return (
                <div key={v.id} className="flex gap-3 mb-3 last:mb-0">
                  {/* Timeline column */}
                  <div className="relative flex flex-col items-center w-8 shrink-0 self-stretch">
                    <div
                      className={`z-10 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold absolute top-1/2 -translate-y-1/2 ${circleClass}`}
                    >
                      {i + 1}
                    </div>
                    {!last && (
                      <div className="absolute top-1/2 bottom-[-30px] left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-border" />
                    )}
                  </div>

                  {/* Card */}
                  {locked ? (
                    <div
                      className={`flex-1 overflow-hidden rounded-lg border shadow-soft opacity-60 ${cardClass}`}
                    >
                      {rowContent}
                    </div>
                  ) : (
                    <Link
                      to="/video/$id"
                      params={{ id: v.id }}
                      className={`flex-1 overflow-hidden rounded-lg border shadow-soft block ${cardClass}`}
                    >
                      {rowContent}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function ExamMetric({
  icon: Icon,
  label,
  sub,
}: {
  icon: typeof FileCheck2;
  label: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl bg-muted/60 px-2 py-2 text-center">
      <Icon className="mx-auto h-4 w-4 text-navy" />
      <p className="mt-1 text-[11px] font-bold text-navy leading-tight">{label}</p>
      <p className="mt-0.5 text-[9px] text-muted-foreground leading-tight">{sub}</p>
    </div>
  );
}

function SubjectTab({
  subject,
  active,
  label,
  onClick,
}: {
  subject: SubjectData;
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  const Icon = subject.icon;
  const size = 60;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (subject.progress / 100) * c;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[72px] flex-col items-center justify-start gap-2 shrink-0 snap-start text-center focus:outline-none"
    >
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 absolute inset-0">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            stroke="var(--border)"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            stroke={active ? "var(--mint)" : "var(--blue)"}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            fill="none"
            className="transition-all duration-500"
          />
        </svg>
        <div
          className={`absolute inset-1.5 rounded-full flex items-center justify-center transition-colors ${
            active
              ? "bg-navy text-primary-foreground shadow-glow"
              : "bg-card border border-border text-navy"
          }`}
        >
          <Icon className="h-5 w-5" />
          <span
            className={`absolute -bottom-1 -right-1 text-[9px] font-bold rounded-full px-1.5 py-0.5 leading-none ${
              active ? "bg-mint text-navy" : "bg-navy text-primary-foreground"
            }`}
          >
            {subject.progress}%
          </span>
        </div>
      </div>
      <span
        className={`block w-full text-center text-[11px] whitespace-nowrap transition-colors ${
          active ? "font-semibold text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
