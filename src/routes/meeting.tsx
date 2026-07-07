import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/mobile-shell";
import { useT, useLanguage } from "@/lib/language";
import { ArrowLeft, Calendar, Clock, Video, Bell, MessageSquare, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/meeting")({
  head: () => ({
    meta: [
      { title: "Meeting Details — Mutken" },
      { name: "description", content: "Your upcoming meeting with the assistant teacher." },
    ],
  }),
  component: MeetingScreen,
});

function MeetingScreen() {
  const t = useT();
  const { dir } = useLanguage();
  const agenda = [t("meeting.a1"), t("meeting.a2"), t("meeting.a3"), t("meeting.a4")];
  const checklist = [
    { text: t("meeting.c1"), done: true },
    { text: t("meeting.c2"), done: false },
    { text: t("meeting.c3"), done: false },
    { text: t("meeting.c4"), done: false },
  ];

  return (
    <MobileShell hideNav>
      <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-border">
        <div className="px-4 pt-12 pb-3 flex items-center gap-3">
          <Link to="/" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </Link>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{t("meeting.header")}</p>
            <p className="font-semibold text-sm">{t("meeting.subheader")}</p>
          </div>
        </div>
      </header>

      <div className="px-5 py-4 space-y-4">
        <div className="rounded-3xl bg-hero text-primary-foreground p-5 shadow-glow relative overflow-hidden">
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-mint/20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium">
              <Video className="h-3 w-3 text-mint" />
              {t("meeting.online")}
            </div>
            <h1 className="mt-3 text-xl font-bold">{t("meeting.title")}</h1>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Info icon={<Calendar className="h-4 w-4 text-mint" />} label={t("meeting.date")} />
              <Info icon={<Clock className="h-4 w-4 text-mint" />} label={t("meeting.time")} />
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur p-3">
              <div className="h-10 w-10 rounded-full bg-mint-gradient flex items-center justify-center text-navy font-bold">
                S
              </div>
              <div>
                <p className="text-sm font-semibold">{t("today.msSara")}</p>
                <p className="text-[11px] opacity-70">{t("today.assistantTeacher")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            {t("meeting.agenda")}
          </p>
          <ul className="space-y-3 text-sm">
            {agenda.map((a, i) => (
              <li key={a} className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full bg-accent text-navy text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-card border border-border p-4 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            {t("meeting.before")}
          </p>
          <ul className="space-y-2.5">
            {checklist.map((c) => (
              <li key={c.text} className="flex items-center gap-3 text-sm">
                {c.done ? (
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-border flex-shrink-0" />
                )}
                <span className={c.done ? "line-through text-muted-foreground" : ""}>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-2xl bg-card border border-border p-4 shadow-soft flex flex-col items-center gap-2 text-sm font-medium">
            <Bell className="h-5 w-5 text-blue" />
            {t("meeting.reminder")}
          </button>
          <Link to="/chat" className="rounded-2xl bg-card border border-border p-4 shadow-soft flex flex-col items-center gap-2 text-sm font-medium">
            <MessageSquare className="h-5 w-5 text-blue" />
            {t("meeting.message")}
          </Link>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 max-w-[440px] mx-auto p-4 pb-6 bg-gradient-to-t from-background via-background to-transparent">
        <Link to="/live" className="w-full rounded-2xl bg-hero text-primary-foreground py-3.5 font-semibold shadow-glow flex items-center justify-center gap-2">
          <Video className="h-4 w-4" /> {t("meeting.join")}
        </Link>
      </div>
    </MobileShell>
  );
}

function Info({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur px-3 py-2.5 flex items-center gap-2">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
