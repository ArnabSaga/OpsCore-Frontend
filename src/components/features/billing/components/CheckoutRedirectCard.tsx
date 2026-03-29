type CheckoutRedirectCardProps = {
  title?: string;
  description?: string;
};

const CheckoutRedirectCard = ({
  title = "Redirecting to Stripe",
  description = "Please wait while we prepare your secure checkout experience.",
}: CheckoutRedirectCardProps) => {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-6 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-[#94A3B8]">{description}</p>
    </div>
  );
};

export default CheckoutRedirectCard;
