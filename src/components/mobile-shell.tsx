import { Link, useRouterState } from "@tanstack/react-router";
import { ListChecks, BarChart3, Library, Radio, Trophy } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/language";
import { useActiveSubject } from "@/lib/active-subject";

const tabs = [
  { to: "/progress", icon: BarChart3, key: "nav.progress" },
  { to: "/library", icon: Library, key: "nav.library" },
  { to: "/", icon: ListChecks, key: "nav.studyPlan" },
  { to: "/live", icon: Radio, key: "nav.live" },
  { to: "/challenges", icon: Trophy, key: "nav.challenges" },
] as const;

export function MobileShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t, dir, lang } = useLanguage();
  const { active } = useActiveSubject();
  const fabEdge = dir === "rtl" ? "left-[max(1rem,calc(50%-220px+1rem))]" : "right-[max(1rem,calc(50%-220px+1rem))]";

  return (
    <div className={`min-h-screen w-full bg-surface flex justify-center ${lang === "ar" ? "font-arabic" : ""}`}>
      {/* Phone frame */}
      <div className="relative w-full max-w-[440px] min-h-screen bg-background shadow-soft flex flex-col">
        <div className="flex-1 pb-24">{children}</div>

        {!hideNav && (
          <>
            {/* Floating Assistant Teacher button */}
            <Link
              to="/chat"
              className={`fixed bottom-24 ${fabEdge} z-40 h-14 w-14 rounded-full bg-card shadow-glow ring-[3px] ring-[#164BA7] transition-transform active:scale-95`}
              aria-label={t("nav.assistant")}
            >
              <div className="relative h-full w-full rounded-full overflow-hidden">
                <img key={active.id} src={active.teacherPhoto} alt={t(active.teacherNameKey)} className="h-full w-full object-cover" />
              </div>
              <span className="absolute -top-1 -left-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-background" />
            </Link>

            {/* Bottom nav */}
            <nav className="fixed bottom-0 w-full max-w-[440px] z-30 border-t border-border bg-card/95 backdrop-blur-xl">
              <ul className="grid grid-cols-5 h-16 px-2 pt-1 pb-3">
                {tabs.map(({ to, icon: Icon, key }, index) => {
                  const isActive = to === "/" ? pathname === "/" : pathname.startsWith(to);
                  const isCenter = index === 2;
                  return (
                    <li key={to} className="flex items-center justify-center">
                      <Link
                        to={to}
                        className="flex flex-col items-center justify-center gap-1 h-full rounded-xl transition-colors"
                      >
                        {isCenter ? (
                          <>
                            <div
                              className={`relative z-40 -mt-3 flex items-center justify-center h-12 w-12 rounded-full shadow-soft transition-all ${
                                isActive
                                  ? "bg-hero text-mint"
                                  : "bg-navy text-primary-foreground"
                              }`}
                            >
                              <Icon className="h-7 w-7" strokeWidth={2.4} />
                            </div>
                            <span
                              className={`text-[10px] font-medium ${
                                isActive ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {t(key)}
                            </span>
                          </>
                        ) : (
                          <>
                            <div
                              className={`flex items-center justify-center h-9 w-12 rounded-full transition-all ${
                                isActive ? "bg-navy text-primary-foreground" : "text-muted-foreground"
                              }`}
                            >
                              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} />
                            </div>
                            <span
                              className={`text-[10px] font-medium ${
                                isActive ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {t(key)}
                            </span>
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
