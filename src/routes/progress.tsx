import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { ProgressRing } from "@/components/brand";
import { DailyAchievementsCard } from "@/components/daily-achievements-card";
import { useLanguage, useT } from "@/lib/language";
import { ChevronRight, Trophy, Flame, Award, Sparkles, TrendingUp, Coins, LockKeyhole } from "lucide-react";
import {
  currentWeeklyPoints,
  leaderboardProgress,
  leaderboardUnlockPoints,
  pointsRemaining,
  weeklyPointSources,
} from "@/lib/points";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — Mutken" },
      { name: "description", content: "Your learning profile, subject mastery, and achievements." },
    ],
  }),
  component: ProgressScreen,
});

function ProgressScreen() {
  const t = useT();
  const { lang } = useLanguage();
  const subjects = [
    { name: t("subject.math"), mastery: 78, status: t("status.improving"), weak: t("weak.fractions"), color: "bg-blue" },
    { name: t("subject.science"), mastery: 71, status: t("status.needsPractice"), weak: t("weak.forces"), color: "bg-warn" },
    { name: t("subject.english"), mastery: 84, status: t("status.strong"), weak: t("weak.none"), color: "bg-success" },
    { name: t("subject.arabic"), mastery: 80, status: t("status.onTrack"), weak: t("weak.grammar"), color: "bg-mint" },
  ];
  const badges = [
    { label: t("badge.streak5"), icon: Flame, unlocked: true },
    { label: t("badge.quizMaster"), icon: Trophy, unlocked: true },
    { label: t("badge.mathImprover"), icon: TrendingUp, unlocked: true },
    { label: t("badge.consistent"), icon: Award, unlocked: false },
  ];

  return (
    <MobileShell>
      <header className="px-5 pt-14 pb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("progress.myProfile")}</p>
        <h1 className="text-2xl font-bold">{t("progress.title")}</h1>
      </header>

      <div className="px-5 space-y-4">
        <div className="rounded-3xl bg-hero text-primary-foreground p-5 shadow-glow relative overflow-hidden">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-mint/20 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <ProgressRing value={74} size={110} stroke={9} label="74%" sub={t("progress.mastery")} />
            <div className="flex-1">
              <p className="text-lg font-bold">{t("progress.studentName")}</p>
              <p className="text-sm opacity-80">{t("progress.grade")}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-white/10 backdrop-blur px-2.5 py-2">
                  <p className="opacity-70 text-[10px] uppercase">{t("progress.streakLabel")}</p>
                  <p className="font-bold text-sm">{t("progress.streakVal")}</p>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur px-2.5 py-2">
                  <p className="opacity-70 text-[10px] uppercase">{t("progress.studyTime")}</p>
                  <p className="font-bold text-sm">{t("progress.studyTimeVal")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DailyAchievementsCard />

        <div className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "النقاط الأسبوعية" : "Weekly points"}
              </p>
              <h2 className="text-xl font-bold mt-0.5">
                {currentWeeklyPoints} / {leaderboardUnlockPoints}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {lang === "ar"
                  ? `${pointsRemaining} نقطة لتفعيل لوحة ترتيب الصف`
                  : `${pointsRemaining} points to activate the class leaderboard`}
              </p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-mint/20 text-navy flex items-center justify-center">
              <Coins className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-mint-gradient rounded-full" style={{ width: `${leaderboardProgress}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {weeklyPointSources.slice(0, 4).map((source) => (
              <div key={source.label.en} className="rounded-2xl bg-muted/60 p-3">
                <p className="text-[11px] text-muted-foreground leading-tight">{source.label[lang]}</p>
                <p className="mt-1 text-sm font-bold text-navy">{source.points}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-navy/5 p-3">
            <LockKeyhole className="h-4 w-4 text-navy mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-snug">
              {lang === "ar"
                ? "نقاط الترتيب تُصفّر أسبوعياً، أما نقاط العمر والإنجازات فتبقى في الملف الشخصي."
                : "Leaderboard points reset weekly, while lifetime points and achievements stay in the profile."}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold px-1 mb-3">{t("common.subjects")}</h3>
          <div className="space-y-3">
            {subjects.map((s) => (
              <Link key={s.name} to="/subject" className="block rounded-2xl bg-card border border-border p-4 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.status} · {t("progress.weak")}: {s.weak}
                    </p>
                  </div>
                  <span className="font-display font-bold text-xl">{s.mastery}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: `${s.mastery}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-mint-gradient flex items-center justify-center text-navy font-bold text-xs">
              S
            </div>
            <p className="text-sm font-semibold">{t("progress.saraInsight")}</p>
          </div>
          <p className="text-sm text-muted-foreground">{t("progress.saraText")}</p>
        </div>

        <div className="rounded-3xl bg-mint-gradient p-4 shadow-mint">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-2xl bg-navy text-mint flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-navy/70">{t("progress.aiInsight")}</p>
              <p className="text-sm font-semibold text-navy mt-0.5">{t("progress.aiText")}</p>
              <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy bg-white/60 rounded-full px-3 py-1.5">
                {t("progress.startPractice")} <ChevronRight className="h-3 w-3 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold px-1 mb-3">{t("progress.achievements")}</h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <div
                key={b.label}
                className={`rounded-2xl p-4 border ${
                  b.unlocked ? "bg-card border-border shadow-soft" : "bg-muted/50 border-dashed border-border opacity-70"
                }`}
              >
                <div
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center mb-2 ${
                    b.unlocked ? "bg-mint-gradient text-navy" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <b.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold">{b.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {b.unlocked ? t("common.unlocked") : t("common.locked")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
