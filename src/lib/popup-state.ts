"use client";

import { useSyncExternalStore } from "react";

// 메인 페이지 팝업(MasterPopup)이 닫혔는지를 다른 컴포넌트(히어로 말풍선 등)와 공유하는 작은 저장소입니다.
// 팝업이 닫히는 순간 true가 되고, 이를 구독 중인 컴포넌트가 즉시 반응합니다.
let closed = false;
const listeners = new Set<() => void>();

export function markPopupClosed() {
  if (closed) return;
  closed = true;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function usePopupClosed() {
  return useSyncExternalStore(
    subscribe,
    () => closed,
    () => false
  );
}
