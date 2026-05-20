import { LookupClient } from "./LookupClient";

export const metadata = {
  title: "Your Reservation",
  description: "Look up your booking at Prince Plaza Kassala.",
  robots: { index: false, follow: false },
};

export default async function BookingLookupPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { reference } = await params;
  const { email } = await searchParams;
  return <LookupClient reference={reference} prefilledEmail={email ?? ""} />;
}
