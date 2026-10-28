import { Award, Clock, ShieldCheck, Trophy, Users } from "lucide-react";

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

/**
 * "장례 명장이 직접 운영합니다" 소개 섹션.
 * 예전에는 메인 진입 시 팝업으로 떴지만, 문의 전환을 방해할 수 있어
 * 상품 안내(가격) 바로 아래의 일반 섹션으로 옮겼습니다.
 *
 * - 데스크톱(lg 이상): 가로 1920px 풀 이미지(master-pc-full-v2.jpg)를 섹션 배경으로 깔고
 *   오른쪽에 글자를 올립니다.
 * - 모바일/태블릿: 사진 위, 글자 아래의 세로 구성(master-mobile.jpg)입니다.
 */
export default function MasterIntroSection() {
  return (
    <section style={{ backgroundColor: BG }}>
      {/* ===== 모바일/태블릿: 사진 위 / 글자는 사진 아래쪽에 살짝 겹침 ===== */}
      <div className="mx-auto max-w-[480px] pb-10 lg:hidden">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/popup/master-mobile.jpg"
            alt="대한민국 전통 장례 명장"
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
            style={{
              backgroundImage: `linear-gradient(to top, ${BG} 10%, ${BG}00 100%)`,
            }}
          />
        </div>
        <div className="relative -mt-12 px-4 text-center">
          <p className="text-[17px] font-medium text-brand-600">
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
        </div>
      </div>

      {/* ===== PC: 가로 1920 풀 이미지 배경 + 오른쪽 글자 ===== */}
      {/* 높이는 600px로 고정하고, 이미지는 최대 1440px(=600px × 2.4)까지만 보여줍니다.
          큰 모니터에서 좌우에 남는 공간은 섹션 배경색(#FEFBF6)으로 채워집니다. */}
      <div
        className="relative mx-auto hidden h-[600px] w-full max-w-[1440px] bg-cover bg-center bg-no-repeat lg:block"
        style={{ backgroundImage: "url(/images/popup/master-pc-full-v2.jpg)" }}
      >
        <div className="absolute inset-y-0 left-[50%] right-[6%] flex flex-col justify-center">
          <p className="text-[18px] font-medium text-brand-600 xl:text-[20px]">
            장례 명장이 직접 운영합니다.
          </p>
          <p className="mt-3 whitespace-nowrap font-serif text-[32px] font-bold leading-[1.3] text-brand-900 xl:text-[40px]">
            슬픈 이별, 아름다운 배웅.
          </p>
          <p className="mt-4 text-[16px] leading-[1.8] text-neutral-700 xl:text-[17px]">
            마지막 배웅에도 품격의 차이가 있습니다.
            <br />
            대한민국 장례 명장이 함께 하겠습니다.
          </p>
          <ul className="mt-6 grid max-w-[460px] gap-2.5 rounded-xl bg-brand-100/70 px-6 py-5 xl:mt-8 xl:gap-3">
            {credentials.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[15px] text-brand-900 xl:text-[16px]"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
