import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthenticateButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button className="btn btn-outline" onClick={signOut}>
        Logout
      </button>
    );
  }

  return (
    <button className="btn btn-outline" onClick={signIn}>
      Login
    </button>
  );
}
