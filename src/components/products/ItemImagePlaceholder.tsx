import { ImageIcon } from "lucide-react";

/**
 * 품목 이미지 자리표시자.
 * 실제 사진이 준비되면 이 위치에 <Image src="..." /> 로 교체하면 됩니다.
 * (관리자가 배너처럼 이미지를 직접 업로드/교체할 수 있게 하려면
 * lib/storage.ts의 site-assets 업로드 로직을 재사용해 확장할 수 있습니다.)
 */
export default function ItemImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-1.5 rounded-t-xl border-b border-border bg-muted/60 text-muted-foreground">
      <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
      <span className="text-[10px]">{label}</span>
    </div>
  );
}
