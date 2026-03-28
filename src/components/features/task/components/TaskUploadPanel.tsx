"use client";

import { Paperclip, Upload } from "lucide-react";
import { useRef, useState } from "react";

import { useUploadTaskAttachment } from "@/components/features/task/hooks/useUploadTaskAttachment";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";

type TaskUploadPanelProps = {
  taskId: string;
};

const TaskUploadPanel = ({ taskId }: TaskUploadPanelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync, isPending } = useUploadTaskAttachment();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setSubmitError(null);

    try {
      await mutateAsync({
        taskId,
        file: selectedFile,
      });

      setSelectedFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to upload attachment.");
    }
  };

  return (
    <section
      data-task-attachments-card
      className="rounded-[24px] border border-white/10 bg-[#101828]/80 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center gap-2">
        <Upload className="h-5 w-5 text-[#CBB5FF]" />
        <h2 className="text-lg font-semibold text-white">Upload attachment</h2>
      </div>

      <div className="rounded-2xl border border-dashed border-white/10 bg-[#0C111D] p-5">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setSelectedFile(file);
          }}
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Paperclip className="h-4 w-4 text-[#CBB5FF]" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-white">
                {selectedFile ? selectedFile.name : "Choose a file to upload"}
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Attach task-related documents, screenshots, spreadsheets, or supporting files.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Select File
            </Button>

            <AppSubmitButton
              type="button"
              isSubmitting={isPending}
              onClick={handleUpload}
              disabled={!selectedFile}
              className="w-auto px-6"
            >
              Upload
            </AppSubmitButton>
          </div>
        </div>
      </div>

      {submitError ? (
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </div>
      ) : null}
    </section>
  );
};

export default TaskUploadPanel;
