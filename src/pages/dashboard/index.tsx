import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type ResponseType = {
  user: {
    name: string;
    email: string;
    phone_number: string;
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
      select: { name: true, email: true, phone_number: true },
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
  return (
    <div>
      <Head>
        <title>Welcome!</title>
      </Head>
      <Layout>
        <div className="flex flex-row">
          <div className="border w-1/5 py-28 px-24">
            <div>
              <p className="my-2 font-bold text-xl">{user.name}</p>
              <p className="text-sm text-gray-600">{user.phone_number}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="flex w-4/5 flex-col gap-y-10 border p-16">
            <div className="border p-4 h-full">1</div>
            <div className="border p-4">2</div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
