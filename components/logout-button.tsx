"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    // middleware will now block /admin
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-foreground transition cursor-pointer"
    >
      Logout
    </button>
  );
}
