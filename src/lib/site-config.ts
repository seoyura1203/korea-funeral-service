export const siteConfig = {
  name: "한국의전서비스",
  nameEn: "Korea Uijeon Service",
  description:
    "정직과 예를 다하는 장례 상조 서비스. 24시간 전문 상담을 통해 소중한 분을 품격있게 모십니다.",
  phone: "1670-1024",
  email: "krf.care@gmail.com",
  address:
    "서울지부 | 서울시 강동구 양재대로 127번길 55;본사 | 경남 창원시 의창대로 211번길 2",
  businessNumber: "000-00-00000",
  ceo: "홍길동",
  salesRegistrationNumber: "제0000-서울강남-00000호",
  privacyOfficerEmail: "krf.care@gmail.com",
  operatingHours: "24시간 연중무휴 상담",
  // 카카오톡 채널 관리자센터 > 채팅 > 채팅 플러그인에서 발급받은 채널 채팅 URL로 교체하세요.
  // 예: https://pf.kakao.com/_xxxxxxx/chat
  kakaoChannelUrl: "https://open.kakao.com/o/sWT23qQi",
};

export const trustBadges = [
  "상조 비용 100% 투명 공개",
  "전국 협력 장례식장 480곳",
  "누적 시행 32,000건",
  "고객 만족도 98.4%",
];

export const footerLinks = [
  { title: "자주 묻는 질문", href: "/support/faq" },
  { title: "이용약관", href: "/terms" },
  { title: "개인정보처리방침", href: "/privacy" },
];

export type NavItem = {
  title: string;
  href?: string;
  items?: { title: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  {
    title: "회사소개",
    href: "/about",
  },
  {
    title: "장례상품",
    items: [
      { title: "무빈소", href: "/services/products/mubinso", description: "빈소 없이 진행하는 실속형 장례" },
      { title: "가족장", href: "/services/products/family", description: "가까운 가족 중심의 실속형 3일장" },
      { title: "일반장", href: "/services/products/general", description: "빈소를 포함한 표준 3일장" },
      { title: "VIP", href: "/services/products/vip", description: "최고급 품목으로 격식을 갖춘 프리미엄 장례" },
    ],
  },
  {
    title: "절차안내",
    href: "/services/process",
  },
  {
    title: "고객후기",
    href: "/support/reviews",
  },
  {
    title: "상담문의",
    href: "/contact",
  },
];
