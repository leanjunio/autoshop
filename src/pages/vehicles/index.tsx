import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";

export async function getServerSideProps() {
  const vehicles = await prisma.vehicle.findMany();
  return {
    props: { vehicles },
  };
}

type VehiclesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function Vehicles({ vehicles }: VehiclesPageProps) {
  return (
    <>
      <Head>
        <title>Vehicles Page</title>
      </Head>
      <Layout>
        <div>
          {vehicles.map((vehicle) => (
            <p key={vehicle.id}>vin: {vehicle.vin}</p>
          ))}
        </div>
      </Layout>
    </>
  );
}
