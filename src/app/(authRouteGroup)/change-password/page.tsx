import ChangePasswordForm from "@/components/features/auth/components/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B0B] text-white">
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#7F56D9]/20 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[360px] w-[360px] rounded-full bg-[#6941C6]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.08),transparent_30%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="hidden flex-col justify-center px-8 py-16 lg:flex xl:px-16">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-[#94A3B8] backdrop-blur-xl">
              Secure password management
            </div>

            <h1 className="text-4xl font-bold leading-tight text-white xl:text-6xl">
              Keep your credentials secure and up-to-date.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#94A3B8] xl:text-lg">
              Regularly updating your password is a key step in protecting your account and workspace
              data. Update your password securely within seconds.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Enhanced account security",
                "Instant password updates",
                "Zero downtime management",
                "Secure session continuation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/3 p-4 backdrop-blur-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#12B76A]" />
                    <p className="text-sm text-[#E5E7EB]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
