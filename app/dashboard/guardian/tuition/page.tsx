import { PageHeader } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { MyTuitionList } from "@/components/dashboard/my-tuition-list";
export default function Page() { return (<><PageHeader title="My tuition" description="Every post is reviewed by our team before it goes public." action={<Button href="/dashboard/guardian/tuition/new">Post a tuition</Button>} /><MyTuitionList /></>); }
