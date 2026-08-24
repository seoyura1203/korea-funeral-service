"use client";

import { useEffect, useRef, useState } from "react";

// 장례를 치르며 가장 막막했던 순간 (설문 기반 참고 통계를 자사 문구로 재구성)
const painPoints: { percent: number; label: string; colorClass: string }[] = [
  {
    percent: 35.9,
    label: "장례 절차와 예식 진행에 대한 조언",
    colorClass: "bg-primary",
  },
  {
    percent: 20.5,
    label: "장례 이후 가족 간 상속 절차",
    colorClass: "bg-brand-500",
  },
  {
    percent: 15.2,
    label: "장례 이후 행정 절차 (사망신고 등)",
    colorClass: "bg-brand-400",
  },
  {
    percent: 14.8,
    label: "안치 장소 등 장지에 관한 결정",
    colorClass: "bg-brand-400",
  },
  {
    percent: 13.6,
    label: "조문객 응대와 접객 지원",
    colorClass: "bg-brand-300",
  },
];

const RETURN_RATE = 74.6;

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

// 최댓값 기준으로 시각적으로 보기 좋게 스케일링한 막대 너비(%)
function scaleBarWidth(percent: number, max: number) {
  const min = 30;
  const range = 92 - min;
  return min + (percent / max) * range;
}

function AnimatedBar({
  percent,
  label,
  colorClass,
  width,
  active,
  delay,
}: {
  percent: number;
  label: string;
  colorClass: string;
  width: number;
  active: boolean;
  delay: number;
}) {
  const value = useCountUp(percent, active);

  return (
    <div>
      <div className="h-8 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`flex h-full items-center rounded-full ${colorClass} px-3 text-xs font-bold text-primary-foreground transition-[width] duration-1000 ease-out`}
          style={{ width: `${width}%`, transitionDelay: `${delay}ms` }}
        >
          {value.toFixed(1)}%
        </div>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export default function FuneralInsightSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const maxPercent = Math.max(...painPoints.map((p) => p.percent));
  const returnValue = useCountUp(RETURN_RATE, inView, 1300);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - returnValue / 100);

  return (
    <section
      ref={ref}
      className="relative z-10 -mt-[56%] bg-transparent py-12 md:mt-0 md:bg-secondary/40 md:py-16"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold leading-normal md:text-3xl">
            장례, 우리는 왜 미리 준비하기 어려울까요?
            <br />
            그건 대부분은 비용 때문입니다.
            <br />
            <span className="mt-2 inline-block rounded-md bg-primary px-2.5 py-1 text-white">
              한국장례서비스는 월 납입금 0원
            </span>
            <br />
            이용한 만큼 결제하는 후불제 장례 서비스를 제공합니다.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 막대 그래프 카드 */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <p className="text-sm font-semibold text-foreground">
              장례를 치르며 가장 막막했던 순간
            </p>
            <div className="mt-6 space-y-5">
              {painPoints.map((p, i) => (
                <AnimatedBar
                  key={p.label}
                  percent={p.percent}
                  label={p.label}
                  colorClass={p.colorClass}
                  width={inView ? scaleBarWidth(p.percent, maxPercent) : 0}
                  active={inView}
                  delay={i * 120}
                />
              ))}
            </div>
          </div>

          {/* 도넛 그래프 카드 */}
          <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center md:p-8">
            <p className="text-sm font-semibold text-foreground">
              장례를 경험한 분들의 재이용 의향
            </p>
            <div className="relative mx-auto mt-6 h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full -rotate-90"
              >
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  strokeWidth="18"
                  className="fill-none stroke-muted"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={inView ? dashOffset : circumference}
                  className="fill-none stroke-primary transition-[stroke-dashoffset] duration-[1300ms] ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-4xl font-bold text-primary sm:text-5xl">
                  {returnValue.toFixed(1)}%
                </span>
                <span className="mt-2 text-center text-sm leading-tight text-muted-foreground">
                  다시 상조 서비스를
                  <br />
                  이용하고 싶다
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          출처 : 상조보증공제조합 소비자인식조사 (2024)
        </p>
      </div>
    </section>
  );
}
