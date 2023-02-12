import Navbar from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="m-10 h-full w-full">{children}</div>
    </div>
  );
}
