import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div data-theme="cupcake">
      <Layout />
    </div>
  );
}
