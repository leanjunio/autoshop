import { User } from "@prisma/client";
import { useRouter } from "next/router";

type SidebarProps = {
  user: Pick<User, "name" | "phone_number" | "email">;
}

export default function Sidebar({ user }: SidebarProps) {
  const router = useRouter();

  function goToReportsPage() {
    router.push(`/reports`);
  }

  return (
    <div className="w-1/5 py-28 px-24 flex flex-col gap-y-10">
      <div>
        <p className="my-2 font-bold text-xl">{user.name}</p>
        <p className="text-sm text-gray-600">{user.phone_number}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
        <button className="my-5 text-sm btn btn-outline btn-xs border-base-200">
          Edit Profile
        </button>
      </div>
      <button onClick={goToReportsPage} className="btn btn-outline btn-accent">View Reports</button>
    </div>
  )
}