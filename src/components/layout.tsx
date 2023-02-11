import Navbar from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="my-8 container mx-auto">{children}</div>
    </div>
  );
}
