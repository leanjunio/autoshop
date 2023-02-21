import Layout from "@/components/layout";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  plate_number: z.string().trim().min(1, 'Plate Number is required'),
  vin: z.string().trim().min(1, 'VIN Number is required'),
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
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
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
          <div className="p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl font-bold my-6">Add Vehicle</h1>
              <div className="grid grid-cols-2 gap-x-32">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">VIN Number</span>
                  </label>
                  <input placeholder="Enter VIN Number" className="input input-bordered w-full max-w-xs" {...register("vin")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.vin?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Plate Number</span>
                  </label>
                  <input placeholder="Enter Plate Number" className="input input-bordered w-full max-w-xs" {...register("plate_number")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.plate_number?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Vehicle Manufacturer</span>
                  </label>
                  <input placeholder="e.g Toyota" className="input input-bordered w-full max-w-xs" {...register("manufacturer")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.manufacturer?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Vehicle Model</span>
                  </label>
                  <input placeholder="e.g Corrolla" className="input input-bordered w-full max-w-xs" {...register("model")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.model?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Vehicle Body</span>
                  </label>
                  <input placeholder="e.g Sedan" className="input input-bordered w-full max-w-xs" {...register("body")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.body?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Transmission Type</span>
                  </label>
                  <input placeholder="e.g Automatic" className="input input-bordered w-full max-w-xs" {...register("transmittion_type")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.transmittion_type?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Engine Size (Litres)</span>
                  </label>
                  <input placeholder="e.g 8.2" className="input input-bordered w-full max-w-xs" {...register("engine_size", {
                    valueAsNumber: true,
                  })} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.engine_size?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Year Manufactured</span>
                  </label>
                  <input placeholder="e.g 2005" className="input input-bordered w-full max-w-xs" {...register("manufacture_year", {
                    valueAsNumber: true,
                  })} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.manufacture_year?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Year Purchased</span>
                  </label>
                  <input placeholder="e.g 2020" className="input input-bordered w-full max-w-xs" {...register("purchase_year", {
                    valueAsNumber: true,
                  })} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.purchase_year?.message}</span>
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Driver Name</span>
                  </label>
                  <input placeholder="e.g Max Thomas" className="input input-bordered w-full max-w-xs" {...register("driver_name")} />
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.driver_name?.message}</span>
                  </label>
                </div>
                <div className="form-control mt-10">
                  <button className="btn btn-wide btn-active btn-accent">Add Vehicle</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
