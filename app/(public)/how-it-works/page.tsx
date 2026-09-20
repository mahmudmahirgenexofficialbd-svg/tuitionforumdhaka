import { ProsePage } from "@/components/layout/prose-page";
import { Button } from "@/components/ui/button";
export const metadata = { title: "How it works" };
export default function HowItWorks() {
  return (
    <ProsePage title="How it works" intro="Two short paths, one shared rule: nothing goes live or gets paid without a human check.">
      <h2>For guardians</h2>
      <ul><li>Create a free account with your mobile number.</li><li>Post your tuition. Our team reviews and approves it.</li><li>Review tutors who apply and shortlist the ones you like.</li><li>Select one tutor. You will see the official bKash and Nagad payment instructions.</li><li>Submit your transaction ID. We verify it, then the tuition becomes active.</li></ul>
      <h2>For tutors</h2>
      <ul><li>Create a profile with your education, subjects and preferred locations.</li><li>Get verified so guardians can see the Verified Tutor badge.</li><li>Browse approved tuition and apply for free.</li><li>Once selected and payment is verified, start teaching and track your records.</li></ul>
      <div className="flex gap-3 pt-4"><Button href="/register/guardian">Post a tuition</Button><Button href="/register/tutor" variant="outline">Become a tutor</Button></div>
    </ProsePage>
  );
}
