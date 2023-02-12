import Layout from "@/components/layout";
import Head from "next/head";

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Welcome!</title>
      </Head>
      <Layout>
        <div className="flex flex-row">
          <div className="border w-1/5 py-28 px-24">
            <div>User Info</div>
          </div>
          <div className="flex w-4/5 flex-col gap-y-10 border p-16">
            <div className="border p-4 h-full">1</div>
            <div className="border p-4">2</div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
