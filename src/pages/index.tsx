import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { ShakeLittle } from "reshake";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  // Hack to get shake working on initial page load in built app
  const [shake, setShake] = useState(false);
  useEffect(() => {
    setShake(true);
  });
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <ShakeLittle fixed={shake} fixedStop={true} freez={false}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              {"<<catch 'em all>>"}
            </Link>
          </ShakeLittle>
        </div>
      </div>
      <div className="container">
        <img src={"/img/pikapool.png"} style={{ height: "300px" }} />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
