import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@/i18n";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale: string = locale ?? defaultLocale;

  if (!locales.includes(resolvedLocale as (typeof locales)[number])) {
    notFound();
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
  };
});
