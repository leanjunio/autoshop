import Layout from "@/components/layout";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  plate_number: z.string(),
  vin: z.string(),
  model: z.string().optional(),
  manufacturer: z.string().optional(),
  body: z.string().optional(),
  transmittion_type: z.string().optional(),
  engine_size: z.number().optional(),
  manufacture_year: z.number().optional(),
  purchase_year: z.number().optional(),
  driver_name: z.string().optional(),
  ac: z.boolean().optional(),
});

type FormData = z.infer<typeof validationSchema>;

export default function AddVehiclePage() {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  function onSubmit(data: unknown) {
    console.log(data);
  }

  return (
    <>
      <Head>
        <title>Add Vehicle</title>
      </Head>
      <Layout>
        <div className="flex justify-center">
          <div className="w-2/4 p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl font-bold my-6">Add Vehicle</h1>
              <div className="grid grid-cols-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">VIN Number</span>
                  </label>
                  <input type="text" placeholder="Enter VIN Number" className="input input-bordered w-full max-w-xs" {...register("vin")} />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Plate Number</span>
                  </label>
                  <input type="text" placeholder="Enter Plate Number" className="input input-bordered w-full max-w-xs" {...register("plate_number")} />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Vehicle Manufacturer</span>
                  </label>
                  <input type="text" placeholder="e.g Toyota" className="input input-bordered w-full max-w-xs" {...register("manufacturer")} />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Vehicle Model</span>
                  </label>
                  <input type="text" placeholder="e.g Corrolla" className="input input-bordered w-full max-w-xs" {...register("model")} />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Vehicle Body</span>
                  </label>
                  <input type="text" placeholder="e.g Sedan" className="input input-bordered w-full max-w-xs" {...register("body")} />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Transmission Type</span>
                  </label>
                  <input type="text" placeholder="e.g Automatic" className="input input-bordered w-full max-w-xs" {...register("transmittion_type")} />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Engine Size (Litres)</span>
                  </label>
                  <input type="text" placeholder="e.g 8.2" className="input input-bordered w-full max-w-xs" {...register("engine_size")} />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Year Manufactured</span>
                  </label>
                  <input type="text" placeholder="e.g 2005" className="input input-bordered w-full max-w-xs" {...register("manufacture_year")} />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Year Purchased</span>
                  </label>
                  <input type="text" placeholder="e.g 2020" className="input input-bordered w-full max-w-xs" {...register("purchase_year")} />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Driver Name</span>
                  </label>
                  <input type="text" placeholder="e.g Max Thomas" className="input input-bordered w-full max-w-xs" {...register("driver_name")} />
                </div>
              </div>
              <div className="form-control mt-10 w-1/5">
                <button className="btn btn-active btn-accent" type="submit">Add Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
