type Props = { count: number };

const NotificationBadge = ({ count }: Props) => {
  if (count <= 0) return null;

  return (
    <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#7F56D9] px-1.5 text-[10px] font-bold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default NotificationBadge;
