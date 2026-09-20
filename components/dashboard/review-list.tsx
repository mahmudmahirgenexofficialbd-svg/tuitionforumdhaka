import { Star } from "lucide-react";
import { EmptyState } from "@/components/ui/misc";

const SAMPLE = [
  { id: "r1", who: "Demo Guardian", rating: 5, comment: "Punctual and explains clearly. (Sample review)", date: "12 Aug 2026" },
  { id: "r2", who: "Demo Guardian B", rating: 4, comment: "Good with exam preparation. (Sample review)", date: "2 Jul 2026" },
];

export function ReviewList({ empty = false }: { empty?: boolean }) {
  if (empty) return <EmptyState title="No reviews yet" message="Reviews can be left after a tuition is marked completed." icon={<Star className="h-6 w-6" />} />;
  return (
    <ul className="space-y-3">
      {SAMPLE.map((r) => (
        <li key={r.id} className="card p-5">
          <div className="flex items-center justify-between"><p className="font-semibold">{r.who}</p><p className="text-xs text-slate-500">{r.date}</p></div>
          <p className="mt-1 flex" aria-label={`${r.rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`h-4 w-4 ${n <= r.rating ? "fill-marigold-500 text-marigold-500" : "text-slate-300"}`} aria-hidden="true" />)}</p>
          <p className="mt-2 text-sm text-slate-700">{r.comment}</p>
        </li>
      ))}
    </ul>
  );
}
