"use client";

import { useEffect, useState } from "react";
import type { Booking } from "@/lib/data";

export function PrintClient({ reference, email }: { reference: string; email: string }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      setError("Email required to view this booking.");
      return;
    }
    fetch(
      `/api/booking/${encodeURIComponent(reference)}?email=${encodeURIComponent(email)}`,
    )
      .then((r) => r.json())
      .then((d) => {
        if (d.booking) {
          setBooking(d.booking);
          // Auto-open print dialog after a beat
          setTimeout(() => {
            try {
              window.print();
            } catch {
              // user can hit Cmd-P
            }
          }, 400);
        } else {
          setError(d.error ?? "Booking not found");
        }
      })
      .catch(() => setError("Could not load booking"));
  }, [reference, email]);

  const fmt = (iso?: string) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (error) {
    return (
      <main style={{ padding: 40, fontFamily: "system-ui", color: "#333" }}>
        <h1>Unable to load booking</h1>
        <p>{error}</p>
        <p>
          Please return to <a href={`/booking/${reference}`}>the booking page</a> and try again.
        </p>
      </main>
    );
  }

  if (!booking) {
    return (
      <main style={{ padding: 40, fontFamily: "system-ui", color: "#888" }}>Loading booking…</main>
    );
  }

  return (
    <>
      <main className="print-doc">
        {/* Header */}
        <header className="hd">
          <div>
            <div className="brand">Prince Plaza Kassala</div>
            <div className="brand-sub">برنس بلازا كسلا · Eastern Sudan</div>
          </div>
          <div className="ref">
            <div className="ref-label">Booking reference</div>
            <div className="ref-value">{booking.reference}</div>
            <div className="ref-status">{booking.status.replace("_", " ").toUpperCase()}</div>
          </div>
        </header>

        <hr />

        {/* Guest + dates */}
        <section className="grid">
          <div>
            <div className="lbl">Guest</div>
            <div className="val-big">{booking.guestName}</div>
            <div className="val">{booking.guestEmail}</div>
            <div className="val">{booking.guestPhone}</div>
          </div>
          <div>
            <div className="lbl">Stay</div>
            <div className="val">
              <strong>Check-in:</strong> {fmt(booking.checkIn)} (from 14:00)
            </div>
            <div className="val">
              <strong>Check-out:</strong> {fmt(booking.checkOut)} (by 12:00)
            </div>
            <div className="val">
              {booking.nights} nights · {booking.guests} guests · {booking.roomTypeId}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="card">
          <div className="lbl">Pricing</div>
          <table>
            <tbody>
              <tr>
                <td>{booking.roomTypeId} · {booking.nights} nights</td>
                <td className="r">{booking.currency} {booking.baseTotal.toLocaleString()}</td>
              </tr>
              {booking.addons.map((a) => (
                <tr key={a.id}>
                  <td>· {a.name}</td>
                  <td className="r">{booking.currency} {a.price.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="tot">
                <td>Grand total</td>
                <td className="r">{booking.currency} {booking.grandTotal.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Special requests + notes */}
        {booking.specialRequests ? (
          <section className="card">
            <div className="lbl">Special requests</div>
            <p className="quote">&ldquo;{booking.specialRequests}&rdquo;</p>
          </section>
        ) : null}

        {booking.internalNotes ? (
          <section className="card staff">
            <div className="lbl">Staff notes (internal)</div>
            <p>{booking.internalNotes}</p>
          </section>
        ) : null}

        {/* Operations checklist */}
        <section className="card">
          <div className="lbl">Front-desk checklist</div>
          <ul className="check">
            <li>☐ Room assigned</li>
            <li>☐ Welcome amenity placed</li>
            <li>☐ Special requests communicated to housekeeping</li>
            <li>☐ Payment status confirmed</li>
            <li>☐ Check-in greeting prepared in guest&apos;s language ({booking.guestLanguage === "ar" ? "Arabic" : "English"})</li>
          </ul>
        </section>

        {/* Footer */}
        <footer>
          <div>
            <strong>Prince Plaza Kassala</strong> · Reservations
            <br />
            +249 96 510 5555 · Kassala@princehotel-sd.com
          </div>
          <div className="meta">
            Generated {new Date().toLocaleString("en-GB")} ·{" "}
            Reference {booking.reference}
          </div>
        </footer>

        <button onClick={() => window.print()} className="print-btn">
          Print
        </button>
      </main>

      <style jsx global>{`
        @page {
          size: A4;
          margin: 18mm 16mm;
        }
        html,
        body {
          background: #ffffff;
          color: #1a1a1a;
        }
        .print-doc {
          max-width: 760px;
          margin: 0 auto;
          padding: 28px 24px 80px;
          font-family: "Cormorant Garamond", "Times New Roman", serif;
          color: #1a1a1a;
          line-height: 1.45;
        }
        .hd {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
        }
        .brand {
          font-size: 28px;
          letter-spacing: 0.01em;
        }
        .brand-sub {
          margin-top: 4px;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #7a6a45;
        }
        .ref {
          text-align: right;
        }
        .ref-label {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #7a6a45;
        }
        .ref-value {
          font-size: 20px;
          letter-spacing: 0.02em;
          margin-top: 4px;
        }
        .ref-status {
          margin-top: 6px;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #5a4622;
          border: 1px solid #b68a3e;
          padding: 2px 8px;
          display: inline-block;
        }
        hr {
          border: 0;
          border-top: 1px solid #d9d2c2;
          margin: 24px 0;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 20px;
        }
        .lbl {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #b68a3e;
          margin-bottom: 8px;
        }
        .val-big {
          font-size: 22px;
        }
        .val {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 12px;
          line-height: 1.7;
          color: #2c2a26;
        }
        .val strong {
          font-weight: 600;
        }
        .card {
          border: 1px solid #e5dec9;
          padding: 18px 20px;
          margin-bottom: 14px;
        }
        .card.staff {
          background: #faf6ed;
        }
        .card p {
          font-family: "Inter", system-ui, sans-serif;
          font-size: 12px;
          line-height: 1.7;
          color: #2c2a26;
          margin: 6px 0 0;
        }
        .quote {
          font-style: italic;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 12px;
          margin-top: 6px;
        }
        td {
          padding: 6px 0;
          color: #2c2a26;
        }
        td.r {
          text-align: right;
        }
        tr.tot td {
          border-top: 1px solid #d9d2c2;
          padding-top: 10px;
          margin-top: 10px;
          font-weight: 600;
          font-size: 14px;
          color: #1a1a1a;
        }
        .check {
          list-style: none;
          padding: 0;
          margin: 6px 0 0;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 12px;
          line-height: 1.9;
          color: #2c2a26;
        }
        footer {
          margin-top: 32px;
          padding-top: 16px;
          border-top: 1px solid #d9d2c2;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 11px;
          color: #555;
          display: flex;
          justify-content: space-between;
          gap: 16px;
        }
        footer .meta {
          text-align: right;
          color: #888;
        }
        .print-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 12px 22px;
          border-radius: 999px;
          background: #1a0e2e;
          color: #efe0bf;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          border: 0;
          cursor: pointer;
          box-shadow: 0 12px 32px -10px rgba(0, 0, 0, 0.35);
        }
        @media print {
          .print-btn {
            display: none;
          }
          .card.staff {
            background: transparent !important;
          }
        }
      `}</style>
    </>
  );
}
