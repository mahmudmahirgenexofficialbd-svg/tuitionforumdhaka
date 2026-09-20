import { PageHeader } from "@/components/ui/misc";
import { ProfileForm } from "@/components/dashboard/profile-form";
export default function Page() { return (<><PageHeader title="Edit profile" description="Your phone and email are never shown publicly." /><ProfileForm role="guardian" /></>); }
