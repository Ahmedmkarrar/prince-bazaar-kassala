import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    // `absolute`, not `default`: a nested `default` still gets wrapped by the
    // root template, which suffixed the group's own landing page with
    // "· Prince Plaza Kassala" — the wrong brand for the umbrella site.
    absolute: "Shahad Group — Construction, Real Estate, Hospitality",
    template: "%s · Shahad Group",
  },
  description:
    "A multi-disciplinary Sudanese group operating across construction, real estate, and hospitality. Home of Prince Hotel Khartoum and Prince Plaza Kassala.",
};

export default function ShahadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
