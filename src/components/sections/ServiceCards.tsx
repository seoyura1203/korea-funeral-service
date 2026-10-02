"use client";

import * as React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  formatPrice,
  planSummaryRows,
  productPlans,
  type ProductPlan,
  type ProductPlanId,
} from "@/lib/products-data";

const PLAN_META: Record<
  ProductPlanId,
  { badge: string; href: string }
> = {
  mubinso: { badge: "간소화", href: "/services/products/mubinso" },
  family: { badge: "실속형", href: "/services/products/family" },
  general: { badge: "표준 3일장", href: "/services/products/general" },
  vip: { badge: "고급형", href: "/services/products/vip" },
};

// 가장 많이 찾는 구성(일반장)을 다른 카드보다 눈에 띄게 강조합니다.
const HIGHLIGHT_PLAN_ID: ProductPlanId = "general";

// 모바일 슬라이더 전용 노출 순서: 일반장 > 무빈소 > 가족장 > VIP
const MOBILE_ORDER: ProductPlanId[] = ["general", "mubinso", "family", "vip"];

function PlanCard({ plan }: { plan: ProductPlan }) {
  const meta = PLAN_META[plan.id];
  const rows = planSummaryRows[plan.id];
  const highlighted = plan.id === HIGHLIGHT_PLAN_ID;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-card px-4 py-6 md:px-5 md:py-7",
        highlighted
          ? "border-2 border-primary shadow-xl md:-translate-y-2"
          : "border-border"
      )}
    >
      {highlighted && (
        <span className="absolute -top-3.5 left-1/2 animate-badge-bob whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-md">
          많이 찾는 구성
        </span>
      )}

      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-semibold",
            highlighted
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground"
          )}
        >
          {meta.badge}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-2xl font-bold md:text-2xl">
        {plan.name}
      </h3>
      <p className="mt-1.5 font-serif text-2xl font-bold text-primary md:text-xl">
        {formatPrice(plan.price)}
      </p>

      <div className="mt-6 flex-1 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <span className="whitespace-nowrap text-sm font-medium text-muted-foreground md:text-xs">
              {row.label}
            </span>
            <p className="mt-1 text-base leading-snug text-foreground md:text-sm">
              {row.value}
            </p>
            {row.sub && (
              <p className="mt-0.5 text-base leading-snug text-foreground md:text-sm">
                {row.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      <Link
        href={meta.href}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-1 rounded-lg py-3 text-sm font-semibold transition",
          highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-secondary text-foreground hover:bg-secondary/70"
        )}
      >
        자세히 보기
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function ServiceCards() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const mobilePlans = React.useMemo(
    () =>
      MOBILE_ORDER.map((id) => productPlans.find((p) => p.id === id)).filter(
        (p): p is ProductPlan => Boolean(p)
      ),
    []
  );

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="section-padding bg-accent/40">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            상품 안내
          </h2>
          <p className="mt-3 text-muted-foreground">
            무빈소장·가족장·일반장·VIP 네 가지 상품으로, 상황에 맞는 절차와
            비용을 정직하게 안내해 드립니다.
          </p>
        </div>

        {/* PC: 4개 카드 동시 노출 */}
        <div className="mx-auto mt-14 hidden max-w-7xl grid-cols-4 gap-5 md:grid">
          {productPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* 모바일: 탭 + 터치 스와이프 슬라이더 */}
        <div className="mt-10 md:hidden">
          {/* 탭 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {mobilePlans.map((plan, idx) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => emblaApi?.scrollTo(idx)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                  idx === selectedIndex
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                )}
              >
                {plan.name}
              </button>
            ))}
          </div>

          <div
            className="-mx-4 mt-5 overflow-hidden pt-4 sm:-mx-6"
            ref={emblaRef}
          >
            <div className="flex">
              {mobilePlans.map((plan) => (
                <div
                  key={plan.id}
                  className="min-w-0 flex-[0_0_100%] px-4 sm:px-6"
                >
                  <PlanCard plan={plan} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5">
            {mobilePlans.map((plan, idx) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`${plan.name} 보기`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === selectedIndex ? "w-5 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          * 표시된 금액은 기본 구성 기준이며, 지역·장례식장 사정에 따라 달라질 수 있습니다.
          <br />
          정확한 견적은 상담을 통해 안내해 드립니다.
        </p>
      </div>
    </section>
  );
}
