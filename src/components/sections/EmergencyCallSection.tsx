import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Flower2,
  Home,
  Phone,
  UserCheck,
} from "lucide-react";

const START_OPTIONS = [
  { icon: Home, label: "자택에서 사망 (112 신고)" },
  { icon: Building2, label: "병원에서 사망" },
];

// 지역 지부 좌표 (지도 이미지 전체 캔버스 기준 %, public/images/map/korea-map.png)
const regions = [
  { name: "서울·경기", x: 44, y: 24 },
  { name: "강원", x: 59, y: 14 },
  { name: "충청", x: 45, y: 37 },
  { name: "대구·경북", x: 60, y: 37 },
  { name: "전북", x: 42, y: 47 },
  { name: "부산·경남", x: 61, y: 54 },
  { name: "전남", x: 40, y: 57 },
  { name: "제주", x: 33, y: 94 },
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
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* 좌측: 안내 콘텐츠 */}
          <div>
            <h2 className="font-serif text-2xl font-bold leading-snug md:text-3xl">
              막막한 순간, 한국장례서비스에 전화주세요.
              <br />
              전국 어디든 365일 24시간, 즉시 출동합니다.
            </h2>
            <p className="mt-3 text-muted-foreground">
              첫 연락부터 마지막 배웅까지, 지체 없이 당신 곁으로 달려갑니다.
            </p>

            {/* 시작 상황 2개 */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {START_OPTIONS.map((opt) => (
                <div
                  key={opt.label}
                  className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-card px-5 py-3.5 shadow-sm"
                >
                  <opt.icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-base font-semibold">{opt.label}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center py-3">
              <ArrowDown className="h-5 w-5 text-muted-foreground" />
            </div>

            {/* 단계 아이콘 흐름 */}
            <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border bg-card px-5 py-6 shadow-sm">
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
                      <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 우측: 전국 지도 */}
          <div className="mx-auto w-full max-w-[380px] md:max-w-[440px]">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/map/korea-map.png"
                alt="전국 지부 출동 서비스 지역 안내"
                fill
                className="object-contain"
                sizes="440px"
              />

              {/* 지부 표시 */}
              {regions.map((r) => (
                <div
                  key={r.name}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1"
                  style={{ left: `${r.x}%`, top: `${r.y}%` }}
                >
                  {r.x >= 50 && (
                    <span className="whitespace-nowrap rounded bg-card/90 px-1 py-0.5 text-[9px] font-medium leading-none text-foreground/80 shadow-sm">
                      {r.name}
                    </span>
                  )}
                  <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-primary/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  {r.x < 50 && (
                    <span className="whitespace-nowrap rounded bg-card/90 px-1 py-0.5 text-[9px] font-medium leading-none text-foreground/80 shadow-sm">
                      {r.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
