import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useLanguage } from "@/lib/language";
import studentPhoto from "@/assets/student_omar.png.asset.json";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Check,
  Copy,
  CreditCard,
  GraduationCap,
  IdCard,
  Mail,
  Phone,
  ReceiptText,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile - Mutken" },
      { name: "description", content: "Manage student identity, subscription, verification, and learning profile." },
    ],
  }),
  component: ProfileScreen,
});

const studentId = "MTK-2026-001245";
const renewalDate = "07 Aug 2026";
const paymentRef = "PAY-2607-8841";
const defaultNames = {
  ar: "عمر الناصر",
  en: "Omar Al-Nasser",
} as const;

function ProfileScreen() {
  const { lang, setLang, dir, t } = useLanguage();
  const [name, setName] = useState(defaultNames[lang]);
  const [email, setEmail] = useState("omar@mutken.com");
  const [phone, setPhone] = useState("+20 100 000 0000");
  const [parentPhone, setParentPhone] = useState("+20 111 222 3333");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName((current) => (
      current === defaultNames.ar || current === defaultNames.en ? defaultNames[lang] : current
    ));
  }, [lang]);

  const label = {
    title: lang === "ar" ? "الملف الشخصي" : "My Profile",
    grade: lang === "ar" ? "الصف السادس" : "Grade 6",
    system: lang === "ar" ? "التعليم العام المصري" : "Egyptian public education",
    subscribed: lang === "ar" ? "مشترك نشط" : "Active subscription",
    studentId: lang === "ar" ? "رقم الطالب" : "Student ID",
    copy: lang === "ar" ? "نسخ" : "Copy",
    copied: lang === "ar" ? "تم النسخ" : "Copied",
    subscription: lang === "ar" ? "الاشتراك" : "Subscription",
    plan: lang === "ar" ? "باقة ٣ مواد" : "3-subject package",
    price: lang === "ar" ? "١١٥٠ جنيه / شهر" : "1,150 EGP / month",
    entitlement: lang === "ar" ? "وصول غير محدود داخل المواد المشتركة" : "Unlimited access in subscribed subjects",
    nextRenewal: lang === "ar" ? "التجديد القادم" : "Next renewal",
    subjects: lang === "ar" ? "المواد المشمولة" : "Included subjects",
    math: lang === "ar" ? "رياضيات" : "Math",
    science: lang === "ar" ? "علوم" : "Science",
    english: lang === "ar" ? "إنجليزي" : "English",
    verification: lang === "ar" ? "التحقق والدخول" : "Verification & access",
    phoneVerified: lang === "ar" ? "الهاتف موثق" : "Phone verified",
    whatsappOtp: lang === "ar" ? "OTP عبر واتساب/SMS" : "OTP by WhatsApp/SMS",
    emailLogin: lang === "ar" ? "البريد مفعل" : "Email active",
    socialLogin: lang === "ar" ? "Google/Facebook جاهز" : "Google/Facebook ready",
    basic: lang === "ar" ? "البيانات الأساسية" : "Basic information",
    fullName: lang === "ar" ? "الاسم الكامل" : "Full name",
    email: lang === "ar" ? "البريد الإلكتروني" : "Email",
    phone: lang === "ar" ? "رقم الهاتف" : "Phone",
    parentPhone: lang === "ar" ? "هاتف ولي الأمر" : "Parent phone",
    educationSystem: lang === "ar" ? "النظام التعليمي" : "Education system",
    country: lang === "ar" ? "الدولة" : "Country",
    language: lang === "ar" ? "اللغة" : "Language",
    support: lang === "ar" ? "الدفع والدعم" : "Payment & support",
    paymentRef: lang === "ar" ? "مرجع آخر دفعة" : "Last payment ref",
    supportNote:
      lang === "ar"
        ? "استخدم رقم الطالب عند الدفع أو التواصل مع الدعم."
        : "Use the Student ID for payment and support requests.",
    save: lang === "ar" ? "حفظ التغييرات" : "Save Changes",
    saved: lang === "ar" ? "تم الحفظ" : "Saved",
  };

  const copyStudentId = async () => {
    try {
      await navigator.clipboard.writeText(studentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <MobileShell>
      <header className="px-5 pt-14 pb-4 flex items-center gap-3">
        <Link
          to="/"
          className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
        </Link>
        <div className="min-w-0">
          <h1 className="text-lg font-bold">{label.title}</h1>
          <p className="text-xs text-muted-foreground">{label.subscribed}</p>
        </div>
      </header>

      <div className="px-5 space-y-4">
        <section className="relative overflow-hidden rounded-lg bg-hero text-primary-foreground p-4 shadow-glow">
          <div className="absolute inset-x-0 top-0 h-1 bg-mint-gradient" />
          <div className="relative flex items-start gap-3">
            <img
              src={studentPhoto.url}
              alt={name}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-mint/70 shadow-glow"
            />
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold truncate">{name}</p>
              <p className="text-xs leading-snug text-primary-foreground/75">{label.grade} · {label.system}</p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-mint px-2 py-1 text-[10px] font-bold text-navy whitespace-nowrap">
                <BadgeCheck className="h-3 w-3" />
                {label.subscribed}
              </span>
            </div>
          </div>

          <div className="relative mt-3 rounded-lg bg-white/10 border border-white/15 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/60">{label.studentId}</p>
                <p className="mt-0.5 font-display text-base font-bold tracking-normal whitespace-nowrap">{studentId}</p>
              </div>
              <button
                type="button"
                onClick={copyStudentId}
                className="h-8 rounded-full bg-white/15 px-3 text-[11px] font-semibold inline-flex items-center gap-1 active:scale-95"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? label.copied : label.copy}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-card border border-border p-4 shadow-soft">
          <SectionHeader icon={CreditCard} title={label.subscription} />
          <div className="mt-3 grid grid-cols-[1fr_auto] items-start gap-3">
            <div className="min-w-0">
              <p className="text-base font-bold text-navy">{label.plan}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{label.price}</p>
              <p className="mt-1 inline-flex rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">
                {label.entitlement}
              </p>
            </div>
            <StatusPill text={label.subscribed} />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <InfoTile icon={CalendarDays} label={label.nextRenewal} value={renewalDate} />
            <InfoTile icon={ReceiptText} label={label.paymentRef} value={paymentRef} />
          </div>

          <div className="mt-3">
            <p className="text-[11px] font-medium text-muted-foreground mb-2">{label.subjects}</p>
            <div className="flex flex-wrap gap-2">
              {[label.math, label.science, label.english].map((subject) => (
                <span
                  key={subject}
                  className="inline-flex items-center gap-1 rounded-full border border-mint/30 bg-mint/15 px-3 py-1.5 text-xs font-semibold text-navy"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-card border border-border p-4 shadow-soft">
          <SectionHeader icon={ShieldCheck} title={label.verification} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <InfoTile icon={Phone} label={label.phoneVerified} value={label.whatsappOtp} success />
            <InfoTile icon={Mail} label={label.emailLogin} value={email} success />
          </div>
          <div className="mt-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-navy">{label.socialLogin}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground truncate">Google · Facebook</p>
              </div>
              <Check className="h-4 w-4 text-success flex-shrink-0" />
            </div>
          </div>
        </section>

        <form onSubmit={onSave} className="rounded-lg bg-card border border-border p-4 shadow-soft space-y-3">
          <SectionHeader icon={UserRound} title={label.basic} />
          <Field label={label.fullName} value={name} onChange={setName} />
          <Field label={label.email} value={email} onChange={setEmail} type="email" />
          <Field label={label.phone} value={phone} onChange={setPhone} type="tel" />
          <Field label={label.parentPhone} value={parentPhone} onChange={setParentPhone} type="tel" />

          <div className="grid grid-cols-2 gap-2">
            <ReadonlyField label={label.grade} value={label.grade} />
            <ReadonlyField label={label.educationSystem} value={label.system} />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
              {label.language}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["ar", "en"] as const).map((nextLang) => (
                <button
                  key={nextLang}
                  type="button"
                  onClick={() => setLang(nextLang)}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                    lang === nextLang ? "border-blue bg-blue/5 text-navy" : "border-border bg-card text-foreground"
                  }`}
                >
                  <span className="font-medium">{t(`lang.${nextLang}`)}</span>
                  {lang === nextLang && <Check className="h-4 w-4 text-blue" />}
                </button>
              ))}
            </div>
          </div>

          <ReadonlyField label={label.country} value={lang === "ar" ? "مصر" : "Egypt"} prefix="EG" />

          <button
            type="submit"
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-hero text-primary-foreground text-sm font-semibold py-3 shadow-glow"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                {label.saved}
              </>
            ) : (
              label.save
            )}
          </button>
        </form>

        <section className="rounded-lg bg-card border border-border p-4 shadow-soft">
          <SectionHeader icon={IdCard} title={label.support} />
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{label.supportNote}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <InfoTile icon={IdCard} label={label.studentId} value={studentId} />
            <InfoTile icon={GraduationCap} label={label.grade} value={label.grade} />
          </div>
        </section>
      </div>
    </MobileShell>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: typeof UserRound; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-mint/20 text-navy flex items-center justify-center">
        <Icon className="h-4 w-4" />
      </div>
      <h2 className="text-sm font-bold">{title}</h2>
    </div>
  );
}

function StatusPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-bold text-navy whitespace-nowrap">
      <Check className="h-3 w-3 text-success" />
      {text}
    </span>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
  success = false,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 min-w-0">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
        <p className="text-[10px] font-medium truncate">{label}</p>
      </div>
      <div className="mt-1 flex items-center gap-1.5 min-w-0">
        {success && <Check className="h-3.5 w-3.5 text-success flex-shrink-0" />}
        <p className="text-xs font-bold text-navy truncate">{value}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
      />
    </div>
  );
}

function ReadonlyField({ label, value, prefix }: { label: string; value: string; prefix?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-muted-foreground mb-1">{label}</label>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 min-h-[42px]">
        {prefix && <span className="text-xs font-bold text-muted-foreground">{prefix}</span>}
        <span className="text-sm font-medium truncate">{value}</span>
      </div>
    </div>
  );
}
