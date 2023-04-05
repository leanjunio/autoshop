import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Invoice, Vehicle } from "@prisma/client";
import VehicleRow from "@/components/vehicles/vehicle/row";
import { useRouter } from "next/router";
import InvoiceRow from "@/components/invoices/row";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/sidebar";

type ResponseType = {
  user: {
    name: string;
    email: string;
    phone_number: string;
    vehicles: Vehicle[];
  };
  invoices: Invoice[]
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
      select: {
        name: true,
        email: true,
        phone_number: true,
        vehicles: {
          include: {
            invoices: true
          }
        }
      }
    });

    if (!user) {
      return {
        notFound: true,
      };
    }

    const invoices = user.vehicles.map(vehicle => vehicle.invoices).flat();

    return { props: { user, invoices } };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

type DashboardProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Dashboard({ user, invoices }: DashboardProps) {
  const { data: session } = useSession();


  const router = useRouter();

  function goToAddVehiclePage() {
    router.push(`/vehicles/add`);
  }

  function goToAddInvoicePage() {
    router.push(`/invoices/add`);
  }

  return (
    <div>
      <Head>
        <title>Welcome!</title>
      </Head>
      <Layout>
        <div className="flex flex-row">
          <Sidebar user={user} />
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
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between">
                <p className="my-2 font-bold text-xl">Invoices</p>
                <button
                  onClick={goToAddInvoicePage}
                  className="btn btn-accent btn-md"
                >
                  Add Invoice
                </button>
              </div>
              <div className="my-2">
                {invoices.map((invoice) => (
                  <InvoiceRow key={invoice.id} invoice={invoice} vehicle={user.vehicles.find(v => v.id === invoice.vehicleId) as Vehicle} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
