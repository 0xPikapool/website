import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  imgSrc: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "bleeding edge",
    imgSrc: "/img/nft_mempool.png",
    description: (
      <>The mempool built for NFT’s... a shocking development for the space.</>
    ),
  },
  {
    title: "mev centric",
    imgSrc: "/img/polka_sniper.png",
    description: (
      <>
        Currently built for snipers (pew pew) but building for NFT projects
        next.
      </>
    ),
  },
  {
    title: "solving real problems",
    imgSrc: "/img/pika_bills.png",
    description: (
      <>
        You built the hype, you get the auction proceeds! Can I hear a bid from
        the man!
      </>
    ),
  },
];

function Feature({ title, imgSrc, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} role="img" src={imgSrc} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
