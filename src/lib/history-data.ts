/**
 * 회사소개(/about) 연혁 및 주요 이력 데이터.
 * 메인 페이지의 HistorySection과 /about 페이지가 동일한 데이터를 공유합니다.
 */
export type HistoryItem = {
  image: string;
  title: string;
  subtitle: string;
};

export const history: HistoryItem[] = [
  {
    image: "/images/history/01-master-cert.jpg",
    title: "전통장례명장",
    subtitle: "(전명제21-명238호)",
  },
  {
    image: "/images/history/02-sewol.jpg",
    title: "故 세월호 사고 국민장",
    subtitle: "빈소설치(경남도청) 및 기획 총괄관리",
  },
  {
    image: "/images/history/03-roh-moohyun.jpg",
    title: "故 노무현 대통령 국민장",
    subtitle: "빈소설치(경남도청) 및 기획 총괄관리",
  },
  {
    image: "/images/history/04-cheonan.jpg",
    title: "故 천안함 46용사 해군장",
    subtitle: "빈소설치(경남도청) 및 기획 총괄관리",
  },
  {
    image: "/images/history/05-kim-daejung.jpg",
    title: "故 김대중 대통령 국민장",
    subtitle: "빈소설치(경남도청) 및 기획 총괄관리",
  },
  {
    image: "/images/history/06-kim-youngsam.jpg",
    title: "故 김영삼 대통령 국민장",
    subtitle: "빈소설치(경남도청) 및 기획 총괄관리",
  },
];
