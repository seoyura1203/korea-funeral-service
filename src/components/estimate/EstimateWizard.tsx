"use client";

import * as React from "react";
import { Check, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createConsultation } from "@/lib/queries";
import {
  computeEstimate,
  formatWon,
  formatWonSigned,
  initialEstimateState,
  summarizeEstimate,
  type EstimateState,
} from "@/lib/estimate";

const TOTAL_STEPS = 6;

function OptionCard({
  selected,
  onClick,
  title,
  detail,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  detail?: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start justify-between gap-3 rounded-xl border p-4 text-left transition-colors",
        selected
          ? "border-primary bg-accent/60"
          : "border-border bg-card hover:border-primary/40 hover:bg-accent/30"
      )}
    >
      <div>
        <p className="text-sm font-semibold text-foreground">
          {title}
          {badge && (
            <span className="ml-2 text-xs font-semibold text-primary">
              {badge}
            </span>
          )}
        </p>
        {detail && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {detail}
          </p>
        )}
      </div>
      <div
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background"
        )}
      >
        {selected && <Check className="h-3 w-3" />}
      </div>
    </button>
  );
}

export default function EstimateWizard() {
  const [step, setStep] = React.useState(0); // 0~5: 질문, 6: 요약/리드폼
  const [state, setState] = React.useState<EstimateState>(
    initialEstimateState
  );
  const [leadStatus, setLeadStatus] = React.useState<
    "idle" | "submitting" | "done"
  >("idle");
  const [leadError, setLeadError] = React.useState<string | null>(null);

  const estimate = computeEstimate(state);

  function update<K extends keyof EstimateState>(
    key: K,
    value: EstimateState[K]
  ) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  const canProceed: boolean[] = [
    state.burialType !== null,
    state.scale !== null,
    state.helperSupport !== null,
    state.disposables !== null,
    state.transferType !== null,
    state.cemeteryType !== null,
  ];

  const progressPercent =
    step >= TOTAL_STEPS ? 100 : Math.round((step / TOTAL_STEPS) * 100);

  async function handleLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadStatus("submitting");
    setLeadError(null);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const phone = String(form.get("phone") ?? "");

    const result = await createConsultation({
      name,
      phone,
      message: summarizeEstimate(state, estimate.total),
    });

    if (result.success) {
      setLeadStatus("done");
    } else {
      setLeadStatus("idle");
      setLeadError(
        "견적 저장 신청에 실패했습니다. 잠시 후 다시 시도해 주시거나 전화로 문의해 주세요."
      );
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-8">
      {/* 진행률 + 실시간 예상 금액 */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {step >= TOTAL_STEPS
                ? "입력 완료"
                : `질문 ${step + 1} / ${TOTAL_STEPS}`}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between rounded-xl bg-secondary/50 px-4 py-3">
        <span className="text-xs font-medium text-muted-foreground">
          현재 예상 금액
        </span>
        <span className="font-serif text-xl font-bold text-primary md:text-2xl">
          {formatWon(estimate.total)}
        </span>
      </div>

      {/* Step 0: 장법 */}
      {step === 0 && (
        <div className="mt-6">
          <h3 className="text-base font-semibold">
            장법(화장/매장)의 종류가 어떻게 되시나요?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            장법에 따라 기본 구성과 비용이 달라집니다.
          </p>
          <div className="mt-4 space-y-3">
            <OptionCard
              selected={state.burialType === "cremation"}
              onClick={() => update("burialType", "cremation")}
              title="화장으로 모실 예정입니다"
              detail="수의(국내산 면100%) · 화장용 관 · 진공 봉안함 등 기본 구성"
            />
            <OptionCard
              selected={state.burialType === "burial"}
              onClick={() => update("burialType", "burial")}
              title="매장으로 모실 예정입니다"
              detail="대마수의 · 매장용 관 · 매장용품 일체 포함"
              badge="+300,000원"
            />
          </div>
        </div>
      )}

      {/* Step 1: 규모 */}
      {step === 1 && (
        <div className="mt-6">
          <h3 className="text-base font-semibold">
            예상하시는 장례의 규모는 어느 정도인가요?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            빈소 크기와 음식 준비량을 가늠하기 위한 질문이에요. 정답은 없으니
            편하게 골라 주세요.
          </p>
          <div className="mt-4 space-y-3">
            <OptionCard
              selected={state.scale === "s1"}
              onClick={() => update("scale", "s1")}
              title="50명 미만 · 가족장례"
            />
            <OptionCard
              selected={state.scale === "s2"}
              onClick={() => update("scale", "s2")}
              title="100~150명 · 일반장례"
              badge="+400,000원"
            />
            <OptionCard
              selected={state.scale === "s3"}
              onClick={() => update("scale", "s3")}
              title="150~200명 · 중규모장례"
              badge="+800,000원"
            />
            <OptionCard
              selected={state.scale === "s4"}
              onClick={() => update("scale", "s4")}
              title="200~300명 · 대규모장례"
              badge="+1,300,000원"
            />
            <OptionCard
              selected={state.scale === "s5"}
              onClick={() => update("scale", "s5")}
              title="300명 이상 · 초대규모장례"
              badge="+2,000,000원"
            />
            <OptionCard
              selected={state.scale === "unknown"}
              onClick={() => update("scale", "unknown")}
              title="아직 잘 모르겠어요"
            />
          </div>
        </div>
      )}

      {/* Step 2: 접객 도우미 */}
      {step === 2 && (
        <div className="mt-6">
          <h3 className="text-base font-semibold">
            회사나 종교단체에서 도우미(접객관리사)를 지원받으시나요?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            지원받는 인원만큼 비용을 절감할 수 있어요. 놓치기 쉬운 부분이라
            꼭 확인해 드립니다.
          </p>
          <div className="mt-4 space-y-3">
            <OptionCard
              selected={state.helperSupport === false}
              onClick={() => {
                update("helperSupport", false);
                update("helperCount", 0);
              }}
              title="아니오 (권장 인원 그대로)"
            />
            <OptionCard
              selected={state.helperSupport === true}
              onClick={() => update("helperSupport", true)}
              title="예, 지원받습니다"
              detail="인원 1명당 50,000원 공제 (최대 4명)"
            />
          </div>
          {state.helperSupport === true && (
            <div className="mt-4 max-w-[180px]">
              <Label htmlFor="helperCount" className="text-xs">
                지원받는 도우미 인원
              </Label>
              <Input
                id="helperCount"
                type="number"
                min={0}
                max={4}
                value={state.helperCount}
                onChange={(e) =>
                  update(
                    "helperCount",
                    Math.min(4, Math.max(0, Number(e.target.value) || 0))
                  )
                }
                className="mt-1.5"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                상품 포함 인원(4명) 이상은 공제되지 않아요.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 3: 일회용품 */}
      {step === 3 && (
        <div className="mt-6">
          <h3 className="text-base font-semibold">
            조문객 접대용 일회용품(150인분)을 추가하시겠어요?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            기본 상품에는 포함되어 있지 않은 항목이에요.
          </p>
          <div className="mt-4 space-y-3">
            <OptionCard
              selected={state.disposables === false}
              onClick={() => update("disposables", false)}
              title="아니오 (직접 준비 / 불필요)"
            />
            <OptionCard
              selected={state.disposables === true}
              onClick={() => update("disposables", true)}
              title="예, 추가합니다"
              badge="+110,000원"
            />
          </div>
        </div>
      )}

      {/* Step 4: 이동 */}
      {step === 4 && (
        <div className="mt-6">
          <h3 className="text-base font-semibold">
            운명 직후, 시외로 이동이 필요한 상황인가요?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            운명하신 곳과 장례식장(또는 장지)이 다른 지역이면 &lsquo;시외
            이동&rsquo;이에요.
          </p>
          <div className="mt-4 space-y-3">
            <OptionCard
              selected={state.transferType === "local"}
              onClick={() => {
                update("transferType", "local");
                update("transferDistance", null);
              }}
              title="같은 지역(시내)에서 모심"
              detail="기본 지원 범위 내에서 추가 비용 없이 진행돼요"
            />
            <OptionCard
              selected={state.transferType === "distant"}
              onClick={() => update("transferType", "distant")}
              title="다른 지역(시외)으로 모심"
              badge="+150,000원~"
            />
          </div>
          {state.transferType === "distant" && (
            <div className="mt-4 max-w-[220px]">
              <Label htmlFor="distance" className="text-xs">
                장지까지 왕복 이동 거리 (대략, km)
              </Label>
              <Input
                id="distance"
                type="number"
                min={0}
                placeholder="예: 250"
                value={state.transferDistance ?? ""}
                onChange={(e) =>
                  update(
                    "transferDistance",
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="mt-1.5"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                왕복 200km 초과분만 km당 2,000원 추가돼요. 모르시면 비워두셔도
                괜찮아요.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 5: 장지 */}
      {step === 5 && (
        <div className="mt-6">
          <h3 className="text-base font-semibold">
            장지 형태가 결정되셨나요?
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            정해지지 않았다면 상담 때 함께 정해드려요.
          </p>
          <div className="mt-4 space-y-3">
            <OptionCard
              selected={state.cemeteryType === "nature_basic"}
              onClick={() => update("cemeteryType", "nature_basic")}
              title="자연장(목함)"
              detail="수목장·잔디장 등에 사용하는 기본 목함"
            />
            <OptionCard
              selected={state.cemeteryType === "nature_premium"}
              onClick={() => update("cemeteryType", "nature_premium")}
              title="자연장(고급 수목함)"
              badge="+300,000원"
            />
            <OptionCard
              selected={state.cemeteryType === "columbarium"}
              onClick={() => update("cemeteryType", "columbarium")}
              title="봉안당(진공유골함)"
              badge="+150,000원"
            />
            <OptionCard
              selected={state.cemeteryType === "own"}
              onClick={() => update("cemeteryType", "own")}
              title="장지용품을 이미 준비했어요"
              badge="-100,000원"
            />
            <OptionCard
              selected={state.cemeteryType === "undecided"}
              onClick={() => update("cemeteryType", "undecided")}
              title="아직 정해지지 않았습니다"
            />
          </div>
        </div>
      )}

      {/* Step 6: 요약 + 리드폼 */}
      {step === 6 && leadStatus !== "done" && (
        <div className="mt-6">
          <h3 className="text-base font-semibold">
            예상 견적(가견적)을 확인해 주세요
          </h3>
          <div className="mt-3 space-y-1.5 rounded-xl border border-border bg-secondary/30 p-4">
            {estimate.lines.map((line) => (
              <div
                key={line.label}
                className="flex items-center justify-between text-xs text-muted-foreground"
              >
                <span>{line.label}</span>
                <span
                  className={
                    line.amount < 0 ? "text-primary" : "text-foreground"
                  }
                >
                  {formatWonSigned(line.amount)}
                </span>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-sm font-bold">
              <span>예상 견적 합계</span>
              <span className="text-primary">{formatWon(estimate.total)}</span>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            위 금액은 입력 내용을 바탕으로 한 예상 견적이며, 세부 항목이
            확정된 정확한 견적은 아래 연락처로 상담 후 안내해 드립니다.
          </p>

          <form
            onSubmit={handleLeadSubmit}
            className="mt-5 space-y-4 rounded-xl border border-border p-4"
          >
            <p className="text-sm font-semibold">
              견적 저장 + 상담 신청하기
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="estimate-name">성함 *</Label>
                <Input id="estimate-name" name="name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="estimate-phone">연락처 *</Label>
                <Input
                  id="estimate-phone"
                  name="phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  required
                />
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                id="estimate-agree"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 rounded border-input"
              />
              <label htmlFor="estimate-agree">
                개인정보 수집 및 이용에 동의합니다. (견적 상담 목적으로만
                사용하며, 상담 완료 후 관련 법령에 따라 안전하게 파기됩니다.)
              </label>
            </div>
            {leadError && (
              <p className="text-xs text-destructive">{leadError}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={leadStatus === "submitting"}
            >
              {leadStatus === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> 접수 중...
                </>
              ) : (
                "견적 저장 신청하기"
              )}
            </Button>
          </form>
        </div>
      )}

      {step === 6 && leadStatus === "done" && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-border bg-secondary/30 py-14 text-center">
          <CheckCircle2 className="h-10 w-10 text-primary" />
          <p className="text-lg font-semibold">견적 저장 신청이 완료되었습니다</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            담당 상담사가 입력해 주신 연락처로 곧 연락드려, 정확한 견적과
            장례 절차 안내를 도와드리겠습니다.
          </p>
        </div>
      )}

      {/* 이전/다음 네비게이션 */}
      {leadStatus !== "done" && (
        <div className="mt-6 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            이전
          </Button>
          {step < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
              disabled={!canProceed[step]}
            >
              다음
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
