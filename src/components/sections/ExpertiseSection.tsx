import ItemImagePlaceholder from "@/components/products/ItemImagePlaceholder";

const items = [
  {
    title: "1:1 전담 장례지도사 배정",
    description: "전담 장례지도사가 배정되어 처음부터 끝까지 함께합니다.",
  },
  {
    title: "전직 대통령 국민장 진행 이력",
    description:
      "노무현·김대중·김영삼 전 대통령 국민장에 참여한 경험으로, 국가 의전급 장례도 빈틈없이 진행합니다.",
  },
  {
    title: "유가족 편의 서비스",
    description:
      "부고알림, 조문 답례품, 사후 행정지원, 기일 알림까지 유가족이 신경쓰기 어려운 일들까지 세심하게 챙겨드립니다.",
  },
  {
    title: "정성스러운 제례 음식 서비스",
    description:
      "믿을 수 있는 제례 음식으로 조문객 대접까지 소홀함 없이 챙겨드립니다.",
  },
];

export default function ExpertiseSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold leading-snug md:text-3xl">
            단 한번 뿐인 마지막 예식이기에,
            <br />
            <span className="text-primary">국가 인증 장례명장이 직접 챙기는</span>
            <br />
            품격 있는 배웅이 필요합니다
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <ItemImagePlaceholder label={item.title} />
              <div className="p-5 text-center">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
