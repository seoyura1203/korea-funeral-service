import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import ItemImagePlaceholder from "@/components/products/ItemImagePlaceholder";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatPrice,
  productCategoriesByPlan,
  productPlans,
  type ProductPlanId,
} from "@/lib/products-data";

export default function ProductPlanDetail({
  planId,
}: {
  planId: ProductPlanId;
}) {
  const plan = productPlans.find((p) => p.id === planId);
  const productCategories = productCategoriesByPlan[planId];
  if (!plan) return null;

  return (
    <>
      {/* 상품 가격 카드 */}
      <section className="pb-10 pt-6 md:pb-12 md:pt-8">
        <div className="container">
          <Card className="mx-auto max-w-xl">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <Badge variant="secondary" className="mt-2 w-fit text-[14px]">
                화장전용
              </Badge>
              {plan.tagline && <CardDescription>{plan.tagline}</CardDescription>}
              <p className="pt-3 font-serif text-3xl font-bold text-primary">
                {formatPrice(plan.price)}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm">
                {plan.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/contact">상담 신청하기</Link>
              </Button>
            </CardFooter>
          </Card>

          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-muted-foreground">
            * 표시된 금액은 기본 구성 기준이며, 지역·장례식장 사정에 따라
            달라질 수 있습니다. 정확한 견적은 상담을 통해 안내해 드립니다.
          </p>
        </div>
      </section>

      {/* 포함 품목 (카테고리별) */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              {plan.name} 포함 품목
            </h2>
            <p className="mt-3 text-muted-foreground">
              아래 품목으로 구성되며, 필요에 따라 상담을 통해 품목을 더하거나
              뺄 수 있습니다.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl space-y-12">
            {productCategories.map((category) => (
              <div key={category.title}>
                <h3 className="border-b border-border pb-3 font-serif text-lg font-bold">
                  {category.title}
                </h3>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="overflow-hidden rounded-xl border border-border bg-card"
                    >
                      {item.image ? (
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl border-b border-border bg-muted">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 25vw, 50vw"
                          />
                        </div>
                      ) : (
                        <ItemImagePlaceholder label={item.name} />
                      )}
                      <div className="p-3">
                        <p className="text-sm font-semibold text-foreground">
                          {item.name}
                        </p>
                        {item.desc && (
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {planId !== "mubinso" && (
            <div className="mx-auto mt-12 max-w-2xl rounded-xl bg-secondary/50 p-6 text-center text-sm text-muted-foreground md:p-8">
              사용하지 않은 품목의 비용은 상담을 통해 조정해 드리며, 추가·변경이
              필요한 항목은 담당 상담사가 사전에 정확히 안내해 드립니다.
            </div>
          )}
        </div>
      </section>

      {/* 안내 사항 */}
      <section className="pb-16 pt-0 md:pb-20">
        <div className="container">
          <div className="rounded-xl border border-border bg-secondary/30 p-6 md:p-8">
            <h3 className="font-serif text-base font-bold">안내 사항</h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>* 장례 비용은 발인 전에 정산합니다.</li>
              <li>* 장례식장 이용 비용은 상주 부담입니다.</li>
              <li>
                * 추가 비용은 화장, 매장 및 종교별 의식(고급 수의, 고급 관, 고급
                함, 차량 추가 등)에 따라 고객님의 선택에 맞춰 사전 안내 후
                결정됩니다.
              </li>
              <li>
                * 자택에서 이송할 경우 이송비 및 검안 비용이 별도로
                청구됩니다.
              </li>
              <li>
                * 본 상품의 장례서비스 기간은 3일장 기준이며, 기준일 초과 시
                추가 요금이 발생할 수 있습니다.
              </li>
              <li>
                * 고인 전용 리무진은 1차 장지(화장 시 : 화장장, 매장 시 :
                매장지)까지 입니다.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
