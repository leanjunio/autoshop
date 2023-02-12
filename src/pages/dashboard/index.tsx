import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <Layout>
          <div>
            <div className="mb-12">
              <p className="text-5xl font-bold">Dashboard</p>
            </div>
            <p className="text-lg">
              You need to be authenticated to view this page.
            </p>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>Welcome!</title>
      </Head>
      <Layout>
        <h1>This is the Dashboard page</h1>
      </Layout>
    </div>
  );
}
