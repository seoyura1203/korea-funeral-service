import Link from "next/link";
import { Phone } from "lucide-react";

export default function MobileStickyBar({ phone }: { phone: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background shadow-[0_-4px_12px_rgba(0,0,0,0.06)] md:hidden">
      <a
        href={`tel:${phone}`}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-primary"
      >
        <Phone className="h-4 w-4" />
        전화 상담
      </a>
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
      >
        빠른 상담신청
      </Link>
    </div>
  );
}
