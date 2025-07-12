import Link from "next/link";
import styles from "./FinancialReports.module.scss";

export const FinancialReports = () => {
  const years = [2022, 2023, 2024];
  return (
    <section
      className={`${styles.container} max-width`}
      id="financial-reports"
    >
      <h2 className={`${styles.header} heading--h2`}>Financial Reports</h2>
      <p className="section__description">
        At Civil Defense Ukraine, transparency is one of our core values. We are
        committed to showing our supporters how their generous contributions are
        managed and used.
      </p>

      <p>
        Each year, we publish a detailed financial report outlining our income,
        administrative costs, and how funds are distributed to support Ukraine.
        All reports are prepared in accordance with Danish fundraising
        legislation and independently audited to ensure full compliance and
        trustworthiness.
      </p>

      <h3 className="heading--h3">Available Reports:</h3>
      <ul className={styles.reports_container}>
        {years.map((year) => (
          <li
            key={year}
            className={styles.report}
          >
            <Link
              className={styles.report}
              href={`/reports/financial-report-${year}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {year}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <p>These reports provide insight into:</p>
        <ul>
          <li>The total donations received and how they were sourced</li>
          <li>Operational and administrative costs</li>
          <li>
            How the funds were used to provide aid such as medical supplies,
            transportation, drones, and essential frontline equipment
          </li>
        </ul>
        <p>
          We are proud that the vast majority of funds go directly to support
          those affected by the war. Your support makes a real and measurable
          difference.
        </p>
      </div>
    </section>
  );
};
