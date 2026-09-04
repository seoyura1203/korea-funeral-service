import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

import { footerLinks } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/queries";

// Supabase의 site_settings(id=1)를 서버에서 직접 조회해 렌더링하는 async 서버 컴포넌트입니다.
// (회사/사업자 정보, 저작권 문구 등 하드코딩 없이 DB 값을 그대로 사용합니다.)
export default async function Footer() {
  const settings = await getSiteSettings();

  const copyrightText =
    settings.copyright_text || `${settings.company_name}. All rights reserved.`;

  // 주소 필드(단일 텍스트)에 세미콜론(;)으로 구분해 여러 지점 주소를 저장하고,
  // 각각을 별도 줄로 렌더링합니다. (예: "서울지부 | 주소 ; 본사 | 주소")
  const addressEntries = settings.address
    ? settings.address
        .split(";")
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  return (
    <footer className="border-t border-border bg-brand-950 text-brand-100">
      <div className="container !py-8 md:!py-10">
        <div className="flex flex-col gap-3">
          <div className="min-w-0">
            <div className="font-serif text-lg font-bold text-white">
              {settings.site_name}
            </div>
            {settings.site_description && (
              <p className="mt-1 text-xs leading-relaxed text-brand-200 sm:text-sm">
                {settings.site_description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-brand-200 sm:text-sm">
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-1.5 whitespace-nowrap hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {settings.phone}
              </a>
            )}
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-1.5 whitespace-nowrap hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {settings.email}
              </a>
            )}
          </div>

          {addressEntries.length > 0 && (
            <div className="flex flex-col gap-1 text-xs text-brand-200 sm:text-sm">
              {addressEntries.map((entry, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {entry}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 이용약관 / 개인정보처리방침 등 */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 border-t border-brand-800 pt-4 text-xs">
          {footerLinks.map((link, idx) => (
            <Link
              key={link.href + idx}
              href={link.href}
              className={
                link.title === "개인정보처리방침"
                  ? "text-brand-300 underline hover:text-white"
                  : "text-brand-300 hover:text-white hover:underline"
              }
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* 사업자 정보 (Supabase site_settings 값) */}
        <div className="mt-3 space-y-0.5 text-xs leading-relaxed text-brand-400">
          <p>
            회사명 : {settings.company_name}
            {settings.owner_name && <>&nbsp;|&nbsp;대표자 : {settings.owner_name}</>}
          </p>
          {(settings.business_number || settings.mos_number) && (
            <p>
              {settings.business_number && <>사업자등록번호 : {settings.business_number}</>}
              {settings.business_number && settings.mos_number && <>&nbsp;|&nbsp;</>}
              {settings.mos_number && <>통신판매신고 : {settings.mos_number}</>}
            </p>
          )}
          {settings.fax && <p>팩스 : {settings.fax}</p>}
        </div>

        <div className="mt-3 flex flex-col gap-1.5 border-t border-brand-800 pt-3 text-[11px] leading-relaxed text-brand-300 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {copyrightText}
          </p>
          <p>
            본 페이지의 모든 이미지, 편집 디자인, 상품 구성안의 저작권은{" "}
            {settings.company_name}에 있습니다. 무단 복제 및 유사 변형을 금합니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
