"use client";

import Link from "next/link"; // Import Link from next/link
import styles from "./Menu.module.scss";
import classNames from "classnames";
import { SocialMedia } from "../SocialMedia";
import { useContext, useEffect } from "react";
import { useWidth } from "../../hooks/useWidth";
import { MenuContext } from "../../context/MenuContext";

export const Menu = () => {
  const width = useWidth();
  const { setShowMenu } = useContext(MenuContext);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    if (width >= 834) {
      document.body.classList.remove("no-scroll");
      setShowMenu(false);
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [width]);

  const linkClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setShowMenu(false);
  };

  // Function to get link class dynamically based on the active route using window.location.pathname
  const getLinkClass = (href: string) =>
    classNames(`${styles.nav__link} link link--menu`, {
      "link--menu--active": window.location.pathname === href, // Apply active class based on current path
    });

  return (
    <section
      id="menu"
      className={`${styles.container}`}
    >
      <ul className={`${styles.nav}`}>
        <li className={styles.nav__item}>
          <Link
            href="/"
            className={getLinkClass("/")}
            onClick={linkClick}
          >
            Home
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link
            href="/about-us"
            className={getLinkClass("/about-us")}
            onClick={linkClick}
          >
            About Us
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link
            href="/news"
            className={getLinkClass("/news")}
            onClick={linkClick}
          >
            News
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link
            href="/reports"
            className={getLinkClass("/reports")}
            onClick={linkClick}
          >
            Reports
          </Link>
        </li>
      </ul>

      <SocialMedia classname="blue" />
    </section>
  );
};
