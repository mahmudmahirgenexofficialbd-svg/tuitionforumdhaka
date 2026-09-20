import { ProsePage } from "@/components/layout/prose-page";
export const metadata = { title: "About us" };
export default function About() {
  return (
    <ProsePage title="About Tuition Forum Dhaka" intro="A tuition marketplace built for Bangladesh, where every post is reviewed and every payment is verified by a person.">
      <p>Finding a reliable tutor, or reliable tuition, should not depend on who you happen to know. Tuition Forum Dhaka gives guardians and tutors one place to find each other across all divisions and districts of Bangladesh.</p>
      <h2>How we are different</h2>
      <ul><li>Guardian posts are approved by our team before they appear publicly.</li><li>The Verified Tutor badge is granted manually, never automatically.</li><li>Joining and applying are free. Payment happens only when a guardian confirms a tutor.</li></ul>
    </ProsePage>
  );
}
