import { cache } from "react";

import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type {
  Banner,
  Notice,
  Review,
  SiteSettings,
} from "@/types/supabase";

/**
 * Supabase 미설정 시(로컬 개발 초기, 빌드 환경변수 누락 등) 화면이 비지 않도록 쓰는
 * 기본 배너/공지 데이터입니다. 실제 데이터가 있으면 즉시 대체됩니다.
 */
const FALLBACK_BANNERS: Banner[] = [
  {
    id: "fallback-1",
    title: "마지막 가는 길,\n따뜻하게 모시겠습니다",
    subtitle: "숨겨진 비용 없이, 정직한 안내로 임종부터 발인까지 함께합니다.",
    image_url: null,
    link_url: "/contact",
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    title: "추가금 없는\n정직한 정찰제 상품",
    subtitle: "처음 안내드린 견적 그대로, 끝까지 책임지고 진행합니다.",
    image_url: null,
    link_url: "/services/products",
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    title: "새벽에도, 명절에도\n전문가가 함께합니다",
    subtitle: "전국 협력 네트워크로 언제 어디서든 신속하게 도와드립니다.",
    image_url: null,
    link_url: "/services/process",
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
  },
];

const FALLBACK_NOTICES: Notice[] = [
  {
    id: "fallback-1",
    title: "여름철 폭염 대비 빈소 운영 안내",
    content: "여름철 폭염에 대비하여 전 지점 빈소 냉방을 강화 운영합니다.",
    created_at: "2026-07-20T00:00:00.000Z",
  },
  {
    id: "fallback-2",
    title: "전국 협력 장례식장 확대 안내 (480곳 → 500곳)",
    content: "전국 협력 장례식장이 480곳에서 500곳으로 확대되었습니다.",
    created_at: "2026-06-15T00:00:00.000Z",
  },
  {
    id: "fallback-3",
    title: "홈페이지 개편 및 온라인 상담 신청 오픈 안내",
    content: "온라인으로 간편하게 상담을 신청하실 수 있도록 홈페이지를 개편했습니다.",
    created_at: "2026-05-02T00:00:00.000Z",
  },
  {
    id: "fallback-4",
    title: "설 연휴 기간 24시간 비상 상담 운영 안내",
    content: "설 연휴 기간에도 24시간 비상 상담 센터를 운영합니다.",
    created_at: "2026-03-10T00:00:00.000Z",
  },
];

const FALLBACK_REVIEWS: Review[] = [
  {
    id: "fallback-1",
    name: "김OO 님",
    review_date: "2025-03-22",
    content:
      "새벽에 연락드렸는데도 바로 상담사분이 오셔서 정말 큰 도움이 되었습니다. 절차를 하나하나 알기 쉽게 설명해 주셨어요.",
    image_url: null,
    created_at: "2025-03-22T00:00:00.000Z",
  },
  {
    id: "fallback-2",
    name: "이OO 님",
    review_date: "2025-01-15",
    content:
      "입관예배와 발인예배까지 목사님과의 소통을 세심하게 챙겨주셔서 감사했습니다.",
    image_url: null,
    created_at: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "fallback-3",
    name: "박OO 님",
    review_date: "2024-11-08",
    content:
      "견적이 투명하게 안내되어서 추가 비용 걱정 없이 진행할 수 있었습니다. 믿고 맡길 수 있는 곳입니다.",
    image_url: null,
    created_at: "2024-11-08T00:00:00.000Z",
  },
  {
    id: "fallback-4",
    name: "최OO 님",
    review_date: "2024-09-30",
    content:
      "봉안당 선택부터 계약까지 함께해 주셔서 혼자 알아봐야 하는 부담이 훨씬 줄었습니다.",
    image_url: null,
    created_at: "2024-09-30T00:00:00.000Z",
  },
  {
    id: "fallback-5",
    name: "정OO 님",
    review_date: "2024-08-12",
    content: "지방 소도시였는데도 동일한 품질로 서비스를 받을 수 있어 좋았습니다.",
    image_url: null,
    created_at: "2024-08-12T00:00:00.000Z",
  },
  {
    id: "fallback-6",
    name: "한OO 님",
    review_date: "2024-06-05",
    content:
      "입관예배부터 발인예배까지 차분하게 진행해 주셔서 큰 위로가 되었습니다.",
    image_url: null,
    created_at: "2024-06-05T00:00:00.000Z",
  },
];

