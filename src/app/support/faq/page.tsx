import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "@/lib/faq-data";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "장례 비용 안내, 심야 상담, 지방 서비스, 장지 선택 등 장례에 대해 자주 묻는 질문과 답변을 모았습니다.",
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <PageHeader
        eyebrow="SUPPORT"
        title="자주 묻는 질문"
        description="상조 서비스 이용 전 궁금하신 점을 미리 확인해 보세요."
        breadcrumbs={[{ title: "자주 묻는 질문" }]}
      />

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
