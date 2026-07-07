import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Play, Pause, Star, Lightbulb, Coins } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { getVideo, lessonVideos, type LessonVideo } from "@/lib/videos";
import { MobileShell } from "@/components/mobile-shell";
import { answerPointRules, resourcePointRules } from "@/lib/points";

export const Route = createFileRoute("/video/$id")({
  head: ({ params }) => {
    const v = getVideo(params.id);
    return {
      meta: [
        { title: v ? `${v.title.en} — Mutken` : "Video — Mutken" },
        { name: "description", content: "Watch the lesson video and answer the related questions." },
      ],
    };
  },
  loader: ({ params }) => {
    const v = getVideo(params.id);
    if (!v) throw notFound();
    return v;
  },
  notFoundComponent: () => (
    <div className="p-6 text-center text-sm">Video not found. <Link to="/" className="text-blue underline">Back to plan</Link></div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-6 text-center text-sm text-destructive">{error.message}</div>
  ),
  component: VideoPage,
});

function VideoPage() {
  const video = Route.useLoaderData() as LessonVideo;
  const { lang, dir } = useLanguage();
  const [current, setCurrent] = useState(0);
  // Per-question: array of option indices the student has clicked (in order)
  const [attempts, setAttempts] = useState<Record<number, number[]>>({});
  const [playing, setPlaying] = useState(true);

  const total = video.questions.length;

  const isSolved = (i: number) => {
    const list = attempts[i];
    if (!list || list.length === 0) return false;
    return list[list.length - 1] === video.questions[i].answer;
  };

  const correctCount = video.questions.reduce((n, _, i) => n + (isSolved(i) ? 1 : 0), 0);
  const finished = video.questions.every((_, i) => isSolved(i));
  const perfect = finished && correctCount === total;

  const markers = video.questions.map((_, i) => ((i + 1) / (total + 1)) * 100);
  const progressPct = markers[current] ?? 0;

  const thumb = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const q = video.questions[current];
  const tried = attempts[current] ?? [];
  const lastPick = tried.length > 0 ? tried[tried.length - 1] : undefined;
  const solved = isSolved(current);

  const currentIdx = lessonVideos.findIndex((v) => v.id === video.id);
  const next = lessonVideos.slice(currentIdx + 1).find((v) => v.status !== "locked");

  const resetAll = () => {
    setAttempts({});
    setCurrent(0);
    setPlaying(true);
  };

  const pickOption = (oi: number) => {
    if (solved) return;
    if (tried.includes(oi)) return;
    setAttempts((a) => ({ ...a, [current]: [...(a[current] ?? []), oi] }));
  };

  return (
    <MobileShell>
    <div className="bg-background flex flex-col">
      {/* Prototype video — constrained to app width */}
      <div className="relative w-full max-w-[440px] mx-auto aspect-video bg-black overflow-hidden">
        <img src={thumb} alt={video.title[lang]} className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        <Link
          to="/"
          className="absolute top-3 left-3 z-10 h-9 w-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white"
          aria-label="Back"
        >
          <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
        </Link>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={playing ? "Pause" : "Play"}
        >
          <span className="h-16 w-16 rounded-full bg-white/95 flex items-center justify-center shadow-glow">
            {playing ? (
              <Pause className="h-6 w-6 text-navy fill-navy" />
            ) : (
              <Play className="h-6 w-6 text-navy fill-navy ml-1" />
            )}
          </span>
        </button>

        <div className="absolute bottom-3 inset-x-3">
          <div className="text-[10px] text-white/80 mb-1.5 flex justify-between font-medium">
            <span>
              {lang === "ar" ? "سؤال" : "Question"} {current + 1}/{total}
            </span>
            <span>{video.duration[lang]}</span>
          </div>
          <div className="relative h-1.5 rounded-full bg-white/25">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-mint"
              style={{ width: `${progressPct}%` }}
            />
            {markers.map((pos, i) => {
              const active = i === current;
              const done = isSolved(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2"
                  style={{ left: `${pos}%` }}
                  aria-label={`Question ${i + 1}`}
                >
                  <span
                    className={`block rounded-full border-2 border-navy transition-all ${
                      active
                        ? "h-4 w-4 bg-mint shadow-mint"
                        : done
                        ? "h-3 w-3 bg-mint"
                        : "h-3 w-3 bg-white/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 pt-4 pb-32 max-w-[440px] mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {lang === "ar" ? "درس" : "Lesson"} · {video.duration[lang]}
          </p>
          <h1 className="text-lg font-bold leading-tight mt-1">{video.title[lang]}</h1>

          {/* Live star progress */}
          <div className="mt-3 rounded-2xl bg-gradient-to-br from-navy to-navy/90 text-white p-3 flex items-center justify-between shadow-soft">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                {lang === "ar" ? "نجومك" : "Your Stars"}
              </p>
              <p className="text-[11px] opacity-80 mt-0.5">
                {correctCount}/{total} {lang === "ar" ? "إجابة صحيحة" : "correct"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: total }).map((_, i) => {
                const filled = i < correctCount;
                return (
                  <Star
                    key={i}
                    className={`h-5 w-5 transition-all duration-300 ${
                      filled ? "text-mint fill-mint scale-110" : "text-white/25"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-card border border-border p-3 shadow-soft">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {lang === "ar" ? "نقاط هذا الدرس" : "Lesson points"}
                </p>
                <p className="text-sm font-semibold">
                  {lang === "ar" ? "المشاهدة + الأسئلة + الدقة" : "Watch + questions + accuracy"}
                </p>
              </div>
              <Coins className="h-4 w-4 text-navy" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {resourcePointRules.map((rule) => (
                <div key={rule.label.en} className="rounded-xl bg-muted/60 p-2">
                  <p className="text-[10px] text-muted-foreground leading-tight">{rule.label[lang]}</p>
                  <p className="mt-1 text-xs font-bold text-navy">{rule.points}</p>
                </div>
              ))}
            </div>
          </div>

          {finished ? (
            <ResultCard
              perfect={perfect}
              correct={correctCount}
              total={total}
              lang={lang}
              onRetry={resetAll}
              next={next}
            />
          ) : (
            <>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {lang === "ar" ? "سؤال" : "Question"} {current + 1} / {total}
                </p>
                <span className="text-[11px] text-muted-foreground">
                  {tried.length > 0 && !solved
                    ? `${tried.length} ${lang === "ar" ? "محاولة" : "attempts"}`
                    : ""}
                </span>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                {answerPointRules.map((rule) => (
                  <div key={rule.label.en} className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 shadow-soft">
                    <span className="text-[10px] text-muted-foreground">{rule.label[lang]}</span>
                    <span className="ms-1 text-[11px] font-bold text-navy">{rule.points}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-2xl bg-card border border-border p-4 shadow-soft">
                <p className="font-semibold text-[15px] mb-3">{q.q[lang]}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const wasTried = tried.includes(oi);
                    const isCorrect = q.answer === oi;
                    const showCorrect = solved && isCorrect;
                    const showWrong = wasTried && !isCorrect;
                    return (
                      <button
                        key={oi}
                        type="button"
                        disabled={wasTried || solved}
                        onClick={() => pickOption(oi)}
                        className={`w-full text-start rounded-xl border px-3 py-2.5 text-sm flex items-center justify-between gap-2 transition ${
                          showCorrect
                            ? "border-success bg-success/10"
                            : showWrong
                            ? "border-destructive bg-destructive/10 opacity-70"
                            : "border-border bg-card hover:bg-muted"
                        }`}
                      >
                        <span>{opt[lang]}</span>
                        {showCorrect && <CheckCircle2 className="h-4 w-4 text-success" />}
                        {showWrong && <XCircle className="h-4 w-4 text-destructive" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback for the latest pick */}
                {lastPick !== undefined && (
                  <div
                    className={`mt-3 rounded-xl p-3 text-[13px] flex items-start gap-2 ${
                      solved
                        ? "bg-success/10 border border-success/30 text-success-foreground"
                        : "bg-destructive/10 border border-destructive/30"
                    }`}
                  >
                    {solved ? (
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    ) : (
                      <Lightbulb className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    )}
                    <p className="leading-snug">
                      {q.explanations[lastPick]?.[lang] ??
                        (solved
                          ? lang === "ar"
                            ? "ممتاز! إجابة صحيحة."
                            : "Excellent! Correct answer."
                          : lang === "ar"
                          ? "إجابة غير صحيحة. حاول مرة أخرى!"
                          : "Not quite right. Try again!")}
                    </p>
                  </div>
                )}
                {solved && (
                  <div className="mt-3 rounded-xl bg-mint/15 border border-mint/40 p-3 flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-navy">
                      {tried.length === 1
                        ? lang === "ar"
                          ? "مكافأة إجابة من أول محاولة"
                          : "First-try answer reward"
                        : lang === "ar"
                          ? "مكافأة التصحيح بعد المحاولة"
                          : "Retry-and-fix reward"}
                    </p>
                    <span className="rounded-full bg-mint px-2 py-1 text-xs font-bold text-navy">
                      {tried.length === 1 ? "+10" : tried.length === 2 ? "+6" : "+3"}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

    </div>

      {/* Action bar above bottom nav */}
      {!finished && (
        <div className="fixed bottom-16 inset-x-0 z-20 pointer-events-none flex justify-center">
          <div className="w-full max-w-[440px] pointer-events-auto border-t border-border bg-card/95 backdrop-blur">
            <div className="p-3 flex gap-2">
              {solved ? (
                <button
                  onClick={() => setCurrent((c) => Math.min(c + 1, total - 1))}
                  disabled={current === total - 1 && !finished}
                  className="flex-1 rounded-2xl bg-hero text-primary-foreground text-sm py-3.5 font-semibold shadow-glow disabled:opacity-50"
                >
                  {current === total - 1
                    ? lang === "ar"
                      ? "عرض النتيجة"
                      : "See Result"
                    : lang === "ar"
                    ? "السؤال التالي"
                    : "Next Question"}
                </button>
              ) : (
                <div className="flex-1 rounded-2xl bg-muted text-muted-foreground text-xs py-3.5 font-medium text-center">
                  {tried.length === 0
                    ? lang === "ar"
                      ? "اختر إجابة"
                      : "Choose an answer"
                    : lang === "ar"
                    ? "حاول مرة أخرى للوصول للإجابة الصحيحة"
                    : "Keep trying until you find the correct answer"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}

function ResultCard({
  perfect,
  correct,
  total,
  lang,
  onRetry,
  next,
}: {
  perfect: boolean;
  correct: number;
  total: number;
  lang: "en" | "ar";
  onRetry: () => void;
  next: LessonVideo | undefined;
}) {
  const pct = correct / total;
  const stars = Math.round(pct * 5);
  return (
    <div className="mt-5 rounded-3xl bg-hero text-primary-foreground p-6 shadow-glow text-center relative overflow-hidden">
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-mint/25 blur-2xl" />
      <p className="text-[11px] font-bold uppercase tracking-widest opacity-80">
        {perfect
          ? lang === "ar"
            ? "إنجاز مثالي"
            : "Perfect Score"
          : lang === "ar"
          ? "أحسنت"
          : "Well Done"}
      </p>
      <p className="mt-1 text-2xl font-bold">
        {correct}/{total}
      </p>
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = i < stars;
          return (
            <Star
              key={i}
              className={`h-7 w-7 transition-transform ${
                filled ? "text-mint fill-mint scale-110" : "text-white/30"
              }`}
            />
          );
        })}
      </div>
      <p className="mt-3 text-xs opacity-80">
        {perfect
          ? lang === "ar"
            ? "خمس نجوم — أجبت على كل الأسئلة بشكل صحيح!"
            : "Five stars — you answered every question correctly!"
          : lang === "ar"
          ? "جرّب مرة أخرى للحصول على الخمس نجوم"
          : "Try again to earn all five stars"}
      </p>
      <div className="mt-4 rounded-2xl bg-white/10 p-3 text-start">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold">
            {lang === "ar" ? "نقاط الدرس المكتسبة" : "Lesson points earned"}
          </p>
          <span className="rounded-full bg-mint text-navy px-2 py-1 text-xs font-bold">
            {perfect ? "+75" : "+55"}
          </span>
        </div>
        <p className="mt-1 text-[11px] opacity-75">
          {lang === "ar"
            ? "تشمل مشاهدة المورد، إكمال الأسئلة، ومكافأة الدقة."
            : "Includes resource completion, question completion, and accuracy bonus."}
        </p>
      </div>
      <div className="mt-5 flex gap-2">
        <button
          onClick={onRetry}
          className="flex-1 rounded-2xl bg-white/15 backdrop-blur text-sm py-3 font-semibold"
        >
          {lang === "ar" ? "أعد المحاولة" : "Retry"}
        </button>
        {next ? (
          <Link
            to="/video/$id"
            params={{ id: next.id }}
            className="flex-1 rounded-2xl bg-mint text-navy text-sm py-3 font-semibold flex items-center justify-center"
          >
            {lang === "ar" ? "الفيديو التالي" : "Next Video"}
          </Link>
        ) : (
          <Link
            to="/"
            className="flex-1 rounded-2xl bg-mint text-navy text-sm py-3 font-semibold flex items-center justify-center"
          >
            {lang === "ar" ? "العودة للخطة" : "Back to Plan"}
          </Link>
        )}
      </div>
    </div>
  );
}
