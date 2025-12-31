import { Navbar } from "@/components/navbar";
import { ThemeToggle } from "@/components/theme-toggler";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
