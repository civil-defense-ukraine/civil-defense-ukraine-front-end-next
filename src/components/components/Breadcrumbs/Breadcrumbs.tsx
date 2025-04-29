'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Breadcrumbs.module.scss';
import React from 'react';
import { path } from '../../utils/path'; // I assume you have your own utility functions

export const Breadcrumbs = () => {
  const pathname = usePathname();

  const segments = pathname.slice(1).split('/').filter(Boolean); // safer: remove empty parts

  return (
    <div className={styles.container}>
      <Link href="/" className="link">
        Home
      </Link>

      {segments.map((curPath, index) => {
        const normalizedPath = path.getNormalizedName(curPath);
        const currentPath = path.getCurrent(pathname, index);
        const isLast = index === segments.length - 1;

        return (
          <React.Fragment key={curPath}>
            <div className={`${styles.arrow} icon icon--arrow`} />
            {isLast ? (
              <p className={styles.text_disabled}>{normalizedPath}</p>
            ) : (
              <Link href={currentPath} className="link">
                {normalizedPath}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
