import Footer from "@/components/shared/layout/Footer";
import Header from "@/components/shared/layout/Header";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScrollProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}
