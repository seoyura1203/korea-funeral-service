import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  formatPrice,
  productCategoriesByPlan,
  productPlans,
  type ProductCategory,
  type ProductPlanId,
} from "@/lib/products-data";

type Row = { label: string; value: string; sub?: string };

const PLAN_META: Record<
  ProductPlanId,
  { badge: string; href: string; note: string }
> = {
  mubinso: { badge: "간소화/실속형", href: "/services/products/mubinso", note: "화장 중심 구성" },
  general: { badge: "표준 3일장", href: "/services/products/general", note: "조문객 접객까지 폭넓게 지원" },
};

function findItem(categories: ProductCategory[], name: string) {
  for (const category of categories) {
    const item = category.items.find((i) => i.name === name);
    if (item) return item;
  }
  return undefined;
}

function buildRows(planId: ProductPlanId): Row[] {
  const categories = productCategoriesByPlan[planId];
  const staff = categories.find((c) => c.title === "인력 서비스");
  const coffin = findItem(categories, "관");
  const shroud = findItem(categories, "수의");
  const urn = categories.find((c) => c.title === "봉안함")?.items[0];
  const vehicle = findItem(categories, "장의차량");
  const mensSuit = findItem(categories, "남상복");
  const womensSuit = findItem(categories, "여상복");

  const rows: Row[] = [];

  if (planId === "mubinso") {
    rows.push({
      label: "장례식장 사용",
      value: "안치실, 입관실, 수시용품",
      sub: "*장례식장 사용료 별도 평균 50~60만원",
    });
  } else if (staff) {
    rows.push({
      label: "장례 도우미",
      value: `${staff.items.length}명`,
      sub: staff.items.map((i) => i.name).join(" · "),
    });
  }
  if (coffin?.desc) {
    rows.push({ label: "관", value: coffin.desc });
  }
  if (shroud?.desc) {
    rows.push({ label: "수의", value: shroud.desc });
  }
  if (urn) {
    rows.push({ label: "봉안함", value: urn.name, sub: urn.desc });
  }
  if (vehicle) {
    rows.push({ label: "운송 차량", value: vehicle.name, sub: vehicle.desc });
  }
  if (mensSuit?.desc && womensSuit?.desc) {
    rows.push({
      label: "현대식 상복",
      value: `남성 ${mensSuit.desc} · 여성 ${womensSuit.desc}`,
    });
  }

  return rows;
}

export default function ServiceCards() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            상품 안내
          </h2>
          <p className="mt-3 text-muted-foreground">
            무빈소장·일반장 두 가지 상품으로, 상황에 맞는 절차와 비용을
            정직하게 안내해 드립니다.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {productPlans.map((plan) => {
            const meta = PLAN_META[plan.id];
            const rows = buildRows(plan.id);
            return (
              <div
                key={plan.id}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold text-foreground">
                    {meta.badge}
                  </span>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    {meta.note}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-2xl font-bold md:text-3xl">
                  {plan.name}
                </h3>
                <p className="mt-2 font-serif text-xl font-bold text-primary md:text-2xl">
                  {formatPrice(plan.price)}
                </p>

                <div className="mt-7 flex-1 space-y-4">
                  {rows.map((row) => (
                    <div key={row.label} className="flex items-start gap-4">
                      <span className="w-24 shrink-0 rounded-full bg-secondary/60 px-3 py-1.5 text-center text-xs font-medium text-muted-foreground md:w-28 md:text-sm">
                        {row.label}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-foreground md:text-base">
                          {row.value}
                        </p>
                        {row.sub && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {row.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href={meta.href}
                  className="mt-6 flex w-full items-center justify-center gap-1 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  자세히 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
          * 표시된 금액은 기본 구성 기준이며, 지역·장례식장 사정에 따라 달라질 수 있습니다.
          <br />
          정확한 견적은 상담을 통해 안내해 드립니다.
        </p>
      </div>
    </section>
  );
}
