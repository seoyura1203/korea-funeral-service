/**
 * 장례상품 구성 데이터.
 * 참고: enosh.or.kr(sub02_2: 빈소상품, sub06_2: 무빈소상품)의 상품 구성
 * 카테고리/품목 구조를 참고해 우리 서비스에 맞게 재구성했습니다.
 * 품목별 개별 가격은 표시하지 않고 상품(무빈소/일반장) 단위의 가격만 안내합니다.
 * 무빈소와 일반장은 포함 품목 구성이 서로 다릅니다.
 */

export type ProductPlanId = "mubinso" | "family" | "general" | "vip";

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
    id: "family",
    name: "가족장",
    price: 2_300_000,
    points: [
      "가까운 가족 중심의 조용하고 정갈한 장례",
      "실속 있는 구성으로 부담은 줄이고 예는 다하는 선택",
      "소규모 조문객 응대에 적합",
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
  {
    id: "vip",
    name: "VIP",
    price: 3_500_000,
    points: [
      "최고급 품목과 넉넉한 인력 지원으로 격식을 갖춘 장례",
      "거리 제한 없는 프리미엄 차량 지원",
      "많은 조문객을 모시는 가족에게 적합",
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
      { name: "빈소용품", desc: "위패,향,양초 등", image: "/images/products/mourning-hall-supplies.jpg" },
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
      { name: "빈소용품", desc: "위패,향,양초 등", image: "/images/products/mourning-hall-supplies.jpg" },
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
      {
        name: "자연장 유골함",
        desc: "수목함",
        image: "/images/products/natural-burial-urn.jpg",
      },
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
      { name: "남상복", desc: "2벌", image: "/images/products/mens-mourning-suit.jpg" },
      { name: "여상복", desc: "3벌", image: "/images/products/womens-mourning-attire.jpg" },
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

/** 가족장 포함 품목 (일반장과 동일한 카테고리 구성, 수량/등급만 축소) */
const familyCategories: ProductCategory[] = [
  {
    title: "인력 서비스",
    items: [
      { name: "장례지도사", desc: "1명 · 전반 1:1 케어", image: "/images/products/funeral-director.jpg" },
      { name: "입관지도사", desc: "1명 · 2인1조 입관", image: "/images/products/embalming-director.jpg" },
      { name: "의전도우미", desc: "2명", image: "/images/products/hospitality-staff.jpg" },
      { name: "운구인력", desc: "2명 (팀장+기사 1명)", image: "/images/products/transport-crew.jpg" },
    ],
  },
  {
    title: "조문 용품",
    items: [
      { name: "빈소용품", desc: "영정액자, 향·초·위패·방명록 일체", image: "/images/products/mourning-hall-supplies.jpg" },
    ],
  },
  {
    title: "고인 용품",
    items: [
      { name: "수의", desc: "인견 수의", image: "/images/products/shroud.jpg" },
      { name: "관", desc: "오동나무 규격관", image: "/images/products/coffin.jpg" },
      { name: "입관용품", desc: "종교별 약 20종", image: "/images/products/embalming-supplies-v2.jpg" },
    ],
  },
  {
    title: "봉안함",
    items: [
      { name: "고급 목함", desc: "오동나무 목함", image: "/images/products/urn-box.jpg" },
      {
        name: "자연장 유골함",
        desc: "수목함",
        image: "/images/products/natural-burial-urn.jpg",
      },
    ],
  },
  {
    title: "차량 지원",
    items: [
      { name: "장의차량", desc: "리무진 또는 대형버스 (택1) · 왕복 200km", image: "/images/products/hearse.jpg" },
      { name: "긴급 이송차량", desc: "시내(관내) 제공", image: "/images/products/emergency-vehicle.jpg" },
    ],
  },
  {
    title: "유족 용품",
    items: [
      { name: "남상복", desc: "3벌", image: "/images/products/mens-mourning-suit.jpg" },
      { name: "여상복", desc: "3벌", image: "/images/products/womens-mourning-attire.jpg" },
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

/** VIP 포함 품목 (일반장과 동일한 카테고리 구성, 최고급 등급으로 구성) */
const vipCategories: ProductCategory[] = [
  {
    title: "인력 서비스",
    items: [
      { name: "장례지도사", desc: "1명 · 전반 1:1 케어", image: "/images/products/funeral-director.jpg" },
      { name: "입관지도사", desc: "1명 · 2인1조 입관", image: "/images/products/embalming-director.jpg" },
      { name: "의전도우미", desc: "6명", image: "/images/products/hospitality-staff.jpg" },
      { name: "운구인력", desc: "2명 (팀장+기사 1명)", image: "/images/products/transport-crew.jpg" },
    ],
  },
  {
    title: "조문 용품",
    items: [
      { name: "빈소용품", desc: "고급 빈소용품 일체", image: "/images/products/mourning-hall-supplies.jpg" },
      { name: "헌화꽃", desc: "30송이", image: "/images/products/floral-tribute.jpg" },
    ],
  },
  {
    title: "고인 용품",
    items: [
      { name: "수의", desc: "최고급 대마수의", image: "/images/products/shroud.jpg" },
      { name: "관", desc: "오동나무 특관", image: "/images/products/coffin.jpg" },
      { name: "입관용품", desc: "종교별 약 20종 (프리미엄 고인 샴푸)", image: "/images/products/embalming-supplies-v2.jpg" },
    ],
  },
  {
    title: "봉안함",
    items: [
      { name: "고급 목함", desc: "오동나무 목함", image: "/images/products/urn-box.jpg" },
      {
        name: "자연장 유골함",
        desc: "수목함",
        image: "/images/products/natural-burial-urn.jpg",
      },
    ],
  },
  {
    title: "차량 지원",
    items: [
      { name: "장의차량", desc: "최고급 리무진 + 우등 대형버스 · 거리무제한", image: "/images/products/hearse.jpg" },
      { name: "긴급 이송차량", desc: "시내(관내) 제공", image: "/images/products/emergency-vehicle.jpg" },
    ],
  },
  {
    title: "유족 용품",
    items: [
      { name: "남상복", desc: "7벌", image: "/images/products/mens-mourning-suit.jpg" },
      { name: "여상복", desc: "7벌", image: "/images/products/womens-mourning-attire.jpg" },
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
  family: familyCategories,
  general: generalCategories,
  vip: vipCategories,
};

/** 메인페이지 상품 비교 카드에 쓰이는 요약 행 (전문 인력/차량 지원/입관 용품/상복 지원/빈소 용품) */
export type PlanSummaryRow = { label: string; value: string; sub?: string };

export const planSummaryRows: Record<ProductPlanId, PlanSummaryRow[]> = {
  mubinso: [
    { label: "전문 인력", value: "장례지도사 1명 · 입관지도사 1명" },
    { label: "차량 지원", value: "미제공" },
    { label: "입관 용품", value: "규격관, 일반 수의", sub: "생화 꽃장식, 결속용품" },
    { label: "상복 지원", value: "없음" },
    { label: "빈소 용품", value: "영정용 소품" },
  ],
  family: [
    { label: "전문 인력", value: "장례지도사 1명 · 입관지도사 1명 · 의전도우미 2명" },
    { label: "차량 지원", value: "리무진 또는 대형버스 (택1)", sub: "왕복 200km" },
    { label: "입관 용품", value: "오동나무 규격관, 인견 수의", sub: "생화 꽃장식, 입관용품" },
    { label: "상복 지원", value: "남성 3벌 · 여성 3벌" },
    { label: "빈소 용품", value: "영정액자", sub: "향·초·위패·방명록 일체" },
  ],
  general: [
    { label: "전문 인력", value: "장례지도사 1명 · 입관지도사 1명 · 의전도우미 4명" },
    { label: "차량 지원", value: "리무진 + 대형버스 2종 제공", sub: "왕복 200km" },
    { label: "입관 용품", value: "오동나무 특관, 삼베 고급 수의", sub: "생화 꽃장식, 입관용품" },
    { label: "상복 지원", value: "남성 5벌 · 여성 5벌" },
    { label: "빈소 용품", value: "표준 빈소용품 일체", sub: "헌화 국화 30송이" },
  ],
  vip: [
    { label: "전문 인력", value: "장례지도사 1명 · 입관지도사 1명 · 의전도우미 6명" },
    { label: "차량 지원", value: "최고급 리무진 + 우등 대형버스", sub: "거리무제한 · 장거리" },
    { label: "입관 용품", value: "오동나무 특관, 최고급 대마수의", sub: "고급 생화 꽃장식, 고급용품" },
    { label: "상복 지원", value: "남성 7벌 · 여성 7벌" },
    { label: "빈소 용품", value: "고급 빈소용품 일체", sub: "헌화 국화 30송이" },
  ],
};

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}
