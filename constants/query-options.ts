import type { QueryKey, QueryObserverOptions } from "@tanstack/react-query";

type QueryPolicyShape = Pick<
  QueryObserverOptions<unknown, unknown, unknown, unknown, QueryKey>,
  | "gcTime"
  | "staleTime"
  | "refetchOnWindowFocus"
  | "refetchOnReconnect"
  | "refetchOnMount"
>;

export const QueryDefaults = {
  staleTime: 60_000,
  gcTime: 5 * 60_000,
} as const;

export const QueryPolicy = {
  defaultRetained: QueryDefaults,
  freshRetained: {
    staleTime: 0,
    gcTime: 5 * 60_000,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
  },
  noCacheAuthoritative: {
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
  },
} satisfies Record<string, QueryPolicyShape>;
