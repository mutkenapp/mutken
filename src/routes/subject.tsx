import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useT, useLanguage } from "@/lib/language";
import { ArrowLeft, TrendingUp, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/subject")({
  head: () => ({
    meta: [
      { title: "Math Report — Mutken" },
      { name: "description", content: "Detailed subject and domain-level progress." },
    ],
  }),
  component: SubjectReportScreen,
});

const chartData = [62, 65, 70, 68, 75, 78, 82];

function SubjectReportScreen() {
  const t = useT();
  const { dir } = useLanguage();
  const max = Math.max(...chartData);
  const min = Math.min(...chartData);
  const domains = [
    { name: t("subject.d1"), mastery: 84, status: t("status.mastered"), tint: "bg-success" },
    { name: t("subject.d2"), mastery: 68, status: t("status.needsPractice"), tint: "bg-warn" },
    { name: t("subject.d3"), mastery: 72, status: t("status.good"), tint: "bg-blue" },
    { name: t("subject.d4"), mastery: 88, status: t("status.mastered"), tint: "bg-success" },
    { name: t("subject.d5"), mastery: 61, status: t("status.improving"), tint: "bg-mint" },
  ];
  const recs = [t("subject.r1"), t("subject.r2"), t("subject.r3")];

  return (
    <MobileShell hideNav>
      <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-border">
        <div className="px-4 pt-12 pb-3 flex items-center gap-3">
          <Link to="/progress" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </Link>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{t("subject.header")}</p>
            <p className="font-semibold text-sm">{t("subject.mathGrade")}</p>
          </div>
        </div>
      </header>

      <div className="px-5 py-4 space-y-4">
        <div className="rounded-3xl bg-hero text-primary-foreground p-5 shadow-glow relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-mint/20 blur-2xl" />
          <div className="relative">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-4xl font-bold font-display">78%</span>
              <span className="text-mint text-sm font-semibold flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {t("subject.thisMonth")}
              </span>
            </div>
            <p className="text-sm opacity-80 mt-1">{t("subject.overall")}</p>

            <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
              <Stat label={t("subject.lessonsStat")} value="24" />
              <Stat label={t("subject.avgQuiz")} value="82%" />
              <Stat label={t("subject.timeStat")} value={t("subject.timeVal")} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("subject.weeklyTrend")}
            </p>
            <span className="text-[10px] text-muted-foreground">{t("subject.last7")}</span>
          </div>
          <div className="h-32 flex items-end gap-2">
            {chartData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-mint-gradient transition-all"
                  style={{ height: `${((v - min + 10) / (max - min + 10)) * 100}%` }}
                />
                <span className="text-[9px] text-muted-foreground">
                  {t("common.week")}{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            {t("subject.domains")}
          </p>
          <div className="space-y-2">
            {domains.map((d) => (
              <button key={d.name} className="w-full text-left rounded-2xl bg-card border border-border p-4 shadow-soft flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{d.name}</p>
                      <p className="text-[11px] text-muted-foreground">{d.status}</p>
                    </div>
                    <span className="font-display font-bold text-sm">{d.mastery}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${d.tint}`} style={{ width: `${d.mastery}%` }} />
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-mint-gradient p-4 shadow-mint">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-navy" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy">{t("subject.recommended")}</p>
          </div>
          <ul className="space-y-2">
            {recs.map((r) => (
              <li key={r} className="flex items-center justify-between rounded-xl bg-white/60 backdrop-blur px-3 py-2.5 text-xs font-medium text-navy">
                {r}
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MobileShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur px-2.5 py-2">
      <p className="opacity-70 text-[10px] uppercase">{label}</p>
      <p className="font-bold text-sm">{value}</p>
    </div>
  );
}
