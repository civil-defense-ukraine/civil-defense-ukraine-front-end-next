import classNames from 'classnames';
import { TeamMember } from '../../../../../types/TeamMember';
import { useState } from 'react';
import Image from 'next/image';

import styles from '../TeamSection.module.scss';

type Props = {
  person: TeamMember;
};

const charactersPerString = 52;

export const TeamCard: React.FC<Props> = ({ person }) => {
  const { id, image, name, position, description } = person;
  const [loaded, setLoaded] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = e.currentTarget;
    imgElement.src = '/imgs/default/person.png'; // Using the static image path
    imgElement.classList.add(styles.article__img__default);
    
    if (!imgElement.dataset.retry) {
      imgElement.src = '/imgs/default/person.png'; // URL for default image
      imgElement.classList.add(styles.article__img__default);
      imgElement.dataset.retry = 'true';
    } else {
      imgElement.src =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNkZGRkZGQiLz48dGV4dCB4PSI1MCIgeT0iNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSIgZm9udC1zaXplPSI4Ij5JbWFnZSBFcnJvcjwvdGV4dD48L3N2Zz4=';
      imgElement.classList.add(styles.article__img__placeholder);
    }
  };

  return (
    <article
      className={classNames(`${styles.article}`, {
        [styles.article__hover]: description.trim().length > 2,
      })}
      key={id}
    >
      <div className={`${styles.article__container} ${styles.article}`}>
        <div
          className={classNames(styles.article__img, {
            skeleton: !loaded,
          })}
        >
          <Image
            className={styles.article__img}
            src={image || '/imgs/default/person.png'}
            alt={name}
            width={150} // Set a width that fits your design
            height={150} // Set a height that fits your design
            onLoadingComplete={() => setLoaded(true)}
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        <p className={`${styles.article__name} heading--h3`}>{name}</p>

        {description.trim().length >= 2 && (
          <div
            className={styles.article__quote}
            style={{
              '--hover-height': `${description.trim().length / charactersPerString}em`,
            } as React.CSSProperties}
          >
            {`"${description.length}"`}
          </div>
        )}

        <p className={styles.article__text}>{position}</p>
      </div>
    </article>
  );
};
