import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthenticateButton from "./auth/authenticate-button";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="navbar border-b bg-base-100 px-8">
      <div className="flex-1 gap-x-5">
        <Link className="font-bold normal-case" href="/">
          Autoshop
        </Link>
        <p className="align-middle">{session?.user?.email}</p>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-5">
          {(session?.user as any)?.role === "ADMIN" && (
            <li>
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </li>
          )}
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/reports">Reports</Link>
          </li>
          <li>
            <AuthenticateButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
