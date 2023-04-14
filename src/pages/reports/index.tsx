import Layout from "@/components/layout";
import Head from "next/head";
import { IoMdArrowBack } from "react-icons/io";
import { FiPrinter, FiSave } from "react-icons/fi";

export default function Reports() {
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
              <h1 className="text-3xl font-bold">Reports</h1>
              <div className="flex gap-x-5">
                <FiSave size={25} />
                <FiPrinter size={25} />
              </div>
            </div>
          </div>
          <div className="w-full items-center">
            <select className="select select-bordered mt-10 w-full max-w-full">
              <option disabled selected>Choose a vehicle to display report</option>
              <option>Homer</option>
              <option>Marge</option>
              <option>Bart</option>
              <option>Lisa</option>
              <option>Maggie</option>
            </select>
          </div>
        </div>
      </Layout>
    </div>
  );
}