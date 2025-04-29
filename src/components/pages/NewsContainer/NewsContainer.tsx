'use client'

import styles from './NewsContainer.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useEffect } from 'react';

export const NewsContainer = ({children} : {children: React.ReactNode}) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section>
      <div className={styles.header}>
        <Breadcrumbs />
      </div>
      {children}
    </section>
  );
};
