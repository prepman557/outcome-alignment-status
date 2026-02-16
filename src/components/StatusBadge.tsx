import { AlignmentStatus } from "@/lib/accounts";
import { cn } from "@/lib/utils";

const config: Record<AlignmentStatus, { label: string; classes: string }> = {
  green: { label: "Aligned", classes: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  yellow: { label: "At Risk", classes: "bg-amber-100 text-amber-800 border-amber-300" },
  red: { label: "Needs Attention", classes: "bg-red-100 text-red-800 border-red-300" },
};

export function StatusBadge({ status }: { status: AlignmentStatus }) {
  const { label, classes } = config[status];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", classes)}>
      {label}
    </span>
  );
}
