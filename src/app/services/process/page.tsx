import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "절차안내",
  description: "임종부터 발인까지 장례 절차를 단계별로 안내합니다.",
};

const steps = [
  {
    title: "임종 및 연락",
    desc: "임종 확인 후 저희 상담센터로 연락 주시면, 24시간 전담팀이 즉시 출동하여 이송 및 초기 절차를 안내해 드립니다.",
  },
  {
    title: "빈소 마련",
    desc: "고인과 유가족의 상황에 맞는 장례식장과 빈소를 신속하게 마련하고, 부고 및 조문 준비를 지원합니다.",
  },
  {
    title: "입관",
    desc: "염습과 입관을 전문 장례지도사가 정중하게 진행합니다. 기독교 예식의 경우 입관예배를 함께 진행할 수 있습니다.",
  },
  {
    title: "조문",
    desc: "발인 전까지 조문객을 맞이하는 기간으로, 접객·음식·주차 등 빈소 운영 전반을 지원합니다.",
  },
  {
    title: "발인",
    desc: "발인제(또는 발인예배)를 마친 뒤 장지로 이동합니다. 리무진 및 버스 등 이동 수단을 함께 준비해 드립니다.",
  },
  {
    title: "장지 안치",
    desc: "화장, 봉안, 자연장, 매장 등 선택하신 방식에 따라 장지에서 마지막 절차를 진행합니다.",
  },
  {
    title: "사후 지원",
    desc: "사망신고, 상속 등 행정 절차 안내와 49재 등 추모 일정까지 필요한 도움을 지속적으로 드립니다.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICE"
        title="절차안내"
        description="처음 겪는 순간이라도 당황하지 않도록, 임종 직후부터 발인 이후까지의 절차를 단계별로 안내해 드립니다."
        breadcrumbs={[{ title: "절차안내" }]}
      />

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <ol className="relative border-l border-border pl-8">
              {steps.map((step, idx) => (
                <li key={step.title} className="mb-10 last:mb-0">
                  <span className="absolute -left-[15px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {idx + 1}
                  </span>
                  <h3 className="font-serif text-lg font-bold">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
