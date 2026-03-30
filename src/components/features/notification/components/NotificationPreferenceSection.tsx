import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

const NotificationPreferenceSection = ({ title, description, children }: Props) => {
  return (
    <section className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description ? <p className="mt-1 text-sm text-[#94A3B8]">{description}</p> : null}
      </div>
      {children}
    </section>
  );
};

export default NotificationPreferenceSection;
