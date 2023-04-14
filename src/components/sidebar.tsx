import { User } from "@prisma/client";
import { FiEdit } from "react-icons/fi";

type SidebarProps = {
  user: Pick<User, "name" | "phone_number" | "email">;
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <div className="w-1/5 py-28 px-24 flex flex-col gap-y-10">
      <div>
        <div className="flex items-center justify-between flex-row w-full">
          <p className="my-2 font-bold text-xl">{user.name}</p>
          <button className="hover:opacity-80">
            <FiEdit size={17} />
          </button>
        </div>
        <p className="text-sm text-gray-600">{user.phone_number}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  )
}