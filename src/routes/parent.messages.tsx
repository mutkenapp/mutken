import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BellRing,
  BookOpenCheck,
  CheckCheck,
  ChevronRight,
  CreditCard,
  LockKeyhole,
  MessageCircleMore,
  Search,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { ParentCard, ParentShell } from "@/components/parent-shell";
import { useLanguage } from "@/lib/language";
import { localize, parentMessages } from "@/lib/parent-data";

type MessageFilter = "all" | "teacher" | "learning" | "account";

export const Route = createFileRoute("/parent/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Mutken Parent" },
      { name: "description", content: "Teacher updates, learning alerts, and account notices." },
    ],
  }),
  component: ParentMessagesScreen,
});

function ParentMessagesScreen() {
  const { lang, dir } = useLanguage();
  const [filter, setFilter] = useState<MessageFilter>("all");
  const [selectedId, setSelectedId] = useState(1);
  const [readIds, setReadIds] = useState<number[]>([3]);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  const visibleMessages = useMemo(
    () => parentMessages.filter((message) => filter === "all" || message.type === filter),
    [filter],
  );
  const selected =
    parentMessages.find((message) => message.id === selectedId) ?? visibleMessages[0];

  const openMessage = (id: number) => {
    setSelectedId(id);
    setReadIds((current) => (current.includes(id) ? current : [...current, id]));
    setSent(false);
    setReply("");
  };

  const filters: Array<{ id: MessageFilter; ar: string; en: string }> = [
    { id: "all", ar: "الكل", en: "All" },
    { id: "teacher", ar: "المعلم", en: "Teacher" },
    { id: "learning", ar: "التعلم", en: "Learning" },
    { id: "account", ar: "الحساب", en: "Account" },
  ];

  return (
    <ParentShell
      title={lang === "ar" ? "الرسائل والإشعارات" : "Messages & notifications"}
      subtitle={lang === "ar" ? "تحديثات مهمة بدون إزعاج" : "Important updates without the noise"}
    >
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <InboxStat
            icon={MessageCircleMore}
            value={lang === "ar" ? "١" : "1"}
            label={lang === "ar" ? "تحديث من المعلم" : "Teacher update"}
            tone="bg-blue/10 text-blue"
          />
          <InboxStat
            icon={BookOpenCheck}
            value={lang === "ar" ? "١" : "1"}
            label={lang === "ar" ? "تقرير تعلم جديد" : "New learning report"}
            tone="bg-mint/20 text-navy"
          />
          <InboxStat
            icon={BellRing}
            value={lang === "ar" ? "٠" : "0"}
            label={lang === "ar" ? "تنبيهات عاجلة" : "Urgent alerts"}
            tone="bg-success/10 text-success"
          />
        </div>

        <div className="grid min-h-[600px] gap-4 xl:grid-cols-[minmax(320px,0.72fr)_minmax(0,1.28fr)]">
          <ParentCard className="overflow-hidden">
            <div className="border-b border-border p-4">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder={lang === "ar" ? "بحث في الرسائل" : "Search messages"}
                  className="h-10 w-full rounded-full border border-border bg-muted/45 pe-4 ps-9 text-xs outline-none focus:border-blue"
                />
              </div>
              <div className="mt-3 flex gap-1 overflow-x-auto no-scrollbar">
                {filters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFilter(item.id);
                      const first = parentMessages.find(
                        (message) => item.id === "all" || message.type === item.id,
                      );
                      if (first) openMessage(first.id);
                    }}
                    className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-bold ${
                      filter === item.id ? "bg-navy text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {lang === "ar" ? item.ar : item.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-border">
              {visibleMessages.map((message) => {
                const active = selected?.id === message.id;
                const unread = !readIds.includes(message.id);
                return (
                  <button
                    key={message.id}
                    type="button"
                    onClick={() => openMessage(message.id)}
                    className={`w-full p-4 text-start transition-colors ${active ? "bg-blue/5" : "hover:bg-muted/35"}`}
                  >
                    <div className="flex items-start gap-3">
                      <MessageIcon type={message.type} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`truncate text-xs ${unread ? "font-extrabold text-navy" : "font-semibold text-muted-foreground"}`}
                          >
                            {localize(message.sender, lang)}
                          </p>
                          <span className="shrink-0 text-[9px] text-muted-foreground">
                            {localize(message.time, lang)}
                          </span>
                        </div>
                        <p
                          className={`mt-1 truncate text-sm ${unread ? "font-bold text-navy" : "font-semibold text-foreground"}`}
                        >
                          {localize(message.title, lang)}
                        </p>
                        <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
                          {localize(message.body, lang)}
                        </p>
                      </div>
                      {unread && (
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </ParentCard>

          {selected && (
            <ParentCard className="flex min-h-[520px] flex-col overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-border p-4 sm:p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <MessageIcon type={selected.type} large />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-navy">
                      {localize(selected.sender, lang)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {localize(selected.time, lang)}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success">
                  <CheckCheck className="h-3.5 w-3.5" />
                  {lang === "ar" ? "تمت القراءة" : "Read"}
                </span>
              </div>

              <div className="flex-1 p-5 sm:p-7">
                <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground">
                  {selected.type === "teacher"
                    ? lang === "ar"
                      ? "تحديث من المعلم"
                      : "Teacher update"
                    : selected.type === "learning"
                      ? lang === "ar"
                        ? "تقرير تعلم"
                        : "Learning report"
                      : lang === "ar"
                        ? "الحساب والاشتراك"
                        : "Account & subscription"}
                </span>
                <h2 className="mt-4 text-xl font-bold text-navy">
                  {localize(selected.title, lang)}
                </h2>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">
                  {localize(selected.body, lang)}
                </p>

                {selected.type === "teacher" && (
                  <div className="mt-6 rounded-3xl bg-blue/5 p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue">
                      {lang === "ar" ? "المطلوب منك" : "Your suggested action"}
                    </p>
                    <p className="mt-1.5 text-sm font-bold leading-relaxed text-navy">
                      {lang === "ar"
                        ? "شجّع عمر على إكمال مراجعة الرياضيات القصيرة قبل لقاء الأربعاء."
                        : "Encourage Omar to complete his short math review before Wednesday's session."}
                    </p>
                  </div>
                )}

                {selected.type === "learning" && (
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <ReportMini value="+6%" label={lang === "ar" ? "إتقان" : "Mastery"} />
                    <ReportMini
                      value={lang === "ar" ? "٥ أيام" : "5 days"}
                      label={lang === "ar" ? "نشاط" : "Active"}
                    />
                    <ReportMini value="82%" label={lang === "ar" ? "دقة" : "Accuracy"} />
                  </div>
                )}

                {selected.type === "account" && (
                  <div className="mt-6 rounded-3xl border border-border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-navy">
                          {lang === "ar" ? "باقة ٣ مواد" : "3-subject package"}
                        </p>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {lang === "ar" ? "التجديد: ٧ أغسطس ٢٠٢٦" : "Renews: 7 August 2026"}
                        </p>
                      </div>
                      <p className="text-sm font-extrabold text-navy">
                        {lang === "ar" ? "١٬١٥٠ ج.م" : "1,150 EGP"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border bg-muted/20 p-4 sm:p-5">
                {selected.type === "teacher" ? (
                  sent ? (
                    <div className="flex items-center gap-2 rounded-2xl bg-success/10 px-4 py-3 text-xs font-bold text-success">
                      <CheckCheck className="h-4 w-4" />
                      {lang === "ar"
                        ? "تم إرسال ردك إلى المعلم"
                        : "Your reply was sent to the teacher"}
                    </div>
                  ) : (
                    <div className="flex items-end gap-2">
                      <textarea
                        value={reply}
                        onChange={(event) => setReply(event.target.value)}
                        rows={2}
                        placeholder={
                          lang === "ar"
                            ? "اكتب رداً مختصراً للمعلم..."
                            : "Write a short reply to the teacher..."
                        }
                        className="min-h-12 flex-1 resize-none rounded-2xl border border-border bg-card px-3 py-2.5 text-xs outline-none focus:border-blue"
                      />
                      <button
                        type="button"
                        disabled={!reply.trim()}
                        onClick={() => setSent(true)}
                        aria-label={lang === "ar" ? "إرسال الرد" : "Send reply"}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy text-mint disabled:opacity-40"
                      >
                        <Send className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  )
                ) : (
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-2xl bg-navy px-4 py-3 text-xs font-bold text-white"
                  >
                    <span>
                      {selected.type === "learning"
                        ? lang === "ar"
                          ? "فتح التقرير الكامل"
                          : "Open full report"
                        : lang === "ar"
                          ? "إدارة الاشتراك"
                          : "Manage subscription"}
                    </span>
                    <ChevronRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
            </ParentCard>
          )}
        </div>

        <div className="flex items-start gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-mint/20 text-navy">
            <LockKeyhole className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-bold text-navy">
              {lang === "ar" ? "خصوصية تواصل الطالب" : "Student communication privacy"}
            </p>
            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted-foreground">
              {lang === "ar"
                ? "تظهر لك تحديثات المعلمين والتنبيهات المهمة فقط. محادثة عمر التعليمية الخاصة لا تُعرض هنا إلا عند وجود تصعيد متعلق بالسلامة أو الدعم وفق السياسة."
                : "You receive teacher summaries and important alerts only. Omar's private learning chat is not shown unless a safety or support escalation requires it under policy."}
            </p>
          </div>
          <ShieldCheck className="ms-auto h-5 w-5 shrink-0 text-success" />
        </div>
      </div>
    </ParentShell>
  );
}

function InboxStat({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: typeof BellRing;
  value: string;
  label: string;
  tone: string;
}) {
  return (
    <ParentCard className="flex items-center gap-3 p-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tone}`}>
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div>
        <p className="text-lg font-extrabold text-navy">{value}</p>
        <p className="text-[10px] font-semibold text-muted-foreground">{label}</p>
      </div>
    </ParentCard>
  );
}

function MessageIcon({ type, large = false }: { type: string; large?: boolean }) {
  const config =
    type === "teacher"
      ? { icon: UserRound, cls: "bg-blue/10 text-blue" }
      : type === "learning"
        ? { icon: BookOpenCheck, cls: "bg-mint/20 text-navy" }
        : { icon: CreditCard, cls: "bg-warn/15 text-amber-700" };
  const Icon = config.icon;
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl ${large ? "h-11 w-11" : "h-9 w-9"} ${config.cls}`}
    >
      <Icon className={large ? "h-5 w-5" : "h-4 w-4"} />
    </div>
  );
}

function ReportMini({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-muted/55 p-3 text-center">
      <p className="text-sm font-extrabold text-navy">{value}</p>
      <p className="mt-0.5 text-[9px] text-muted-foreground">{label}</p>
    </div>
  );
}
