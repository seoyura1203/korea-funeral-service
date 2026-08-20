/**
 * 셀프 견적 계산 로직.
 * 참고: enosh.or.kr의 셀프견적 마법사 구조를 참고해 자체 상품 구성/가격 체계로
 * 재구성했습니다. 실제 최종 견적은 화면에서 안내하는 것처럼 상담을 통해 확정됩니다.
 */

export type BurialType = "cremation" | "burial";
export type ScaleTier = "s1" | "s2" | "s3" | "s4" | "s5" | "unknown";
export type TransferType = "local" | "distant";
export type CemeteryType =
  | "nature_basic"
  | "nature_premium"
  | "columbarium"
  | "own"
  | "undecided";

export type EstimateState = {
  burialType: BurialType | null;
  scale: ScaleTier | null;
  helperSupport: boolean | null;
  helperCount: number;
  disposables: boolean | null;
  transferType: TransferType | null;
  transferDistance: number | null;
  cemeteryType: CemeteryType | null;
};

export const initialEstimateState: EstimateState = {
  burialType: null,
  scale: null,
  helperSupport: null,
  helperCount: 0,
  disposables: null,
  transferType: null,
  transferDistance: null,
  cemeteryType: null,
};

// 장례상품(무빈소장 200만원 / 일반장 250만원) 기준과 맞춘 기본 구성 가격입니다.
export const BASE_PRICE = 2_500_000;

const SCALE_LABEL: Record<ScaleTier, string> = {
  s1: "50명 미만 · 가족장례",
  s2: "100~150명 · 일반장례",
  s3: "150~200명 · 중규모장례",
  s4: "200~300명 · 대규모장례",
  s5: "300명 이상 · 초대규모장례",
  unknown: "아직 잘 모르겠어요",
};

const SCALE_PRICE: Record<ScaleTier, number> = {
  s1: 0,
  s2: 400_000,
  s3: 800_000,
  s4: 1_300_000,
  s5: 2_000_000,
  unknown: 400_000,
};

const CEMETERY_LABEL: Record<CemeteryType, string> = {
  nature_basic: "자연장(목함)",
  nature_premium: "자연장(고급 수목함)",
  columbarium: "봉안당(진공유골함)",
  own: "장지용품 자체 준비",
  undecided: "아직 미정",
};

const CEMETERY_PRICE: Record<CemeteryType, number> = {
  nature_basic: 0,
  nature_premium: 300_000,
  columbarium: 150_000,
  own: -100_000,
  undecided: 0,
};

export type EstimateLine = { label: string; amount: number };

export type EstimateResult = {
  total: number;
  lines: EstimateLine[];
};

export function computeEstimate(state: EstimateState): EstimateResult {
  const lines: EstimateLine[] = [];

  // 장법 (기본 구성)
  lines.push({
    label:
      state.burialType === "burial"
        ? "매장 기본 구성 (수의·관·매장용품)"
        : "화장 기본 구성 (수의·관·진공봉안함)",
    amount: BASE_PRICE + (state.burialType === "burial" ? 300_000 : 0),
  });

  // 예상 규모
  if (state.scale) {
    const amount = SCALE_PRICE[state.scale];
    if (amount !== 0) {
      lines.push({
        label: `빈소 운영 규모 (${SCALE_LABEL[state.scale]})`,
        amount,
      });
    }
  }

  // 접객 도우미 공제
  if (state.helperSupport && state.helperCount > 0) {
    const count = Math.min(state.helperCount, 4);
    lines.push({
      label: `접객 도우미 지원 공제 (${count}명)`,
      amount: -50_000 * count,
    });
  }

  // 조문객 일회용품
  if (state.disposables) {
    lines.push({ label: "조문객 접대용 일회용품(150인분)", amount: 110_000 });
  }

  // 이동/장의차량
  if (state.transferType === "distant") {
    let amount = 150_000;
    if (state.transferDistance && state.transferDistance > 200) {
      amount += (state.transferDistance - 200) * 2_000;
    }
    lines.push({ label: "시외 이동 및 장의차량 추가 지원", amount });
  }

  // 장지 용품
  if (state.cemeteryType) {
    const amount = CEMETERY_PRICE[state.cemeteryType];
    if (amount !== 0) {
      lines.push({
        label: CEMETERY_LABEL[state.cemeteryType],
        amount,
      });
    }
  }

  const total = Math.max(
    0,
    lines.reduce((sum, l) => sum + l.amount, 0)
  );

  return { total, lines };
}

export function formatWon(amount: number): string {
  return `${Math.round(amount).toLocaleString("ko-KR")}원`;
}

export function formatWonSigned(amount: number): string {
  if (amount === 0) return "0원";
  const sign = amount > 0 ? "+" : "-";
  return `${sign}${Math.abs(Math.round(amount)).toLocaleString("ko-KR")}원`;
}

/** 상담 신청 메시지에 포함할 선택 요약 텍스트 (consultations.message 필드용) */
export function summarizeEstimate(state: EstimateState, total: number): string {
  const parts: string[] = ["[셀프 견적]"];
  parts.push(
    state.burialType === "burial" ? "매장" : "화장"
  );
  if (state.scale) parts.push(SCALE_LABEL[state.scale]);
  if (state.helperSupport) parts.push(`도우미지원 ${state.helperCount}명`);
  if (state.disposables) parts.push("일회용품 추가");
  if (state.transferType === "distant") {
    parts.push(
      state.transferDistance
        ? `시외이동(왕복 ${state.transferDistance}km)`
        : "시외이동"
    );
  }
  if (state.cemeteryType) parts.push(CEMETERY_LABEL[state.cemeteryType]);
  parts.push(`예상 견적 ${formatWon(total)}`);
  return parts.join(" / ");
}
