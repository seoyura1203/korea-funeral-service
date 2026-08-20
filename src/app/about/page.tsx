import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, ShieldCheck, Sparkles, Users2 } from "lucide-react";

import PageHeader from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { history } from "@/lib/history-data";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "한국장례서비스의 인사말, 경영철학, 주요 연혁을 소개합니다.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "정직한 비용",
    desc: "추가 비용 없이 처음 안내드린 견적 그대로 책임집니다.",
  },
  {
    icon: HeartHandshake,
    title: "고객 중심",
    desc: "슬픔에 잠긴 유가족의 입장에서 가장 먼저 생각합니다.",
  },
  {
    icon: Users2,
    title: "전문성",
    desc: "체계적으로 교육받은 전문 인력이 전 과정을 지원합니다.",
  },
  {
    icon: Sparkles,
    title: "예를 다하는 절차",
    desc: "전통과 종교적 예법을 존중하는 격식 있는 진행을 원칙으로 합니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT"
        title="회사소개"
        description="한국장례서비스가 걸어온 길, 지키는 원칙, 그리고 함께한 순간들을 소개합니다."
        breadcrumbs={[{ title: "회사소개" }]}
      />

      {/* 인사말 */}
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              인사말
            </h2>
            <div className="mt-6 space-y-6 leading-loose text-foreground/90">
              <p>
                소중한 분을 떠나보내는 마지막 순간, 그 어느 때보다 신중하고
                세심한 손길이 필요합니다. 한국장례서비스는 그 순간을 함께하는
                동반자로서, 예를 다하는 장례 문화를 만들어가고자 합니다.
              </p>
              <p>
                저희는 일반 장례 절차뿐 아니라 기독교 예식에 따른 장례까지
                폭넓게 경험한 전문 인력을 바탕으로, 고객 한 분 한 분의
                상황에 맞는 최선의 절차를 제안해 드리고 있습니다. 임종
                직후의 당혹스러운 순간부터 발인, 그 이후의 장지 안내까지
                모든 과정을 투명하고 정직하게 안내해 드리겠습니다.
              </p>
              <p>
                장례는 단순한 절차가 아니라, 고인의 삶을 기리고 남은 이들이
                위로받는 시간이라고 믿습니다. 한국장례서비스는 그 믿음을
                바탕으로 앞으로도 신뢰받는 상조 서비스가 되기 위해 최선을
                다하겠습니다.
              </p>
              <p className="pt-2 text-right font-serif text-lg font-semibold">
                한국장례서비스 임직원 일동
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 경영철학 */}
      <section className="section-padding bg-secondary/30">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              경영철학
            </h2>
            <p className="mt-3 text-muted-foreground">
              한국장례서비스는 다음 네 가지 원칙을 바탕으로 서비스를
              제공합니다.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title}>
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{v.title}</CardTitle>
                  <CardDescription>{v.desc}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-xl bg-card p-8 text-center md:p-12">
            <p className="font-serif text-xl font-semibold leading-relaxed md:text-2xl">
              &ldquo;마지막까지 예를 다하는 것이 진정한 위로입니다&rdquo;
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              한국장례서비스 경영 원칙
            </p>
          </div>
        </div>
      </section>

      {/* 연혁 / 주요 이력 */}
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              연혁 및 주요 이력
            </h2>
            <p className="mt-3 text-muted-foreground">
              오랜 경험을 바탕으로 국가적 행사와 크고 작은 장례를 함께해
              왔습니다.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {history.map((h) => (
              <div
                key={h.title}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[450/339] w-full">
                  <Image
                    src={h.image}
                    alt={h.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 400px, 90vw"
                  />
                </div>
                <div className="p-5">
                  <p className="font-semibold text-foreground">{h.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {h.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
