import Layout from "@/components/layout";
import Head from "next/head";

export default function Dashboard() {
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
