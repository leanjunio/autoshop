import Layout from "@/components/layout";
import Head from "next/head";
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

export default function AddVehiclePage() {
  function onSubmit() {}

  return (
    <>
      <Head>
        <title>Add Vehicle</title>
      </Head>
      <Layout>
        <div></div>
      </Layout>
    </>
  );
}
