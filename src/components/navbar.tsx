import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthenticateButton from "./auth/authenticate-button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 gap-x-5">
        <Link className="font-bold normal-case" href="/">
          Autoshop
        </Link>
        <p className="align-middle">{session?.user?.email}</p>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-5">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/vehicles">Vehicles</Link>
          </li>
          <li>
            <AuthenticateButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
