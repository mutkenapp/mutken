import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  Star,
  Lightbulb,
  Coins,
  RotateCcw,
  Clock3,
  LockKeyhole,
  Info,
  X,
} from "lucide-react";
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
        {
          name: "description",
          content: "Watch the lesson video and answer the related questions.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const v = getVideo(params.id);
    if (!v) throw notFound();
    return v;
  },
  notFoundComponent: () => (
    <div className="p-6 text-center text-sm">
      Video not found.{" "}
      <Link to="/" className="text-blue underline">
        Back to plan
      </Link>
    </div>
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
  const [showPointsInfo, setShowPointsInfo] = useState(false);

  const total = video.questions.length;
  const requiredStars = 5;

  const isSolved = (i: number) => {
    const list = attempts[i];
    if (!list || list.length === 0) return false;
    return list[list.length - 1] === video.questions[i].answer;
  };

  const correctCount = video.questions.reduce((n, _, i) => n + (isSolved(i) ? 1 : 0), 0);
  const earnedStars = Math.min(correctCount, requiredStars);
  const finished = earnedStars >= requiredStars;
  const solvedQuestions = video.questions.every((_, i) => isSolved(i));
  const perfect = solvedQuestions && Object.values(attempts).every((list) => list.length === 1);

  const markers = video.questions.map((_, i) => ((i + 1) / (total + 1)) * 100);
  const progressPct = markers[current] ?? 0;

  const thumb = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const q = video.questions[current];
  const tried = attempts[current] ?? [];
  const lastPick = tried.length > 0 ? tried[tried.length - 1] : undefined;
  const solved = isSolved(current);
  const markerTime = getMarkerTimeLabel(video.duration.en, markers[current] ?? 0, lang);
  const firstTryCorrectCount = video.questions.reduce((n, _, i) => {
    const list = attempts[i];
    return n + (list?.length === 1 && isSolved(i) ? 1 : 0);
  }, 0);
  const firstTryAccuracy = total > 0 ? Math.round((firstTryCorrectCount / total) * 100) : 0;
  const watch80Earned = progressPct >= 80;
  const completionEarned = finished;
  const postQuestionsEarned = solvedQuestions;
  const accuracyEarned = solvedQuestions && firstTryAccuracy >= 80;

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
          <img
            src={thumb}
            alt={video.title[lang]}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
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
                const needsRetry = hasWrongOpenAttempt(attempts[i], video.questions[i].answer);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setCurrent(i);
                      setPlaying(false);
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2"
                    style={{ left: `${pos}%` }}
                    aria-label={`${lang === "ar" ? "سؤال" : "Question"} ${i + 1}`}
                  >
                    <span
                      className={`block rounded-full border-2 transition-all ${
                        active
                          ? "h-4 w-4 border-white bg-blue shadow-mint"
                          : done
                            ? "h-3.5 w-3.5 border-white bg-success"
                            : needsRetry
                              ? "h-3.5 w-3.5 border-white bg-warn"
                              : "h-3 w-3 border-navy bg-white/50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1 text-[9px] text-white/75">
              <MarkerLegend color="bg-white/50" text={lang === "ar" ? "لم يبدأ" : "Not reached"} />
              <MarkerLegend color="bg-blue" text={lang === "ar" ? "الحالي" : "Current"} />
              <MarkerLegend color="bg-success" text={lang === "ar" ? "صحيح" : "Correct"} />
              <MarkerLegend color="bg-warn" text={lang === "ar" ? "إعادة" : "Retry"} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-4 pb-28 max-w-[440px] mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {lang === "ar" ? "درس" : "Lesson"} · {video.duration[lang]}
            </p>
            <div className="mt-1 flex items-start justify-between gap-3">
              <h1 className="text-lg font-bold leading-tight">{video.title[lang]}</h1>
              <button
                type="button"
                onClick={() => setShowPointsInfo(true)}
                className="h-9 w-9 flex-shrink-0 rounded-full border border-border bg-card shadow-soft flex items-center justify-center text-navy active:scale-95"
                aria-label={lang === "ar" ? "شرح النقاط" : "Points information"}
              >
                <Info className="h-4 w-4" />
              </button>
            </div>

            {showPointsInfo && (
              <PointsInfoPopup
                lang={lang}
                onClose={() => setShowPointsInfo(false)}
                resourceStates={{
                  watch80Earned,
                  completionEarned,
                  postQuestionsEarned,
                  accuracyEarned,
                }}
              />
            )}

            <div className="mt-3 rounded-2xl bg-gradient-to-br from-navy to-navy/90 text-white p-3 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                    {lang === "ar" ? "نجومك" : "Your Stars"}
                  </p>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    {earnedStars}/{requiredStars}{" "}
                    {lang === "ar"
                      ? "نجوم - ٥ نجوم تكمل المورد"
                      : "stars - 5 stars complete the resource"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: requiredStars }).map((_, i) => {
                    const filled = i < earnedStars;
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
              <div className="mt-3">
                <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-mint transition-all"
                    style={{ width: `${(earnedStars / requiredStars) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] opacity-80">
                  {finished
                    ? lang === "ar"
                      ? "تم إكمال المورد. المشاهدة تبقى فرصة نقاط إضافية إذا لم تحصل عليها."
                      : "Resource completed. Watch progress remains an extra points opportunity if not earned."
                    : lang === "ar"
                      ? `أكمل ${toArabicDigits(String(requiredStars - earnedStars))} ${requiredStars - earnedStars === 1 ? "نجمة" : "نجوم"} لإنهاء المورد.`
                      : `Earn ${requiredStars - earnedStars} more ${requiredStars - earnedStars === 1 ? "star" : "stars"} to complete the resource.`}
                </p>
              </div>
            </div>

            {finished ? (
              <ResultCard
                perfect={perfect}
                correct={earnedStars}
                total={requiredStars}
                lang={lang}
                onRetry={resetAll}
                next={next}
                watch80Earned={watch80Earned}
                firstTryAccuracy={firstTryAccuracy}
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

                <div className="mt-3 rounded-2xl bg-card border border-border p-4 shadow-soft">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-3 py-1.5 text-[11px] font-semibold text-blue">
                      <Clock3 className="h-3.5 w-3.5" />
                      {lang === "ar" ? `مرتبط بالدقيقة ${markerTime}` : `Linked to ${markerTime}`}
                    </div>
                    <button
                      type="button"
                      onClick={() => setPlaying(false)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-[11px] font-semibold text-navy"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {lang === "ar" ? "ارجع للشرح" : "Return to explanation"}
                    </button>
                  </div>
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

                  {lastPick !== undefined && (
                    <div
                      className={`mt-3 rounded-xl p-3 text-[13px] ${
                        solved
                          ? "bg-success/10 border border-success/30 text-success-foreground"
                          : "bg-destructive/10 border border-destructive/30"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {solved ? (
                          <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        ) : (
                          <Lightbulb className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold">
                            {solved
                              ? lang === "ar"
                                ? "إجابة صحيحة"
                                : "Correct answer"
                              : lang === "ar"
                                ? "لماذا الإجابة غير صحيحة؟"
                                : "Why this is incorrect"}
                          </p>
                          <p className="mt-1 leading-snug">
                            {q.explanations[lastPick]?.[lang] ??
                              (solved
                                ? lang === "ar"
                                  ? "ممتاز! إجابة صحيحة."
                                  : "Excellent! Correct answer."
                                : lang === "ar"
                                  ? "إجابة غير صحيحة. حاول مرة أخرى!"
                                  : "Not quite right. Try again!")}
                          </p>
                          {!solved && (
                            <p className="mt-2 rounded-lg bg-white/60 px-2 py-1.5 text-[12px] leading-snug">
                              <span className="font-bold">
                                {lang === "ar" ? "تلميح: " : "Hint: "}
                              </span>
                              {lang === "ar"
                                ? "ارجع إلى الرقم أو المفهوم في السؤال، ثم قارن بين البسط والمقام قبل الاختيار."
                                : "Return to the number or concept in the question, then compare numerator and denominator before choosing."}
                            </p>
                          )}
                        </div>
                      </div>
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
                  <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
                    {solved
                      ? lang === "ar"
                        ? "تم حفظ النجمة لهذا السؤال. إعادة فتح العلامة تعرض الشرح ولا تكرر النقاط."
                        : "This question star is saved. Reopening the marker shows the explanation without duplicating points."
                      : lang === "ar"
                        ? "استمر في المحاولة. التعلم مستمر حتى تصل للإجابة الصحيحة."
                        : "Keep trying. Learning continues until you reach the correct answer."}
                  </p>

                  <div className="mt-4">
                    {solved ? (
                      <button
                        type="button"
                        onClick={() => {
                          setCurrent((c) => Math.min(c + 1, total - 1));
                          setPlaying(false);
                        }}
                        disabled={current === total - 1 && !finished}
                        className="w-full rounded-2xl bg-hero text-primary-foreground text-sm py-3.5 font-semibold shadow-glow disabled:opacity-50"
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
                      <div className="w-full rounded-2xl bg-muted text-muted-foreground text-xs py-3.5 font-medium text-center">
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
              </>
            )}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

type PointState = "earned" | "available" | "locked";

function PointsInfoPopup({
  lang,
  onClose,
  resourceStates,
}: {
  lang: "en" | "ar";
  onClose: () => void;
  resourceStates: {
    watch80Earned: boolean;
    completionEarned: boolean;
    postQuestionsEarned: boolean;
    accuracyEarned: boolean;
  };
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-navy/35 px-5 py-8 flex items-start justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="mt-24 w-full max-w-[400px] rounded-2xl border border-border bg-card p-4 shadow-glow"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {lang === "ar" ? "شرح النقاط" : "Points guide"}
            </p>
            <h2 className="mt-0.5 text-base font-bold text-navy">
              {lang === "ar" ? "المشاهدة + الأسئلة + الدقة" : "Watch + questions + accuracy"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-navy"
            aria-label={lang === "ar" ? "إغلاق" : "Close"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-blue" />
            <p className="text-sm font-bold text-navy">
              {lang === "ar" ? "نقاط المورد" : "Resource points"}
            </p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {resourcePointRules.map((rule, index) => {
              const state = getResourcePointState(index, resourceStates);
              return (
                <div key={rule.label.en} className="rounded-xl bg-muted/60 p-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[10px] leading-tight text-muted-foreground">
                      {rule.label[lang]}
                    </p>
                    <PointStatusBadge state={state} lang={lang} />
                  </div>
                  <p className="mt-1 text-xs font-bold text-navy">{rule.points}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-bold text-navy">
            {lang === "ar" ? "نقاط الإجابة" : "Answer points"}
          </p>
          <div className="mt-2 space-y-2">
            {answerPointRules.map((rule) => (
              <div
                key={rule.label.en}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2"
              >
                <p className="text-xs text-muted-foreground">{rule.label[lang]}</p>
                <p className="text-sm font-bold text-navy">{rule.points}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 rounded-xl bg-blue/10 px-3 py-2 text-[11px] leading-snug text-blue">
          {lang === "ar"
            ? "النقاط تمنح مرة واحدة فقط لكل إجراء، حتى لو أعدت مشاهدة الفيديو أو أعدت السؤال."
            : "Points are awarded once per action, even if you replay the video or revisit a question."}
        </p>
      </div>
    </div>
  );
}

function MarkerLegend({ color, text }: { color: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1 min-w-0">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="truncate">{text}</span>
    </span>
  );
}

function PointStatusBadge({ state, lang }: { state: PointState; lang: "en" | "ar" }) {
  const label =
    state === "earned"
      ? lang === "ar"
        ? "تم"
        : "Earned"
      : state === "available"
        ? lang === "ar"
          ? "متاح"
          : "Open"
        : lang === "ar"
          ? "مغلق"
          : "Locked";

  const className =
    state === "earned"
      ? "bg-success/15 text-navy"
      : state === "available"
        ? "bg-blue/10 text-blue"
        : "bg-muted text-muted-foreground";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${className}`}
    >
      {state === "earned" ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : state === "locked" ? (
        <LockKeyhole className="h-3 w-3" />
      ) : null}
      {label}
    </span>
  );
}

function getResourcePointState(
  index: number,
  state: {
    watch80Earned: boolean;
    completionEarned: boolean;
    postQuestionsEarned: boolean;
    accuracyEarned: boolean;
  },
): PointState {
  if (index === 0) return state.watch80Earned ? "earned" : "available";
  if (index === 1) return state.completionEarned ? "earned" : "locked";
  if (index === 2) return state.postQuestionsEarned ? "earned" : "locked";
  if (index === 3) return state.accuracyEarned ? "earned" : "locked";
  return "available";
}

function hasWrongOpenAttempt(list: number[] | undefined, correctAnswer: number) {
  if (!list || list.length === 0) return false;
  return list[list.length - 1] !== correctAnswer;
}

function getMarkerTimeLabel(durationEn: string, markerPercent: number, lang: "en" | "ar") {
  const minuteMatch = durationEn.match(/\d+/);
  const durationMinutes = minuteMatch ? Number(minuteMatch[0]) : 8;
  const totalSeconds = durationMinutes * 60;
  const markerSeconds = Math.max(0, Math.round(totalSeconds * (markerPercent / 100)));
  const minutes = Math.floor(markerSeconds / 60);
  const seconds = String(markerSeconds % 60).padStart(2, "0");
  const label = `${minutes}:${seconds}`;
  return lang === "ar" ? toArabicDigits(label) : label;
}

function toArabicDigits(value: string) {
  const digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return value.replace(/\d/g, (digit) => digits[Number(digit)]);
}

function ResultCard({
  perfect,
  correct,
  total,
  lang,
  onRetry,
  next,
  watch80Earned,
  firstTryAccuracy,
}: {
  perfect: boolean;
  correct: number;
  total: number;
  lang: "en" | "ar";
  onRetry: () => void;
  next: LessonVideo | undefined;
  watch80Earned: boolean;
  firstTryAccuracy: number;
}) {
  const pct = correct / total;
  const stars = Math.round(pct * 5);
  return (
    <div className="mt-5 rounded-3xl bg-hero text-primary-foreground p-6 shadow-glow text-center relative overflow-hidden">
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
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white/10 px-3 py-2">
            <p className="text-[10px] opacity-70">
              {lang === "ar" ? "دقة أول محاولة" : "First-try accuracy"}
            </p>
            <p className="mt-0.5 text-sm font-bold">
              {lang === "ar"
                ? `${toArabicDigits(String(firstTryAccuracy))}%`
                : `${firstTryAccuracy}%`}
            </p>
          </div>
          <div className="rounded-xl bg-white/10 px-3 py-2">
            <p className="text-[10px] opacity-70">{lang === "ar" ? "مشاهدة ٨٠٪" : "Watch 80%"}</p>
            <p className="mt-0.5 text-sm font-bold">
              {watch80Earned ? (lang === "ar" ? "تم" : "Earned") : lang === "ar" ? "متاح" : "Open"}
            </p>
          </div>
        </div>
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
