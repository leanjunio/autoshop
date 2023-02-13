import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Vehicle } from "@prisma/client";
import VehicleRow from "@/components/vehicles/vehicle/row";
import { useRouter } from "next/router";

type ResponseType = {
  user: {
    name: string;
    email: string;
    phone_number: string;
    vehicles: Vehicle[];
  };
};

export const getServerSideProps: GetServerSideProps<ResponseType> = async ({
  req,
  res,
}) => {
  const session = await getServerSession(req, res, authOptions);

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: { name: true, email: true, phone_number: true, vehicles: true },
    });

    if (!user) {
      return {
        notFound: true,
      };
    }

    return { props: { user } };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

type DashboardProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Dashboard({ user }: DashboardProps) {
  const router = useRouter();

  function goToAddVehiclePage() {
    router.push(`/vehicles/add`);
  }

  return (
    <div>
      <Head>
        <title>Welcome!</title>
      </Head>
      <Layout>
        <div className="flex flex-row">
          <div className="w-1/5 py-28 px-24">
            <div>
              <p className="my-2 font-bold text-xl">{user.name}</p>
              <p className="text-sm text-gray-600">{user.phone_number}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <button className="my-5 text-sm btn btn-outline btn-xs border-base-200">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="flex w-4/5 flex-col gap-y-10 p-16">
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between">
                <p className="my-2 font-bold text-xl">Vehicles</p>
                <button
                  onClick={goToAddVehiclePage}
                  className="btn btn-accent btn-md"
                >
                  Add Vehicle
                </button>
              </div>
              <div className="my-2">
                {user.vehicles.map((vehicle) => (
                  <VehicleRow key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </div>
            <div className="p-4">
              <p className="my-2 font-bold text-xl">Invoices</p>
              <div className="my-5"></div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
