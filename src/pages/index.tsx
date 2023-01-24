import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { ShakeSlow, ShakeFast } from "reshake";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  // Hack to get shake working on initial page load in built app
  const [shake, setShake] = useState(false);
  useEffect(() => {
    setShake(true);
  });
  return (
    <header
      className={clsx("bg-primary flex flex-wrap gap-10", "hero hero--primary", styles.heroBanner)}
    >
      <div className="container w-auto space-y-10 xl:ml-44">
        <h1 className="hero__title text-5xl font-semibold xl:text-7xl">{siteConfig.title}</h1>
        <p className="hero__subtitle text-2xl">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <ShakeSlow fixed={shake} fixedStop={true} freez={false}>
            <Link className="button button--secondary button--lg bg-secondary text-white" to="/docs">
              {"<<catch 'em all>>"}
            </Link>
          </ShakeSlow>
        </div>
      </div>
      <div className="container w-auto max-w-md xl:mr-44">
        <img
          src={"/img/pikapool.jpg"}
          className="object-cover w-440 rounded-xl shadow-2xl"
        />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="the better nft mempool"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
