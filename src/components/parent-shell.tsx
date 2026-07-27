import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Bell,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  CircleUserRound,
  House,
  LogOut,
  MessageCircleMore,
  ShieldCheck,
} from "lucide-react";
import { LanguageToggle, useLanguage } from "@/lib/language";
import { localize, parentStudent } from "@/lib/parent-data";
import mutkenLogo from "@/assets/logo.png.asset.json";
import studentPhoto from "@/assets/student_omar.png.asset.json";

const navItems = [
  {
    to: "/parent",
    icon: House,
    label: { ar: "الرئيسية", en: "Home" },
  },
  {
    to: "/parent/progress",
    icon: ChartNoAxesCombined,
    label: { ar: "التقدم", en: "Progress" },
  },
  {
    to: "/parent/schedule",
    icon: CalendarDays,
    label: { ar: "المواعيد", en: "Schedule" },
  },
  {
    to: "/parent/messages",
    icon: MessageCircleMore,
    label: { ar: "الرسائل", en: "Messages" },
  },
  {
    to: "/parent/account",
    icon: CircleUserRound,
    label: { ar: "الحساب", en: "Account" },
  },
] as const;

export function ParentShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { lang } = useLanguage();

  const activeFor = (to: string) =>
    to === "/parent" ? pathname === "/parent" : pathname.startsWith(to);

  return (
    <div className={`min-h-screen bg-surface ${lang === "ar" ? "font-arabic" : ""}`}>
      <div className="mx-auto min-h-screen w-full max-w-[1440px] lg:grid lg:grid-cols-[252px_minmax(0,1fr)]">
        <aside className="hidden min-h-screen flex-col bg-navy px-4 py-6 text-white lg:flex">
          <Link to="/parent" className="flex items-center gap-3 px-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg">
              <img src={mutkenLogo.url} alt="Mutken" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <p className="font-display text-lg font-bold">{lang === "ar" ? "متقن" : "Mutken"}</p>
              <p className="text-[11px] font-semibold text-mint">
                {lang === "ar" ? "بوابة ولي الأمر" : "Parent portal"}
              </p>
            </div>
          </Link>

          <nav className="mt-10 space-y-1.5">
            {navItems.map(({ to, icon: Icon, label }) => {
              const active = activeFor(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-white text-navy shadow-lg"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      active ? "bg-mint/25 text-navy" : "bg-white/10"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  {localize(label, lang)}
                  {to === "/parent/messages" && (
                    <span className="ms-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-mint px-1.5 text-[10px] font-extrabold text-navy">
                      2
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint/15 text-mint">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold">
                  {lang === "ar" ? "وصول ولي أمر موثّق" : "Verified parent access"}
                </p>
                <p className="mt-0.5 text-[10px] text-white/50">
                  {lang === "ar" ? "عرض آمن للبيانات" : "Secure, read-only learning view"}
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://app.mutken.com"
            className="mt-3 flex items-center gap-2 rounded-2xl px-3 py-2.5 text-xs font-semibold text-white/55 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            {lang === "ar" ? "العودة لتطبيق الطالب" : "Open student app"}
          </a>
        </aside>

        <div className="min-w-0 bg-background/70">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Link to="/parent" className="shrink-0 lg:hidden">
                  <img src={mutkenLogo.url} alt="Mutken" className="h-9 w-auto" />
                </Link>
                <div className="hidden min-w-0 sm:block">
                  <h1 className="truncate text-lg font-bold text-navy lg:text-xl">{title}</h1>
                  {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  className="flex h-10 items-center gap-2 rounded-full border border-border bg-card pe-3 ps-1.5 shadow-sm"
                  aria-label={lang === "ar" ? "اختيار الطالب" : "Choose student"}
                >
                  <img
                    src={studentPhoto.url}
                    alt={localize(parentStudent.name, lang)}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="hidden max-w-32 truncate text-xs font-bold text-navy sm:block">
                    {localize(parentStudent.name, lang)}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <Link
                  to="/parent/messages"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-sm"
                  aria-label={lang === "ar" ? "الإشعارات" : "Notifications"}
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-blue" />
                </Link>
                <LanguageToggle />
              </div>
            </div>
          </header>

          <main className="px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10 lg:pt-7">
            <div className="mb-5 sm:hidden">
              <h1 className="text-xl font-bold text-navy">{title}</h1>
              {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-12px_30px_-20px_rgba(11,16,38,0.45)] backdrop-blur-xl lg:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = activeFor(to);
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold ${
                    active ? "text-navy" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`relative flex h-8 w-11 items-center justify-center rounded-full transition-colors ${
                      active ? "bg-navy text-mint" : "text-muted-foreground"
                    }`}
                  >
                    {active && (
                      <Check className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-mint p-0.5 text-navy" />
                    )}
                    <Icon className="h-4.5 w-4.5" />
                    {to === "/parent/messages" && !active && (
                      <span className="absolute right-1.5 top-0.5 h-2 w-2 rounded-full bg-blue" />
                    )}
                  </span>
                  {localize(label, lang)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function ParentSectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3 px-0.5">
      <div>
        <h2 className="text-base font-bold text-navy">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ParentCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-border bg-card shadow-soft ${className}`}>
      {children}
    </section>
  );
}
