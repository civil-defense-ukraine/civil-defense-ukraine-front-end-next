import styles from "./AboutUs.module.scss";
import { Form } from "../../components/Form";
import React from "react";
import { AboutUsInfo } from "./components/AboutUsInfo";
import { Location } from "./components/Location/Location";
import { TeamSection } from "./components/TeamSeaction";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { FinancialReports } from "./components/FinancialReports/FinancialReports";

const AboutUs = () => {
  return (
    <section>
      <div className={styles.header}>
        <div className={styles.max_width}>
          <Breadcrumbs />
        </div>
      </div>
      <section className={styles.max_width}>
        <AboutUsInfo />
      </section>
      <FinancialReports />
      <TeamSection />
      <Location />

      <Form />
    </section>
  );
};

export default AboutUs;
