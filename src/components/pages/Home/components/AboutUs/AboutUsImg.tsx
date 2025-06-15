"use client";

import classNames from "classnames";
import styles from "./AboutUs.module.scss";
import { useElementOnScreen } from "../../../../hooks/useElementOnScreen";
import Image from "next/image";

export const AboutUsImg = () => {
  const { isVisible, container } = useElementOnScreen();

  return (
    <div
      ref={container}
      className={classNames(`${styles.img} hide--left`, {
        show: isVisible,
      })}
    >
      <Image
        src="/imgs/about-us/about-us1.jpg"
        alt="Civil Defense Ukraine Team"
        className={styles.img}
        height={314}
        width={523}
        quality={100}
      />
    </div>
  );
};
