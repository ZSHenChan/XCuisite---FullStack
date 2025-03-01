"use client";
import { useParams } from "next/navigation";

export default function OfferProductPage() {
  const param = useParams();
  return (
    <main>
      <h1>Offer Product Page</h1>
      <div>{param.slug}</div>
    </main>
  );
}
