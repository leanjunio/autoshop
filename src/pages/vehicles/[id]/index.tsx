import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import { Vehicle } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

type ResponseType = {
  vehicle: Vehicle;
};

export const getServerSideProps: GetServerSideProps<ResponseType> = async ({
  query,
}) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: query.id as string,
    },
  });

  if (!vehicle) {
    return {
      notFound: true,
    };
  }

  return { props: { vehicle } };
};

type VehicleProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function VehiclePage({ vehicle }: VehicleProps) {
  const router = useRouter();

  function goToEditVehiclePage() {
    router.push(`${vehicle.id}/edit`);
  }

  return (
    <>
      <Head>
        <title>Vehicle {vehicle.plate_number}</title>
      </Head>
      <Layout>
        <div>
          <div className="mb-12">
            <p className="text-6xl font-extrabold">
              # {vehicle.vin} / {vehicle.plate_number}
            </p>
            <button
              onClick={goToEditVehiclePage}
              className="my-5 text-sm btn btn-outline btn-xs border-base-200"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
