import { Link } from "@tanstack/react-router";
import { ChevronRight, Flame, Medal, Trophy } from "lucide-react";

import { useLanguage } from "@/lib/language";
import {
  achievementStreakDays,
  currentWeeklyPoints,
  leaderboardProgress,
  leaderboardUnlockPoints,
  lifetimePoints,
  pointsRemaining,
} from "@/lib/points";

export function DailyAchievementsCard({ className = "" }: { className?: string }) {
  const { lang, dir } = useLanguage();
  const streak = lang === "ar" ? "١٢" : achievementStreakDays;
  const weekly = lang === "ar" ? "٨٥" : currentWeeklyPoints;
  const total = lang === "ar" ? "١٢٠٠" : lifetimePoints;
  const remaining = lang === "ar" ? "١٥" : pointsRemaining;
  const unlockTotal = lang === "ar" ? "١٠٠" : leaderboardUnlockPoints;

  const achievements = [
    {
      icon: Flame,
      tone: "text-red-500 bg-red-50",
      value: lang === "ar" ? `${streak} يومًا` : `${streak} days`,
      label: lang === "ar" ? "متتالية" : "streak",
    },
    {
      icon: Medal,
      tone: "text-warn bg-warn/15",
      value: lang === "ar" ? "الكسور" : "Fractions",
      label: lang === "ar" ? "شارة" : "badge",
    },
    {
      icon: Trophy,
      tone: "text-amber-600 bg-amber-50",
      value: lang === "ar" ? "ترتيبك" : "Rank",
      label: lang === "ar" ? "أفضل 25" : "Top 25",
    },
  ];

  return (
    <Link
      to="/challenges"
      className={`block rounded-2xl bg-card border border-amber-100 p-3 shadow-soft active:scale-[0.99] transition-transform ${className}`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_92px] gap-2.5 items-center" dir="ltr">
        <div className="min-w-0" dir={dir}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-[15px] leading-tight">
              {lang === "ar" ? "برافو يا عمر استمر ..." : "Bravo Omar, keep going ..."}
            </h3>
            <ChevronRight className={`h-4 w-4 text-muted-foreground ${dir === "rtl" ? "rotate-180" : ""}`} />
          </div>

          <div className="mt-2 grid grid-cols-3 gap-0 rounded-xl overflow-hidden">
            {achievements.map((item, index) => (
              <div
                key={item.value}
                className={`px-1.5 text-center ${index !== achievements.length - 1 ? "border-e border-border" : ""}`}
              >
                <div className={`mx-auto h-7 w-7 rounded-full flex items-center justify-center ${item.tone}`}>
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                <p className="mt-1 text-[11px] font-bold leading-tight text-foreground">{item.value}</p>
                <p className="text-[9px] leading-tight text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between gap-2 text-[10px]">
              <span className="font-semibold text-navy">
                {lang === "ar" ? `${weekly} نقطة هذا الأسبوع` : `${weekly} pts this week`}
              </span>
              <span className="text-muted-foreground">
                {lang === "ar" ? `${remaining} للتفعيل` : `${remaining} to unlock`}
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-mint-gradient rounded-full" style={{ width: `${leaderboardProgress}%` }} />
            </div>
            <p className="mt-1 text-[9px] leading-tight text-muted-foreground">
              {lang === "ar"
                ? `افتح لوحة التفوق عند ${unlockTotal} نقطة أسبوعية`
                : `Leaderboard unlocks at ${unlockTotal} weekly points`}
            </p>
          </div>
        </div>

        <div className="relative h-[132px] w-[92px] overflow-hidden rounded-[24px] border border-white/80 shadow-[0_18px_34px_-22px_rgba(112,65,0,0.9)]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #FFF7CF 0%, #FFD66B 30%, #E69D22 68%, #A65E08 100%)",
            }}
          />
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/45 blur-xl" />
          <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-[#7A4300]/25 blur-xl" />

          <div className="absolute inset-x-2 top-3 flex items-center justify-center">
            <span className="rounded-full bg-white/45 px-2 py-1 text-[8.5px] font-extrabold text-[#6B3D00] shadow-sm whitespace-nowrap">
              {lang === "ar" ? "إجمالي النقاط" : "Total points"}
            </span>
          </div>

          <div className="absolute inset-x-0 top-[39px] flex justify-center">
            <div
              className="relative h-[58px] w-[58px] rounded-full p-[4px] shadow-[0_12px_22px_-12px_rgba(83,43,0,0.9)]"
              style={{
                background:
                  "conic-gradient(from 210deg, #FFF8CD, #F3BB39, #B96D08, #FFE58A, #FFF8CD)",
              }}
            >
              <div
                className="absolute inset-[5px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 25%, #FFF5C8 0%, #F5C44D 42%, #D78A12 100%)",
                }}
              />
              <div className="absolute inset-[11px] rounded-full border border-white/45" />
              <Trophy className="absolute left-1/2 top-[8px] h-3.5 w-3.5 -translate-x-1/2 text-[#6D3E00]" />
              <p className="absolute inset-x-0 bottom-[11px] text-center font-display text-[18px] font-extrabold leading-none text-[#3D2600] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                {total}
              </p>
            </div>
          </div>

          <div className="absolute inset-x-3 bottom-2 rounded-full bg-[#3E2600]/88 px-2 py-2 text-center text-[#FFE99A] shadow-sm">
            <p className="text-[11px] font-extrabold leading-none">
              {lang === "ar" ? "نقطة" : "points"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
