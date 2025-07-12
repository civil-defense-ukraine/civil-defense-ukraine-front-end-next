import Link from "next/link";
import styles from "./FinancialReports.module.scss";

export const FinancialReports = () => {
  const years = [2022, 2023, 2024];
  return (
    <section className={`${styles.container} max-width`} id="financial-reports">
      <h2 className={`${styles.header} heading--h2`}>Financial Reports</h2>
      <p className="section__description">
        Here you can find our financial reports. Please click to open the file.
      </p>

      <div className={styles.reports_container}>
        {years.map((year) => (
          <Link
            key={year}
            className={styles.report}
            href={`/reports/financial-report-${year}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {year}
          </Link>
        ))}
      </div>
    </section>
  );
};
