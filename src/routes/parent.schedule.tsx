import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  BellRing,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleX,
  Clock3,
  MessageCircleMore,
  Radio,
  UserRoundCheck,
} from "lucide-react";
import { ParentCard, ParentSectionHeader, ParentShell } from "@/components/parent-shell";
import { useLanguage } from "@/lib/language";
import { localize, parentSessions } from "@/lib/parent-data";

type ScheduleFilter = "upcoming" | "history";

export const Route = createFileRoute("/parent/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule & Attendance — Mutken Parent" },
      {
        name: "description",
        content: "Upcoming live sessions, reminders, and attendance history.",
      },
    ],
  }),
  component: ParentScheduleScreen,
});

function ParentScheduleScreen() {
  const { lang, dir } = useLanguage();
  const [filter, setFilter] = useState<ScheduleFilter>("upcoming");
  const [selectedId, setSelectedId] = useState(1);
  const [reminders, setReminders] = useState<number[]>([1]);

  const sessions = parentSessions.filter((session) =>
    filter === "upcoming" ? session.status === "upcoming" : session.status !== "upcoming",
  );
  const selected = parentSessions.find((session) => session.id === selectedId) ?? sessions[0];

  const toggleReminder = (id: number) => {
    setReminders((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <ParentShell
      title={lang === "ar" ? "المواعيد والحضور" : "Schedule & attendance"}
      subtitle={
        lang === "ar"
          ? "تابع اللقاءات المباشرة ومشاركة عمر"
          : "Track live sessions and Omar's participation"
      }
    >
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <ScheduleStat
            icon={CalendarDays}
            label={lang === "ar" ? "لقاءات قادمة" : "Upcoming sessions"}
            value={lang === "ar" ? "٢" : "2"}
            note={lang === "ar" ? "خلال هذا الأسبوع" : "This week"}
          />
          <ScheduleStat
            icon={UserRoundCheck}
            label={lang === "ar" ? "نسبة الحضور" : "Attendance rate"}
            value="92%"
            note={lang === "ar" ? "١١ من ١٢ لقاء" : "11 of 12 sessions"}
          />
          <ScheduleStat
            icon={Radio}
            label={lang === "ar" ? "المشاركة المباشرة" : "Live participation"}
            value={lang === "ar" ? "٢٧ إجابة" : "27 answers"}
            note={lang === "ar" ? "+٥ هذا الشهر" : "+5 this month"}
          />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
                {(["upcoming", "history"] as ScheduleFilter[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFilter(item);
                      const first = parentSessions.find((session) =>
                        item === "upcoming"
                          ? session.status === "upcoming"
                          : session.status !== "upcoming",
                      );
                      if (first) setSelectedId(first.id);
                    }}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold ${
                      filter === item ? "bg-navy text-white" : "text-muted-foreground"
                    }`}
                  >
                    {item === "upcoming"
                      ? lang === "ar"
                        ? "القادمة"
                        : "Upcoming"
                      : lang === "ar"
                        ? "سجل الحضور"
                        : "Attendance history"}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-bold text-navy shadow-sm">
                <button type="button" aria-label="Previous week">
                  <ChevronLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </button>
                <span>{lang === "ar" ? "٢٧ يوليو – ٢ أغسطس" : "27 Jul – 2 Aug"}</span>
                <button type="button" aria-label="Next week">
                  <ChevronRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {sessions.map((session) => {
                const active = selected?.id === session.id;
                const reminderOn = reminders.includes(session.id);
                return (
                  <ParentCard
                    key={session.id}
                    className={`overflow-hidden transition-all ${active ? "border-blue ring-2 ring-blue/10" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(session.id)}
                      className="w-full p-4 text-start sm:p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex w-16 shrink-0 flex-col items-center rounded-2xl py-2.5 ${
                            session.status === "missed" ? "bg-red-50" : "bg-blue/10"
                          }`}
                        >
                          <span className="text-[10px] font-bold text-muted-foreground">
                            {localize(session.day, lang)}
                          </span>
                          <span className="mt-1 text-sm font-extrabold text-navy">
                            {localize(session.date, lang).split(" ")[0]}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold text-navy">
                              {localize(session.subject, lang)}
                            </span>
                            <SessionStatus status={session.status} lang={lang} />
                          </div>
                          <h3 className="mt-2 text-sm font-bold text-navy sm:text-base">
                            {localize(session.title, lang)}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Clock3 className="h-3.5 w-3.5" />
                              {localize(session.time, lang)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MessageCircleMore className="h-3.5 w-3.5" />
                              {localize(session.teacher, lang)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>

                    {session.status === "upcoming" && (
                      <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/25 px-4 py-3 sm:px-5">
                        <p className="text-[10px] leading-snug text-muted-foreground">
                          {reminderOn
                            ? lang === "ar"
                              ? "سنذكّرك قبل اللقاء بـ٣٠ دقيقة"
                              : "We'll remind you 30 minutes before"
                            : lang === "ar"
                              ? "فعّل تذكيراً لهذا اللقاء"
                              : "Turn on a reminder for this session"}
                        </p>
                        <button
                          type="button"
                          onClick={() => toggleReminder(session.id)}
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-bold ${
                            reminderOn ? "bg-mint/20 text-navy" : "bg-card text-muted-foreground"
                          }`}
                        >
                          {reminderOn ? (
                            <BellRing className="h-3.5 w-3.5" />
                          ) : (
                            <Bell className="h-3.5 w-3.5" />
                          )}
                          {reminderOn
                            ? lang === "ar"
                              ? "مفعّل"
                              : "On"
                            : lang === "ar"
                              ? "تفعيل"
                              : "Remind me"}
                        </button>
                      </div>
                    )}
                  </ParentCard>
                );
              })}
            </div>
          </div>

          {selected && (
            <div className="xl:sticky xl:top-24 xl:self-start">
              <ParentSectionHeader title={lang === "ar" ? "تفاصيل اللقاء" : "Session details"} />
              <ParentCard className="overflow-hidden">
                <div className="bg-hero p-5 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-mint">
                      {localize(selected.subject, lang)}
                    </span>
                    <SessionStatus status={selected.status} lang={lang} dark />
                  </div>
                  <h2 className="mt-4 text-lg font-bold">{localize(selected.title, lang)}</h2>
                  <p className="mt-1 text-xs text-white/65">
                    {localize(selected.day, lang)}، {localize(selected.date, lang)} ·{" "}
                    {localize(selected.time, lang)}
                  </p>
                </div>
                <div className="space-y-4 p-5">
                  <DetailRow
                    label={lang === "ar" ? "المعلم" : "Teacher"}
                    value={localize(selected.teacher, lang)}
                  />
                  <DetailRow
                    label={lang === "ar" ? "مدة اللقاء" : "Session length"}
                    value={lang === "ar" ? "٤٥ دقيقة" : "45 minutes"}
                  />
                  {selected.status === "upcoming" ? (
                    <>
                      <div className="rounded-2xl bg-blue/5 p-3.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue">
                          {lang === "ar" ? "الاستعداد المقترح" : "Suggested preparation"}
                        </p>
                        <p className="mt-1 text-xs font-semibold leading-relaxed text-navy">
                          {lang === "ar"
                            ? "مراجعة أمثلة ضرب الكسور لمدة ١٠ دقائق قبل اللقاء."
                            : "Review multiplying-fractions examples for 10 minutes before the session."}
                        </p>
                      </div>
                      <p className="text-[10px] leading-relaxed text-muted-foreground">
                        {lang === "ar"
                          ? "يظهر زر الانضمام للطالب فقط في تطبيقه. لا يمكن لولي الأمر الانضمام بهوية الطالب."
                          : "The join button only appears in the student's app. Parents cannot join using the student's identity."}
                      </p>
                    </>
                  ) : selected.status === "attended" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-2xl bg-success/10 p-3 text-center">
                        <p className="text-[10px] text-muted-foreground">
                          {lang === "ar" ? "مدة الحضور" : "Attendance"}
                        </p>
                        <p className="mt-1 text-lg font-extrabold text-navy">
                          {"attendance" in selected ? selected.attendance : 0}%
                        </p>
                      </div>
                      <div className="rounded-2xl bg-blue/10 p-3 text-center">
                        <p className="text-[10px] text-muted-foreground">
                          {lang === "ar" ? "مشاركات" : "Answers"}
                        </p>
                        <p className="mt-1 text-lg font-extrabold text-navy">
                          {"participation" in selected ? selected.participation : 0}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-red-50 p-3.5">
                      <p className="text-xs font-bold text-red-700">
                        {lang === "ar"
                          ? "لم يحضر عمر هذا اللقاء."
                          : "Omar did not attend this session."}
                      </p>
                      <p className="mt-1 text-[10px] leading-relaxed text-red-600/80">
                        {lang === "ar"
                          ? "تمت إضافة مراجعة مختصرة إلى خطته الدراسية لتعويض المحتوى."
                          : "A short recap was added to his Study Plan to cover the missed content."}
                      </p>
                    </div>
                  )}
                </div>
              </ParentCard>
            </div>
          )}
        </div>

        <section>
          <ParentSectionHeader
            title={lang === "ar" ? "ملخص الحضور الشهري" : "Monthly attendance summary"}
          />
          <ParentCard className="p-5">
            <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[conic-gradient(var(--success)_0_92%,var(--muted)_92%_100%)]">
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-card">
                  <p className="font-display text-xl font-extrabold text-navy">92%</p>
                  <p className="text-[9px] text-muted-foreground">
                    {lang === "ar" ? "حضور" : "Attendance"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <AttendanceItem
                  value={lang === "ar" ? "١١" : "11"}
                  label={lang === "ar" ? "حضر" : "Attended"}
                  good
                />
                <AttendanceItem
                  value={lang === "ar" ? "١" : "1"}
                  label={lang === "ar" ? "غياب" : "Missed"}
                />
                <AttendanceItem
                  value={lang === "ar" ? "٨" : "8"}
                  label={lang === "ar" ? "في الموعد" : "On time"}
                  good
                />
              </div>
            </div>
          </ParentCard>
        </section>
      </div>
    </ParentShell>
  );
}

