// components/LatestArticle.tsx
import React, { SyntheticEvent, useState } from 'react';
import styles from './LatestArticle.module.scss';
import { getNormalized } from '../../../../utils/getNormalized';
import { News } from '../../../../types/News';
import classNames from 'classnames';
import Image from 'next/image'; 
import { ReadMore } from '../../../../components/Buttons/ReadMore';
import { useWidth } from '../../../../hooks/useWidth';
import { screenWidth } from '../../../../constants/screenWidth';

type Props = {
  newsData: News;
};

export const LatestArticle: React.FC<Props> = ({ newsData }) => {
  const { image, type, title, publicationDate, text, link } = newsData;
  const date = new Date(publicationDate);
  const [loaded, setLoaded] = useState(false);
  const width = useWidth();
  const normalizedText = getNormalized.slicedText(
    text,
    width < screenWidth.desktop ? 180 : 300,
  );
  const splitNormalizedText = normalizedText.split(/<\/?br\s*\/?>/i);
  return (
    <article className={styles.container}>
      <div
        className={classNames(styles.img, {
          skeleton: !loaded,
        })}
      >
        <Image
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = '/imgs/default/news.png'; 
            e.currentTarget.classList.add(styles.img__default);
          }}
          className={styles.img}
          src={image}
          alt={title}
          onLoadingComplete={() => setLoaded(true)}
          width={500}
          height={300}
          layout="responsive"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.tag}>{type}</div>

        <h3 className={`${styles.heading} heading--h2`}>
          {getNormalized.slicedText(
            getNormalized.title(title),
            width < 1240 ? 48 : 97,
          )}
        </h3>
        <p className={styles.mainText}>
          {splitNormalizedText.map((textEl, index) => (
            <React.Fragment key={index}>
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
    </article>
  );
};
