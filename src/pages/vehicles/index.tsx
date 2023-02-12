import Layout from "@/components/layout";
import VehicleRow from "@/components/vehicles/vehicle/row";
import prisma from "@/lib/prisma";
import { Vehicle } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

type ResponseType = {
  vehicles: Vehicle[];
};

export const getServerSideProps: GetServerSideProps<
  ResponseType
> = async () => {
  const vehicles = await prisma.vehicle.findMany();
  return {
    props: { vehicles },
  };
};

type VehiclesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function Vehicles({ vehicles }: VehiclesPageProps) {
  return (
    <>
      <Head>
        <title>Vehicles</title>
      </Head>
      <Layout>
        <div>
          <div className="mb-12">
            <p className="text-5xl font-bold">All Vehicles</p>
          </div>
          {vehicles.map((vehicle) => (
            <VehicleRow key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </Layout>
    </>
  );
}
