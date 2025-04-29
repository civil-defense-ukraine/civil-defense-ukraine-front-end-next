'use client'


import classNames from 'classnames';

import { useElementOnScreen } from '../../hooks/useElementOnScreen';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './Donate.module.scss';
import { useWidth } from '../../hooks/useWidth';
import { screenWidth } from '../../constants/screenWidth';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Donate = () => {
  const { isVisible, container } = useElementOnScreen();
  const pathname  = usePathname();
  const width = useWidth();

  return (
    <section ref={container} className={styles.wrapper} id={'donate'}>
      {pathname === '/donate' && (
        <div className={styles.breadcrumbs}>
          <Breadcrumbs />
        </div>
      )}
      <div
        className={classNames(`${styles.container}`, {
          [styles.container__page]: pathname === '/donate',
        })}
      >
        <h2
          className={`${styles.heading} heading--h1 hide--left ${isVisible ? 'show' : ''}`}
        >
          Each support makes difference. Together we make Ukrainian victory
          closer!
        </h2>
        {width < screenWidth.tablet ? (
          <Link href="https://qr.mobilepay.dk/28/2/01/031/4551718616?v=1">
            <Image
              src="/imgs/mobilePay.png"
              alt="mobile pay"
              className={`${styles.img} hide--right ${isVisible ? 'show' : ''}`}
              width={280} 
              height={546}
            />
          </Link>
        )
          : (
            <Image
              src="/imgs/mobilePay.png"
              alt="mobile pay"
              className={`${styles.img} hide--right ${isVisible ? 'show' : ''}`}
              width={280} 
              height={546}
            />
          )}
      </div>
    </section>
  );
};
