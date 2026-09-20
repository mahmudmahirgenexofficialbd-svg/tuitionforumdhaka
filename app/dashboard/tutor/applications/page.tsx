import { PageHeader } from "@/components/ui/misc";
import { ApplicationsTable } from "@/components/dashboard/applications-table";
export default function Page() { return (<><PageHeader title="My applications" description="Track every tuition you applied for." /><ApplicationsTable role="tutor" /></>); }
