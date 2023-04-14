import Layout from "@/components/layout";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { z } from "zod";
import toast from "react-hot-toast";
import router from "next/router";
import { Invoice, Vehicle } from "@prisma/client";
import prisma from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const validationSchema = z.object({
  id: z.string(),
  total_cost: z.number().positive(),
  vehicleId: z.string(),
  date: z.string(),
  service: z.enum(["INTERIM", "FULL", "MAJOR"])
});

type FormData = z.infer<typeof validationSchema>;

type ResponseType = {
  vehicles: Pick<Vehicle, "id" | "manufacturer" | "model">[],
  invoice: Invoice
};

export const getServerSideProps: GetServerSideProps<ResponseType> = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions);

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        name: true, email: true, phone_number: true, vehicles: {
          select: {
            id: true,
            manufacturer: true,
            model: true,
          }
        }
      },
    });

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: query.id as string,
      },
    });

    if (!user || !invoice) {
      return {
        notFound: true,
      };
    }

    return { props: { vehicles: user.vehicles, invoice } };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
type EditInvoicePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function EditInvoicePage({ vehicles, invoice }: EditInvoicePageProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      ...invoice,
      vehicleId: invoice.vehicleId as string,
      date: invoice.date.substring(0, 10),
    },
    resolver: zodResolver(validationSchema),
  });

  async function onSubmit({ id, ...updates }: FormData) {
    try {
      await fetch(`/api/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice: updates,
        })
      });
      toast.success('Invoice updated');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      router.push(`/dashboard`);
    }
  }

  return (
    <>
      <Head>
        <title>Update Invoice</title>
      </Head>
      <Layout>
        <div className="flex justify-center">
          <div className="p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl font-bold my-6">Update Invoice</h1>
              <div className="grid grid-cols-2 gap-x-10">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Total Cost</span>
                  </label>
                  <input placeholder="i.e 500" className="input input-bordered w-full max-w-xs" {...register("total_cost", {
                    valueAsNumber: true,
                  })} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.total_cost?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Vehicle</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs" {...register("vehicleId")}>
                    <option disabled selected>Choose vehicle</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>{vehicle.manufacturer} {vehicle.model}</option>
                    ))}
                  </select>
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.vehicleId?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Service</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs" {...register("service")}>
                    <option disabled selected>Choose service</option>
                    <option value="INTERIM">Interim</option>
                    <option value="FULL">Full</option>
                    <option value="MAJOR">Major</option>
                  </select>
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.vehicleId?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input placeholder="i.e 500" className="input input-bordered w-full max-w-xs" type="date" {...register("date")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.date?.message}</span>
                  </label>
                </div>
                <div className="form-control mt-10">
                  <button className="btn btn-wide btn-active btn-accent">Update Invoice</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
