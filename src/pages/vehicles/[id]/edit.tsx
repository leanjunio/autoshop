import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import { Vehicle } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

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

type EditVehicleProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function EditVehicle({ vehicle }: EditVehicleProps) {
  return (
    <>
      <Head>
        <title>Editing {vehicle.plate_number}</title>
      </Head>
      <Layout>
        <div>
          <div className="mb-12"></div>
        </div>
      </Layout>
    </>
  );
}
