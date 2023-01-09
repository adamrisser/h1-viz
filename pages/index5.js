import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/index5.module.css";

const Onboarding = dynamic(() => import("../components/onboarding"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>H1 Onboarding</title>
      </Head>

      <main>
        <Onboarding showZoomies={true} showGlobe={false} />

        <div className={styles.onboarding}>
          <div className={styles.leftPane}>
            <img src="/logo-blue.png" className={styles.logo4} />

            <div className={styles.step}>
              <div className={styles.stepNumber}>Step 1</div>
              <div className={styles.stepTxt}>About you</div>
              <div className={styles.divider}></div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>Step 2</div>
              <div className={styles.stepTxt}>Create a Tag</div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>Step 3</div>
              <div className={styles.stepTxt}>Find some HCPs</div>
            </div>
          </div>

          <div className={styles.rightPane}>
            <div className={styles.timer}>
              This takes most people just a few minutes.
            </div>
            <h1 className={styles.header1}>Hi Maya! Welcome to HCP Universe</h1>
            <p className={styles.header2}>
              Let\'s complete your account set-up.
            </p>
            <div className={styles.inner}>
              <label className={styles.label}>What is your role*</label>
              <select className={styles.select}>
                <option className={styles.option} value="" disabled selected>
                  Select at least one role
                </option>
              </select>

              <label className={styles.label}>
                What are your countries or regions of interest?*
              </label>
              <input
                className={styles.areas}
                type="text"
                placeholder="Search countries or regions"
              />

              <div className={styles.indications}>
                <label className={styles.label}>
                  What are your specific conditions, therapies or indications?*{" "}
                </label>
                <p>Please enter at least 2 terms, avoiding abbreviations.</p>
                <input
                  className={styles.areas}
                  type="text"
                  placeholder="e.g. Multiple Sclerosis, COVID-19, Pediatric Obesity"
                />
              </div>
            </div>
            <p className={styles.required}>*Required</p>

            <button className={styles.submit}>Next: Create a tag &gt;</button>
          </div>
        </div>
      </main>
    </>
  );
}
