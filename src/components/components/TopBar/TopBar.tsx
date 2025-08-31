"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./TopBar.module.scss";
import classNames from "classnames";
import { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";
import { useWidth } from "../../hooks/useWidth";
import Image from "next/image";
import { screenWidth } from "../../constants/screenWidth";
// import { Logo } from '../Logo';

const getLinkClass = (isActive: boolean) =>
  classNames(`${styles.nav__link} link`, {
    "link--active": isActive,
  });

export const TopBar = () => {
  const { showMenu, setShowMenu } = useContext(MenuContext);
  const width = useWidth();
  const pathname = usePathname();
  console.log(width, screenWidth.tablet);

  const getBarClass = (order: number) =>
    classNames(`${styles.bar} ${styles[`bar__${order}`]}`, {
      [styles[`bar__${order}__selected`]]: showMenu,
    });

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setShowMenu(false);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/news", label: "News" },
    { href: "/reports", label: "Reports" },
  ];

  return (
    <header
      className={classNames(`${styles.topBar}`, {
        [styles.topBar__menu]: showMenu,
      })}
    >
      <div className={styles.topBar__content}>
        <Link
          href="/"
          onClick={() => setShowMenu(false)}
        >
          <Image
            className="logo"
            src={`${
              !showMenu ? "/imgs/logo-yellow.svg" : "/imgs/logo-blue.svg"
            }`}
            alt="CDU logo"
            width={100}
            height={50}
          />
        </Link>

        <ul className={`${styles.topBar__nav} ${styles.nav}`}>
          {links.map((link) => (
            <li
              key={link.href}
              className={styles.nav__item}
            >
              <Link
                href={link.href}
                className={getLinkClass(pathname === link.href)}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#contact-form"
          scroll={true}
          className={classNames(
            `button button--transparent ${styles.topBar__button}`,
            {
              [styles.topBar__button__menu]: showMenu,
            }
          )}
          onClick={handleLinkClick}
        >
          <p>CONTACT US</p>
          <div className="icon icon--button icon--send icon--send--yellow"></div>
        </Link>

        { (width < screenWidth.tablet) && (
          <div
            className={styles.icon1}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <div
              className={classNames(`${styles.hamburger}`, {
                [styles.hamburger__selected]: showMenu,
              })}
            >
              {Array.from(Array(4).keys()).map((_, index) => (
                <span
                  key={index}
                  className={getBarClass(index)}
                ></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
