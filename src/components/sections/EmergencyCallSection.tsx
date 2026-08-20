import { ArrowDown, ArrowRight, Building2, Flower2, Home, Phone, UserCheck } from "lucide-react";

const START_OPTIONS = [
  { icon: Home, label: "자택에서 사망 (112 신고)" },
  { icon: Building2, label: "병원에서 사망" },
];

export default function EmergencyCallSection({ phone }: { phone: string }) {
  const steps: {
    icon: typeof Phone;
    title: string;
    label: string;
    href?: string;
  }[] = [
    { icon: Phone, title: phone, label: "연락", href: `tel:${phone}` },
    { icon: UserCheck, title: "담당 장례지도사", label: "현장 도착" },
    { icon: Flower2, title: "장례식장 이송", label: "장례 진행" },
  ];

  return (
    <section className="section-padding bg-secondary/20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            막막한 순간,
            <br className="md:hidden" /> 한국장례서비스에 전화주세요.
          </h2>
          <p className="mt-3 text-muted-foreground">
            자택이든 병원이든, 전화 한 통이면 담당 장례지도사가 가장 먼저
            달려갑니다.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center gap-5 md:flex-row md:justify-center md:gap-3">
          {/* 시작 상황 2개 */}
          <div className="flex w-full max-w-xs flex-col gap-3 md:w-auto">
            {START_OPTIONS.map((opt) => (
              <div
                key={opt.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3.5 shadow-sm"
              >
                <opt.icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-base font-semibold">{opt.label}</span>
              </div>
            ))}
          </div>

          <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground md:block" />
          <ArrowDown className="h-5 w-5 shrink-0 text-muted-foreground md:hidden" />

          {/* 단계 아이콘 흐름 */}
          {steps.map((step, idx) => {
            const Circle = (
              <div className="flex w-auto flex-col items-center gap-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                  <step.icon className="h-6 w-6" />
                </div>
                <p className="whitespace-nowrap text-base font-bold leading-tight text-foreground md:text-lg">
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground">{step.label}</p>
              </div>
            );

            return (
              <div key={step.label} className="contents">
                {step.href ? (
                  <a href={step.href} className="transition hover:opacity-80">
                    {Circle}
                  </a>
                ) : (
                  Circle
                )}
                {idx < steps.length - 1 && (
                  <>
                    <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground md:block" />
                    <ArrowDown className="h-5 w-5 shrink-0 text-muted-foreground md:hidden" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
