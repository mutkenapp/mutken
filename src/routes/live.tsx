import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useLanguage, useT } from "@/lib/language";
import { useActiveSubject } from "@/lib/active-subject";
import { Mic, MicOff, Video, Hand, PhoneOff, Radio, Check, Sparkles, Coins } from "lucide-react";
import { livePointRules } from "@/lib/points";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live Class — Mutken" },
      { name: "description", content: "Live session with your assistant teacher." },
    ],
  }),
  component: LiveScreen,
});

function LiveScreen() {
  const t = useT();
  const { lang } = useLanguage();
  const { active } = useActiveSubject();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [muted, setMuted] = useState(true);

  const correct = 2;
  const options = [
    t("live.opt1"),
    t("live.opt2"),
    t("live.opt3"),
    t("live.opt4"),
  ];

  return (
    <MobileShell>
      <div className="relative flex flex-col bg-navy min-h-screen">

        {/* Top third: teacher live camera */}
        <div className="relative h-[33vh] w-full overflow-hidden bg-navy">
          <img
            src={active.teacherPhoto}
            alt={t(active.teacherNameKey)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          {/* Top bar */}
          <div className="absolute top-0 inset-x-0 pt-12 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-red-500 px-3 py-1.5 shadow-lg">
              <Radio className="h-3.5 w-3.5 text-white animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                {t("live.live")}
              </span>
            </div>
            <div className="rounded-full bg-black/40 backdrop-blur px-3 py-1.5 text-[11px] font-medium text-white">
              12:34
            </div>
          </div>

          {/* Teacher label */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-white font-semibold text-sm drop-shadow">
                {t(active.teacherNameKey)}
              </p>
              <p className="text-white/80 text-[11px] drop-shadow">
                {t(active.labelKey)} · {t("live.speaking")}
              </p>
            </div>
            {/* Self PiP */}
            <div className="h-16 w-12 rounded-xl bg-black/60 border border-white/20 overflow-hidden flex items-center justify-center">
              <Video className="h-4 w-4 text-white/70" />
            </div>
          </div>
        </div>

        {/* Bottom two-thirds: shared content (quiz) */}
        <div className="flex-1 bg-background rounded-t-3xl -mt-4 relative">
          <div className="px-5 pt-5 pb-28">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/20 text-navy px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                {t("live.sharedByTeacher")}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">
                {t("live.qCounter")}
              </span>
            </div>

            <h2 className="text-lg font-bold text-foreground leading-snug">
              {t("live.question")}
            </h2>

            <div className="mt-4 rounded-2xl bg-card border border-border p-3 shadow-soft">
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("common.pts")} · {t("today.liveTitle")}
                </p>
                <Coins className="h-4 w-4 text-navy" />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {livePointRules.map((rule) => (
                  <div key={rule.label.en} className="shrink-0 rounded-xl bg-muted/60 px-3 py-2">
                    <p className="text-[10px] text-muted-foreground whitespace-nowrap">{rule.label[lang]}</p>
                    <p className="mt-0.5 text-xs font-bold text-navy">{rule.points}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = submitted && i === correct;
                const isWrong = submitted && isSelected && i !== correct;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={submitted}
                    onClick={() => setSelected(i)}
                    className={`w-full flex items-center gap-3 rounded-2xl border p-3.5 text-start transition-all ${
                      isCorrect
                        ? "bg-success/10 border-success"
                        : isWrong
                          ? "bg-red-50 border-red-400"
                          : isSelected
                            ? "bg-accent border-blue"
                            : "bg-card border-border"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isCorrect
                          ? "bg-success text-white"
                          : isWrong
                            ? "bg-red-500 text-white"
                            : isSelected
                              ? "bg-navy text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCorrect ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-sm font-medium flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            <button
              disabled={selected === null || submitted}
              onClick={() => setSubmitted(true)}
              className="mt-5 w-full rounded-2xl bg-hero text-primary-foreground py-3.5 font-semibold shadow-glow disabled:opacity-50"
            >
              {submitted ? t("live.answerSent") : t("live.submit")}
            </button>

            {submitted && (
              <div className="mt-4 rounded-2xl bg-mint-gradient p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-navy/70">
                  {t("live.teacherNote")}
                </p>
                <p className="text-sm font-semibold text-navy mt-1">
                  {t("live.explanation")}
                </p>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-white/50 px-3 py-2">
                  <span className="text-xs font-semibold text-navy">
                    {selected === correct
                      ? lang === "ar"
                        ? "إجابة مباشرة صحيحة"
                        : "Correct live answer"
                      : lang === "ar"
                        ? "مشاركة مباشرة"
                        : "Live participation"}
                  </span>
                  <span className="text-xs font-bold text-navy">
                    {selected === correct ? "+15" : "+8"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control bar */}
        <div className="sticky bottom-0 inset-x-0 bg-navy/95 backdrop-blur-xl border-t border-white/10 px-5 py-3 flex items-center justify-around">
          <ControlBtn
            icon={muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            onClick={() => setMuted((m) => !m)}
            active={!muted}
          />
          <ControlBtn icon={<Video className="h-5 w-5" />} />
          <ControlBtn icon={<Hand className="h-5 w-5" />} highlight />
          <button className="h-12 w-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg">
            <PhoneOff className="h-5 w-5" />
          </button>
        </div>
      </div>
    </MobileShell>
  );
}

function ControlBtn({
  icon,
  onClick,
  active,
  highlight,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
        highlight
          ? "bg-mint text-navy"
          : active
            ? "bg-white text-navy"
            : "bg-white/10 text-white"
      }`}
    >
      {icon}
    </button>
  );
}
