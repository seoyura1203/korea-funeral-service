import Image from "next/image";

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

export default function NationwideServiceSection() {
  return (
    <section className="bg-accent/50 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
          {/* 좌측 텍스트 */}
          <div>
            <h2 className="font-serif text-2xl font-bold leading-snug md:text-3xl">
              전국 어디서나 365일 24시간,
              <br />
              <span className="text-primary">즉시 출동합니다.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
              첫 연락부터 마지막 배웅까지, 지체 없이 당신 곁으로 달려갑니다.
            </p>
          </div>

          {/* 우측 대한민국 지도 */}
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
