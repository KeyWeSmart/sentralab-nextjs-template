"use client";

import { Loader2Icon } from "lucide-react";
import { useLocalization } from "@/hooks/useLocalization";
import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const localization = useLocalization(
    (state) => state.localization.common.ui,
  ).localization;

  return (
    <Loader2Icon
      role="status"
      aria-label={localization.loading}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
