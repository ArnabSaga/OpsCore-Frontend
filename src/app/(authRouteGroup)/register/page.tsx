import RegisterForm from "@/components/features/auth/components/RegisterForm";

const featureItems = [
  "Create and manage multi-tenant workspaces",
  "Invite members with role-based access",
  "Track projects, tasks, and activity",
  "Centralize billing and operational workflows",
];

const RegisterPage = () => {
  return (
    <div className="relative h-dvh overflow-hidden bg-[#0B0B0B] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[240px] w-[240px] rounded-full bg-[#7F56D9]/18 blur-3xl sm:h-[300px] sm:w-[300px]" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[260px] w-[260px] rounded-full bg-[#6941C6]/18 blur-3xl sm:h-[320px] sm:w-[320px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 overflow-hidden px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,460px)] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1.1fr)_460px] xl:px-10">
        <div className="hidden h-full lg:block">
          <div className="sticky top-0 flex h-dvh items-center">
            <div className="max-w-[540px] xl:max-w-[600px]">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#94A3B8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:text-sm">
                Start your workspace in minutes
              </div>

              <h1 className="max-w-[11ch] text-[2.8rem] font-bold leading-[0.98] tracking-tight text-white xl:text-[4.4rem]">
                Build your workspace, invite your team, and manage operations from day one.
              </h1>

              <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#94A3B8] xl:text-lg">
                OpsCore helps businesses centralize projects, tasks, billing, and team workflows in
                one secure platform.
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

        <div className="h-full w-full max-w-[460px] min-h-0 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          <div className="py-2 lg:py-6">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
