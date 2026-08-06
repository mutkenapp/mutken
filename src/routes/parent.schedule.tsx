import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type Dispatch, type SetStateAction } from "react";
import {
  Bell,
  BellRing,
  BookOpenCheck,
  CalendarPlus,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleX,
  Clock3,
  ExternalLink,
  MessageCircleMore,
  Radio,
  RefreshCw,
  Target,
  Trash2,
  TrendingUp,
  UserRoundCheck,
  Video,
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
  const [calendarIds, setCalendarIds] = useState<number[]>([]);
  const [rescheduleIds, setRescheduleIds] = useState<number[]>([]);
  const [cancelIds, setCancelIds] = useState<number[]>([]);

  const sessions = parentSessions.filter((session) =>
    filter === "upcoming" ? session.status === "upcoming" : session.status !== "upcoming",
  );
  const selected = parentSessions.find((session) => session.id === selectedId) ?? sessions[0];
  const selectedDetails = selected ? getSessionDetails(selected.id, lang) : undefined;

  const toggleReminder = (id: number) => {
    setReminders((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleAction = (id: number, setter: Dispatch<SetStateAction<number[]>>) => {
    setter((current) =>
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
                const details = getSessionDetails(session.id, lang);
                return (
                  <ParentCard
                    key={session.id}
                    className={`overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                      active ? "border-blue ring-2 ring-blue/10" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(session.id)}
                      className="w-full p-4 text-start sm:p-5"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-2.5 ${
                            session.status === "missed"
                              ? "border-red-100 bg-red-50"
                              : session.status === "attended"
                                ? "border-success/20 bg-success/10"
                                : "border-blue/10 bg-blue/10"
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
                            <span className="rounded-full bg-blue/5 px-2.5 py-1 text-[10px] font-bold text-blue">
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
                              {localize(session.time, lang)} · {details.duration}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MessageCircleMore className="h-3.5 w-3.5" />
                              {localize(session.teacher, lang)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Video className="h-3.5 w-3.5" />
                              {details.mode}
                            </span>
                          </div>
                        </div>
                      </div>

                      {session.status === "upcoming" ? (
                        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-blue/10 bg-blue/5 p-3.5">
                          <Target className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-wider text-blue">
                              {lang === "ar" ? "هدف اللقاء" : "Session objective"}
                            </p>
                            <p className="mt-1 text-[11px] font-semibold leading-6 text-navy">
                              {details.objective}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`mt-4 rounded-2xl border p-3.5 ${
                            session.status === "attended"
                              ? "border-success/15 bg-success/5"
                              : "border-warn/20 bg-warn/10"
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-[11px] font-bold text-navy">{details.outcome}</p>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-extrabold ${
                                session.status === "attended"
                                  ? "bg-success/10 text-success"
                                  : "bg-warn/20 text-amber-700"
                              }`}
                            >
                              {session.status === "attended" && <TrendingUp className="h-3 w-3" />}
                              {details.result}
                            </span>
                          </div>
                          <div className="mt-2 flex items-start gap-1.5 text-[10px] leading-5 text-muted-foreground">
                            <BookOpenCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" />
                            <span>
                              <strong className="text-navy">
                                {lang === "ar" ? "الخطوة التالية: " : "Next step: "}
                              </strong>
                              {details.nextTask}
                            </span>
                          </div>
                        </div>
                      )}
                    </button>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/20 px-4 py-3 sm:px-5">
                      {session.status === "upcoming" ? (
                        <>
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
                              reminderOn
                                ? "bg-mint/20 text-navy"
                                : "border border-border bg-card text-muted-foreground"
                            }`}
                          >
                            {reminderOn ? (
                              <BellRing className="h-3.5 w-3.5" />
                            ) : (
                              <Bell className="h-3.5 w-3.5" />
                            )}
                            {reminderOn
                              ? lang === "ar"
                                ? "التذكير مفعّل"
                                : "Reminder on"
                              : lang === "ar"
                                ? "ذكّرني"
                                : "Remind me"}
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] text-muted-foreground">
                            {localize(session.date, lang)} · {localize(session.teacher, lang)}
                          </p>
                          <button
                            type="button"
                            onClick={() => setSelectedId(session.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-blue/20 bg-card px-3 py-2 text-[10px] font-bold text-blue"
                          >
                            {session.status === "attended"
                              ? lang === "ar"
                                ? "ملخص اللقاء"
                                : "Session summary"
                              : lang === "ar"
                                ? "عرض الإجراء"
                                : "View action"}
                            <ChevronRight
                              className={`h-3 w-3 ${dir === "rtl" ? "rotate-180" : ""}`}
                            />
                          </button>
                        </>
                      )}
                    </div>
                  </ParentCard>
                );
              })}
            </div>
          </div>

          {selected && selectedDetails && (
            <div className="xl:sticky xl:top-24 xl:self-start">
              <ParentSectionHeader
                title={
                  selected.status === "upcoming"
                    ? lang === "ar"
                      ? "اللقاء المباشر القادم"
                      : "Next live session"
                    : lang === "ar"
                      ? "نتيجة اللقاء"
                      : "Session outcome"
                }
              />
              <ParentCard className="overflow-hidden border-blue/10 shadow-lg">
                <div className="border-b border-border bg-[linear-gradient(135deg,hsl(var(--blue)/0.10),hsl(var(--mint)/0.12))] p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-card px-2.5 py-1 text-[10px] font-bold text-blue shadow-sm">
                      {localize(selected.subject, lang)}
                    </span>
                    <SessionStatus status={selected.status} lang={lang} />
                  </div>
                  <h2 className="mt-4 text-lg font-extrabold text-navy">
                    {localize(selected.title, lang)}
                  </h2>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {localize(selected.day, lang)}، {localize(selected.date, lang)} ·{" "}
                    {localize(selected.time, lang)} · {selectedDetails.duration}
                  </p>
                </div>

                <div className="space-y-4 p-5">
                  <div className="grid grid-cols-2 gap-2">
                    <SessionInfo
                      icon={MessageCircleMore}
                      label={lang === "ar" ? "المعلم" : "Teacher"}
                      value={localize(selected.teacher, lang)}
                    />
                    <SessionInfo
                      icon={Radio}
                      label={lang === "ar" ? "نوع اللقاء" : "Session type"}
                      value={selectedDetails.type}
                    />
                  </div>

                  {selected.status === "upcoming" ? (
                    <>
                      <div className="rounded-2xl border border-blue/10 bg-blue/5 p-4">
                        <div className="flex items-start gap-2.5">
                          <Target className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-wider text-blue">
                              {lang === "ar" ? "هدف اللقاء" : "Session objective"}
                            </p>
                            <p className="mt-1 text-xs font-bold leading-6 text-navy">
                              {selectedDetails.objective}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-start gap-2.5 border-t border-blue/10 pt-3">
                          <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-wider text-success">
                              {lang === "ar" ? "استعداد مقترح" : "Suggested preparation"}
                            </p>
                            <p className="mt-1 text-[11px] font-semibold leading-5 text-navy">
                              {selectedDetails.preparation}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="https://app.mutken.com/live"
                          className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-navy px-4 py-3 text-[11px] font-bold text-white shadow-md"
                        >
                          <ExternalLink className="h-4 w-4 text-mint" />
                          {lang === "ar" ? "فتح اللقاء في تطبيق الطالب" : "Open in student app"}
                        </a>
                        <button
                          type="button"
                          onClick={() => toggleAction(selected.id, setRescheduleIds)}
                          className={`inline-flex items-center justify-center gap-1.5 rounded-2xl border px-3 py-2.5 text-[10px] font-bold ${
                            rescheduleIds.includes(selected.id)
                              ? "border-success/20 bg-success/10 text-success"
                              : "border-border bg-card text-navy"
                          }`}
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          {rescheduleIds.includes(selected.id)
                            ? lang === "ar"
                              ? "تم إرسال الطلب"
                              : "Request sent"
                            : lang === "ar"
                              ? "طلب تغيير الموعد"
                              : "Request new time"}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAction(selected.id, setCalendarIds)}
                          className={`inline-flex items-center justify-center gap-1.5 rounded-2xl border px-3 py-2.5 text-[10px] font-bold ${
                            calendarIds.includes(selected.id)
                              ? "border-success/20 bg-success/10 text-success"
                              : "border-border bg-card text-blue"
                          }`}
                        >
                          {calendarIds.includes(selected.id) ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <CalendarPlus className="h-3.5 w-3.5" />
                          )}
                          {calendarIds.includes(selected.id)
                            ? lang === "ar"
                              ? "أضيف للتقويم"
                              : "Added to calendar"
                            : lang === "ar"
                              ? "أضف للتقويم"
                              : "Add to calendar"}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleAction(selected.id, setCancelIds)}
                        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-2xl py-2.5 text-[10px] font-bold ${
                          cancelIds.includes(selected.id)
                            ? "bg-red-50 text-red-700"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {cancelIds.includes(selected.id)
                          ? lang === "ar"
                            ? "تم تسجيل طلب الإلغاء"
                            : "Cancellation request recorded"
                          : lang === "ar"
                            ? "طلب إلغاء اللقاء"
                            : "Request cancellation"}
                      </button>

                      <p className="text-[10px] leading-relaxed text-muted-foreground">
                        {lang === "ar"
                          ? "يفتح زر اللقاء تطبيق الطالب فقط؛ لا يمكن لولي الأمر الانضمام بهوية الطالب. الطلبات هنا تجريبية ضمن النموذج الأولي."
                          : "The session opens only in the student app; parents cannot join as the student. Requests are prototype interactions."}
                      </p>
                    </>
                  ) : selected.status === "attended" ? (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        <OutcomeMetric
                          label={lang === "ar" ? "الحضور" : "Attendance"}
                          value={`${"attendance" in selected ? selected.attendance : 0}%`}
                          tone="bg-success/10"
                        />
                        <OutcomeMetric
                          label={lang === "ar" ? "المشاركة" : "Answers"}
                          value={`${"participation" in selected ? selected.participation : 0}`}
                          tone="bg-blue/10"
                        />
                        <OutcomeMetric
                          label={lang === "ar" ? "النتيجة" : "Result"}
                          value={selectedDetails.result}
                          tone="bg-mint/20"
                        />
                      </div>

                      <div className="rounded-2xl border border-success/15 bg-success/5 p-4">
                        <p className="text-[9px] font-extrabold uppercase tracking-wider text-success">
                          {lang === "ar" ? "ملخص النتيجة" : "Outcome summary"}
                        </p>
                        <p className="mt-1.5 text-xs font-bold leading-6 text-navy">
                          {selectedDetails.outcome}
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5 rounded-2xl bg-blue/5 p-4">
                        <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                        <div>
                          <p className="text-[9px] font-extrabold uppercase tracking-wider text-blue">
                            {lang === "ar" ? "المهمة التالية" : "Next task"}
                          </p>
                          <p className="mt-1 text-[11px] font-semibold leading-5 text-navy">
                            {selectedDetails.nextTask}
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/parent/progress"
                        search={{ subject: selectedDetails.subjectId }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-blue/20 py-3 text-[11px] font-bold text-blue"
                      >
                        <TrendingUp className="h-4 w-4" />
                        {lang === "ar" ? "عرض أثر اللقاء على التقدم" : "View progress impact"}
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                        <div className="flex items-center gap-2 text-red-700">
                          <CircleX className="h-4 w-4" />
                          <p className="text-xs font-bold">
                            {lang === "ar" ? "لم يحضر عمر هذا اللقاء" : "Omar missed this session"}
                          </p>
                        </div>
                        <p className="mt-2 text-[10px] leading-5 text-red-600/80">
                          {selectedDetails.outcome}
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5 rounded-2xl border border-warn/20 bg-warn/10 p-4">
                        <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                        <div>
                          <p className="text-[9px] font-extrabold uppercase tracking-wider text-amber-700">
                            {lang === "ar" ? "إجراء التعويض" : "Make-up action"}
                          </p>
                          <p className="mt-1 text-[11px] font-semibold leading-5 text-navy">
                            {selectedDetails.nextTask}
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/parent/progress"
                        search={{ subject: selectedDetails.subjectId }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-3 text-[11px] font-bold text-white"
                      >
                        <BookOpenCheck className="h-4 w-4 text-mint" />
                        {lang === "ar" ? "عرض خطة التعويض" : "View make-up plan"}
                      </Link>
                    </>
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

type SessionDetails = {
  duration: string;
  mode: string;
  type: string;
  objective: string;
  preparation: string;
  outcome: string;
  result: string;
  nextTask: string;
  subjectId: "math" | "science" | "english";
};

function getSessionDetails(id: number, lang: "ar" | "en"): SessionDetails {
  const details: Record<number, { ar: SessionDetails; en: SessionDetails }> = {
    1: {
      ar: {
        duration: "٤٥ دقيقة",
        mode: "أونلاين",
        type: "متابعة فردية",
        objective: "مراجعة ضرب الكسور، وفهم سبب الأخطاء، وتثبيت طريقة الحل الصحيحة.",
        preparation: "إكمال مراجعة ضرب الكسور القصيرة لمدة ١٠ دقائق قبل اللقاء.",
        outcome: "",
        result: "",
        nextTask: "",
        subjectId: "math",
      },
      en: {
        duration: "45 minutes",
        mode: "Online",
        type: "1:1 follow-up",
        objective:
          "Review multiplying fractions, identify the source of errors, and reinforce the correct method.",
        preparation: "Complete the 10-minute multiplying-fractions review before the session.",
        outcome: "",
        result: "",
        nextTask: "",
        subjectId: "math",
      },
    },
    2: {
      ar: {
        duration: "٤٥ دقيقة",
        mode: "أونلاين",
        type: "تجربة موجهة",
        objective: "ربط مفاهيم القوة والحركة بتجربة عملية وشرح النتائج بالأدلة.",
        preparation: "مشاهدة مقدمة التجربة لمدة ٥ دقائق وتجهيز دفتر الملاحظات.",
        outcome: "",
        result: "",
        nextTask: "",
        subjectId: "science",
      },
      en: {
        duration: "45 minutes",
        mode: "Online",
        type: "Guided lab",
        objective:
          "Connect forces and motion to a practical experiment and explain results with evidence.",
        preparation: "Watch the 5-minute lab introduction and have a notebook ready.",
        outcome: "",
        result: "",
        nextTask: "",
        subjectId: "science",
      },
    },
    3: {
      ar: {
        duration: "٤٥ دقيقة",
        mode: "أونلاين",
        type: "تدريب فردي",
        objective: "زيادة الطلاقة في المحادثة واستخدام جمل أكثر وضوحاً.",
        preparation: "مراجعة مفردات المحادثة قبل اللقاء.",
        outcome: "شارك عمر بثقة أكبر، واستخدم جملاً أوضح، وتحسنت دقة المحادثة بشكل ملحوظ.",
        result: "٧٦٪ ← ٨٤٪",
        nextTask: "تسجيل إجابة صوتية لمدة دقيقتين قبل يوم الجمعة.",
        subjectId: "english",
      },
      en: {
        duration: "45 minutes",
        mode: "Online",
        type: "1:1 practice",
        objective: "Build speaking fluency and use clearer sentence structures.",
        preparation: "Review the conversation vocabulary before the session.",
        outcome:
          "Omar participated with more confidence, used clearer sentences, and improved speaking accuracy.",
        result: "76% → 84%",
        nextTask: "Record a two-minute spoken answer before Friday.",
        subjectId: "english",
      },
    },
    4: {
      ar: {
        duration: "٤٥ دقيقة",
        mode: "أونلاين",
        type: "مراجعة جماعية",
        objective: "تثبيت مفهوم الكسور المتكافئة من خلال مسائل متدرجة.",
        preparation: "لا يوجد.",
        outcome: "أضيف ملخص قصير إلى خطة عمر، وسيُراجع المعلم نتيجته في اللقاء القادم.",
        result: "مطلوب إجراء",
        nextTask: "مشاهدة ملخص مدته ٨ دقائق ثم إكمال اختبار من ٥ أسئلة.",
        subjectId: "math",
      },
      en: {
        duration: "45 minutes",
        mode: "Online",
        type: "Group review",
        objective: "Reinforce equivalent fractions through graduated practice.",
        preparation: "None.",
        outcome:
          "A short recap was added to Omar's plan, and the teacher will review the result in the next session.",
        result: "Action needed",
        nextTask: "Watch the 8-minute recap, then complete a five-question check.",
        subjectId: "math",
      },
    },
  };

  return (details[id] ?? details[1])[lang];
}

function SessionInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-muted/20 p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-card text-blue shadow-sm">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-[11px] font-bold text-navy">{value}</p>
      </div>
    </div>
  );
}

function OutcomeMetric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-2xl p-3 text-center ${tone}`}>
      <p className="text-[9px] font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-sm font-extrabold text-navy">{value}</p>
    </div>
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

function SessionStatus({ status, lang }: { status: string; lang: "ar" | "en" }) {
  const config =
    status === "upcoming"
      ? {
          label: lang === "ar" ? "مؤكد" : "Confirmed",
          icon: Clock3,
          cls: "bg-mint/20 text-navy",
        }
      : status === "attended"
        ? {
            label: lang === "ar" ? "حضر" : "Attended",
            icon: CheckCircle2,
            cls: "bg-success/10 text-success",
          }
        : {
            label: lang === "ar" ? "غياب" : "Missed",
            icon: CircleX,
            cls: "bg-red-50 text-red-600",
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
