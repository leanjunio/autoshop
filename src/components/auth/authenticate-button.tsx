import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthenticateButton() {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={signOut}>Logout</button>;
  }

  return <button onClick={signIn}>Login</button>;
}
