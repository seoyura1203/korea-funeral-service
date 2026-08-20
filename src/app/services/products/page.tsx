import { redirect } from "next/navigation";

/**
 * 장례상품은 무빈소/일반장 두 개의 개별 페이지로 분리되어 있습니다.
 * 이 경로(구 통합 페이지)로 들어오는 방문객은 무빈소 상품 페이지로 안내합니다.
 */
export default function ProductsIndexPage() {
  redirect("/services/products/mubinso");
}
