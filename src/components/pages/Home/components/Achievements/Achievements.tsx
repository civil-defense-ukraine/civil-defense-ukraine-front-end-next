'use client'

import styles from './Achievements.module.scss';
import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import { CounterUpPage } from './CounterUpPage';
import classNames from 'classnames';
import { achievements } from '../../../../constants/achievements';

export const Achievements = () => {
  const { isVisible, container } = useElementOnScreen();

  return (
    <section
      ref={container}
      className={classNames(`${styles.container} hide--bottom ${styles.container__bgImg}`, {
        show: isVisible,
      })}
    >
      <div className={styles.container__bg}>
        <h2 className="heading--h2">Our Achievements</h2>
        {isVisible && (
          <article className={styles.items}>
            {achievements.map((achievement, index) => {
              const { title, startValue, endValue, icon } = achievement;
              return (
                <div
                  className={classNames(`${styles.item}`, {
                    [styles.item__first]: index === 0,
                    [styles.item__last]: index === 2,
                  })}
                  key={title}
                >
                  <CounterUpPage startValue={startValue} endValue={endValue} />
                  <div className={`${styles.item__icon} icon icon--medium ${icon}`}></div>
                  <p className={styles.item__text}>{title}</p>
                </div>
              );
            })}
          </article>
        )}
      </div>
    </section>
  );
};
