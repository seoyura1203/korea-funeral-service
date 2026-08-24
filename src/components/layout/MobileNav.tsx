"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Phone, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string;
  onConsultClick: () => void;
};

export default function MobileNav({
  open,
  onOpenChange,
  phone,
  onConsultClick,
}: MobileNavProps) {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 md:hidden" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-background shadow-xl data-[state=open]:animate-in data-[state=open]:slide-in-from-right md:hidden"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">모바일 메뉴</Dialog.Title>
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Image
              src="/images/brand/logo.png"
              alt="한국장례서비스"
              width={857}
              height={151}
              className="h-6 w-auto"
            />
            <Dialog.Close asChild>
              <button aria-label="메뉴 닫기" className="rounded-md p-2">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex-1 px-3 py-4">
            {mainNav.map((item) => (
              <div key={item.title} className="border-b border-border/70 last:border-none">
                {item.items ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between px-2 py-4 text-left text-base font-medium"
                      onClick={() =>
                        setExpanded(expanded === item.title ? null : item.title)
                      }
                    >
                      {item.title}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expanded === item.title && "rotate-180"
                        )}
                      />
                    </button>
                    {expanded === item.title && (
                      <div className="pb-3 pl-4">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.href === "/contact" ? (
                  <button
                    type="button"
                    onClick={onConsultClick}
                    className="block w-full px-2 py-4 text-left text-base font-medium"
                  >
                    {item.title}
                  </button>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    className="block px-2 py-4 text-base font-medium"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="space-y-3 border-t border-border p-5">
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 rounded-md border border-input py-3 text-sm font-medium"
            >
              <Phone className="h-4 w-4" />
              전화 상담 {phone}
            </a>
            <Button className="w-full" size="lg" onClick={onConsultClick}>
              빠른 상담신청
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
