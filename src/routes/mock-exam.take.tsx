import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flag,
  HelpCircle,
} from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/mock-exam/take")({
  head: () => ({
    meta: [
      { title: "Take Self Test - Mutken" },
      { name: "description", content: "Answer a personalized Mutken self test." },
    ],
  }),
  component: TakeMockExamScreen,
});

const answers = ["٤/١٢", "٤/٨", "٧/٨", "١/٢"];

function TakeMockExamScreen() {
  const { dir, lang } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <MobileShell hideNav>
      <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-border">
        <div className="px-4 pt-12 pb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/mock-exam"
              className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0"
            >
              <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
            </Link>
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                {lang === "ar" ? "اختبار ذاتي" : "Self test"}
              </p>
              <h1 className="text-base font-extrabold text-navy truncate">
                {lang === "ar" ? "جاهزية الكسور" : "Fractions readiness"}
              </h1>
            </div>
          </div>
          <div className="rounded-full bg-navy px-3 py-1.5 text-xs font-bold text-primary-foreground flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-mint" />
            42:18
          </div>
        </div>
      </header>

      <main className="px-5 py-4 space-y-4">
        <section className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "سؤال ١ من ٢٥" : "Question 1 of 25"}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-navy">
                {lang === "ar" ? "هدف الإتقان: جمع الكسور" : "Mastery goal: Adding fractions"}
              </p>
            </div>
            <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-bold text-navy">
              {lang === "ar" ? "متوسط" : "Medium"}
            </span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[4%] rounded-full bg-mint-gradient" />
          </div>
        </section>

        <section className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="mb-4 flex items-start gap-3">
            <div className="h-9 w-9 rounded-2xl bg-warn/20 text-navy flex items-center justify-center shrink-0">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "اختر إجابة واحدة" : "Choose one answer"}
              </p>
              <h2 className="mt-1 text-xl font-extrabold leading-tight text-navy">
                {lang === "ar" ? "ما ناتج ٣/٤ + ١/٨؟" : "What is 3/4 + 1/8?"}
              </h2>
            </div>
          </div>

          <div className="space-y-2.5">
            {answers.map((answer, index) => {
              const active = selected === index;
              return (
                <button
                  key={answer}
                  onClick={() => setSelected(index)}
                  className={`w-full rounded-2xl border px-4 py-3 text-start flex items-center justify-between gap-3 transition ${
                    active
                      ? "border-blue bg-blue/5 shadow-soft"
                      : "border-border bg-background hover:bg-muted/40"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        active
                          ? "bg-blue text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {["A", "B", "C", "D"][index]}
                    </span>
                    <span className="text-base font-bold text-navy">{answer}</span>
                  </span>
                  {active && <CheckCircle2 className="h-5 w-5 text-blue" />}
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "التنقل بين الأسئلة" : "Question navigation"}
              </p>
              <p className="text-xs text-muted-foreground">
                {lang === "ar"
                  ? "يمكنك الرجوع قبل إنهاء الاختبار"
                  : "You can return before finishing"}
              </p>
            </div>
            <Flag className="h-4 w-4 text-warn" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <button
                key={item}
                className={`h-10 rounded-2xl text-sm font-bold ${
                  item === 1 ? "bg-navy text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 inset-x-0 max-w-[440px] mx-auto p-4 pb-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="grid grid-cols-[1fr_1.5fr] gap-2">
          <button className="rounded-2xl bg-card border border-border py-3 text-sm font-bold text-muted-foreground flex items-center justify-center gap-1">
            <ChevronRight className={`h-4 w-4 ${dir === "rtl" ? "" : "rotate-180"}`} />
            {lang === "ar" ? "السابق" : "Previous"}
          </button>
          <button className="rounded-2xl bg-hero text-primary-foreground py-3 text-sm font-bold shadow-glow flex items-center justify-center gap-1">
            {lang === "ar" ? "السؤال التالي" : "Next question"}
            <ChevronLeft className={`h-4 w-4 ${dir === "rtl" ? "" : "rotate-180"}`} />
          </button>
        </div>
      </div>
    </MobileShell>
  );
}
