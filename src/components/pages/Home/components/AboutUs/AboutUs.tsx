import styles from "./AboutUs.module.scss";
import { ReadMore } from "../../../../components/Buttons/ReadMore";
import { AboutUsImg } from "./AboutUsImg";

export const AboutUs = () => {
  return (
    <section className={styles.container}>
      <AboutUsImg />

      <div className={`${styles.text}`}>
        <h2 className={`${styles.title} heading--h2`}>About Us</h2>
        <p>
          Civil Defense Ukraine is a charitable organization founded in
          February-March 2022, when the war began. Our mission is to assist
          civilians in Ukraine who took up arms to defend the country. That`s
          why we are called Civil Defense. <br /> We now live in Denmark, but we
          are Ukrainians, dedicating our free time to support the people of our
          native country.
        </p>

        <ReadMore pathname="about-us" />
      </div>
    </section>
  );
};
