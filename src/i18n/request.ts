import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request (from [locale] segment)
  let locale = await requestLocale;

  // Fallback to default if not provided or invalid
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
