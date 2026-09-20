import { Skeleton } from "@/components/ui/misc";
export default function Loading() {
  return (
    <div className="container-page space-y-4 py-12">
      <Skeleton className="h-10 w-1/3" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-48" />)}</div>
    </div>
  );
}
