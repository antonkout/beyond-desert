import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'it', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  const enMessages = (await import('./messages/en.json')).default;
  const localeMessages =
    locale === 'en'
      ? enMessages
      : (await import(`./messages/${locale}.json`)).default;

  // Deep-merge English as the fallback so missing keys don't crash
  return {
    locale,
    messages: deepMerge(enMessages, localeMessages),
  };
});

function deepMerge(base: any, override: any): any {
  if (typeof base !== 'object' || base === null) return override ?? base;
  if (typeof override !== 'object' || override === null) return base;
  const result: any = { ...base };
  for (const key of Object.keys(override)) {
    result[key] = deepMerge(base[key], override[key]);
  }
  return result;
}