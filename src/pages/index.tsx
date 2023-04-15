import Layout from "@/components/layout";
import Navbar from "@/components/navbar";
import Head from "next/head";
import { FiAward, FiClock, FiDollarSign, FiGlobe, FiHeart, FiShield } from "react-icons/fi";

export default function HomePage() {
  return (
    <div className="h-screen">
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <section className="bg-gray-50 sm:h-4/6">
        <div
          className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-4/5 lg:items-center"
        >
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Autoshop Services
              <strong className="font-extrabold text-accent sm:block">
                Easy Expense Tracking.
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl sm:leading-relaxed">
              Request your trustworthy auto shop to better serve you and become an Autoshop affiliate.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-accent px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/get-started"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-accent shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                href="/about"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 sm:h-4/6">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="my-10 text-center font-extrabold">
            <p className="text-3xl">We offer a complete range of services</p>
          </div>
          <div className="grid grid-rows-2 grid-cols-3 px-40 w-3/4 text-center">
            <div className="flex flex-col p-10">
              <FiDollarSign className="my-5 w-full text-accent" size={40} />
              <p className="font-bold text-lg my-4">Enhance resale</p>
              <p className="text-sm">Print your personalized reports for top dollar resale value on your vehicle</p>
            </div>
            <div className="flex flex-col p-10">
              <FiHeart className="my-5 w-full text-accent" size={40} />
              <p className="font-bold text-lg my-4">Encourage loyalty</p>
              <p className="text-sm">Easily manage your loyalty program to maintain customer retention</p>
            </div>
            <div className="flex flex-col p-10">
              <FiShield className="my-5 w-full text-accent" size={40} />
              <p className="font-bold text-lg my-4">Establish trust</p>
              <p className="text-sm">We only acquire vehicle data with permission from our customers</p>
            </div>
            <div className="flex flex-col p-10">
              <FiGlobe className="my-5 w-full text-accent" size={40} />
              <p className="font-bold text-lg my-4">Save the planet</p>
              <p className="text-sm">Monitor vehicle cost to prolong vehicle life, reducing manufacturing production to slow down climate change</p>
            </div>
            <div className="flex flex-col p-10">
              <FiAward className="my-5 w-full text-accent" size={40} />
              <p className="font-bold text-lg my-4">Compare and compete</p>
              <p className="text-sm">Compare customer spending, shop performance, and common repair issues to other shops within the network</p>
            </div>
            <div className="flex flex-col p-10">
              <FiClock className="my-5 w-full text-accent" size={40} />
              <p className="font-bold text-lg my-4">Get your time back</p>
              <p className="text-sm">Print business use reports for; insuance costs, license fees, fuel cost, mechcanical services. repairs and more!</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}