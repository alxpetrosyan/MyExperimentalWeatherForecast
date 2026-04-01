"use client";

import { useLanguage } from "@/components/language-provider";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <span>{t("language")}</span>
      <select
        className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "ka")}
      >
        <option value="en">{t("english")}</option>
        <option value="ka">{t("georgian")}</option>
      </select>
    </label>
  );
}
