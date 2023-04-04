import Layout from "@/components/layout";
import Head from "next/head";

export default function Reports() {
  return (
    <div>
      <Head>
        <title>Welcome!</title>
      </Head>
      <Layout>
        <div className="flex justify-center">
          <div className="p-5">
            <h1 className="text-3xl font-bold">Reports</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
}