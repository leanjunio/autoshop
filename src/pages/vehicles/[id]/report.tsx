import Layout from "@/components/layout";
import ReportTable from "@/components/table/report";
import prisma from "@/lib/prisma";
import { prepareReport } from "@/utils/report";
import { Report } from "@/utils/types/report";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { FiPrinter, FiSave } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";

type Response = {
  reports: Report[];
  label: string;
}

export const getServerSideProps: GetServerSideProps<Response> = async ({ req, res, query }) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: query.id as string
    },
    include: {
      invoices: true
    }
  });

  if (!vehicle) {
    return {
      notFound: true,
    };
  }

  const reports = prepareReport(vehicle.invoices)

  return {
    props: { reports, label: `${vehicle.manufacture_year} ${vehicle.manufacturer} ${vehicle.model}` }
  }
};
type ReportsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function VehicleReportPage({ reports, label }: ReportsPageProps) {
  return (
    <div>
      <Head>
        <title>Reports</title>
      </Head>
      <Layout>
        <div className="flex flex-col justify-center">
          <div className="w-full">
            <div className="flex justify-between items-center mt-20">
              <IoMdArrowBack size={25} />
              <h1 className="text-3xl font-bold">Report for {label}</h1>
              <div className="flex gap-x-5">
                <FiSave size={25} />
                <FiPrinter size={25} />
              </div>
            </div>
            <ReportTable reports={reports} />
          </div>
        </div>
      </Layout>
    </div>
  );
}