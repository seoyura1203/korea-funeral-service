"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Award, Clock, ShieldCheck, Trophy, Users, X } from "lucide-react";

// "오늘 하루 열지 않기"를 눌렀을 때 이 날짜(YYYY-MM-DD)를 저장해두고, 같은 날에는 팝업을 열지 않습니다.
import { markPopupClosed } from "@/lib/popup-state";

const STORAGE_KEY = "master-popup-hidden-date";
const BG = "#FEFBF6";

const credentials = [
  { icon: Award, label: "대한민국 전통 장례 명장" },
  { icon: ShieldCheck, label: "전국 장례지도사협회 정회원" },
  { icon: Users, label: "장례 명장 선정위원" },
  { icon: Clock, label: "20년 이상 장례 실무 경력" },
  { icon: Trophy, label: "장례 대상 수상" },
];

// 모바일에서는 칩(태그)으로 가로 배열하기 위해 문구를 줄여서 씁니다.
const mobileCredentials = [
  "전통 장례 명장",
  "장례지도사협회 정회원",
  "명장 선정위원",
  "실무 20년+",
  "장례 대상 수상",
];

function todayString() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function CredentialList({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {credentials.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2 text-[13px] text-brand-900">
          <Icon className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}

export default function MasterPopup() {
  // 처음부터 열린 상태로 시작해서, 페이지가 뜨자마자 바로 보이게 합니다.
  // (팝업은 포털로 브라우저에서만 그려지므로 서버 렌더와 어긋나지 않습니다.)
  const [open, setOpen] = React.useState(true);

  // "오늘 하루 열지 않기"를 누른 날이면 바로 닫습니다. (화면이 그려지기 전에 실행)
  React.useLayoutEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === todayString()) {
        setOpen(false);
        markPopupClosed();
      }
    } catch {
      /* 저장소를 못 쓰면 그대로 열어둡니다 */
    }
  }, []);

  // 팝업이 닫히면 히어로 말풍선 애니메이션을 시작시킵니다.
  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) markPopupClosed();
  };

  const hideToday = () => {
    try {
      localStorage.setItem(STORAGE_KEY, todayString());
    } catch {
      /* 저장소를 못 쓰는 환경이면 그냥 닫기만 합니다 */
    }
    handleOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[70] max-h-[92vh] w-[92vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-2xl shadow-xl md:max-w-[720px]"
          style={{ backgroundColor: BG }}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">
            장례 명장이 직접 운영하는 한국의전서비스
          </Dialog.Title>

          <Dialog.Close
            aria-label="닫기"
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-brand-900 shadow-sm backdrop-blur transition hover:bg-white"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>

          {/* ===== 모바일: 사진 위 / 글자는 사진 아래쪽에 살짝 겹침 ===== */}
          <div className="md:hidden">
            {/* 사진 높이는 화면 높이에 맞춰 최대 46vh로 제한해서 팝업이 화면을 넘지 않게 합니다 */}
            <div className="relative aspect-[4/5] max-h-[42vh] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/popup/master-mobile.jpg"
                alt="대한민국 전통 장례 명장"
                className="h-full w-full object-cover object-top"
                fetchPriority="high"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
                style={{
                  backgroundImage: `linear-gradient(to top, ${BG} 10%, ${BG}00 100%)`,
                }}
              />
            </div>
            <div className="relative -mt-5 px-4 pb-4 text-center">
              <p className="text-[14px] font-medium text-brand-600">
                장례 명장이 직접 운영합니다.
              </p>
              <p className="mt-1 whitespace-nowrap font-serif text-[22px] font-bold leading-[1.3] text-brand-900">
                슬픈 이별, 아름다운 배웅.
              </p>
              <p className="mt-2 text-[14px] leading-[1.7] text-neutral-700">
                마지막 배웅에도 품격의 차이가 있습니다.
                <br />
                대한민국 장례 명장이 함께 하겠습니다.
              </p>
              <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
                {mobileCredentials.map((label) => (
                  <li
                    key={label}
                    className="rounded-full bg-brand-100 px-2.5 py-1 text-[13px] text-brand-900"
                  >
                    {label}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={hideToday}
                className="mt-3 text-[13px] text-neutral-500 underline-offset-2 hover:underline"
              >
                오늘 하루 열지 않기
              </button>
            </div>
          </div>

          {/* ===== PC: 배경 이미지 위에 오른쪽 영역에 글자 배치 ===== */}
          <div
            className="relative hidden aspect-[3/2] w-full bg-cover bg-left md:block"
            style={{ backgroundImage: "url(/images/popup/master-desktop.jpg)" }}
          >
            <div className="absolute inset-y-0 left-[42%] right-10 flex flex-col justify-center">
              <p className="text-[14px] font-medium text-brand-600">
                장례 명장이 직접 운영합니다.
              </p>
              <p className="mt-3 font-serif text-[34px] font-bold leading-[1.3] text-brand-900">
                슬픈 이별,
                <br />
                아름다운 배웅.
              </p>
              <p className="mt-4 text-[14px] leading-[1.8] text-neutral-700">
                마지막 배웅에도 품격의 차이가 있습니다.
                <br />
                대한민국 장례 명장이 함께 하겠습니다.
              </p>
              <CredentialList className="mt-6 grid gap-2.5 rounded-xl bg-brand-100/70 px-5 py-4" />
            </div>
            <button
              type="button"
              onClick={hideToday}
              className="absolute bottom-4 right-10 text-[12px] text-neutral-500 underline-offset-2 hover:underline"
            >
              오늘 하루 열지 않기
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
