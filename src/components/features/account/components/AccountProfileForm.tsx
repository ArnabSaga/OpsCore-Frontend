"use client";

import { useState } from "react";

import { useUpdateAccountProfile } from "@/components/features/account/hooks/useUpdateAccountProfile";
import type { AccountProfile } from "@/components/features/account/types/account.types";
import AccountProfilePhotoUploader from "@/components/features/account/components/AccountProfilePhotoUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  profile: AccountProfile;
};

const AccountProfileForm = ({ profile }: Props) => {
  const [name, setName] = useState(profile.name ?? "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const { mutateAsync, isPending } = useUpdateAccountProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await mutateAsync({
      name,
      photo,
      removeImage,
    });

    setPhoto(null);
  };

  const handleReset = () => {
    setName(profile.name ?? "");
    setPhoto(null);
    setRemoveImage(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <AccountProfilePhotoUploader
        image={removeImage ? null : profile.image}
        name={name || profile.name}
        onPhotoChange={(file) => {
          setPhoto(file);
          if (file) setRemoveImage(false);
        }}
        onRemoveImage={() => {
          setPhoto(null);
          setRemoveImage(true);
        }}
        isPending={isPending}
      />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-white">Profile details</h3>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Keep your name and personal account identity up to date.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Full name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="h-11 rounded-xl border-white/10 bg-[#0F172A]/80 text-white placeholder:text-[#667085]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email address</label>
            <Input
              value={profile.email}
              disabled
              className="h-11 rounded-xl border-white/10 bg-[#0F172A]/50 text-[#94A3B8]"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isPending}
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Reset
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
          >
            {isPending ? "Saving..." : "Save profile"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AccountProfileForm;
