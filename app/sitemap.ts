import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { TUITIONS, TUTORS } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/how-it-works", "/find-tuition", "/tutors", "/faq", "/contact", "/privacy-policy", "/terms-and-conditions", "/refund-policy", "/complaint-policy"];
  return [
    ...pages.map((p) => ({ url: `${siteConfig.url}${p}` })),
    ...TUITIONS.filter((t) => t.status === "APPROVED").map((t) => ({ url: `${siteConfig.url}/tuition/${t.id}`, lastModified: t.postedAt })),
    ...TUTORS.filter((t) => t.verification === "VERIFIED").map((t) => ({ url: `${siteConfig.url}/tutor/${t.id}` })),
  ];
}
