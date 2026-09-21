"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { LocalizationState } from "@/hooks/useLocalization";
import {
  createLocalizationStore,
  LocalizationContext,
} from "@/hooks/useLocalization";

export function LocalizationProvider({
  lang,
  localization,
  children,
}: LocalizationState & { children: ReactNode }) {
  const [store] = useState(() =>
    createLocalizationStore({ lang, localization }),
  );

  return (
    <LocalizationContext.Provider value={store}>
      {children}
    </LocalizationContext.Provider>
  );
}
