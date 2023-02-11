import Layout from "@/components/layout";
import VehicleRow from "@/components/vehicles/vehicle/row";
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
          <p className="text-2xl font-bold">All Vehicles</p>
          {vehicles.map((vehicle) => (
            <VehicleRow key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </Layout>
    </>
  );
}
