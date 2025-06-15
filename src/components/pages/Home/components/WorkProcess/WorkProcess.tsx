import styles from "./WorkProcess.module.scss";

const process = [
  "Receive a request",
  "Announce a fundraiser",
  "Participate in fundraising activities",
  "Buy the equipment",
  "Deliver equipment to Ukraine",
  "Receive a photo report ",
  "Publish a gratitude report ",
  "Provide documentation to auditors",
];

export const WorkProcess = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={`${styles.header} heading--h2`}>How We Work</h2>
        <div
          className={`${styles.img} ${styles.img_1} ${styles.img_1_loaded}`}
        ></div>
        <ul className={`${styles.items} ${styles.items_1}`}>
          {process.slice(0, 4).map((item, index) => (
            <li
              className={styles.item}
              key={item}
            >
              <div className={`${styles.item__index} heading--h2`}>
                {index + 1}
              </div>
              <p className={styles.item__text}>{item}</p>
            </li>
          ))}
        </ul>
        <div
          className={`${styles.img} ${styles.img_2} ${styles.img_2_loaded}`}
        ></div>
        <ul className={`${styles.items} ${styles.items_2}`}>
          {process.slice(4).map((item, index) => (
            <li
              className={styles.item}
              key={item}
            >
              <div className={`${styles.item__index} heading--h2`}>
                {index + 5}
              </div>
              <p className={styles.item__text}>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
