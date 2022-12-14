import Head from "next/head";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("../components/globe"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Three Globe</title>
      </Head>

      <main>
        <Globe />
        <img src="/logo-white.png" id="logo" />
      </main>
    </>
  );
}
