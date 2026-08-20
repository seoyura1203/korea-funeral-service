"use client";

import * as React from "react";
import { ImageOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImageUploadField({
  name,
  label,
  hint,
  accept,
  currentUrl,
  previewClassName = "h-16 w-16 rounded-md",
}: {
  name: string;
  label: string;
  hint?: string;
  accept: string;
  currentUrl: string | null;
  previewClassName?: string;
}) {
  const [preview, setPreview] = React.useState<string | null>(currentUrl);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-center gap-4">
        <div
          className={`flex shrink-0 items-center justify-center overflow-hidden border border-dashed border-border bg-secondary ${previewClassName}`}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt={label} className="h-full w-full object-contain" />
          ) : (
            <ImageOff className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-1">
          <Input id={name} name={name} type="file" accept={accept} onChange={handleChange} />
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {/* 새 파일을 선택하지 않으면 기존 이미지 URL을 그대로 유지합니다 */}
      <input type="hidden" name={`current_${name}_url`} value={currentUrl ?? ""} />
    </div>
  );
}
