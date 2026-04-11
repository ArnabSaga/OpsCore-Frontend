import ChangePasswordForm from "@/components/features/auth/components/ChangePasswordForm";

const featureItems = [
  "Enhanced account security",
  "Instant password updates",
  "Zero downtime management",
  "Secure session continuation",
];

const ChangePasswordPage = () => {
  return (
    <div className="relative h-dvh overflow-hidden bg-[#0B0B0B] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[220px] w-[220px] rounded-full bg-[#7F56D9]/18 blur-3xl sm:h-[280px] sm:w-[280px]" />
        <div className="absolute bottom-[-120px] right-[-90px] h-[240px] w-[240px] rounded-full bg-[#6941C6]/18 blur-3xl sm:h-[300px] sm:w-[300px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto grid h-full w-full max-w-[1360px] grid-cols-1 overflow-hidden px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:gap-8 lg:px-8 xl:grid-cols-[minmax(0,1.05fr)_420px] xl:px-10">
        <div className="hidden h-full lg:block">
          <div className="flex h-dvh items-center">
            <div className="max-w-[520px]">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#94A3B8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:text-sm">
                Secure password management
              </div>

              <h1 className="max-w-[10.5ch] text-[2.5rem] font-bold leading-[0.98] tracking-tight text-white xl:text-[4rem]">
                Keep your credentials secure and up-to-date.
              </h1>

              <p className="mt-5 max-w-[540px] text-[15px] leading-7 text-[#94A3B8] xl:text-lg">
                Regularly updating your password is a key step in protecting your account and
                workspace data. Update your password securely within seconds.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {featureItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/3 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#12B76A]" />
                      <p className="text-sm leading-6 text-[#E5E7EB]">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full items-center justify-center py-4 sm:py-6 lg:justify-end lg:py-6">
          <div className="w-full max-w-[400px]">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
