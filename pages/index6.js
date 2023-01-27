import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/index6.module.css";
import Chart from "../taxonomy";

const Onboarding = dynamic(() => import("../components/onboarding"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default function Home(data = {}) {
  return (
    <>
      <Head>
        <title>H1 Taxonomy</title>
      </Head>

      <main className={styles.main}>
        <Chart data={data} />
      </main>
    </>
  );
}

let baseUrl = "http://localhost:3000";

export async function getServerSideProps(context) {
  if (process.env.Vercel_URL) {
    baseUrl = process.env.Vercel_URL;
  }
  console.log(baseUrl);
  const res = await fetch(`${baseUrl}/api/taxonomy`);
  const data = await res.json();

  return {
    props: data,
  };
}
