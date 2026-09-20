import { BookOpen, Clock, Users, Wallet } from "lucide-react";
import { PageHeader, StatsCard, DemoNotice } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
export default function GuardianHome() {
  return (
    <div className="space-y-6">
      <PageHeader title="Welcome back, Demo" description="Post a tuition, review applicants and confirm your tutor." action={<Button href="/dashboard/guardian/tuition/new">Post a tuition</Button>} />
      <DemoNotice />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Pending approval" value={1} icon={<Clock className="h-5 w-5" />} />
        <StatsCard label="Live tuition" value={2} icon={<BookOpen className="h-5 w-5" />} />
        <StatsCard label="Applicants" value={10} hint="3 new" icon={<Users className="h-5 w-5" />} />
        <StatsCard label="Payments pending" value={1} icon={<Wallet className="h-5 w-5" />} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Button href="/dashboard/guardian/tuition" variant="outline">Manage tuition</Button>
        <Button href="/dashboard/guardian/applications" variant="outline">View applicants</Button>
        <Button href="/dashboard/guardian/payments" variant="outline">Payment status</Button>
      </div>
    </div>
  );
}