function ScheduleStat({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <ParentCard className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue/10 text-blue">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-lg font-extrabold text-navy">{value}</p>
          <p className="text-[9px] text-muted-foreground">{note}</p>
        </div>
      </div>
    </ParentCard>
  );
}

function SessionStatus({
  status,
  lang,
  dark = false,
}: {
  status: string;
  lang: "ar" | "en";
  dark?: boolean;
}) {
  const config =
    status === "upcoming"
      ? {
          label: lang === "ar" ? "قادم" : "Upcoming",
          icon: Clock3,
          cls: dark ? "bg-white/10 text-mint" : "bg-blue/10 text-blue",
        }
      : status === "attended"
        ? {
            label: lang === "ar" ? "حضر" : "Attended",
            icon: CheckCircle2,
            cls: dark ? "bg-white/10 text-mint" : "bg-success/10 text-success",
          }
        : {
            label: lang === "ar" ? "غياب" : "Missed",
            icon: CircleX,
            cls: dark ? "bg-white/10 text-white" : "bg-red-50 text-red-600",
          };
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold ${config.cls}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-bold text-navy">{value}</span>
    </div>
  );
}

function AttendanceItem({
  value,
  label,
  good = false,
}: {
  value: string;
  label: string;
  good?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-3 text-center ${good ? "bg-success/10" : "bg-red-50"}`}>
      <p className="font-display text-xl font-extrabold text-navy">{value}</p>
      <p className="mt-0.5 text-[9px] font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}
