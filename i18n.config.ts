export const i18n = {
  defaultLocale: "ko",
  locales: ["ko"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const hasLocale = (locale: string): locale is Locale =>
  i18n.locales.some((supportedLocale) => supportedLocale === locale);

export function requireLocale(locale: string): Locale {
  if (!hasLocale(locale)) {
    throw new RangeError("Unsupported locale");
  }

  return locale;
}
