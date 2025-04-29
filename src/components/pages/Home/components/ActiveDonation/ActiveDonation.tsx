import Image from "next/image";
import { useElementOnScreen } from "../../../../hooks/useElementOnScreen";
import styles from "./ActiveDonation.module.scss";

export const ActiveDonation = () => {
  const { isVisible, container } = useElementOnScreen();

  return (
    <section
      ref={container}
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <h2 className="heading--h2">Active Donations</h2>
        <div className={styles.gridBox}>
          <div
            className={`${styles.gridBox__logo} hide--left ${
              isVisible ? "show" : ""
            }`}
          ></div>
          <Image
            className={`${styles.gridBox__img} hide--right ${
              isVisible ? "show" : ""
            }`}
            loading="lazy"
            src="/imgs/activeDonation.png"
            alt="current goal"
            width={500}
            height={300}
          />
        </div>
      </div>
    </section>
  );
};
