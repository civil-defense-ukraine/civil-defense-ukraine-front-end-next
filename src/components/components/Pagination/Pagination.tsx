'use client'

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { useWidth } from '../../hooks/useWidth';
import { getPagination } from '../../utils/getPageSearchParams';

export const Pagination = ({ numberOfPages }: { numberOfPages: number }) => {
  const searchParams = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1); // Get the page from the search params
  const width = useWidth();

  const handleClick = (value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(value));

    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${newSearchParams.toString()}`
    );

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  };

  const pages = useMemo(() => {
    if (width > 625) {
      return getPagination.bigScreen(numberOfPages, currentPage);
    }
    return getPagination.smallScreen(numberOfPages, currentPage);
  }, [currentPage, numberOfPages, width]);

  return (
    <div className={styles.container}>
      <button
        className={classNames(`${styles.arrowButton}`, {
          [styles.arrowButton__disabled]: currentPage <= 1,
        })}
        onClick={() => {
          handleClick(currentPage - 1 >= 1 ? currentPage - 1 : 1);
        }}
        disabled={currentPage <= 1}
      >
        <div
          className={classNames(
            `${styles.arrowButton__icon} icon icon--little icon--arrow`,
            {
              [styles.arrowButton__icon__disabled]: currentPage <= 1,
            }
          )}
        ></div>
        {width > 540 && <p>Previous</p>}
      </button>
      <div className={styles.buttons}>
        {pages.map(page => {
          return (
            <div
              key={page}
              className={classNames(`${styles.buttonP}`, {
                [styles.buttonP__selected]:
                  page === currentPage || (page === 1 && currentPage === 0),
              })}
              onClick={() => {
                handleClick(page);
              }}
            >
              {page}
            </div>
          );
        })}
      </div>
      <button
        className={classNames(`${styles.arrowButton}`, {
          [styles.arrowButton__disabled]: currentPage >= numberOfPages,
        })}
        disabled={currentPage >= numberOfPages}
        onClick={() => {
          handleClick(
            currentPage + 1 >= numberOfPages ? numberOfPages : currentPage + 1
          );
        }}
      >
        {width > 540 && <p>Next</p>}
        <div
          className={classNames(
            `${styles.arrowButton__icon} icon icon--little icon--arrow`,
            {
              [styles.arrowButton__icon__disabled]: currentPage >= numberOfPages,
            }
          )}
        ></div>
      </button>
    </div>
  );
};
