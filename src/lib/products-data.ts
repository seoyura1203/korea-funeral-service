/**
 * 장례상품 구성 데이터.
 * 참고: enosh.or.kr(sub02_2: 빈소상품, sub06_2: 무빈소상품)의 상품 구성
 * 카테고리/품목 구조를 참고해 우리 서비스에 맞게 재구성했습니다.
 * 품목별 개별 가격은 표시하지 않고 상품(무빈소/일반장) 단위의 가격만 안내합니다.
 * 무빈소와 일반장은 포함 품목 구성이 서로 다릅니다.
 */

export type ProductPlanId = "mubinso" | "general";

export type ProductPlan = {
  id: ProductPlanId;
  name: string;
  price: number;
  tagline?: string;
  points: string[];
};

export const productPlans: ProductPlan[] = [
  {
    id: "mubinso",
    name: "무빈소장",
    price: 2_000_000,
    points: [
      "빈소 임차료 부담 없이 핵심 절차만 알차게",
      "화장 중심의 간소한 장례를 원하는 가족께 적합",
    ],
  },
  {
    id: "general",
    name: "일반장",
    price: 2_500_000,
    points: [
      "빈소 마련부터 발인까지 3일장 표준 절차",
      "조문객 접객까지 폭넓게 지원",
      "가장 많은 가족들이 선택하는 기본 구성",
      "매장시 추가 비용 및 상담 필요",
    ],
  },
];

export type ProductItem = { name: string; desc?: string; image?: string };
export type ProductCategory = { title: string; items: ProductItem[] };

/** 무빈소장 포함 품목 */
const mubinsoCategories: ProductCategory[] = [
  {
    title: "장례식장 사용 *사용료 별도 평균 50~60만원",
    items: [
      { name: "안치실", desc: "안치실 사용료", image: "/images/products/storage-room.jpg" },
      { name: "입관실", desc: "입관실 사용료", image: "/images/products/encoffining-room.jpg" },
      { name: "폐기물 처리 비용", image: "/images/products/waste-disposal.jpg" },
    ],
  },
  {
    title: "인력 서비스",
    items: [
      { name: "장례지도사", desc: "1명 · 전반 1:1 케어", image: "/images/products/funeral-director.jpg" },
      { name: "입관지도사", desc: "1명 · 2인1조 입관", image: "/images/products/embalming-director.jpg" },
      { name: "운구인력", desc: "2명 (팀장+기사)", image: "/images/products/transport-crew.jpg" },
    ],
  },
  {
    title: "조문 용품",
    items: [
      { name: "빈소용품", desc: "위패·향·부의록 등", image: "/images/products/mourning-hall-supplies.jpg" },
    ],
  },
  {
    title: "고인 용품",
    items: [
      { name: "수의", desc: "국내산 면 100%", image: "/images/products/shroud.jpg" },
      { name: "관", desc: "오동나무 보통 또는 특관", image: "/images/products/coffin.jpg" },
      { name: "입관용품", desc: "종교별 약 20종", image: "/images/products/embalming-supplies-v2.jpg" },
    ],
  },
  {
    title: "봉안함",
    items: [{ name: "고급 목함", desc: "오동나무 목함", image: "/images/products/urn-box.jpg" }],
  },
  {
    title: "차량 지원",
    items: [
      { name: "장의차량", desc: "리무진 또는 버스 (택1) · 관내 무료", image: "/images/products/hearse.jpg" },
      { name: "긴급 이송차량", desc: "시내(관내) 제공", image: "/images/products/emergency-vehicle.jpg" },
    ],
  },
  {
    title: "무료 서비스",
    items: [
      { name: "장지 상담", image: "/images/products/cemetery-consulting.jpg" },
      { name: "고인 목욕", image: "/images/products/body-bathing.jpg" },
      { name: "화장 예약", image: "/images/products/cremation-booking.jpg" },
      { name: "모바일 부고장", image: "/images/products/mobile-obituary.jpg" },
    ],
  },
];

/** 일반장 포함 품목 */
const generalCategories: ProductCategory[] = [
  {
    title: "인력 서비스",
    items: [
      { name: "장례지도사", desc: "1명 · 전반 1:1 케어", image: "/images/products/funeral-director.jpg" },
      { name: "입관지도사", desc: "1명 · 2인1조 입관", image: "/images/products/embalming-director.jpg" },
      { name: "접객관리사", desc: "4명 · 1인 최대 10시간 (밤 10시 종료)", image: "/images/products/hospitality-staff.jpg" },
      { name: "운구인력", desc: "2명 (팀장+기사 1명)", image: "/images/products/transport-crew.jpg" },
    ],
  },
  {
    title: "조문 용품",
    items: [
      { name: "빈소용품", desc: "위패·향·부의록 등", image: "/images/products/mourning-hall-supplies.jpg" },
      { name: "헌화꽃", desc: "30송이", image: "/images/products/floral-tribute.jpg" },
    ],
  },
  {
    title: "고인 용품",
    items: [
      { name: "수의", desc: "국내산 면 100%", image: "/images/products/shroud.jpg" },
      { name: "관", desc: "오동나무 보통 또는 특관", image: "/images/products/coffin.jpg" },
      { name: "입관용품", desc: "종교별 약 20종 (프리미엄 고인 샴푸)", image: "/images/products/embalming-supplies-v2.jpg" },
    ],
  },
  {
    title: "봉안함",
    items: [
      { name: "고급 목함", desc: "오동나무 목함", image: "/images/products/urn-box.jpg" },
      { name: "자연장 유골함", desc: "수목함" },
    ],
  },
  {
    title: "차량 지원",
    items: [
      { name: "장의차량", desc: "리무진 또는 버스 (택1) · 관내 무료", image: "/images/products/hearse.jpg" },
      { name: "긴급 이송차량", desc: "시내(관내) 제공", image: "/images/products/emergency-vehicle.jpg" },
    ],
  },
  {
    title: "유족 용품",
    items: [
      { name: "남상복", desc: "3벌 세트", image: "/images/products/mens-mourning-suit.jpg" },
      { name: "여상복", desc: "4벌", image: "/images/products/womens-mourning-attire.jpg" },
      { name: "상주용품", desc: "완장·리본 등", image: "/images/products/mourner-supplies.jpg" },
    ],
  },
  {
    title: "무료 서비스",
    items: [
      { name: "장지 상담", image: "/images/products/cemetery-consulting.jpg" },
      { name: "고인 목욕", image: "/images/products/body-bathing.jpg" },
      { name: "화장 예약", image: "/images/products/cremation-booking.jpg" },
      { name: "모바일 부고장", image: "/images/products/mobile-obituary.jpg" },
    ],
  },
];

export const productCategoriesByPlan: Record<ProductPlanId, ProductCategory[]> = {
  mubinso: mubinsoCategories,
  general: generalCategories,
};

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}
