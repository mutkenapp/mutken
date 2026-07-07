import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useLanguage, useT, type Lang } from "@/lib/language";
import studentPhoto from "@/assets/student_omar.png.asset.json";
import { ArrowLeft, Check } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Mutken" },
      { name: "description", content: "Manage your personal information, language and country preferences." },
    ],
  }),
  component: ProfileScreen,
});

function ProfileScreen() {
  const t = useT();
  const { lang, setLang, dir } = useLanguage();

  const [name, setName] = useState(lang === "ar" ? "عمر الناصر" : "Omar Al-Nasser");
  const [email, setEmail] = useState("omar@mutken.com");
  const [grade, setGrade] = useState(lang === "ar" ? "الصف السادس" : "Grade 6");
  const [phone, setPhone] = useState("+20 100 000 0000");
  const [saved, setSaved] = useState(false);

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
        <h1 className="text-lg font-bold">{lang === "ar" ? "الملف الشخصي" : "My Profile"}</h1>
      </header>

      <div className="px-5 space-y-4">
        {/* Avatar card */}
        <div className="rounded-lg bg-card border border-border p-4 shadow-soft flex items-center gap-3">
          <img
            src={studentPhoto.url}
            alt={name}
            className="h-16 w-16 rounded-full object-cover border border-border"
          />
          <div className="min-w-0">
            <p className="font-semibold truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{grade}</p>
          </div>
        </div>

        {/* Editable info */}
        <form onSubmit={onSave} className="rounded-lg bg-card border border-border p-4 shadow-soft space-y-3">
          <h2 className="text-sm font-semibold mb-1">
            {lang === "ar" ? "البيانات الأساسية" : "Basic Information"}
          </h2>

          <Field label={lang === "ar" ? "الاسم" : "Full name"} value={name} onChange={setName} />
          <Field label={lang === "ar" ? "البريد الإلكتروني" : "Email"} value={email} onChange={setEmail} type="email" />
          <Field label={lang === "ar" ? "رقم الهاتف" : "Phone"} value={phone} onChange={setPhone} type="tel" />
          <Field label={lang === "ar" ? "الصف الدراسي" : "Grade"} value={grade} onChange={setGrade} />

          {/* Language field */}
          <div>
            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
              {lang === "ar" ? "اللغة" : "Language"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["ar", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                    lang === l ? "border-blue bg-blue/5 text-navy" : "border-border bg-card text-foreground"
                  }`}
                >
                  <span className="font-medium">{t(`lang.${l}`)}</span>
                  {lang === l && <Check className="h-4 w-4 text-blue" />}
                </button>
              ))}
            </div>
          </div>

          {/* Country field */}
          <div>
            <label className="block text-[11px] font-medium text-muted-foreground mb-1">
              {lang === "ar" ? "الدولة" : "Country"}
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
              <span className="text-xl leading-none">🇪🇬</span>
              <span className="text-sm font-medium">{lang === "ar" ? "مصر" : "Egypt"}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-hero text-primary-foreground text-sm font-semibold py-2.5 shadow-glow"
          >
            {saved
              ? lang === "ar" ? "تم الحفظ ✓" : "Saved ✓"
              : lang === "ar" ? "حفظ التغييرات" : "Save Changes"}
          </button>
        </form>
      </div>
    </MobileShell>
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
