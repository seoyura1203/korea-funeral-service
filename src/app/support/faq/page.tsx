import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "한국장례서비스 상조 서비스에 대해 자주 묻는 질문을 모았습니다.",
};

const faqs = [
  {
    q: "상조 상품에 미리 가입하지 않아도 이용할 수 있나요?",
    a: "네, 가능합니다. 사전 가입 없이도 임종 발생 시 바로 연락 주시면 필요한 상품과 절차를 신속하게 안내해 드립니다.",
  },
  {
    q: "비용은 어떻게 안내받을 수 있나요?",
    a: "상담 신청 시 상황과 예산을 확인한 뒤, 상품별 세부 구성과 총 비용을 투명하게 안내해 드리며 추가 비용이 발생하지 않도록 사전에 고지합니다.",
  },
  {
    q: "기독교 장례 예식도 진행할 수 있나요?",
    a: "네, 입관예배와 발인예배를 포함한 기독교식 장례를 전문적으로 지원하며, 필요 시 목사님 섭외도 도와드립니다.",
  },
  {
    q: "지방에서도 서비스를 이용할 수 있나요?",
    a: "전국 협력 장례식장 네트워크를 통해 서울/수도권 외 지역에서도 동일한 품질의 서비스를 제공합니다.",
  },
  {
    q: "심야 또는 새벽에도 상담이 가능한가요?",
    a: "네, 24시간 연중무휴로 전화 상담과 출동이 가능합니다.",
  },
  {
    q: "장지(봉안당, 자연장 등) 선택도 함께 도와주시나요?",
    a: "네, 지역과 예산, 종교적 선호에 맞는 장지를 함께 찾아드리며 계약 및 안치까지 지원합니다.",
  },
];

export default function FaqPage() {
  return (
    <>
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
