import { PrintClient } from "./PrintClient";

export const metadata = {
  title: "Booking — Print",
  robots: { index: false, follow: false },
};

export default async function PrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { reference } = await params;
  const { email } = await searchParams;
  return <PrintClient reference={reference} email={email ?? ""} />;
}
