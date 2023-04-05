import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Invoice, User, Vehicle } from "@prisma/client";
import VehicleRow from "@/components/vehicles/vehicle/row";
import { useRouter } from "next/router";
import InvoiceRow from "@/components/invoices/row";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/sidebar";

type BasicUser = Pick<User, "name" | "phone_number" | "email">;

type ResponseType = {
  currentUser: BasicUser;
  users: BasicUser[];
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
        role: true,
        phone_number: true,
        vehicles: {
          include: {
            invoices: true
          }
        }
      }
    });

    if (user && user.role === "ADMIN") {
      const users = await prisma.user.findMany({
        where: {
          role: "USER",
        },
        select: {
          name: true,
          phone_number: true,
          email: true,
          status: true,
        },
      });
      return { props: { currentUser: user, users } };
    }
  }

  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  };
};

type DashboardProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function AdminDashboard({ currentUser, users }: DashboardProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div>
        <Head>
          <title>Admin Dashboard</title>
        </Head>
        <Layout>
          <div className="flex flex-row">
            <h1>Loading...</h1>
          </div>
        </Layout>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>Welcome</title>
        </Head>
        <Layout>
          <div className="flex flex-row">
            <Sidebar user={currentUser} />
            <div className="flex w-4/5 flex-col gap-y-10 p-16">
              <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between">
                  <p className="my-2 font-bold text-xl">Customers</p>
                  <button
                    className="btn btn-accent btn-md"
                  >
                    Add Customer
                  </button>
                </div>
                <div className="my-2">
                  {/* {user.vehicles.map((vehicle) => (
                    <VehicleRow key={vehicle.id} vehicle={vehicle} />
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }



}
