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
      style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}
      className={clsx("hero hero--primary", styles.heroBanner)}
    >
      <div className="container" style={{ width: "auto" }}>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <ShakeSlow fixed={shake} fixedStop={true} freez={false}>
            <Link className="button button--secondary button--lg" to="/docs">
              {"<<catch 'em all>>"}
            </Link>
          </ShakeSlow>
        </div>
      </div>
      <div className="container" style={{ width: "auto" }}>
        <img
          src={"/img/pikapool.png"}
          style={{ width: "440px", objectFit: "cover" }}
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
