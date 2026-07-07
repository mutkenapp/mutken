import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { DailyAchievementsCard } from "@/components/daily-achievements-card";
import { useLanguage, useT } from "@/lib/language";
import {
  Trophy,
  Zap,
  Users,
  Timer,
  ChevronRight,
  Crown,
  TrendingUp,
  LockKeyhole,
  CheckCircle2,
  Coins,
} from "lucide-react";
import {
  challengePointRules,
  currentWeeklyActivities,
  currentWeeklyPoints,
  leaderboardProgress,
  leaderboardUnlockActivities,
  leaderboardUnlockPoints,
  pointsRemaining,
  weeklyPointSources,
} from "@/lib/points";

export const Route = createFileRoute("/challenges")({
  head: () => ({
    meta: [
      { title: "Challenges — Mutken" },
      { name: "description", content: "Weekly learning challenges, badges, and leaderboards." },
    ],
  }),
  component: ChallengesScreen,
});

function ChallengesScreen() {
  const t = useT();
  const { lang } = useLanguage();
  const leaderboardUnlocked =
    currentWeeklyPoints >= leaderboardUnlockPoints ||
    currentWeeklyActivities >= leaderboardUnlockActivities;
  const leaderboard = [
    { name: t("challenges.p1"), pts: 1420, rank: 1, me: false },
    { name: t("challenges.p2"), pts: 1310, rank: 2, me: false },
    { name: t("challenges.p3"), pts: 1245, rank: 3, me: false },
    { name: t("challenges.pme"), pts: 980, rank: 12, me: true },
  ];
  const categories = [
    { label: t("challenges.cat.speed"), icon: Zap },
    { label: t("challenges.cat.team"), icon: Users },
    { label: t("challenges.cat.accuracy"), icon: Trophy },
  ];

  return (
    <MobileShell>
      <header className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold">{t("challenges.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("challenges.subtitle")}</p>
      </header>

      <div className="px-5 space-y-4">
        <DailyAchievementsCard />

        <div className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-2xl bg-navy text-mint flex items-center justify-center shrink-0">
              {leaderboardUnlocked ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <LockKeyhole className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {lang === "ar" ? "تفعيل لوحة التفوق" : "Leaderboard activation"}
                  </p>
                  <h2 className="mt-0.5 text-base font-bold">
                    {leaderboardUnlocked
                      ? lang === "ar"
                        ? "تم فتح ترتيب الصف"
                        : "Class ranking unlocked"
                      : lang === "ar"
                        ? `${pointsRemaining} نقطة متبقية للفتح`
                        : `${pointsRemaining} points left to unlock`}
                  </h2>
                </div>
                <span className="rounded-full bg-mint/20 px-2.5 py-1 text-[11px] font-bold text-navy whitespace-nowrap">
                  {currentWeeklyPoints}/{leaderboardUnlockPoints}
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-mint-gradient rounded-full" style={{ width: `${leaderboardProgress}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-snug">
                {lang === "ar"
                  ? `اجمع ${leaderboardUnlockPoints} نقطة أسبوعية أو أكمل ${leaderboardUnlockActivities} أنشطة تعلم للدخول إلى لوحة الصف.`
                  : `Earn ${leaderboardUnlockPoints} weekly points or complete ${leaderboardUnlockActivities} learning activities to enter the class leaderboard.`}
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-hero text-primary-foreground p-5 shadow-glow">
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-mint/25 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-mint text-navy px-2 py-0.5">
                {t("challenges.thisWeek")}
              </span>
              <span className="text-[10px] opacity-70 flex items-center gap-1">
                <Timer className="h-3 w-3" /> {t("challenges.timeLeft")}
              </span>
            </div>
            <h2 className="text-2xl font-bold">{t("challenges.sprintTitle")}</h2>
            <p className="text-sm opacity-80 mt-1">{t("challenges.sprintDesc")}</p>

            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-sm">
                <Trophy className="h-4 w-4 text-mint" />
                <span className="font-semibold">{t("challenges.pts150")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Zap className="h-4 w-4 text-mint" />
                <span className="opacity-80">{t("challenges.badgeStarter")}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs mb-2">
              <span className="opacity-80">{t("challenges.yourProgress")}</span>
              <span className="font-semibold">8 / 20</span>
            </div>
            <div className="h-2 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full bg-mint" style={{ width: "40%" }} />
            </div>

            <button className="mt-5 w-full rounded-2xl bg-mint text-navy font-semibold py-3 text-sm">
              {t("challenges.continue")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {categories.map((c) => (
            <button key={c.label} className="rounded-2xl bg-card border border-border p-3 shadow-soft text-center">
              <div className="h-10 w-10 rounded-2xl bg-accent text-navy flex items-center justify-center mx-auto mb-1.5">
                <c.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium">{c.label}</p>
            </button>
          ))}
        </div>

        <div className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "نقاط هذا الأسبوع" : "This week's points"}
              </p>
              <p className="font-semibold mt-0.5">
                {lang === "ar" ? "كيف وصل عمر إلى ٨٥ نقطة" : "How Omar reached 85 points"}
              </p>
            </div>
            <Coins className="h-5 w-5 text-navy" />
          </div>
          <div className="space-y-2.5">
            {weeklyPointSources.map((source) => (
              <div key={source.label.en} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{source.label[lang]}</p>
                  {source.note && (
                    <p className="text-[11px] text-muted-foreground truncate">{source.note[lang]}</p>
                  )}
                </div>
                <span className="rounded-full bg-mint/20 px-2 py-1 text-xs font-bold text-navy">
                  {source.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border shadow-soft overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("challenges.leaderboard")}
              </p>
              <p className="font-semibold mt-0.5">
                {leaderboardUnlocked
                  ? t("challenges.myClass")
                  : lang === "ar"
                    ? "مغلق حتى تكمل شرط النقاط"
                    : "Locked until points requirement is met"}
              </p>
            </div>
            {leaderboardUnlocked ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
            ) : (
              <LockKeyhole className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          {leaderboardUnlocked ? (
            leaderboard.map((p, i) => (
              <div
                key={p.name}
                className={`flex items-center gap-3 px-4 py-3 ${
                  i !== leaderboard.length - 1 ? "border-b border-border" : ""
                } ${p.me ? "bg-mint/10" : ""}`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    p.rank === 1
                      ? "bg-warn text-navy"
                      : p.rank <= 3
                        ? "bg-accent text-navy"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {p.rank === 1 ? <Crown className="h-4 w-4" /> : `#${p.rank}`}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${p.me ? "font-bold" : "font-medium"}`}>{p.name}</p>
                </div>
                <p className="font-display font-bold text-sm">{p.pts}</p>
              </div>
            ))
          ) : (
            <div className="p-4">
              <div className="rounded-2xl bg-muted/60 border border-dashed border-border p-4 text-center">
                <LockKeyhole className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="mt-2 text-sm font-semibold">
                  {lang === "ar" ? "اجمع نقاطاً أكثر لتظهر في الترتيب" : "Earn more points to appear in rankings"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lang === "ar"
                    ? `أكمل نشاطاً واحداً أو اجمع ${pointsRemaining} نقطة إضافية هذا الأسبوع.`
                    : `Complete 1 more activity or earn ${pointsRemaining} more points this week.`}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-4 w-4 text-navy" />
            <h3 className="font-semibold">
              {lang === "ar" ? "مكافآت التحديات" : "Challenge rewards"}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {challengePointRules.map((rule) => (
              <div key={rule.label.en} className="rounded-2xl bg-muted/60 p-3">
                <p className="text-[11px] text-muted-foreground leading-tight">{rule.label[lang]}</p>
                <p className="mt-1 text-sm font-bold text-navy">{rule.points}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-mint-gradient p-4 shadow-mint flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-navy text-mint flex items-center justify-center">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/70">
              {t("challenges.mostImproved")}
            </p>
            <p className="font-semibold text-sm text-navy">{t("challenges.mostImprovedText")}</p>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
