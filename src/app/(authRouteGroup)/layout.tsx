const AuthRouteGroupLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-linear-to-br">
      {children}
    </div>
  );
};

export default AuthRouteGroupLayout;
