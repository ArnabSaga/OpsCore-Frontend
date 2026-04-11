import LoginForm from "@/components/features/auth/components/LoginForm";

const featureItems = [
  "Workspace-based access control",
  "Project and task management",
  "Invoice and billing workflows",
  "Operational analytics and activity logs",
];

const LoginPage = () => {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#0B0B0B] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-[#7F56D9]/18 blur-3xl sm:h-[320px] sm:w-[320px]" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[#6941C6]/18 blur-3xl sm:h-[360px] sm:w-[360px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-dvh w-full max-w-7xl grid-cols-1 px-4 py-4 sm:px-6 sm:py-6 lg:h-dvh lg:grid-cols-2 lg:overflow-hidden lg:px-8 lg:py-0 xl:px-10">
        <div className="hidden h-full flex-col justify-center overflow-hidden lg:flex xl:pr-10">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-[#94A3B8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
              Multi-tenant operations platform
            </div>

            <h1 className="max-w-[12ch] text-4xl font-bold leading-[1.05] tracking-tight text-white xl:text-6xl">
              Run workspaces, projects, tasks, and billing from one control center.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#94A3B8] xl:text-lg">
              OpsCore helps teams manage operations with clarity, speed, and secure access across
              every workspace.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

        <div className="flex min-h-dvh items-center justify-center py-4 sm:py-6 lg:min-h-0 lg:h-full lg:justify-end lg:overflow-hidden lg:py-8">
          <div className="flex w-full max-w-lg items-center justify-center xl:max-w-136">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
