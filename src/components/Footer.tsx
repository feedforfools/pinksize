import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[rgb(var(--color-black-rgb))] text-[rgb(var(--color-white-rgb))] py-[var(--footer-padding-y)] border-t border-[rgb(var(--color-white-rgb)/0.1)]">
      <div className="max-w-6xl mx-auto px-[var(--section-padding-x)] text-center">
        <p className="text-[rgb(var(--color-gray-400-rgb))] text-[length:var(--footer-text-size)]">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
