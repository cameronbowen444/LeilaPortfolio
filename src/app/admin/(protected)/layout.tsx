import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import AdminHeader from "@/components/admin/AdminHeader";
import { getAdminUser } from "@/lib/admin";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // Not logged into Clerk at all
  if (!userId) {
    redirect("/admin/login");
  }

  // Logged into Clerk, but email is not in ADMIN_EMAILS
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/unauthorized");
  }

  return (
    <div className="min-h-screen bg-[#101010] text-[#F4EFE6]">
      <AdminHeader
        name={admin.fullName}
        email={admin.email}
      />

      <main>
        {children}
      </main>
    </div>
  );
}