/** Supabase 미설정/조회 실패 시 사용하는 기본 사이트 설정 (site-config.ts 초기값과 동일) */
const FALLBACK_SITE_SETTINGS: SiteSettings = {
  id: 1,
  site_name: "한국의전서비스",
  site_description:
    "정직과 예를 다하는 장례 상조 서비스. 24시간 전문 상담을 통해 소중한 분을 품격있게 모십니다.",
  keywords: "상조,장례,장례식장,상조회사,장례서비스,한국의전서비스",
  favicon_url: null,
  og_title: "한국의전서비스",
  og_description:
    "정직과 예를 다하는 장례 상조 서비스. 24시간 전문 상담을 통해 소중한 분을 품격있게 모십니다.",
  og_image_url: null,
  company_name: "한국의전서비스",
  owner_name: "홍길동",
  business_number: "000-00-00000",
  mos_number: "제0000-서울강남-00000호",
  address:
    "서울지부 | 서울시 강동구 양재대로 127번길 55;본사 | 경남 창원시 의창대로 211번길 2",
  phone: "1670-1024",
  fax: null,
  email: "krf.care@gmail.com",
  copyright_text: "한국의전서비스. All rights reserved.",
  updated_at: new Date().toISOString(),
};

/**
 * 사이트 SEO/OG/회사정보를 가져옵니다. (루트 레이아웃 메타데이터 + 푸터에서 사용)
 * React `cache()`로 감싸 같은 요청 안에서는 한 번만 조회합니다.
 * (generateMetadata와 Footer 컴포넌트가 각각 호출해도 DB 요청은 1회만 발생)
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSupabaseConfigured) return FALLBACK_SITE_SETTINGS;

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("[queries] getSiteSettings 실패:", error.message);
    return FALLBACK_SITE_SETTINGS;
  }

  return data ?? FALLBACK_SITE_SETTINGS;
});

/** 노출 중(is_active=true)인 배너를 display_order 순으로 가져옵니다. (메인 히어로 슬라이더) */
export async function getActiveBanners(): Promise<Banner[]> {
  if (!isSupabaseConfigured) return FALLBACK_BANNERS;

  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[queries] getActiveBanners 실패:", error.message);
    return FALLBACK_BANNERS;
  }

  return data && data.length > 0 ? data : FALLBACK_BANNERS;
}

/** 최신 공지사항 N건을 가져옵니다. (메인 페이지 미리보기용) */
export async function getLatestNotices(limit: number = 4): Promise<Notice[]> {
  if (!isSupabaseConfigured) return FALLBACK_NOTICES.slice(0, limit);

  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[queries] getLatestNotices 실패:", error.message);
    return FALLBACK_NOTICES.slice(0, limit);
  }

  return data && data.length > 0 ? data : FALLBACK_NOTICES.slice(0, limit);
}

/** 공지사항 전체 목록을 가져옵니다. (공지사항 페이지용) */
export async function getAllNotices(): Promise<Notice[]> {
  if (!isSupabaseConfigured) return FALLBACK_NOTICES;

  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[queries] getAllNotices 실패:", error.message);
    return FALLBACK_NOTICES;
  }

  return data && data.length > 0 ? data : FALLBACK_NOTICES;
}

/** 최신 고객후기 N건을 가져옵니다. (메인 페이지 슬라이더용) */
export async function getLatestReviews(limit: number = 6): Promise<Review[]> {
  if (!isSupabaseConfigured) return FALLBACK_REVIEWS.slice(0, limit);

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("review_date", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[queries] getLatestReviews 실패:", error.message);
    return FALLBACK_REVIEWS.slice(0, limit);
  }

  return data && data.length > 0 ? data : FALLBACK_REVIEWS.slice(0, limit);
}

/** 고객후기 전체 목록을 가져옵니다. (고객후기 페이지용) */
export async function getAllReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured) return FALLBACK_REVIEWS;

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("review_date", { ascending: false });

  if (error) {
    console.error("[queries] getAllReviews 실패:", error.message);
    return FALLBACK_REVIEWS;
  }

  return data && data.length > 0 ? data : FALLBACK_REVIEWS;
}

export type CreateConsultationInput = {
  name: string;
  phone: string;
  message?: string;
};

/**
 * 상담 신청을 등록합니다.
 * QuickContactBar / ContactForm / EstimateWizard 등 클라이언트 컴포넌트에서 바로 호출합니다.
 *
 * 실제 저장 및 이메일 알림 발송은 /api/consultations 라우트(서버)가 처리합니다.
 * (이메일 알림용 API 키를 클라이언트 코드에 둘 수 없어 서버를 거치도록 변경했습니다.)
 */
export async function createConsultation(
  input: CreateConsultationInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const data = (await res.json().catch(() => null)) as
      | { success: boolean; error?: string }
      | null;

    if (!res.ok || !data?.success) {
      return {
        success: false,
        error: data?.error ?? "상담 신청 접수에 실패했습니다.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[queries] createConsultation 실패:", err);
    return {
      success: false,
      error: "네트워크 오류로 상담 신청에 실패했습니다.",
    };
  }
}
