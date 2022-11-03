import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/index4.module.css";

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
        <Globe showZoomies={true} showGlobe={false} />

        <div className={styles.tagLine}>
          <img src="/logo-white.png" className={styles.logo4} />
          <div className={styles.text}>
            Connecting{" "}
            <span>
              the world
              <br />
              with
            </span>{" "}
            the right doctors.
          </div>
        </div>
      </main>
    </>
  );
}
