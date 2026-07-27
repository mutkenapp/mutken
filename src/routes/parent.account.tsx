import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  CreditCard,
  FileText,
  Fingerprint,
  Globe2,
  KeyRound,
  Link2,
  Mail,
  MessageCircleMore,
  Phone,
  ReceiptText,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import { ParentCard, ParentSectionHeader, ParentShell } from "@/components/parent-shell";
import { useLanguage } from "@/lib/language";
import { localize, parentStudent } from "@/lib/parent-data";
import studentPhoto from "@/assets/student_omar.png.asset.json";

export const Route = createFileRoute("/parent/account")({
  head: () => ({
    meta: [
      { title: "Account & Subscription — Mutken Parent" },
      {
        name: "description",
        content: "Manage your parent profile, subscription, payments, and consent.",
      },
    ],
  }),
  component: ParentAccountScreen,
});

function ParentAccountScreen() {
  const { lang, dir } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [preferences, setPreferences] = useState({
    weekly: true,
    teacher: true,
    schedule: true,
    inactivity: true,
    whatsapp: true,
    email: false,
  });

  const toggle = (key: keyof typeof preferences) =>
    setPreferences((current) => ({ ...current, [key]: !current[key] }));

  const copyStudentId = async () => {
    try {
      await navigator.clipboard.writeText(parentStudent.id);
    } catch {
      // Clipboard access can be unavailable in preview environments.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const savePreferences = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <ParentShell
      title={lang === "ar" ? "الحساب والاشتراك" : "Account & subscription"}
      subtitle={
        lang === "ar"
          ? "إدارة الوصول والدفع والإشعارات"
          : "Manage access, billing, and notifications"
      }
    >
      <div className="space-y-6">
        <ParentCard className="overflow-hidden">
          <div className="bg-hero p-5 text-white sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg font-extrabold text-mint">
                  م
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">
                      {lang === "ar" ? "محمد الناصر" : "Mohammed Al-Nasser"}
                    </h2>
                    <BadgeCheck className="h-4 w-4 text-mint" />
                  </div>
                  <p className="mt-0.5 text-xs text-white/60">
                    {lang === "ar" ? "ولي أمر موثّق · أب" : "Verified guardian · Father"}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-[10px] font-extrabold text-navy">
                <ShieldCheck className="h-3.5 w-3.5" />
                {lang === "ar" ? "وصول آمن" : "Secure access"}
              </span>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <ContactItem
                icon={Phone}
                label={lang === "ar" ? "الهاتف الموثّق" : "Verified phone"}
                value="+20 111 222 3333"
              />
              <ContactItem
                icon={Mail}
                label={lang === "ar" ? "البريد الإلكتروني" : "Email"}
                value="parent@mutken.com"
              />
            </div>
          </div>
          <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
            <AccountAction
              icon={UserRound}
              label={lang === "ar" ? "تعديل الملف" : "Edit profile"}
              dir={dir}
            />
            <AccountAction
              icon={KeyRound}
              label={lang === "ar" ? "الأمان والدخول" : "Security & login"}
              dir={dir}
            />
            <AccountAction
              icon={Globe2}
              label={lang === "ar" ? "اللغة والمنطقة" : "Language & region"}
              dir={dir}
            />
          </div>
        </ParentCard>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(330px,0.8fr)]">
          <div className="space-y-6">
            <section>
              <ParentSectionHeader title={lang === "ar" ? "الاشتراك" : "Subscription"} />
              <ParentCard className="overflow-hidden">
                <div className="relative p-5 sm:p-6">
                  <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue/10 text-blue">
                        <WalletCards className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-navy">
                            {lang === "ar" ? "باقة ٣ مواد" : "3-subject package"}
                          </h3>
                          <span className="rounded-full bg-success/10 px-2.5 py-1 text-[9px] font-bold text-success">
                            {lang === "ar" ? "نشط" : "Active"}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {lang === "ar"
                            ? "وصول غير محدود للمواد المشمولة"
                            : "Unlimited access in included subjects"}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-display text-xl font-extrabold text-navy">
                        {lang === "ar" ? "١٬١٥٠ ج.م" : "1,150 EGP"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {lang === "ar" ? "شهرياً" : "per month"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <InfoBox
                      icon={CalendarDays}
                      label={lang === "ar" ? "التجديد القادم" : "Next renewal"}
                      value={lang === "ar" ? "٧ أغسطس ٢٠٢٦" : "7 August 2026"}
                    />
                    <InfoBox
                      icon={CreditCard}
                      label={lang === "ar" ? "طريقة الدفع" : "Payment method"}
                      value="Visa ···· 4821"
                    />
                  </div>

                  <div className="mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {lang === "ar" ? "المواد المشمولة" : "Included subjects"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        lang === "ar" ? "الرياضيات" : "Mathematics",
                        lang === "ar" ? "العلوم" : "Science",
                        lang === "ar" ? "اللغة الإنجليزية" : "English",
                      ].map((subject) => (
                        <span
                          key={subject}
                          className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-2 text-[10px] font-bold text-navy"
                        >
                          <Check className="h-3 w-3 text-success" />
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-border bg-muted/25 p-4 sm:px-6">
                  <button
                    type="button"
                    className="rounded-full bg-navy px-4 py-2.5 text-[11px] font-bold text-white"
                  >
                    {lang === "ar" ? "إدارة الباقة" : "Manage package"}
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-border bg-card px-4 py-2.5 text-[11px] font-bold text-navy"
                  >
                    {lang === "ar" ? "تغيير المواد" : "Change subjects"}
                  </button>
                  <p className="text-[9px] leading-snug text-muted-foreground sm:ms-auto sm:max-w-48 sm:text-end">
                    {lang === "ar"
                      ? "يمكن تغيير المواد مرة واحدة كل دورة فوترة"
                      : "Subjects can be changed once per billing cycle"}
                  </p>
                </div>
              </ParentCard>
            </section>

            <section>
              <ParentSectionHeader
                title={lang === "ar" ? "الفواتير والمدفوعات" : "Billing & payments"}
                action={
                  <button type="button" className="text-[11px] font-bold text-blue">
                    {lang === "ar" ? "كل الفواتير" : "All receipts"}
                  </button>
                }
              />
              <ParentCard className="divide-y divide-border overflow-hidden">
                <PaymentRow
                  date={lang === "ar" ? "٧ يوليو ٢٠٢٦" : "7 July 2026"}
                  reference="PAY-2607-8841"
                  amount={lang === "ar" ? "١٬١٥٠ ج.م" : "1,150 EGP"}
                  status={lang === "ar" ? "مدفوع" : "Paid"}
                  lang={lang}
                />
                <PaymentRow
                  date={lang === "ar" ? "٧ يونيو ٢٠٢٦" : "7 June 2026"}
                  reference="PAY-2606-7329"
                  amount={lang === "ar" ? "١٬١٥٠ ج.م" : "1,150 EGP"}
                  status={lang === "ar" ? "مدفوع" : "Paid"}
                  lang={lang}
                />
              </ParentCard>
            </section>

            <section>
              <ParentSectionHeader
                title={lang === "ar" ? "تفضيلات الإشعارات" : "Notification preferences"}
              />
              <ParentCard className="overflow-hidden">
                <div className="divide-y divide-border">
                  <PreferenceRow
                    label={lang === "ar" ? "التقرير الأسبوعي" : "Weekly learning report"}
                    note={
                      lang === "ar"
                        ? "ملخص الإتقان والنشاط كل أسبوع"
                        : "Mastery and activity summary every week"
                    }
                    checked={preferences.weekly}
                    onChange={() => toggle("weekly")}
                  />
                  <PreferenceRow
                    label={lang === "ar" ? "تحديثات المعلم" : "Teacher updates"}
                    note={
                      lang === "ar"
                        ? "الملاحظات والتوصيات الجديدة"
                        : "New notes and recommendations"
                    }
                    checked={preferences.teacher}
                    onChange={() => toggle("teacher")}
                  />
                  <PreferenceRow
                    label={lang === "ar" ? "تذكيرات اللقاءات" : "Session reminders"}
                    note={
                      lang === "ar"
                        ? "قبل اللقاء المباشر بـ٣٠ دقيقة"
                        : "30 minutes before live sessions"
                    }
                    checked={preferences.schedule}
                    onChange={() => toggle("schedule")}
                  />
                  <PreferenceRow
                    label={lang === "ar" ? "تنبيه عدم النشاط" : "Inactivity alert"}
                    note={
                      lang === "ar"
                        ? "إذا لم يدرس عمر لمدة ٣ أيام"
                        : "When Omar has not studied for 3 days"
                    }
                    checked={preferences.inactivity}
                    onChange={() => toggle("inactivity")}
                  />
                </div>
                <div className="border-t border-border bg-muted/25 p-4 sm:px-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {lang === "ar" ? "قنوات التواصل" : "Delivery channels"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <ChannelButton
                      icon={MessageCircleMore}
                      label="WhatsApp"
                      active={preferences.whatsapp}
                      onClick={() => toggle("whatsapp")}
                    />
                    <ChannelButton
                      icon={Mail}
                      label={lang === "ar" ? "البريد" : "Email"}
                      active={preferences.email}
                      onClick={() => toggle("email")}
                    />
                    <ChannelButton
                      icon={Bell}
                      label={lang === "ar" ? "داخل التطبيق" : "In app"}
                      active
                      onClick={() => {}}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={savePreferences}
                    className="mt-4 inline-flex min-w-32 items-center justify-center gap-2 rounded-full bg-navy px-4 py-2.5 text-[11px] font-bold text-white"
                  >
                    {saved && <Check className="h-3.5 w-3.5 text-mint" />}
                    {saved
                      ? lang === "ar"
                        ? "تم الحفظ"
                        : "Saved"
                      : lang === "ar"
                        ? "حفظ التفضيلات"
                        : "Save preferences"}
                  </button>
                </div>
              </ParentCard>
            </section>
          </div>

          <div className="space-y-6">
            <section>
              <ParentSectionHeader title={lang === "ar" ? "الطالب المرتبط" : "Linked student"} />
              <ParentCard className="p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={studentPhoto.url}
                    alt={localize(parentStudent.name, lang)}
                    className="h-14 w-14 rounded-2xl border border-border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-extrabold text-navy">
                        {localize(parentStudent.name, lang)}
                      </p>
                      <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-success" />
                    </div>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {localize(parentStudent.grade, lang)} ·{" "}
                      {lang === "ar" ? "صلة: ابن" : "Relationship: Son"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-muted/55 p-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    {lang === "ar" ? "رقم الطالب" : "Student ID"}
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="font-display text-sm font-extrabold text-navy">
                      {parentStudent.id}
                    </p>
                    <button
                      type="button"
                      onClick={copyStudentId}
                      className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1.5 text-[9px] font-bold text-blue shadow-sm"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied
                        ? lang === "ar"
                          ? "تم النسخ"
                          : "Copied"
                        : lang === "ar"
                          ? "نسخ"
                          : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-success/10 p-3 text-[10px] font-bold text-success">
                  <Fingerprint className="h-4 w-4" />
                  {lang === "ar" ? "تم التحقق من موافقة ولي الأمر" : "Guardian consent verified"}
                </div>
                <button
                  type="button"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-[11px] font-bold text-navy"
                >
                  <Link2 className="h-4 w-4" />
                  {lang === "ar" ? "ربط طالب آخر" : "Link another student"}
                </button>
                <p className="mt-2 text-center text-[9px] leading-relaxed text-muted-foreground">
                  {lang === "ar"
                    ? "كل طالب يحتفظ باشتراك مستقل؛ لا توجد باقة عائلية حالياً."
                    : "Each student keeps a separate subscription; there is no family package currently."}
                </p>
              </ParentCard>
            </section>

            <section>
              <ParentSectionHeader
                title={lang === "ar" ? "الخصوصية والموافقة" : "Privacy & consent"}
              />
              <ParentCard className="divide-y divide-border overflow-hidden">
                <SettingsLink
                  icon={ShieldCheck}
                  title={lang === "ar" ? "صلاحيات ولي الأمر" : "Parent access permissions"}
                  subtitle={lang === "ar" ? "عرض فقط لبيانات التعلم" : "Read-only learning access"}
                  dir={dir}
                />
                <SettingsLink
                  icon={FileText}
                  title={lang === "ar" ? "سجل الموافقات" : "Consent history"}
                  subtitle={lang === "ar" ? "آخر تحديث: ٧ يوليو ٢٠٢٦" : "Last updated: 7 July 2026"}
                  dir={dir}
                />
                <SettingsLink
                  icon={Fingerprint}
                  title={lang === "ar" ? "الأجهزة وتسجيل الدخول" : "Devices & login activity"}
                  subtitle={lang === "ar" ? "جهاز واحد موثّق" : "1 verified device"}
                  dir={dir}
                />
              </ParentCard>
            </section>

            <section>
              <ParentSectionHeader title={lang === "ar" ? "الدعم" : "Support"} />
              <ParentCard className="divide-y divide-border overflow-hidden">
                <SettingsLink
                  icon={CircleHelp}
                  title={lang === "ar" ? "مركز المساعدة" : "Help center"}
                  subtitle={
                    lang === "ar"
                      ? "إجابات عن الحساب والتعلم"
                      : "Answers about accounts and learning"
                  }
                  dir={dir}
                />
                <SettingsLink
                  icon={MessageCircleMore}
                  title={lang === "ar" ? "تواصل مع الدعم" : "Contact support"}
                  subtitle={
                    lang === "ar" ? "عادةً نرد خلال ساعتين" : "We usually reply within 2 hours"
                  }
                  dir={dir}
                />
              </ParentCard>
            </section>

            <a
              href="https://app.mutken.com"
              className="flex items-center justify-between rounded-3xl border border-border bg-card p-4 text-sm font-bold text-navy shadow-soft"
            >
              <span>{lang === "ar" ? "فتح تطبيق الطالب" : "Open student app"}</span>
              <ChevronRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
            </a>
          </div>
        </div>
      </div>
    </ParentShell>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
      <Icon className="h-4 w-4 shrink-0 text-mint" />
      <div className="min-w-0">
        <p className="text-[9px] text-white/45">{label}</p>
        <p className="truncate text-xs font-bold text-white/90" dir="ltr">
          {value}
        </p>
      </div>
    </div>
  );
}

function AccountAction({
  icon: Icon,
  label,
  dir,
}: {
  icon: typeof UserRound;
  label: string;
  dir: "rtl" | "ltr";
}) {
  return (
    <button type="button" className="flex items-center gap-3 p-4 text-start hover:bg-muted/35">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-muted text-navy">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-xs font-bold text-navy">{label}</span>
      <ChevronRight
        className={`ms-auto h-4 w-4 text-muted-foreground ${dir === "rtl" ? "rotate-180" : ""}`}
      />
    </button>
  );
}

function InfoBox({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-muted/55 p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-blue shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[9px] text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-xs font-bold text-navy">{value}</p>
      </div>
    </div>
  );
}

function PaymentRow({
  date,
  reference,
  amount,
  status,
  lang,
}: {
  date: string;
  reference: string;
  amount: string;
  status: string;
  lang: "ar" | "en";
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 sm:px-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-success/10 text-success">
        <ReceiptText className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-navy">{date}</p>
        <p className="mt-0.5 text-[9px] text-muted-foreground">{reference}</p>
      </div>
      <div className="text-end">
        <p className="text-xs font-extrabold text-navy">{amount}</p>
        <p className="mt-0.5 inline-flex items-center gap-1 text-[9px] font-bold text-success">
          <Check className="h-3 w-3" />
          {status}
        </p>
      </div>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
        aria-label={lang === "ar" ? "تنزيل الفاتورة" : "Download receipt"}
      >
        <FileText className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function PreferenceRow({
  label,
  note,
  checked,
  onChange,
}: {
  label: string;
  note: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 sm:px-5">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-navy">{label}</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">{note}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-label={label}
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-navy" : "bg-muted"}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${checked ? "start-6" : "start-1"}`}
        />
      </button>
    </div>
  );
}

function ChannelButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Bell;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[10px] font-bold ${active ? "border-blue bg-blue/5 text-blue" : "border-border bg-card text-muted-foreground"}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
      {active && <Check className="h-3 w-3" />}
    </button>
  );
}

function SettingsLink({
  icon: Icon,
  title,
  subtitle,
  dir,
}: {
  icon: typeof ShieldCheck;
  title: string;
  subtitle: string;
  dir: "rtl" | "ltr";
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 p-4 text-start hover:bg-muted/35"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue/10 text-blue">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-navy">{title}</p>
        <p className="mt-0.5 truncate text-[9px] text-muted-foreground">{subtitle}</p>
      </div>
      <ChevronRight
        className={`h-4 w-4 shrink-0 text-muted-foreground ${dir === "rtl" ? "rotate-180" : ""}`}
      />
    </button>
  );
}
