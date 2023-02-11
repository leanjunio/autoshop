import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Autoshop
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
