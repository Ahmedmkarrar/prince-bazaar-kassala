import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Shahad Group — Construction, Real Estate, Hospitality",
    template: "%s · Shahad Group",
  },
  description:
    "A multi-disciplinary Sudanese group operating across construction, real estate, and hospitality. Home of Prince Hotel Khartoum and Prince Bazaar Kassala.",
};

export default function ShahadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
