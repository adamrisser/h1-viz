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
        <Globe
          showZoomies={false}
          showGlobe={true}
          className="globe-app-orange"
        />
        <div id="logo-on-drugs">
          <img src="/logo-white.png" />
        </div>
      </main>
    </>
  );
}
