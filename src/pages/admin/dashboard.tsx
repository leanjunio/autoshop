import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/sidebar";
import { BasicUser } from "@/utils/types/users";
import UsersTable from "@/components/table/users";

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
        id: true,
        status: true,
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
          id: true,
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
                  <p className="my-2 font-bold text-xl">Users</p>
                  <button
                    className="btn btn-accent btn-md"
                  >
                    Add User
                  </button>
                </div>
                <div className="mt-10">
                  <UsersTable users={users} />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }



}
