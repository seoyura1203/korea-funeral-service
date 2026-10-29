import {
  formatPrice,
  planSummaryRows,
  productPlans,
  type ProductPlanId,
} from "@/lib/products-data";

const HIGHLIGHT: ProductPlanId = "general";

const BINSO: Record<ProductPlanId, string> = {
  mubinso: "없음 (무빈소)",
  family: "있음 (소규모)",
  general: "있음 (3일장 표준)",
  vip: "있음 (대규모 조문객)",
};

const ROW_LABELS = ["전문 인력", "차량 지원", "입관 용품", "빈소 용품"];

/**
 * 장례 상품 4종 비교표. 이미지가 아닌 실제 글(HTML table)이라
 * 검색엔진·AI가 가격과 구성을 그대로 읽을 수 있습니다.
 * 데이터는 products-data.ts를 그대로 사용하므로 가격·구성이 바뀌면 자동 반영됩니다.
 */
export default function ProductCompareTable() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            장례 상품 한눈에 비교
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            월 납입금 0원, 이용한 만큼만 결제하는 후불제 장례 서비스
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] table-fixed border-collapse text-sm md:text-[0.95rem]">
            <caption className="sr-only">
              한국의전서비스 장례 상품(무빈소장, 가족장, 일반장, VIP) 가격 및 구성 비교
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 w-[88px] bg-card p-3 text-left md:w-[120px]"
                />
                {productPlans.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className={`p-3 text-center font-bold ${
                      p.id === HIGHLIGHT ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    {p.id === HIGHLIGHT && (
                      <span className="mb-1 block text-xs font-semibold">
                        많이 찾는 구성
                      </span>
                    )}
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card p-3 text-left font-medium text-muted-foreground"
                >
                  가격
                </th>
                {productPlans.map((p) => (
                  <td
                    key={p.id}
                    className={`p-3 text-center text-base font-bold md:text-lg ${
                      p.id === HIGHLIGHT ? "bg-primary/10" : ""
                    }`}
                  >
                    {formatPrice(p.price)}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card p-3 text-left font-medium text-muted-foreground"
                >
                  빈소
                </th>
                {productPlans.map((p) => (
                  <td
                    key={p.id}
                    className={`p-3 text-center align-top ${
                      p.id === HIGHLIGHT ? "bg-primary/10" : ""
                    }`}
                  >
                    {BINSO[p.id]}
                  </td>
                ))}
              </tr>
              {ROW_LABELS.map((label) => (
                <tr key={label} className="border-t border-border">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-card p-3 text-left font-medium text-muted-foreground"
                  >
                    {label}
                  </th>
                  {productPlans.map((p) => {
                    const row = planSummaryRows[p.id].find((r) => r.label === label);
                    return (
                      <td
                        key={p.id}
                        className={`p-3 text-center align-top leading-relaxed ${
                          p.id === HIGHLIGHT ? "bg-primary/10" : ""
                        }`}
                      >
                        {row ? (
                          <>
                            {row.value}
                            {row.sub && (
                              <span className="mt-1 block text-xs text-muted-foreground">
                                {row.sub}
                              </span>
                            )}
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          * 불필요한 품목은 빼서 더 저렴하게 상품을 구성할 수 있습니다.
          <span className="md:hidden"> (표는 옆으로 밀어서 볼 수 있어요)</span>
        </p>
      </div>
    </section>
  );
}
