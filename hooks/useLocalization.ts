"use client";

import { createContext, useContext } from "react";
import { create, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { Locale } from "@/i18n.config";
import type { Localization } from "@/utils/localization";

export type LocalizationState = {
  lang: Locale;
  localization: Localization;
};

export const createLocalizationStore = (initialState: LocalizationState) => {
  return create<LocalizationState>()(() => ({ ...initialState }));
};

type LocalizationStore = ReturnType<typeof createLocalizationStore>;
export const LocalizationContext = createContext<LocalizationStore | null>(
  null,
);

export function useLocalization(): LocalizationState;
export function useLocalization<TSelection>(
  selectorFn: (state: LocalizationState) => TSelection,
): Omit<LocalizationState, "localization"> & { localization: TSelection };
export function useLocalization<TSelection>(
  selectorFn?: (state: LocalizationState) => TSelection,
) {
  const store = useContext(LocalizationContext);
  if (!store) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider",
    );
  }

  return useStore(
    store,
    useShallow((state) =>
      selectorFn
        ? { lang: state.lang, localization: selectorFn(state) }
        : state,
    ),
  );
}
