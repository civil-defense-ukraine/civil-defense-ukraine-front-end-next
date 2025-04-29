import styles from "./page.module.scss";
import { Header } from "@/components/pages/Home/components/Header";
import { AboutUs } from "@/components/pages/Home/components/AboutUs";
import { Achievements } from "@/components/pages/Home/components/Achievements";
import { WorkProcess } from "@/components/pages/Home/components/WorkProcess/WorkProcess";
import { LatestNews } from "@/components/components/LatestNews";
import { Donate } from "@/components/components/Donate";
import { Form } from "@/components/components/Form";

export default function Home() {
  return (<section className={styles.container}>
    <Header />
    <AboutUs />
    <Achievements />
    {/* <ActiveDonation /> */}
    <WorkProcess />
    <Donate />
    <LatestNews />
    <Form />
 </section>);
}
