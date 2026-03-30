"use client";

import { Camera, Trash2, UserCircle2 } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from '@/components/ui/input';

type Props = {
  image: string | null;
  name: string;
  onPhotoChange: (file: File | null) => void;
  onRemoveImage: () => void;
  isPending?: boolean;
};

const AccountProfilePhotoUploader = ({
  image,
  name,
  onPhotoChange,
  onRemoveImage,
  isPending = false,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const initials =
    name
      ?.trim()
      ?.split(" ")
      ?.slice(0, 2)
      ?.map((part) => part[0]?.toUpperCase())
      ?.join("") || "U";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="mb-4 text-sm font-semibold text-white">Profile photo</p>

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          {image ? (
            <Image
              src={image}
              alt={name || "Profile"}
              width={28}
              height={28}
              className="h-28 w-28 rounded-full border border-white/10 object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-[#7F56D9]/30 to-[#6941C6]/20 text-3xl font-semibold text-white shadow-lg">
              {initials || <UserCircle2 className="h-12 w-12" />}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-white">{name || "Your profile"}</p>
          <p className="max-w-xs text-xs leading-5 text-[#94A3B8]">
            Upload a clear profile image to personalize your workspace presence.
          </p>
        </div>

        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
        />

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={isPending}
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Camera className="mr-2 h-4 w-4" />
            Upload photo
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onRemoveImage}
            disabled={isPending}
            className="rounded-xl border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/15"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountProfilePhotoUploader;
