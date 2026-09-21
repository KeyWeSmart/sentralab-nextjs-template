import "server-only";

import { requireLocale } from "@/i18n.config";

const localization = {
  ko: () => import("@/localization/ko.json").then((module) => module.default),
};

export const findLocalization = async (locale: string) => {
  return await localization[requireLocale(locale)]();
};
export type AsyncLocalization = ReturnType<typeof findLocalization>;
export type Localization = Awaited<AsyncLocalization>;
