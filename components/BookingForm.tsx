"use client";

import { useSearchParams } from "next/navigation";
import type { Service } from "@/content/services";
import { LeadForm } from "@/components/LeadForm";

export function BookingForm({ services }: { services: Pick<Service, "slug" | "title">[] }) {
  const service = useSearchParams().get("service") ?? "";
  const selected = services.some((item) => item.slug === service) ? service : "";
  return <LeadForm key={selected || "empty"} services={services} defaultService={selected} />;
}
