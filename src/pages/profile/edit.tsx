import Layout from "@/components/layout";
import prisma from "@/lib/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { BasicUser } from "@/utils/types/users";

const validationSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  street: z.string(),
  city: z.string(),
  province: z.string(),
  postal_code: z.string(),
  year_joined: z.number(),
  phone_number: z.string(),
  notes: z.string(),
});

type Response = {
  user: BasicUser;
}

export const getServerSideProps: GetServerSideProps<Response> = async ({
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
        id: true,
        name: true,
        email: true,
        phone_number: true,
        street: true,
        city: true,
        province: true,
        postal_code: true,
        year_joined: true,
        notes: true,
        status: true,
      }
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
      destination: "/dashboard",
      permanent: false,
    },
  };
};

type EditVehiclePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type FormData = z.infer<typeof validationSchema>;

export default function EditProfilePage({ user }: EditVehiclePageProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: user
  });

  function onSubmit(e: FormData) {
    console.log(e);
  }

  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <Layout>
        <div className="flex justify-center">
          <div className="p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl font-bold my-6">Update Profile</h1>
              <div className="grid grid-cols-2 gap-x-5">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input placeholder="Enter Name" className="input input-bordered w-full max-w-xs" {...register("name")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.name?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input placeholder="Enter Email" className="input input-bordered w-full max-w-xs" {...register("email")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Street</span>
                  </label>
                  <input placeholder="Enter Street" className="input input-bordered w-full max-w-xs" {...register("street")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.street?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input placeholder="Enter City" className="input input-bordered w-full max-w-xs" {...register("city")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.city?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Province</span>
                  </label>
                  <input placeholder="Enter Province" className="input input-bordered w-full max-w-xs" {...register("province")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.province?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input placeholder="Enter Phone Number" className="input input-bordered w-full max-w-xs" {...register("phone_number")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.phone_number?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Postal Code</span>
                  </label>
                  <input placeholder="Enter Postal Code" className="input input-bordered w-full max-w-xs" {...register("postal_code")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.postal_code?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Year Joined</span>
                  </label>
                  <input placeholder="Enter Year Joined" className="input input-bordered w-full max-w-xs" {...register("year_joined")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.year_joined?.message}</span>
                  </label>
                </div>
                <div className="col-start-1 col-end-3">
                  <label className="label">
                    <span className="label-text">Notes</span>
                  </label>
                  <textarea className="textarea w-full textarea-bordered" placeholder="Enter Notes" {...register("notes")}></textarea>
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.notes?.message}</span>
                  </label>
                </div>
                <div className="form-control mt-10">
                  <button className="btn btn-wide btn-active btn-accent">Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
