import VerifyEmailForm from "@/components/features/auth/components/VerifyEmailForm";

const featureItems = [
  "Protect access before first login",
  "Secure activation for every workspace",
  "Faster onboarding with guided verification",
  "Seamless transition into your OpsCore flow",
];

const VerifyEmailPage = () => {
  return (
    <div className="relative h-dvh overflow-hidden bg-[#0B0B0B] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[240px] w-[240px] rounded-full bg-[#7F56D9]/18 blur-3xl sm:h-[300px] sm:w-[300px]" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[260px] w-[260px] rounded-full bg-[#6941C6]/18 blur-3xl sm:h-[320px] sm:w-[320px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 overflow-hidden px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,460px)] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,1.1fr)_460px] xl:px-10">
        {/* <div className="min-h-0 lg:hidden">
          <div className="flex flex-col justify-center px-0 pb-4 pt-5 sm:pb-5 sm:pt-6">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#94A3B8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:text-sm">
                Secure account verification
              </div>

              <h1 className="max-w-[13ch] text-[2rem] font-bold leading-[1.02] tracking-tight text-white sm:text-[2.4rem]">
                Confirm your email and activate your OpsCore access.
              </h1>

              <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#94A3B8] sm:text-[15px] sm:leading-7">
                Enter the verification code we sent to your email to complete account setup and
                continue securely.
              </p>
            </div>
          </div>
        </div> */}

        <div className="hidden h-full lg:block">
          <div className="sticky top-0 flex h-dvh items-center">
            <div className="max-w-[540px] xl:max-w-[600px]">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#94A3B8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:text-sm">
                Secure account verification
              </div>

              <h1 className="max-w-[11ch] text-[2.8rem] font-bold leading-[0.98] tracking-tight text-white xl:text-[4.35rem]">
                Confirm your email and unlock your workspace securely.
              </h1>

              <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#94A3B8] xl:text-lg">
                We sent a verification code to your email address. Enter it to activate your
                account, protect access, and continue into OpsCore with confidence.
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
          <div className="pb-4 pt-1 sm:pb-5 lg:py-6">
            <VerifyEmailForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
