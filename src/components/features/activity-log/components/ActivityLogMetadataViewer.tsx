type ActivityLogMetadataViewerProps = {
  metadata: Record<string, unknown> | null;
};

const formatValue = (value: unknown): string => {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

const ActivityLogMetadataViewer = ({ metadata }: ActivityLogMetadataViewerProps) => {
  if (!metadata || Object.keys(metadata).length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#94A3B8]">
        No metadata available for this activity entry.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/80">
      <div className="border-b border-white/10 px-5 py-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Metadata</h3>
      </div>

      <div className="divide-y divide-white/10">
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key} className="grid gap-3 px-5 py-4 md:grid-cols-[180px_minmax(0,1fr)]">
            <div className="text-sm font-medium text-[#CBB5FF]">{key}</div>
            <pre className="whitespace-pre-wrap wrap-break-words font-mono text-xs leading-6 text-[#CBD5E1]">
              {formatValue(value)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogMetadataViewer;
