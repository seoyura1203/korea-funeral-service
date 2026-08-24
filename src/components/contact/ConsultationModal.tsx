"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Phone, X } from "lucide-react";

import ContactForm from "@/components/contact/ContactForm";

/**
 * "무료 상담 신청" 버튼을 눌렀을 때 페이지 이동 대신 뜨는 상담 신청 팝업입니다.
 * children으로 감싼 요소가 있으면 그 요소가 트리거(버튼)가 되고(비제어 모드),
 * children 없이 open/onOpenChange만 넘기면 외부 상태로 제어할 수 있습니다.
 * (모바일 메뉴처럼, 팝업을 여는 버튼이 다른 Dialog 안에 중첩되어 있어
 * 그 Dialog가 닫힐 때 함께 언마운트되면 안 되는 경우 이 제어 모드를 사용합니다.)
 */
export default function ConsultationModal({
  children,
  phone,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  phone: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[60] max-h-[90vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-background p-6 shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 md:p-8"
          aria-describedby={undefined}
        >
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="font-serif text-xl font-bold md:text-2xl">
              상담문의
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="닫기"
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            간단한 정보만 남겨주시면 전문 상담사가 신속하게 연락드립니다. 급하신
            경우 전화로도 24시간 상담 가능합니다.
          </p>

          <div className="mt-5 rounded-lg bg-primary p-5 text-primary-foreground">
            <p className="font-serif text-base font-bold">긴급 상담이신가요?</p>
            <p className="mt-1 text-sm text-primary-foreground/80">
              24시간 언제든 아래 번호로 바로 연락해 주세요.
            </p>
            <a
              href={`tel:${phone}`}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          </div>

          <div className="mt-6">
            <ContactForm />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
