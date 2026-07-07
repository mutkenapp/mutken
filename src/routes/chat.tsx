import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useT, useLanguage } from "@/lib/language";
import { ArrowLeft, Send, Paperclip, ChevronRight, Coins, Sparkles } from "lucide-react";
import { assistantPointRules } from "@/lib/points";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Assistant Teacher — Mutken" },
      { name: "description", content: "Chat with your assistant teacher for guidance and support." },
    ],
  }),
  component: ChatScreen,
});

function ChatScreen() {
  const t = useT();
  const { dir, lang } = useLanguage();
  const quick = [t("chat.q1"), t("chat.q2"), t("chat.q3"), t("chat.q4")];

  return (
    <MobileShell>
      <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-border">
        <div className="px-4 pt-12 pb-3 flex items-center gap-3">
          <Link to="/" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </Link>
          <div className="relative">
            <div className="h-11 w-11 rounded-full bg-mint-gradient flex items-center justify-center text-navy font-bold">
              S
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{t("today.msSara")}</p>
            <p className="text-[11px] text-muted-foreground">{t("chat.online")}</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-3">
        <TeacherBubble time="9:12">
          {t("chat.msg1")}
          <Link
            to="/"
            className="mt-3 flex items-center justify-between rounded-xl bg-navy text-primary-foreground px-3 py-2.5"
          >
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-70">{t("chat.studyPlan")}</p>
              <p className="text-sm font-semibold">{t("chat.mathFractions")}</p>
            </div>
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </TeacherBubble>

        <TeacherBubble time="9:14">{t("chat.msg2")}</TeacherBubble>

        <StudentBubble time="10:02">{t("chat.studentMsg")}</StudentBubble>

        <TeacherBubble time="10:05">
          {t("chat.msg3")}
          <div className="mt-3 rounded-xl overflow-hidden border border-border">
            <div className="h-32 bg-hero flex items-center justify-center relative">
              <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-white text-lg">▶</span>
              </div>
              <span className="absolute bottom-2 right-2 text-[10px] bg-black/40 text-white px-1.5 py-0.5 rounded">
                0:30
              </span>
            </div>
            <div className="p-2.5 bg-card">
              <p className="text-xs font-semibold">{t("chat.clipTitle")}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-mint/20 px-3 py-2">
            <span className="text-xs font-semibold text-navy">
              {lang === "ar" ? "أكمل المقطع لتحصل على مكافأة" : "Complete the clip to earn a reward"}
            </span>
            <span className="text-xs font-bold text-navy">+10</span>
          </div>
        </TeacherBubble>

        <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {lang === "ar" ? "مكافآت المعلم المساعد" : "Assistant rewards"}
              </p>
              <p className="text-sm font-semibold">
                {lang === "ar" ? "النقاط تأتي من التعلم بعد المساعدة" : "Points come from learning after help"}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-mint/20 text-navy flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-2">
            {assistantPointRules.map((rule) => (
              <div key={rule.label.en} className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">{rule.label[lang]}</p>
                <span className="rounded-full bg-mint/20 px-2 py-1 text-xs font-bold text-navy">
                  {rule.points}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2">
            <Coins className="h-4 w-4 text-navy shrink-0" />
            <p className="text-xs text-muted-foreground">
              {lang === "ar"
                ? "مكافآت الجهد من المعلم تكون بين ١٠ و٣٠ نقطة ولا تتكرر على نفس النشاط."
                : "Teacher effort rewards range from 10 to 30 points and do not repeat on the same activity."}
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 pt-2">
          {quick.map((q) => (
            <button
              key={q}
              className="whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium shadow-soft"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-20 inset-x-0 max-w-[440px] mx-auto bg-card border-t border-border p-3 pb-3">
        <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
          <Paperclip className="h-4 w-4 text-muted-foreground" />
          <input placeholder={t("chat.inputPlaceholder")} className="flex-1 bg-transparent outline-none text-sm" />
          <button className="h-9 w-9 rounded-full bg-hero text-primary-foreground flex items-center justify-center">
            <Send className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </MobileShell>
  );
}

function TeacherBubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="flex gap-2 max-w-[85%]">
      <div className="h-7 w-7 rounded-full bg-mint-gradient flex-shrink-0 flex items-center justify-center text-navy font-bold text-[10px]">
        S
      </div>
      <div>
        <div className="rounded-2xl rounded-tl-sm bg-card border border-border p-3 shadow-soft text-sm">{children}</div>
        <p className="text-[10px] text-muted-foreground mt-1 ml-1">{time}</p>
      </div>
    </div>
  );
}

function StudentBubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%]">
        <div className="rounded-2xl rounded-tr-sm bg-hero text-primary-foreground p-3 text-sm shadow-glow">{children}</div>
        <p className="text-[10px] text-muted-foreground mt-1 text-right mr-1">{time}</p>
      </div>
    </div>
  );
}
