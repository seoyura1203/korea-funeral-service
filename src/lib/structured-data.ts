import type { Faq } from "@/lib/faq-data";
import { productPlans } from "@/lib/products-data";
import { siteConfig } from "@/lib/site-config";

// 검색엔진·AI가 읽는 구조화 데이터(schema.org JSON-LD)를 만드는 헬퍼입니다.
// 화면에는 보이지 않고 페이지 HTML에만 들어갑니다.

const BASE_URL = "https://kuijeon.com";

// "서울지부 | 서울시 …;본사 | 경남 창원시 …" 형태의 주소 문자열을 분리합니다.
function parseAddresses(raw: string) {
  return raw
    .split(";")
    .map((v) => v.trim())
    .filter(Boolean)
    .map((v) => {
      const [label, ...rest] = v.split("|").map((s) => s.trim());
      const street = rest.length ? rest.join(" ") : label;
      return {
        "@type": "PostalAddress",
        streetAddress: street,
        addressCountry: "KR",
      };
    });
}

// 전화번호 "1670-1024" → "+82-1670-1024" (대표번호는 국가번호 뒤에 0 없이 붙입니다)
function toInternational(phone: string) {
  const digits = phone.replace(/[^0-9]/g, "");
  return digits ? `+82-${phone.replace(/^0/, "")}` : phone;
}

export function organizationJsonLd(opts?: { phone?: string; email?: string }) {
  const phone = opts?.phone || siteConfig.phone;
  const email = opts?.email || siteConfig.email;

  return {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    description: siteConfig.description,
    url: BASE_URL,
    telephone: toInternational(phone),
    email,
    address: parseAddresses(siteConfig.address),
    areaServed: { "@type": "Country", name: "대한민국" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "₩₩",
    makesOffer: productPlans.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: "KRW",
      url: `${BASE_URL}/services/products/${p.id}`,
    })),
  };
}

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
