import Layout from "@/components/layout";
import VehicleRow from "@/components/vehicles/vehicle/row";
import prisma from "@/lib/prisma";
import { Vehicle } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

type ResponseType = {
  vehicles: Vehicle[];
};

export const getServerSideProps: GetServerSideProps<ResponseType> = async ({
  req,
  res,
}) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { vehicles: [] } };
  }

  const vehicles = await prisma.vehicle.findMany();
  return {
    props: { vehicles },
  };
};

type VehiclesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function Vehicles({ vehicles }: VehiclesPageProps) {
  const { data: session } = useSession();

  if (!session) {
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
            <p className="text-lg">
              You need to be authenticated to view this page.
            </p>
          </div>
        </Layout>
      </>
    );
  }
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
