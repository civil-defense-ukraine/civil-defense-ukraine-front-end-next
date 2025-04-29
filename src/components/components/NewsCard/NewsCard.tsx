'use client'

import React, { CSSProperties, useState } from 'react';
import { News } from '../../types/News';
import styles from './NewsCard.module.scss';
import { getNormalized } from '../../utils/getNormalized';
import { ReadMore } from '../Buttons/ReadMore';
import { useWidth } from '../../hooks/useWidth';
import classNames from 'classnames';
import Image from 'next/image';

type Props = {
  newsData: News;
  style?: CSSProperties;
};

export const NewsCard: React.FC<Props> = ({ newsData, style }) => {
  const { image, type, title, link, publicationDate, text } = newsData;
  const width = useWidth();

  const [loaded, setIsLoaded] = useState(false);
  const date = new Date(publicationDate);
  const normalizedText = getNormalized.slicedText(
    text,
    180,
  );

  return (
    <article className={styles.container} style={style}>
      <div
        className={classNames(`${styles.img}`, {
          skeleton: !loaded,
        })}
      >
        <Image
          className={styles.img}
          src={image}
          alt={title}
          onLoad={() => setIsLoaded(true)}
          width={500}
          height={300} 
        />
      </div>
      <div className={styles.info}>
        <div className={styles.tag}>{type}</div>

        <div className={styles.info__container}>
          <div className={styles.heading}> 
          <h3 className={`heading--h3`}>
            {getNormalized.slicedText(
              getNormalized.title(title),
              width < 1240 ? 48 : 65,
            )}
          </h3>
          </div>
          <p className={styles.mainText}>
            {normalizedText.split('<br/>').map(textEl => (
              <React.Fragment key={textEl.slice(5)}>
                {textEl} <br />
              </React.Fragment>
            ))}
          </p>
          <div className={styles.bottom}>
            <div className={styles.date}>
              <div className={styles.date__icon}>
                <div className={`icon icon--small icon--calendar`}></div>
              </div>
              <p> {getNormalized.date(date)} </p>
            </div>
            <ReadMore pathname={`/news/${link}`} />
          </div>
        </div>
      </div>
    </article>
  );
};
