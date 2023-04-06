import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { BasicUser } from "@/utils/types/users";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/layout";

const validationSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  year_joined: z.number().gte(2000),
  notes: z.string().nullable(),
  street: z.string().nullable(),
  city: z.string().nullable(),
  province: z.string().nullable(),
  postal_code: z.string().nullable(),
  discount: z.number().nullable(),
});

type FormData = z.infer<typeof validationSchema>;

type ResponseType = {
  user: BasicUser;
}

export const getServerSideProps: GetServerSideProps<ResponseType> = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session?.user?.email) {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        name: true, email: true, phone_number: true, status: true, id: true
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: query.id as string,
      },
      select: {
        name: true, email: true, phone_number: true, status: true, id: true,
        year_joined: true, notes: true, street: true, city: true, province: true, postal_code: true, discount: true
      }
    });

    if (!currentUser || !user) {
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
}

type EditUserPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function EditUserPage({ user }: EditUserPageProps) {
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
    defaultValues: user,
    resolver: zodResolver(validationSchema),
  });
  const router = useRouter();

  const { data: session, status } = useSession();

  async function onSubmit(data: FormData) {
    try {
      await fetch(`/api/admin/user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          updates: data,
        })
      });
      toast.success('user updated');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      router.push(`/admin/dashboard`);
    }
  }

  if (session) {
    console.log({ user })
    return (
      <>
        <Head>
          <title>Update User</title>
        </Head>
        <Layout>
          <div className="flex justify-center">
            <div className="p-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-3xl font-bold my-6">Update User</h1>
                <div className="grid grid-cols-2 gap-x-32">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input placeholder="e.g John Smith" className="input input-bordered w-full max-w-xs" {...register("name")} />
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.name?.message}</span>
                    </label>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input placeholder="e.g john@gmail.com" className="input input-bordered w-full max-w-xs" {...register("email")} />
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.email?.message}</span>
                    </label>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input placeholder="e.g (905) 123 4567" className="input input-bordered w-full max-w-xs" {...register("phone_number")} />
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.phone_number?.message}</span>
                    </label>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Year Joined</span>
                    </label>
                    <input placeholder="e.g 2003" className="input input-bordered w-full max-w-xs" {...register("year_joined")} />
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.year_joined?.message}</span>
                    </label>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Street</span>
                    </label>
                    <input placeholder="e.g 100 Hunter Rd" className="input input-bordered w-full max-w-xs" {...register("street")} />
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.street?.message}</span>
                    </label>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">City</span>
                    </label>
                    <input placeholder="e.g Toronto" className="input input-bordered w-full max-w-xs" {...register("city")} />
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.city?.message}</span>
                    </label>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Province/State</span>
                    </label>
                    <input placeholder="e.g 2003" className="input input-bordered w-full max-w-xs" {...register("province")} />
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.province?.message}</span>
                    </label>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Postal Code</span>
                    </label>
                    <input placeholder="e.g 2003" className="input input-bordered w-full max-w-xs" {...register("postal_code")} />
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.postal_code?.message}</span>
                    </label>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Discount</span>
                    </label>
                    <input placeholder="e.g 2003" className="input input-bordered w-full max-w-xs" {...register("discount")} />
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.discount?.message}</span>
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
    )
  }

  return (
    <div>Denied</div>
  )
}