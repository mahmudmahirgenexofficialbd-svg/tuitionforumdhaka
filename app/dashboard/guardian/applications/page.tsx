import { PageHeader } from "@/components/ui/misc";
import { ApplicationsTable } from "@/components/dashboard/applications-table";
export default function Page() { return (<><PageHeader title="Applicants" description="Shortlist, then select one tutor per tuition." /><ApplicationsTable role="guardian" /></>); }
