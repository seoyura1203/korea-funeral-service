import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "상담문의",
  description: "한국장례서비스에 상담을 신청하세요. 24시간 전문 상담사가 도와드립니다.",
};

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const phone = settings.phone || siteConfig.phone;

  const infoItems = [
    { icon: Phone, label: "대표전화", value: phone },
    { icon: Mail, label: "이메일", value: settings.email || siteConfig.email },
    { icon: MapPin, label: "주소", value: settings.address || siteConfig.address },
    { icon: Clock, label: "운영시간", value: siteConfig.operatingHours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="CONTACT"
        title="상담문의"
        description="간단한 정보만 남겨주시면 전문 상담사가 신속하게 연락드립니다. 급하신 경우 전화로도 24시간 상담 가능합니다."
        breadcrumbs={[{ title: "상담문의" }]}
      />

      <section className="section-padding">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-secondary/40 p-6">
              <h2 className="font-serif text-lg font-bold">연락처 안내</h2>
              <ul className="mt-5 space-y-4">
                {infoItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-primary p-6 text-primary-foreground">
              <p className="font-serif text-lg font-bold">긴급 상담이신가요?</p>
              <p className="mt-1 text-sm text-primary-foreground/80">
                24시간 언제든 아래 번호로 바로 연락해 주세요.
              </p>
              <a
                href={`tel:${phone}`}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
